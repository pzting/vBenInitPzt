<template>
  <PageWrapper contentClass="flex" contentFullHeight dense>
    <BasicTable :searchInfo="searchInfo"
                @expand="handleExpand"
                @fetch-success="onFetchSuccess"
                @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleUpload">上传</a-button>
        <!--v-auth="[RoleEnum.TEST, RoleEnum.SUPER]"-->
        <a-button @click="handleDownloadByUrl">模板下载</a-button>
      </template>
      <template #bodyCell="{ column,record }">
        <template v-if="column.key === 'billFileNo'">
          <get-img v-if="record.billFileNo" :file-no="record.billFileNo" />
          <div v-else>-</div>
        </template>
        <template v-if="column.key === 'action'">
          <TableAction
            stopButtonPropagation
            v-if="record.id"
            :actions="[
             {
              icon: 'ant-design:audit-outlined',
              ifShow:(_)=>record.payStatus==='UNPAID'&&record.incomeStatus==='RECEIVED',
              tooltip: '打款',
                popConfirm: {
                title: '是否确认打款',
                confirm:   handleStatusChange.bind(null, { ...record, status: 'PAID' }),
              },
            },
            {
              icon: 'ant-design:file-done-outlined',
              tooltip: '收款',
              ifShow:(_)=>record.incomeStatus==='UNRECEIVED',
              onClick: handleUpFile.bind(null, record),
            },
            {
              icon: 'clarity:info-standard-line',
              tooltip: '查看社保详情',
              onClick: handleView.bind(null, record),
            },
            /*{
              icon: 'ant-design:upload-outlined',
              tooltip: '上传票据',
              onClick: handleUpFile.bind(null, record),
            },*/
            {
              icon: 'ant-design:vertical-align-bottom-outlined',
              tooltip: '下载导入的文件',
              onClick: handleDownFile.bind(null, record),
            },
            {
              icon: 'ant-design:export-outlined',
              tooltip: '导出员工社保',
              onClick: handleExport.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              tooltip: '删除',
              popConfirm: {
                title: '是否确认删除',
                placement:'topRight',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
          />
        </template>
      </template>
    </BasicTable>
    <AccountModal @register="registerModal" @success="handleSuccess" />
    <UploadModal @register="registerUploadModal" @success="handleUploadSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
import { defineComponent, reactive, nextTick, ref } from "vue";
import { BasicUpload } from "/@/components/Upload";
import { BasicTable, useTable, TableAction } from "/@/components/Table";
import {
  getPageList,
  insuranceStatusChange,
  insuranceImport,
  insuranceList,
  insuranceUpBill, insuranceDelete, insurancePaid, insuranceReceived
} from "/@/api/business";
import { fileGetUrl } from "/@/api/sys/upload";
import { PageWrapper } from "/@/components/Page";

import { useModal } from "/@/components/Modal";
import AccountModal from "./Modal.vue";

import { columns, searchFormSchema } from "./account.data";
import { useGo } from "/@/hooks/web/usePage";
import { uploadApi } from "/@/api/sys/upload";
import { downloadByUrl, postExcelFile } from "/@/utils/file/download";
import UploadModal from "./UploadModal.vue";
import GetImg from "/@/components/GetImg/index.vue";

export default defineComponent({
  name: "Insurance",
  components: {
    BasicTable,
    GetImg,
    UploadModal,
    PageWrapper,
    BasicUpload,
    AccountModal,
    TableAction
  },
  setup() {
    const go = useGo();
    const [registerModal, { openModal }] = useModal();
    const [registerUploadModal, { openModal: openUploadModal }] = useModal();
    const searchInfo = reactive<Recordable>({});
    const rowData = ref();
    const [registerTable, {
      reload,
      getForm,
      collapseAll,
      expandAll,
      updateTableDataRecord
    }] = useTable({
      title: "员工社保",
      api: getPageList,
      // rowKey: "id",
      rowKey: (record) => {
        return `${record.enterpriseName}${record.insuranceDate}${record.insuranceFileNo}`;
      },
      // clickToRowSelect: false,
      columns,
      formConfig: {
        labelWidth: 80,
        schemas: searchFormSchema,
        autoSubmitOnEnter: true
      },
      afterFetch: (res) => {
        const arr = res.map((item, ind) => {
          return {
            ...item,
            ind,
            children: []
          };
        });
        return arr;
      },
      ellipsis: true,
      showIndexColumn: false,
      useSearchForm: true,
      showTableSetting: true,
      isTreeTable: true,
      bordered: true,
      expandRowByClick: true,
      actionColumn: {
        width: 200,
        title: "操作",
        dataIndex: "action",
        key: "action"
      }
    });

    function handleCreate() {
      openModal(true, {
        isUpdate: false
      });
    }

    //展开
    function handleExpand(expanded, record) {
      if (expanded && !record.id) {
        insuranceList({
          ...getForm().getFieldsValue(),
          enterpriseName: record.enterpriseName,
          insuranceDate: new Date(record.insuranceDate).getTime()
          /*incomeStatus: searchInfo.incomeStatus,
          payStatus: searchInfo.payStatus*/
        }).then(res => {
          record.children = res.items;
        });
      }
      // searchInfo
      console.log(expanded, record, "expanded, record");
    }


    // 更改状态
    function handleStatusChange(record: Recordable) {
      //打款
      if (record.status === "PAID") {
        insurancePaid({ insuranceId: record.id }).then(() => {
          updateTableDataRecord(`${record.enterpriseName}${record.insuranceDate}${record.insuranceFileNo}`, {
            ...record,
            "payStatus": "PAID"
          });
        });
      } else {
        // handleUpFile(record);
        /* insuranceReceived({ insuranceId: record.id, fileNo: record.fileNo }).then(() => {
           updateTableDataRecord(`${record.enterpriseName}${record.insuranceDate}${record.insuranceFileNo}`, {
             ...record,
             "incomeStatus": "RECEIVED"
           });
         });*/
      }

    }


    // 导出
    async function handleExport(record: Recordable) {
      await postExcelFile(
        {
          insuranceId: record.id
        },
        `api/insurance/export`
      );
    }


    function handleSelect(deptId = "") {
      searchInfo.deptId = deptId;
      reload();
    }

    function handleView(record: Recordable) {
      reload();
      go(`/business/insuranceDetail/${record.id}/${record.enterpriseName}`);
    }

    // 收款
    function handleUpFile(record: Recordable) {
      rowData.value = record;
      openModal(true, {
        record,
        title: "收款",
        isUpdate: true
      });
    }

    // 收款完成
    async function handleSuccess({ values }) {
      // await insuranceUpBill(values);
      // reload();
      insuranceReceived({ insuranceId: values.insuranceId, fileNo: values.fileNo }).then(() => {
        updateTableDataRecord(`${rowData.value.enterpriseName}${rowData.value.insuranceDate}${rowData.value.insuranceFileNo}`, {
          ...rowData.value,
          incomeStatus: "RECEIVED",
          billFileNo: values.fileNo
        });
      });
    }

    // 上传
    function handleUpload() {
      openUploadModal(true, {
        title: "上传"
      });
    }

    //上传完成
    async function handleUploadSuccess({ values }) {
      await insuranceImport(values);
      reload();
    }

    function handleDownloadByUrl() {
      downloadByUrl({
        url: "/resource/file/insurance.xlsx",
        target: "_self"
      });
    }

    // 下载
    async function handleDownFile(record: Recordable) {
      const { url } = await fileGetUrl({
        fileNo: record.insuranceFileNo
      });
      downloadByUrl({
        url
      });
    }

    //删除
    function handleDelete(record: Recordable) {
      insuranceDelete({
        id: record.id
      }).then(() => {
        reload();
      });
    }

    function handleResizeColumn(w, col) {
      console.log(w, col, "w, col");
      col.width = w;
      // reload();
    }

    function onFetchSuccess() {
      // 演示默认展开所有表项
      nextTick(collapseAll);
      // nextTick(expandAll);
    }

    return {
      handleResizeColumn,
      onFetchSuccess,
      handleUploadSuccess,
      uploadApi,
      handleUpload,
      registerTable,
      registerModal,
      handleCreate,
      handleSuccess,
      handleDelete,
      handleSelect,
      handleExpand,
      handleView,
      searchInfo,
      registerUploadModal,
      handleUpFile,
      handleExport,
      handleDownFile,
      handleDownloadByUrl,
      handleStatusChange
    };
  }
});
</script>
