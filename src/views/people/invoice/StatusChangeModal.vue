<template>
  <BasicModal v-bind="$attrs" :title="getTitle" @ok="handleSubmit"
              @register="registerModal">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
import { defineComponent, ref, computed, unref } from "vue";
import { BasicModal, useModalInner } from "/@/components/Modal";
import { BasicForm, useForm } from "/@/components/Form/index";
import { confirmFormSchema } from "./index.data";
import { uploadApi } from "/@/api/sys/upload";

export default defineComponent({
  name: "StatusChangeModal",
  components: { BasicModal, BasicForm },
  emits: ["success", "register"],
  setup(_, { emit }) {
    const isUpdate = ref(true);
    const rowId = ref("");
    const rowStatus = ref("");
    const total = ref(0);
    const [registerForm, { setFieldsValue, setProps, resetFields, validate }] = useForm({
      labelWidth: 120,
      schemas: confirmFormSchema,
      showActionButtonGroup: false,
      baseColProps: {
        span: 24
      }
    });
    const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
      resetFields();
      setModalProps({ confirmLoading: false });
      isUpdate.value = !!data?.isUpdate;
      if (data.record.status == "PAID") {
        setProps({
          schemas: [
            {
              field: "billFileNo",
              component: "Upload",
              label: "上传票据",
              colProps: {
                span: 24
              },
              rules: [{ required: true, message: "请选择上传文件" }],
              componentProps: {
                api: uploadApi,
                maxNumber: 1,
                maxSize: 20
              }
            }
          ]
        });
      } else {
        // 支付
        setProps({
          schemas: [
            {
              field: "labourFileNo",
              component: "Upload",
              label: "劳务支出票据",
              colProps: {
                span: 24
              },
              rules: [{ required: true, message: "请选择上传文件" }],
              componentProps: {
                api: uploadApi,
                maxNumber: 1,
                maxSize: 20
              }
            },
            ...confirmFormSchema
          ]
        });
      }
      rowId.value = "";
      rowStatus.value = "";
      if (unref(isUpdate)) {
        rowId.value = data.record.id;
        rowStatus.value = data.record.status;
        setFieldsValue({
          ...data.record
        });
      }
    });

    const getTitle = computed(() => (rowStatus.value == "PAID" ? "上传" : "支付"));

    async function handleSubmit() {
      try {
        const values = await validate();
        setModalProps({ confirmLoading: true });
        // TODO custom api
        closeModal();
        //, status: rowStatus.value
        // 待发放，上传票据
        if (rowStatus.value == "PAID") {
          emit("success", {
            isUpdate: unref(isUpdate),
            status: rowStatus.value,
            values: {
              ...values,
              id: rowId.value,
              billFileNo: values.billFileNo[values.billFileNo.length - 1]
            }
          });
        } else {
          emit("success", {
            isUpdate: unref(isUpdate),
            status: rowStatus.value,
            values: {
              ...values, id: rowId.value,
              labourFileNo: values.labourFileNo[values.labourFileNo.length - 1]
            }
          });
        }

      } finally {
        setModalProps({ confirmLoading: false });
      }
    }

    return { registerModal, registerForm, getTitle, total, handleSubmit };
  }
});
</script>
