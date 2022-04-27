<template>
  <BasicModal v-bind="$attrs" :title="getTitle" @ok="handleSubmit" @register="registerModal">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
import { defineComponent, ref, computed, unref } from "vue";
import { BasicModal, useModalInner } from "/@/components/Modal";
import { BasicForm, useForm } from "/@/components/Form/index";
import { modalFormSchema } from "./index.data";

export default defineComponent({
  name: "SaveModal",
  components: { BasicModal, BasicForm },
  emits: ["success", "register"],
  setup(_, { emit }) {
    const isUpdate = ref(true);
    const rowId = ref("");
    const title = ref("");
    const [registerForm, { setFieldsValue, setProps, updateSchema, resetFields, validate }] =
      useForm({
        labelWidth: 120,
        schemas: modalFormSchema,
        showActionButtonGroup: false,
        baseColProps: {
          span: 24
        }
      });
    const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
      resetFields();
      setModalProps({ confirmLoading: false });
      isUpdate.value = !!data?.isUpdate;
      title.value = data?.title;
      rowId.value = "";
      if (unref(isUpdate)) {
        rowId.value = data.record.id;
        setFieldsValue({
          ...data.record,
          taxDeductDate: `${data.record.taxDeductDate}-01-01`
        });
      }
      // const treeData = await getDeptList();
    });

    const getTitle = computed(() => (!unref(isUpdate) ? "新增 " : "编辑 "));

    async function handleSubmit() {
      try {
        const values = await validate();
        setModalProps({ confirmLoading: true });
        // TODO custom api
        console.log(values);

        closeModal();
        emit("success", { isUpdate: unref(isUpdate), values: { ...values, id: rowId.value } });
      } finally {
        setModalProps({ confirmLoading: false });
      }
    }

    return { registerModal, registerForm, getTitle, handleSubmit };
  }
});
</script>
