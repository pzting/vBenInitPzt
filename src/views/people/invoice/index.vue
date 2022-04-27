<template>
  <PageWrapper
    @back="goBack"
    :title="contractId?'返回':''"
    contentClass="flex" contentFullHeight dense>
    <BasicTable :searchInfo="searchInfo" @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增</a-button>
      </template>
      <template #bodyCell="{ column,record }">
        <template v-if="column.key === 'billFileNo'">
          <get-img v-if="record.billFileNo" :file-no="record.billFileNo" />
          <div v-else>-</div>
        </template>
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
            {
              icon: 'ant-design:upload-outlined',
              tooltip: '上传',
              ifShow:(_)=>record.invoiceStatus==='UNPAID',
              onClick: handleStatusChange.bind(null, { ...record, status: 'PAID' }),
            },
            {
              icon: 'ant-design:file-done-outlined',
              tooltip: '支付',
              ifShow:(_)=>record.invoiceStatus==='PAID',
              onClick: handleStatusChange.bind(null, { ...record, status: 'CONFIRMED' }),
            },
            {
              icon: 'clarity:note-edit-line',
              tooltip: '编辑',
              onClick: handleEdit.bind(null, record),
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
  </PageWrapper>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { BasicUpload } from "/@/components/Upload";
import { BasicTable, useTable, TableAction } from "/@/components/Table";
import { PageWrapper } from "/@/components/Page";

import { useModal } from "/@/components/Modal";
import Modal from "./Modal.vue";
import StatusChangeModal from "./StatusChangeModal.vue";
import { columns, searchFormSchema } from "./index.data";
import { uploadApi } from "/@/api/sys/upload";
import GetImg from "/@/components/GetImg/index.vue";
import {
  contractList,
  getDeptList,
  invoiceConfirm,
  invoiceDelete,
  invoicePage,
  invoicePaid,
  invoiceSave
} from "/@/api/people";
import { contractLevelSearchFormSchema } from "/@/components/ContractLevel/index.data";
import { useTabs } from "/@/hooks/web/useTabs";
import { useGo } from "/@/hooks/web/usePage";

export default defineComponent({
  name: "Salary",
  components: {
    BasicTable,
    StatusChangeModal,
    PageWrapper,
    BasicUpload,
    Modal,
    GetImg,
    TableAction
  },
  setup() {
    const route = useRoute();
    const { setTitle } = useTabs();
    const go = useGo();
    const contractId = ref(route.query?.contractId);
    const enterpriseName = ref(route.query?.enterpriseName);
    const [registerModal, { openModal }] = useModal();
    const [registerStatusChangeModal, { openModal: openStatusChangeModal }] = useModal();
    const searchInfo = reactive<Recordable>({});
    // searchInfo.contractId = contractId.value;
    // searchInfo.enterpriseName = enterpriseName.value;
    const [registerTable, { reload, getForm }] = useTable({
      title: "劳务单",
      api: invoicePage,
      rowKey: "id",
      clickToRowSelect: false,
      columns,
      formConfig: {
        labelWidth: 120,
        schemas: [...contractLevelSearchFormSchema, ...searchFormSchema],
        autoSubmitOnEnter: true
      },
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
        console.log(res, "beforeFetch-res");
        console.log(enterpriseName.value, "enterpriseName.value");
        return {
          ...res,
          enterpriseName: res.enterpriseName || enterpriseName.value,
          contractId: res.contractId || Number(contractId.value)
        };
      },
      showIndexColumn: false,
      useSearchForm: true,
      showTableSetting: true,
      bordered: true,
      actionColumn: {
        width: 200,
        title: "操作",
        dataIndex: "action",
        key: "action"
      }
    });

    // 新建
    function handleCreate() {
      openModal(true, {
        isUpdate: false
      });
    }

    //编辑
    function handleEdit(record: Recordable) {
      openModal(true, {
        record,
        isUpdate: true
      });
    }

    async function handleSuccess({ values }) {
      await invoiceSave(values);
      reload();
    }


    // 修改状态
    function handleStatusChange(record: Recordable) {
      openStatusChangeModal(true, {
        record,
        isUpdate: true
      });
    }

    async function handleStatusChangeSuccess({ values, status }) {
      // await salaryStatusChange(values);
      if (status == "PAID") {
        await invoicePaid(values);
      } else {
        await invoiceConfirm(values);
      }
      reload();
    }

    //删除
    function handleDelete(record: Recordable) {
      invoiceDelete({
        id: record.id
      }).then(() => {
        reload();
      });
    }

    if (contractId.value) {
      setTitle(`劳务单统计详情`);
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
      registerStatusChangeModal,
      handleDelete,
      // handleView,
      goBack,
      contractId,
      handleCreate,
      handleEdit,
      handleSuccess,
      searchInfo,
      handleStatusChange,
      handleStatusChangeSuccess
    };
  }
});
</script>
