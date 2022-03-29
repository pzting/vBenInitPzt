<template>
  <BasicDrawer
    v-bind="$attrs"
    :title="title"
    showFooter
    width="500px"
    @ok="handleSubmit"
    @register="registerDrawer"
  >
    <BasicForm @register="registerForm">
      <!--      权限点-->
      <template #authIds="{ model, field }">
        <BasicTree
          v-model:value="model[field]"
          :fieldNames="{ title: 'authPointName', key: 'authPointId' }"
          :treeData="treeData"
          checkable
          title="权限点"
          toolbar
        />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts">
import { defineComponent, ref, computed, unref } from "vue";
import { BasicForm, useForm } from "/@/components/Form/index";
import { formSchema } from "./index.data";
import { BasicTree } from "/@/components/Tree";
import { BasicDrawer, useDrawerInner } from "/@/components/Drawer";
import { authorityIds, authorityPointTree } from "/@/api/system";

export default defineComponent({
  name: "MenuDrawer",
  components: { BasicDrawer, BasicTree, BasicForm },
  emits: ["success", "register"],
  setup(_, { emit }) {
    const isUpdate = ref(true);
    const title = ref("");
    const keys = ref([]);
    const treeData = ref([]);
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
      title.value = data?.title;

      const tree = await authorityPointTree({});
      treeData.value = tree.items;
      if (unref(isUpdate)) {
        const authIdsRes = await authorityIds({ authId: data.record.authId });
        setFieldsValue({
          ...data.record,
          authIds: authIdsRes.items
        });
      }
    });

    async function handleSubmit() {
      try {
        const values = await validate();
        setDrawerProps({ confirmLoading: true });
        // TODO custom api
        closeDrawer();
        emit("success", { ...values, authPointIds: keys.value });
      } finally {
        setDrawerProps({ confirmLoading: false });
      }
    }

    function handleSelect(data) {
      keys.value = data;
      console.log(keys.value, "keys.value");
      // searchInfo.deptId = deptId;
      // reload();
    }

    return { handleSelect, treeData, registerDrawer, registerForm, title, handleSubmit };
  }
});
</script>
