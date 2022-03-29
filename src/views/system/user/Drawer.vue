<template>
  <BasicDrawer
    v-bind="$attrs"
    :title="getTitle"
    showFooter
    width="500px"
    @ok="handleSubmit"
    @register="registerDrawer"
  >
    <BasicForm @register="registerForm">
      <!--      <template #roleIds="{ model, field }">
              <a-select
                v-model:value="model[field]"
                :options="options"
                allowClear
                mode="multiple"
                placeholder="请选择"
              />
            </template>-->
      <template #roleIds="{ model, field }">
        <ApiSelect
          :api="roleAll"
          showSearch
          v-model:value="model[field]"
          :filterOption="false"
          resultField="items"
          labelField="roleName"
          valueField="roleId"
          mode="multiple"
          :params="searchParams"
          @search="onSearch"
          placeholder="请选择"
        />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts">
import { defineComponent, ref, computed, unref } from "vue";
import { BasicForm, useForm, ApiSelect } from "/@/components/Form/index";
import { formSchema, formEditSchema } from "./index.data";
import { BasicDrawer, useDrawerInner } from "/@/components/Drawer";
import { BasicTree } from "/@/components/Tree";
import { Select } from "ant-design-vue";
import { useDebounceFn } from "@vueuse/core";
import { userRoles, roleAll } from "/@/api/system";

export default defineComponent({
  name: "UserDrawer",
  components: { ApiSelect, BasicDrawer, ASelect: Select, BasicForm, BasicTree },
  emits: ["success", "register"],
  setup(_, { emit }) {
    const isUpdate = ref(true);
    const id = ref("");
    const roleIds = ref([]);
    // const options = ref([]);
    const keyword = ref<string>("");
    const searchParams = computed<Recordable>(() => {
      return { keyword: unref(keyword) };
    });
    const [registerForm, { resetFields, setFieldsValue, setProps, validate }] = useForm({
      labelWidth: 120,
      schemas: formSchema,
      showActionButtonGroup: false,
      baseColProps: {
        span: 24
      }
    });

    const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
      resetFields();
      isUpdate.value = !!data?.isUpdate;
      if (unref(isUpdate)) {
        setProps({
          schemas: formEditSchema
        });
      } else {
        setProps({
          schemas: formSchema
        });
      }
      setDrawerProps({ confirmLoading: false });

      /*  const res = await roleAll({});
        options.value = res.items.map((item) => {
          return {
            label: item.roleName,
            value: item.roleId
          };
        });*/

      if (unref(isUpdate)) {
        const res = await userRoles({ roleId: data?.record?.roleId });
        roleIds.value = res.roles.map((item) => item.roleId);
        id.value = data?.record?.id;

        setFieldsValue({
          ...data.record,
          roleIds: roleIds.value
        });
      }
    });

    const getTitle = computed(() => (!unref(isUpdate) ? "新增" : "编辑"));

    async function handleSubmit() {
      try {
        const values = await validate();
        setDrawerProps({ confirmLoading: true });
        // TODO custom api
        console.log(values);
        closeDrawer();
        emit("success", { ...values, id: id.value });
      } finally {
        setDrawerProps({ confirmLoading: false });
      }
    }


    function onSearch(value: string) {
      keyword.value = value;
    }

    return {
      onSearch: useDebounceFn(onSearch, 300),
      roleAll,
      searchParams,
      registerDrawer,
      registerForm,
      getTitle,
      roleIds,
      handleSubmit
      // options
    };
  }
});
</script>
