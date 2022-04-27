<template>
  <BasicModal v-bind="$attrs" :title="title" @ok="handleSubmit" @register="registerModal">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
import { defineComponent, ref, unref } from "vue";
import { BasicModal, useModalInner } from "/@/components/Modal";
import { BasicForm, useForm } from "/@/components/Form/index";
import { uploadApi } from "/@/api/sys/upload";
import { Select } from "ant-design-vue";

export default defineComponent({
  name: "UploadModal",
  components: { BasicModal, ASelect: Select, BasicForm },
  emits: ["success", "register"],
  setup(_, { emit }) {
    const isUpdate = ref(true);
    const rowId = ref("");
    const title = ref("");
    const options = ref([]);
    const [registerForm, { setFieldsValue, resetFields, validate }] =
      useForm({
        labelWidth: 120,
        schemas: [
          {
            field: "fileNo",
            component: "Upload",
            label: "收入票据",
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
        ],
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
          ...data.record
        });
      }
    });


    async function handleSubmit() {
      try {
        const values = await validate();
        setModalProps({ confirmLoading: true });
        // TODO custom api
        closeModal();
        console.log(values, "values");
        emit("success", {
          isUpdate: unref(isUpdate),
          values: { fileNo: values.fileNo[values.fileNo.length - 1], insuranceId: rowId.value }
        });
      } finally {
        setModalProps({ confirmLoading: false });
      }
    }

    return { registerModal, registerForm, options, title, handleSubmit };
  }
});
</script>
