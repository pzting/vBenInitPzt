<template>
  <PageWrapper
    @back="goBack"
    :title="contractId?'返回':''"
    contentClass="flex" contentFullHeight dense fixedHeight>
    <BasicTable :searchInfo="searchInfo"
                @expand="handleExpand"
                @fetch-success="onFetchSuccess"
                @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增</a-button>
        <a-button @click="handleDownloadByUrl('new')">新增模板下载</a-button>
        <a-button type="primary" @click="handleUpload">历史</a-button>
        <a-button @click="handleDownloadByUrl('old')">历史模板下载</a-button>
      </template>
      <template #bodyCell="{ column,record }">
        <template v-if="column.key === 'billFileNo'">
          <get-img v-if="record.billFileNo" :file-no="record.billFileNo" />
          <div v-else>-</div>
        </template>
        <template v-if="column.key === 'action'">
          <TableAction
            v-if="record.id"
            stopButtonPropagation
            :actions="[
            /*  {
              icon: 'clarity:info-standard-line',
              tooltip: '查看',
              onClick: handleView.bind(null, record),
            },*/
           /* {
              icon: 'clarity:note-edit-line',
              tooltip: '编辑员工资料',
              onClick: handleEdit.bind(null, record),
            },*/
            {
              icon: 'ant-design:upload-outlined',
              tooltip: '上传',
              ifShow:(_)=>record.salaryStatus==='UNPAID',
              onClick: handleStatusChange.bind(null, { ...record, status: 'PAID' }),
            },
            {
              icon: 'ant-design:file-done-outlined',
              tooltip: '支付',
              ifShow:(_)=>record.salaryStatus==='PAID',
              onClick: handleStatusChange.bind(null, { ...record, status: 'CONFIRMED' }),
            },
            {
              icon: 'clarity:info-standard-line',
              tooltip: '查看员工工资',
              onClick: handleEdit.bind(null, record),
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
    <Modal @register="registerModal" @success="handleSuccess" />
    <StatusChangeModal @register="registerStatusChangeModal" @success="handleStatusChangeSuccess" />
    <UploadModal @register="registerUploadModal" @success="handleUploadSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
import { defineComponent, reactive, nextTick, ref } from "vue";
import { useRoute } from "vue-router";
import { BasicUpload } from "/@/components/Upload";
import { BasicTable, useTable, TableAction } from "/@/components/Table";
import {
  salaryPage,
  salaryHistoryImport,
  salaryAdd,
  salaryStatusChange,
  salaryConfirm,
  salaryDelete,
  salaryPaid, insuranceList, salaryList
} from "/@/api/business";
import { PageWrapper } from "/@/components/Page";
import DeptTree from "./Tree.vue";

import { useModal } from "/@/components/Modal";
import Modal from "./Modal.vue";
import StatusChangeModal from "./StatusChangeModal.vue";
import UploadModal from "./UploadModal.vue";
import { columns, searchFormSchema } from "./account.data";
import { useGo } from "/@/hooks/web/usePage";
import { uploadApi } from "/@/api/sys/upload";
import { downloadByUrl, postExcelFile } from "/@/utils/file/download";
import GetImg from "/@/components/GetImg/index.vue";
import { contractLevelSearchFormSchema } from "/@/components/ContractLevel/index.data";
import { contractList, getDeptList } from "/@/api/people";
import { useTabs } from "/@/hooks/web/useTabs";

export default defineComponent({
  name: "Salary",
  components: {
    BasicTable,
    StatusChangeModal,
    PageWrapper,
    BasicUpload,
    DeptTree,
    Modal,
    UploadModal,
    GetImg,
    TableAction
  },
  setup() {
    const go = useGo();
    const { setTitle } = useTabs();
    const route = useRoute();
    const contractId = ref(route.query?.contractId);
    const enterpriseName = ref(route.query?.enterpriseName);
    const [registerModal, { openModal }] = useModal();
    const [registerStatusChangeModal, { openModal: openStatusChangeModal }] = useModal();
    const rowData = ref({});
    const searchInfo = reactive<Recordable>({});
    // searchInfo.contractId = contractId.value;
    // searchInfo.enterpriseName = enterpriseName.value;
    const [registerUploadModal, { openModal: openUploadModal }] = useModal();
    const [registerTable, { reload, getForm, collapseAll, updateTableDataRecord }] = useTable({
      title: "工资单",
      api: salaryPage,
      beforeFetch: (res) => {
        if (!res.enterpriseName && contractId.value) {
          getDeptList({}).then(res => {
            const enterpriseIds = res.items.filter(item => item.enterpriseName == enterpriseName.value);
            return enterpriseIds[0]?.id;
          }).then(id => {
            if (id) {
              contractList({ enterpriseId: id }).then(res => {
                getForm().updateSchema({
                  field: "contractId",
                  componentProps: {
                    options: res.items
                  }
                });
                getForm().setFieldsValue({
                  enterpriseName: enterpriseName.value,
                  contractId: Number(contractId.value)
                });
              });
            }
          });
        }
        console.log(getForm(), "beforeFetch-res");
        console.log(res, "beforeFetch-res");
        return {
          ...res,
          enterpriseName: res.enterpriseName || enterpriseName.value,
          contractId: res.contractId || Number(contractId.value)
        };
      },
      rowKey: (record) => {
        return `${record.enterpriseName}${record.payDate}`;
      },
      afterFetch: (res) => {
        return res.map((item, ind) => {
          return {
            ...item,
            ind,
            children: []
          };
        });
      },
      // rowKey: "id",
      clickToRowSelect: false,
      columns,
      formConfig: {
        labelWidth: 120,
        schemas: [...contractLevelSearchFormSchema, ...searchFormSchema],
        autoSubmitOnEnter: true
      },
      showIndexColumn: false,
      useSearchForm: true,
      showTableSetting: true,
      isTreeTable: true,
      expandRowByClick: true,
      bordered: true,
      handleSearchInfoFn(info) {
        return info;
      },
      actionColumn: {
        width: 220,
        title: "操作",
        dataIndex: "action",
        key: "action"
      }
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

    function handleEdit(record: Recordable) {
      go(`/business/salaryDetail/${record.id}/${record.createUserName}/${record.salaryStatus}`);
    }

    // 预览
    function handleView(record: Recordable) {
      go(`/business/salaryDetail/${record.id}/${record.createUserName}/${record.salaryStatus}`);
    }

    // 上传
    function handleUpload() {
      openUploadModal(true, {
        isUpdate: false,
        title: "历史"
      });
    }

    async function handleUploadSuccess({ values }) {
      await salaryHistoryImport(values);
      reload();
    }

    // 新建
    function handleCreate() {
      openModal(true, {
        isUpdate: false
      });
    }

    async function handleSuccess({ values }) {
      const record = await salaryAdd(values);
      reload();
      go(`/business/salaryDetail/${record.obj.salaryId}/${record.obj.createUsername}/UNPAID`);
    }

    // 修改状态
    function handleStatusChange(record: Recordable) {
      rowData.value = record;
      openStatusChangeModal(true, {
        record,
        isUpdate: true
      });
    }

    async function handleStatusChangeSuccess({ values, status }) {
      if (status == "PAID") {
        await salaryPaid(values);
        updateTableDataRecord(`${values.enterpriseName}${values.payDate}`, {
          ...rowData.value,
          billFileNo: values.billFileNo,
          "salaryStatus": "PAID"
        });
      } else {
        await salaryConfirm(values);
        updateTableDataRecord(`${values.enterpriseName}${values.payDate}`, {
          ...rowData.value,
          payDate: values.payDate,
          "salaryStatus": "CONFIRMED"
        });
      }
      // reload();
    }

    // 下载模板
    function handleDownloadByUrl(type) {
      let url = "/resource/file/history.xlsx";
      if (type == "new") {
        url = "/resource/file/salary.xlsx";
      }
      downloadByUrl({
        url,
        target: "_self"
      });
    }

    //删除
    function handleDelete(record: Recordable) {
      salaryDelete({
        id: record.id
      }).then(() => {
        reload();
      });
    }


    //展开
    function handleExpand(expanded, record) {
      if (expanded && !record.id) {
        salaryList({
          ...getForm().getFieldsValue(),
          contractId: contractId.value,
          // month: getForm().getFieldsValue().month == "true",
          enterpriseName: record.enterpriseName,
          payDate: record.payDate ? new Date(record.payDate).getTime() : null
          /*incomeStatus: searchInfo.incomeStatus,
          payStatus: searchInfo.payStatus*/
        }).then(res => {
          record.children = res.items;
        });
      }
      // searchInfo
      console.log(expanded, record, "expanded, record");
    }

    function onFetchSuccess() {
      // 演示默认展开所有表项
      nextTick(collapseAll);
      // nextTick(expandAll);
    }

    if (contractId.value) {
      setTitle(`工资单统计详情`);
    }

    // 页面左侧点击返回链接时的操作
    function goBack() {
      // 本例的效果时点击返回始终跳转到账号列表页，实际应用时可返回上一页
      go("/business/standBook");
    }

    return {
      uploadApi,
      registerTable,
      registerModal,
      registerUploadModal,
      registerStatusChangeModal,
      handleCreate,
      onFetchSuccess,
      goBack,
      handleDelete,
      handleStatusChange,
      handleExport,
      handleEdit,
      handleSuccess,
      handleView,
      handleStatusChangeSuccess,
      searchInfo,
      contractId,
      handleExpand,
      handleUpload,
      handleUploadSuccess,
      handleDownloadByUrl
    };
  }
});
</script>
