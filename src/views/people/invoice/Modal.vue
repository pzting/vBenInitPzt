<template>
  <BasicModal v-bind="$attrs" :title="getTitle" @ok="handleSubmit" @register="registerModal">
    <BasicForm @register="registerForm">
      <!--      <level></level>
            <template #enterpriseId="{ model, field }">
              <a-select
                v-model:value="model[field]"
                :options="[]"
                allowClear
                mode="multiple"
                placeholder="请选择"
              />
            </template>-->
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts">
import { computed, defineComponent, ref, unref } from "vue";
import { BasicModal, useModalInner } from "/@/components/Modal";
import { BasicForm, useForm } from "/@/components/Form/index";
import { modalFormSchema } from "./index.data";
import { contractList, contractRateList, getDeptList } from "/@/api/people";
import { formEditSchema } from "/@/views/system/user/index.data";
import { contractLevelModalFormSchema } from "/@/components/ContractLevel/index.data";
import Level from "/@/components/ContractLevel/level.vue";

export default defineComponent({
  name: "Modal",
  components: { BasicModal, BasicForm, Level },
  emits: ["success", "register"],
  setup(_, { emit }) {
    const isUpdate = ref(true);
    const rowId = ref("");
    const keys = ref([]);
    const [registerForm, {
      setProps,
      setFieldsValue,
      getFieldsValue,
      resetFields,
      validate,
      clearValidate,
      updateSchema
    }] = useForm({
      labelWidth: 120,
      schemas: [
        ...contractLevelModalFormSchema,
        ...modalFormSchema],
      showActionButtonGroup: false,
      baseColProps: {
        span: 23
      }
    });
    const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
      resetFields();
      setModalProps({ confirmLoading: false });
      isUpdate.value = !!data?.isUpdate;
      const treeDataRes = await getDeptList({});
      options.value = treeDataRes.items;
      setProps({
        schemas: [
          ...contractLevelModalFormSchema,
          ...modalFormSchema]
      });
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
        emit("success", {
          isUpdate: unref(isUpdate),
          values: { ...values, id: rowId.value }
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
