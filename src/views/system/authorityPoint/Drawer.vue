<template>
  <BasicDrawer
    v-bind="$attrs"
    :title="title"
    showFooter
    width="500px"
    @ok="handleSubmit"
    @register="registerDrawer"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts">
import { defineComponent, ref, computed, unref } from "vue";
import { BasicForm, useForm } from "/@/components/Form/index";
import { formSchema } from "./index.data";
import { BasicDrawer, useDrawerInner } from "/@/components/Drawer";

import { authorityPointTree } from "/@/api/system";

export default defineComponent({
  name: "MenuDrawer",
  components: { BasicDrawer, BasicForm },
  emits: ["success", "register"],
  setup(_, { emit }) {
    const isUpdate = ref(true);
    const title = ref("");

    const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
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

      if (unref(isUpdate)) {
        setFieldsValue({
          ...data.record
        });
      }
    });

    async function handleSubmit() {
      try {
        const values = await validate();
        setDrawerProps({ confirmLoading: true });
        // TODO custom api
        console.log(values);
        closeDrawer();
        emit("success", values);
      } finally {
        setDrawerProps({ confirmLoading: false });
      }
    }

    return { registerDrawer, registerForm, title, handleSubmit };
  }
});
</script>
