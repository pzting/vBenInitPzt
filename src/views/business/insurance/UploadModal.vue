<template>
  <BasicModal v-bind="$attrs" :title="title" @ok="handleSubmit"
              @register="registerModal">
    <BasicForm @register="registerForm">
      <template #enterpriseId="{ model, field }">
        <a-select v-model:value="model[field]" :options="options" allowClear placeholder="请选择" />
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { BasicModal, useModalInner } from "/@/components/Modal";
import { BasicForm, useForm } from "/@/components/Form/index";
import { uploadFormSchema as formSchema } from "./index.data";
import { uploadApi } from "/@/api/sys/upload";
import { getDeptList } from "/@/api/people";
import { Select } from "ant-design-vue";

export default defineComponent({
  name: "UploadModal",
  components: { BasicModal, ASelect: Select, BasicForm },
  emits: ["success", "register"],
  setup(_, { emit }) {
    const title = ref("");
    const options = ref([]);
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
      const res = await getDeptList({});
      options.value = res.items.map((item) => {
        return {
          label: item.enterpriseName,
          value: item.id
        };
      });
      console.log(options.value, "options.value");
    });


    async function handleSubmit() {
      try {
        const values = await validate();
        setModalProps({ confirmLoading: true });
        // TODO custom api
        /* if (!unref(isUpdate)) {
         await employeeSave(values)
       } else {
         await replaceEnterprise({idCardList: idCardList.value, ...values})
       }*/
        //, id: rowId.value
        closeModal();
        emit("success", {
          values: { ...values, fileNo: values.fileNo[values.fileNo.length - 1] }
        });
      } finally {
        setModalProps({ confirmLoading: false });
      }
    }

    return { registerModal, registerForm, options, title, handleSubmit };
  }
});
</script>
