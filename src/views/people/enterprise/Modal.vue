<template>
  <BasicModal v-bind="$attrs" :title="getTitle" @ok="handleSubmit" @register="registerModal">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
import { defineComponent, ref, computed, unref } from "vue";
import { BasicModal, useModalInner } from "/@/components/Modal";
import { BasicForm, useForm } from "/@/components/Form/index";
import { formSchema } from "./index.data";

import { getDeptList } from "/@/api/people";

export default defineComponent({
  name: "Modal",
  components: { BasicModal, BasicForm },
  emits: ["success", "register"],
  setup(_, { emit }) {
    const isUpdate = ref(true);
    const id = ref("");
    const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
      labelWidth: 120,
      schemas: formSchema,
      showActionButtonGroup: false,
      baseColProps: {
        span: 24
      }
    });

    const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
      resetFields();
      setModalProps({ confirmLoading: false });
      isUpdate.value = !!data?.isUpdate;

      const treeDataRes = await getDeptList({});
      updateSchema({
        field: "parentId",
        componentProps: { treeData: treeDataRes.items }
      });
      id.value = "";
      if (unref(isUpdate)) {
        id.value = data.record.id;
        setFieldsValue({
          ...data.record
        });
      }

    });

    const getTitle = computed(() => (!unref(isUpdate) ? "新增" : "编辑"));

    async function handleSubmit() {
      try {
        const values = await validate();
        setModalProps({ confirmLoading: true });
        // TODO custom api
        closeModal();
        emit("success", { ...values, id: id.value });
      } finally {
        setModalProps({ confirmLoading: false });
      }
    }

    return { registerModal, registerForm, getTitle, handleSubmit };
  }
});
</script>
