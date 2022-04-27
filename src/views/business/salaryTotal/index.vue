<template>
  <PageWrapper contentClass="flex" contentFullHeight dense fixedHeight>
    <BasicTable :searchInfo="searchInfo" @register="registerTable">
      <template #bodyCell="{ column,record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
            {
              icon: 'clarity:info-standard-line',
              tooltip: '查看员工工资明细',
              onClick: handleView.bind(null, record),
            },
          ]"
          />
        </template>
      </template>
    </BasicTable>
    <Modal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { BasicTable, useTable, TableAction } from "/@/components/Table";
import {
  salaryTotalPage
} from "/@/api/business";
import { PageWrapper } from "/@/components/Page";

import { useModal } from "/@/components/Modal";

import { columns, searchFormSchema } from "./index.data";
import { useGo } from "/@/hooks/web/usePage";
import Modal from "./Modal.vue";

export default defineComponent({
  name: "salaryTotal",
  components: {
    BasicTable,
    PageWrapper,
    Modal,
    TableAction
  },
  setup() {
    const go = useGo();
    const [registerModal, { openModal }] = useModal();
    const searchInfo = reactive<Recordable>({});
    const [registerTable, { getForm }] = useTable({
      title: "工资单统计",
      api: salaryTotalPage,
      rowKey: "id",
      clickToRowSelect: false,
      columns,
      formConfig: {
        labelWidth: 120,
        schemas: searchFormSchema,
        autoSubmitOnEnter: true
      },
      showIndexColumn: false,
      useSearchForm: true,
      showTableSetting: true,
      bordered: true,
      handleSearchInfoFn(info) {
        return info;
      },
      actionColumn: {
        width: 60,
        title: "操作",
        dataIndex: "action",
        key: "action"
      }
    });

    function handleView(record: Recordable) {
      openModal(true, {
        record: {
          ...record,
          month: getForm().getFieldsValue().month
        },
        isUpdate: false
      });
    }


    async function handleSuccess({ values }) {
    }


    return {
      registerTable,
      registerModal,
      handleView,
      handleSuccess,
      searchInfo
    };
  }
});
</script>
