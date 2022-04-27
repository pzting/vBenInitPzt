<template>
  <BasicModal v-bind="$attrs" :title="getTitle" @ok="handleSubmit" @register="registerModal">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
import { defineComponent, ref, computed, unref } from "vue";
import { BasicModal, useModalInner } from "/@/components/Modal";
import { BasicForm, useForm } from "/@/components/Form/index";
import { salaryDetailFormSchema as modalFormSchema } from "./account.data";

export default defineComponent({
  name: "SalaryDetailModal",
  components: { BasicModal, BasicForm },
  emits: ["success", "register"],
  setup(_, { emit }) {
    const isUpdate = ref(true);
    const id = ref("");
    const idCardList = ref();
    const [registerForm, { setFieldsValue, resetFields, validate }] = useForm({
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
      idCardList.value = data?.idCardList;
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
        console.log(values);
        // await salaryDetailSave({idCardList: idCardList.value, ...values})
        closeModal();
        emit("success", {
          isUpdate: unref(isUpdate),
          values: { ...values, id: id.value }
        });
      } finally {
        setModalProps({ confirmLoading: false });
      }
    }

    return { registerModal, registerForm, getTitle, handleSubmit };
  }
});
</script>
