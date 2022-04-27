<template>
  <BasicModal v-bind="$attrs" :title="getTitle" @ok="handleSubmit" @register="registerModal">
    <BasicForm @register="registerForm" />
    <!--    <Tree @select="handleSelect" />-->
  </BasicModal>
</template>
<script lang="ts">
import { defineComponent, ref, computed, unref } from "vue";
import { BasicModal, useModalInner } from "/@/components/Modal";
import { BasicForm, useForm } from "/@/components/Form/index";
import { accountFormSchema } from "./account.data";
import Tree from "./Tree.vue";
import { getDeptList } from "/@/api/people";
import { uploadApi } from "/@/api/sys/upload";
import { contractLevelModalFormSchema } from "/@/components/ContractLevel/index.data";

export default defineComponent({
  name: "Modal",
  components: { BasicModal, Tree, BasicForm },
  emits: ["success", "register"],
  setup(_, { emit }) {
    const isUpdate = ref(true);
    const rowId = ref("");
    const idCardList = ref();
    const keys = ref([]);
    const [registerForm, { setFieldsValue, resetFields, validate, updateSchema }] = useForm({
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
        ...contractLevelModalFormSchema,
        ...accountFormSchema],
      showActionButtonGroup: false,
      baseColProps: {
        span: 23
      }
    });
    const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
      resetFields();
      setModalProps({ confirmLoading: false });
      isUpdate.value = !!data?.isUpdate;
      idCardList.value = data?.idCardList;
      /*const treeDataRes = await getDeptList({});
      updateSchema({
        field: "enterpriseId",
        componentProps: { options: treeDataRes.items }
      });*/
      rowId.value = "";
      if (unref(isUpdate)) {
        rowId.value = data.record.id;
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
        console.log(values.fileNo, "values.fileNo");
        emit("success", {
          isUpdate: unref(isUpdate),
          // values: { ...values, ...keys.value }
          values: { ...values, fileNo: values.fileNo[values.fileNo.length - 1] }
        });
      } finally {
        setModalProps({ confirmLoading: false });
      }
    }

    function handleSelect(data) {
      keys.value = data;
    }

    return { handleSelect, registerModal, registerForm, getTitle, handleSubmit };
  }
});
</script>
