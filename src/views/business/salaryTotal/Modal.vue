<template>
  <BasicModal defaultFullscreen v-bind="$attrs" @ok="handleSubmit" title="查看"
              @register="registerModal">
    <!--    <PageWrapper contentClass="flex" contentFullHeight dense fixedHeight>-->
    <BasicTable :searchInfo="searchInfo" @register="registerTable">
      <template #bodyCell="{ column,record }">
        <template v-if="column.key === 'action'">

          <TableAction
            :actions="[
            {
              icon: 'clarity:info-standard-line',
              tooltip: '查看员工工资',
              onClick: handleView.bind(null, record),
            },
            {
              icon: 'ant-design:export-outlined',
              tooltip: '导出明细',
              onClick: handleExport.bind(null, { ...record, detail: true }),
            },
            {
              icon: 'ant-design:export-outlined',
              tooltip: '导出招商表格',
              onClick: handleExport.bind(null, { ...record, detail: false }),
            },
          ]"
          />
        </template>
      </template>
    </BasicTable>
    <!--    </PageWrapper>-->
  </BasicModal>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { BasicModal, useModalInner } from "/@/components/Modal";
import { BasicTable, useTable, TableAction } from "/@/components/Table";
import {
  salaryTotalDetail
} from "/@/api/business";
import { PageWrapper } from "/@/components/Page";

import { columns, searchFormSchema } from "../salary/account.data";
import { useGo } from "/@/hooks/web/usePage";
import { uploadApi } from "/@/api/sys/upload";
import { postExcelFile } from "/@/utils/file/download";

export default defineComponent({
  name: "Salary",
  components: {
    BasicTable,
    // PageWrapper,
    TableAction,
    BasicModal
  },
  setup(_, { emit }) {
    const go = useGo();
    const searchInfo = reactive<Recordable>({});
    const [registerTable, { reload }] = useTable({
      title: "工资单统计",
      api: salaryTotalDetail,
      rowKey: "id",
      clickToRowSelect: false,
      columns,
      formConfig: {
        labelWidth: 120,
        schemas: searchFormSchema,
        autoSubmitOnEnter: true
      },
      showIndexColumn: false,
      // useSearchForm: true,
      showTableSetting: true,
      bordered: true,
      handleSearchInfoFn(info) {
        return info;
      },

      actionColumn: {
        width: 140,
        title: "操作",
        dataIndex: "action",
        key: "action"
      }
    });

    const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
      setModalProps({ confirmLoading: false });
      searchInfo.enterpriseName = data.record.enterpriseName;
      searchInfo.month = data.record.month;
      searchInfo.payDate = new Date(data.record.payDate);
      // id.value = !!data?.isUpdate;
    });

    // 导出
    async function handleExport(record: Recordable) {
      await postExcelFile(
        {
          detail: record.detail,
          salaryId: record.id
        },
        `api/salary/export`
      );
    }

    function handleView(record: Recordable) {
      go(`/business/salaryTotalDetail/${record.id}/${record.createUserName}/${record.salaryStatus}`);
    }


    async function handleSubmit() {
      try {
        setModalProps({ confirmLoading: true });
        // TODO custom api
        /*  emit("success", {
            isUpdate: unref(isUpdate),
            values: { ...values, fileNo: values.fileNo[values.fileNo.length - 1] }
          });*/
        closeModal();
      } finally {
        setModalProps({ confirmLoading: false });
      }
    }

    return {
      uploadApi,
      registerTable,
      registerModal,
      handleExport,
      handleSubmit,
      handleView,
      searchInfo
    };
  }
});
</script>
