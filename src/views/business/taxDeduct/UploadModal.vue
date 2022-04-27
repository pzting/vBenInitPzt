<template>
  <BasicModal v-bind="$attrs" :title="title" @ok="handleSubmit"
              @register="registerModal">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { BasicModal, useModalInner } from "/@/components/Modal";
import { BasicForm, useForm } from "/@/components/Form/index";
import { uploadFormSchema as formSchema } from "./index.data";
import { uploadApi } from "/@/api/sys/upload";

export default defineComponent({
  name: "UploadModal",
  components: { BasicModal, BasicForm },
  emits: ["success", "register"],
  setup(_, { emit }) {
    const title = ref("");
    const [registerForm, { resetFields, validate }] =
      useForm({
        labelWidth: 120,
        schemas: [
          {
            field: "fileNo",
            component: "Upload",
            label: "文件",
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
          ...formSchema
        ],
        showActionButtonGroup: false,
        baseColProps: {
          span: 24
        }
      });
    const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
      resetFields();
      setModalProps({ confirmLoading: false });
      title.value = data?.title;
    });


    async function handleSubmit() {
      try {
        const values = await validate();
        setModalProps({ confirmLoading: true });
        // TODO custom api
        closeModal();
        emit("success", {
          values: { ...values, fileNo: values.fileNo[values.fileNo.length - 1] }
        });
      } finally {
        setModalProps({ confirmLoading: false });
      }
    }

    return { registerModal, registerForm, title, handleSubmit };
  }
});
</script>
