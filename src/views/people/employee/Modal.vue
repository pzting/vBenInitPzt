<template>
  <BasicModal v-bind="$attrs" :title="getTitle" @ok="handleSubmit" @register="registerModal">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
import { defineComponent, ref, computed, unref } from "vue";
import { BasicModal, useModalInner } from "/@/components/Modal";
import { BasicForm, useForm } from "/@/components/Form/index";
import { accountFormSchema, moveFormSchema } from "./index.data";
import { getDeptList, employeeSave, replaceEnterprise } from "/@/api/people";

export default defineComponent({
  name: "Modal",
  components: { BasicModal, BasicForm },
  emits: ["success", "register"],
  setup(_, { emit }) {
    const isUpdate = ref(true);
    const rowId = ref("");
    const title = ref("");
    const idCardList = ref();
    const [registerForm, { setFieldsValue, setProps, updateSchema, resetFields, validate }] =
      useForm({
        labelWidth: 100,
        schemas: accountFormSchema,
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
      idCardList.value = data?.idCardList;
      if (!title.value) {
        setProps({
          schemas: accountFormSchema
        });
      } else {
        setProps({
          schemas: moveFormSchema
        });
      }
      const treeDataRes = await getDeptList({});
      const treeData = treeDataRes.items;
      updateSchema([
        {
          field: "enterpriseId",
          componentProps: { treeData }
        }
      ]);
      rowId.value = "";
      if (unref(isUpdate)) {
        rowId.value = data.record.id;
        setFieldsValue({
          ...data.record
        });
      }
    });

    const getTitle = computed(() => title.value || (!unref(isUpdate) ? "新增" : "编辑"));

    async function handleSubmit() {
      try {
        const values = await validate();
        setModalProps({ confirmLoading: true });
        // TODO custom api
        console.log(values);
        if (!title.value) {
          await employeeSave(values);
        } else {
          // 移动员工
          await replaceEnterprise({ ...values, idCardList: idCardList.value });
        }
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
