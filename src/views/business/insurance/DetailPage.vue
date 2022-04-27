<template>
  <BasicTable destroyOnClose @register="registerTable">
    <template #bodyCell="{ column,record }">
      <template v-if="column.key === 'action'">
        <TableAction
          :actions="[
          {
            icon: 'clarity:info-standard-line',
            tooltip: '查看社保详情',
            onClick: handleView.bind(null, record),
          },
        ]"
        />
      </template>
    </template>
  </BasicTable>
  <DetailModal @register="registerModal" @success="handleSuccess" />
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import { BasicTable, TableAction, useTable } from "/@/components/Table";
import { insuranceDetailPage } from "/@/api/business";
import {
  insuranceDetailPageColumns as columns,
  searchDetailPageFormSchema
} from "./account.data";
import DetailModal from "./DetailModal.vue";
import { useModal } from "/@/components/Modal";

export default defineComponent({
  name: "DetailPage",
  components: { DetailModal, BasicTable, TableAction },
  setup() {
    const route = useRoute();
    const [registerModal, { openModal }] = useModal();
    // 此处可以得到用户ID
    const id = ref(route.params?.id);
    const [registerTable, { reload }] = useTable({
      title: "社保详情",
      api: insuranceDetailPage,
      rowKey: "id",
      columns,
      formConfig: {
        labelWidth: 120,
        schemas: searchDetailPageFormSchema,
        autoSubmitOnEnter: true
      },
      // pagination: false,
      striped: false,
      useSearchForm: true,
      showTableSetting: true,
      bordered: true,
      showIndexColumn: false,
      canResize: false,
      searchInfo: { insuranceId: id.value },
      actionColumn: {
        width: 120,
        title: "操作",
        dataIndex: "action",
        key: "action"
      }
    });

    function handleSuccess() {
      reload();
    }

    function handleView(record) {
      openModal(true, {
        title: "查看详情",
        idCard: record.idCard,
        insuranceDate: new Date(record.insuranceDate)
      });
    }

    return {
      registerModal,

      id,
      registerTable,
      handleView,
      handleSuccess
    };
  }
});
</script>

<style></style>
