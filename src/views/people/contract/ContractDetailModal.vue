<template>
  <BasicModal v-bind="$attrs" :title="getTitle" @ok="handleSubmit" @register="registerModal">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
import { defineComponent, ref, computed, unref } from "vue";
import { BasicModal, useModalInner } from "/@/components/Modal";
import { BasicForm, useForm } from "/@/components/Form/index";
import {
  contractDetailFormSchema as modalFormSchema
} from "./account.data";

export default defineComponent({
  name: "ContractDetailModal",
  components: { BasicModal, BasicForm },
  emits: ["success", "register"],
  setup(_, { emit }) {
    const isUpdate = ref(true);
    const id = ref("");
    const rateList = [
      {
        basicRate: "3",
        costRate: "3"
      },
      {
        basicRate: "6",
        costRate: "6.38"
      },
      {
        basicRate: "9",
        costRate: "9.28"
      },
      {
        basicRate: "13",
        costRate: "13"
      }
    ];
    const [registerForm, { setFieldsValue, resetFields, validate, updateSchema }] = useForm({
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
      const tempRateList = rateList.map(item => {
        return {
          value: `${item.basicRate}-${item.costRate}`,
          label: `基本税率${item.basicRate}%-成本税率${item.costRate}%`
        };
      });
      console.log(rateList, "rateList");
      console.log(tempRateList, "tempRateList");
      updateSchema({
        field: "basicRate",
        componentProps: { options: tempRateList }
      });
      id.value = "";
      if (unref(isUpdate)) {
        id.value = data.record.id;
        setFieldsValue({
          ...data.record,
          basicRate: `${data.record.basicRate}-${data.record.costRate}`
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
        closeModal();
        emit("success", {
          isUpdate: unref(isUpdate),
          values: {
            ...values, id: id.value,
            costRate: values.basicRate.split("-")[1],
            basicRate: values.basicRate.split("-")[0]
          }
        });
      } finally {
        setModalProps({ confirmLoading: false });
      }
    }

    return { registerModal, registerForm, getTitle, handleSubmit };
  }
});
</script>
