<template>
  <BasicModal
    v-bind="$attrs"
    :title="title"
    defaultFullscreen
    @ok="handleSubmit"
    @register="registerModal"
  >
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="monthDetail" force-render tab="社保详情(当月缴纳，其他月补缴)">
        <MonthDetail v-if="idCard" :idCard="idCard" :insuranceDate="insuranceDate" />
      </a-tab-pane>
      <a-tab-pane key="monthPay" tab="社保缴纳的金额详情(当月缴纳，其他月补缴)">
        <MonthPay :idCard="idCard" :insuranceDate="insuranceDate" />
      </a-tab-pane>
    </a-tabs>
  </BasicModal>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { BasicModal, useModalInner } from "/@/components/Modal";
import { BasicForm } from "/@/components/Form/index";
import { Tabs } from "ant-design-vue";
import MonthDetail from "./MonthDetail.vue";
import MonthPay from "./MonthPay.vue";

export default defineComponent({
  name: "DetailModal",
  components: {
    MonthPay,
    MonthDetail,
    ATabs: Tabs,
    ATabPane: Tabs.TabPane,
    BasicModal,
    BasicForm
  },
  emits: ["success", "register"],
  setup(_, { emit }) {
    const insuranceDate = ref("");
    const idCard = ref("");
    const title = ref("");
    const activeKey = ref("monthDetail");
    const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
      title.value = data?.title;
      idCard.value = data?.idCard;
      insuranceDate.value = data?.insuranceDate;
      setModalProps({ confirmLoading: false });
    });


    async function handleSubmit() {
      try {
        closeModal();
      } finally {
        setModalProps({ confirmLoading: false });
      }
    }

    return {
      idCard,
      insuranceDate,
      activeKey,
      registerModal,
      title,
      handleSubmit
    };
  }
});
</script>
