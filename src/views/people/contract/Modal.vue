<template>
  <BasicModal v-bind="$attrs" :title="getTitle" @ok="handleSubmit" @register="registerModal">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
import { computed, defineComponent, ref, unref } from "vue";
import { BasicModal, useModalInner } from "/@/components/Modal";
import { BasicForm, useForm } from "/@/components/Form/index";
import { modalFormSchema } from "./account.data";
import { contractRateList, getDeptList } from "/@/api/people";

export default defineComponent({
  name: "Modal",
  components: { BasicModal, BasicForm },
  emits: ["success", "register"],
  setup(_, { emit }) {
    const isUpdate = ref(true);
    const rowId = ref("");
    const jiaFang = ref("");
    const keys = ref([]);
    const [registerForm, { setFieldsValue, resetFields, validate, updateSchema }] = useForm({
      labelWidth: 120,
      schemas: modalFormSchema,
      showActionButtonGroup: false,
      baseColProps: {
        span: 23
      }
    });
    const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
      resetFields();
      setModalProps({ confirmLoading: false });
      isUpdate.value = !!data?.isUpdate;
      rowId.value = "";
      jiaFang.value = "";
      const treeDataRes = await getDeptList({});
      updateSchema({
        field: "enterpriseId",
        componentProps: {
          options: treeDataRes.items,
          onChange: async (e: any) => {
            const arr = treeDataRes.items.filter(item => item.id == e);
            jiaFang.value = arr[0].enterpriseName;
            console.log(arr, "temp");
            console.log(jiaFang.value, "jiaFang.value");
          }
        }
      });
      if (unref(isUpdate)) {
        rowId.value = data.record.id;
        jiaFang.value = data.record.jiaFang;
        setFieldsValue({
          ...data.record
          /*enterpriseId: {
            label: data.record.jiaFang,
            value: data.record.enterpriseId
          }*/
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
          values: {
            ...values, id: rowId.value,
            jiaFang: jiaFang.value
            // enterpriseId: values.enterpriseId.value
          }
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
