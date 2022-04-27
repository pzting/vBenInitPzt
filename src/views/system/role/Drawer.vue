<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <!--数据权限-->
      <template #dataAuthIds="{ model, field }">
        <ApiSelect
          :api="dataAuthList"
          showSearch
          v-model:value="model[field]"
          :filterOption="false"
          resultField="items"
          labelField="name"
          valueField="id"
          mode="multiple"
          :params="searchParams"
          @search="onSearch"
          placeholder="请选择"
        />
      </template>
      <!--      菜单页面权限-->
      <template #authIds="{ model, field }">
        <BasicTree
          v-model:value="model[field]"
          :fieldNames="{ title: 'authName', key: 'authId' }"
          :treeData="treeData"
          :toolbar="false"
          checkable
          title=""
          toolbar
        />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts">
import { defineComponent, ref, computed, unref } from "vue";
import { BasicForm, useForm, ApiSelect } from "/@/components/Form/index";
import { formSchema } from "./index.data";
import { BasicDrawer, useDrawerInner } from "/@/components/Drawer";
import { BasicTree, TreeItem } from "/@/components/Tree";
import { Select } from "ant-design-vue";
import { useDebounceFn } from "@vueuse/core";
import { authorityTree, dataAuthList, roleDataIds, roleAuthIds } from "/@/api/system";
import { title } from "/@/hooks/web/useI18n";

export default defineComponent({
  name: "RoleDrawer",
  components: { BasicDrawer, ApiSelect, ASelect: Select, BasicForm, BasicTree },
  emits: ["success", "register"],
  setup(_, { emit }) {
    const isUpdate = ref(true);
    const id = ref("");
    const treeData = ref<TreeItem[]>([]);
    const keyword = ref<string>("");
    const searchParams = computed<Recordable>(() => {
      return { keyword: unref(keyword) };
    });
    const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
      labelWidth: 120,
      schemas: formSchema,
      showActionButtonGroup: false,
      baseColProps: {
        span: 24
      }
    });

    const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
      resetFields();
      setDrawerProps({ confirmLoading: false });
      isUpdate.value = !!data?.isUpdate;
      // 需要在setFieldsValue之前先填充treeData，否则Tree组件可能会报key not exist警告
      // 菜单页面权限列表
      const tree = await authorityTree({});
      treeData.value = tree.items;
      id.value = "";
      // 编辑操作
      if (unref(isUpdate)) {
        const dataIdsRes = await roleDataIds({ roleId: data?.record.roleId });
        const authIdsRes = await roleAuthIds({ roleId: data?.record.roleId });
        id.value = data?.record.roleId;
        setFieldsValue({
          ...data.record,
          dataAuthIds: dataIdsRes.items.map((item) => item.id),
          authIds: authIdsRes.items
        });
      }
    });

    const getTitle = computed(() => (!unref(isUpdate) ? title("basic.add") : title("basic.edit")));

    async function handleSubmit() {
      try {
        const values = await validate();
        setDrawerProps({ confirmLoading: true });
        // TODO custom api
        console.log(values);
        closeDrawer();
        emit("success", { ...values, roleId: id.value });
      } finally {
        setDrawerProps({ confirmLoading: false });
      }
    }

    function onSearch(value: string) {
      keyword.value = value;
    }

    return {
      onSearch: useDebounceFn(onSearch, 300),
      searchParams,
      registerDrawer,
      registerForm,
      getTitle,
      handleSubmit,
      treeData,
      dataAuthList
    };
  }
});
</script>
