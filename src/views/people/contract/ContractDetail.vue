<template>
  <PageWrapper :title="`${name}的合同税率`" contentBackground @back="goBack">
    <div class="pt-4 m-4 desc-wrap">
      <BasicTable :canResize="false" :searchInfo="searchInfo" @register="registerTable">
        <template #toolbar>
          <a-button type="primary" @click="handleCreate">新增</a-button>
        </template>
        <template #bodyCell="{ column,record }">
          <template v-if="column.key === 'action'">
            <TableAction
              :actions="[
              {
                icon: 'clarity:note-edit-line',
                tooltip: '编辑合同税率',
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
    </div>
    <SalaryDetailModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { BasicUpload } from "/@/components/Upload";
import { useGo } from "/@/hooks/web/usePage";
import { useRoute } from "vue-router";
import { BasicTable, useTable, TableAction } from "/@/components/Table";
import { salaryDelete, salaryDetailPage, salaryDetailSave } from "/@/api/business";
import { PageWrapper } from "/@/components/Page";
import { useTabs } from "/@/hooks/web/useTabs";
import { useModal } from "/@/components/Modal";
import SalaryDetailModal from "./ContractDetailModal.vue";

import {
  contractDetailcolumns as columns,
  contractDetailSearchFormSchema as searchFormSchema
} from "./account.data";
import { message } from "ant-design-vue";
import { contractRateDelete, contractRateList, contractRateSave } from "/@/api/people";

export default defineComponent({
  name: "ContractDetail",
  components: { BasicTable, PageWrapper, BasicUpload, SalaryDetailModal, TableAction },
  setup() {
    const route = useRoute();
    const { setTitle } = useTabs();
    const go = useGo();
    const id = ref(route.params?.id);
    const name = ref(route.params?.name);
    const [registerModal, { openModal }] = useModal();
    const searchInfo = reactive<Recordable>({});
    const [registerTable, { reload, updateTableDataRecord, getRowSelection }] = useTable({
      title: "合同税率",
      api: contractRateList,
      rowKey: "id",
      // rowSelection: {type: 'checkbox'},
      clickToRowSelect: false,
      columns,
      formConfig: {
        labelWidth: 120,
        schemas: searchFormSchema,
        autoSubmitOnEnter: true
      },
      pagination: false,
      showIndexColumn: false,
      useSearchForm: false,
      showTableSetting: true,
      bordered: true,
      searchInfo: { contractId: id.value },
      actionColumn: {
        width: 80,
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


    function handleEdit(record: Recordable) {
      openModal(true, {
        record,
        isUpdate: true
      });
    }


    async function handleSuccess({ values }) {
      await contractRateSave({
        ...values,
        contractId: id.value
      });
      reload();
      /* if (isUpdate) {
       // 演示不刷新表格直接更新内部数据。
       // 注意：updateTableDataRecord要求表格的rowKey属性为string并且存在于每一行的record的keys中
       const result = updateTableDataRecord(values.id, values);
       console.log(result);
     } else {
       reload();
     }*/
    }

    //删除
    function handleDelete(record: Recordable) {
      contractRateDelete({
        id: record.id
      }).then(() => {
        reload();
      });
    }

    setTitle(`合同税率:${name.value}`);

    // 页面左侧点击返回链接时的操作
    function goBack() {
      // 本例的效果时点击返回始终跳转到账号列表页，实际应用时可返回上一页
      go("/business/contract");
    }

    return {
      registerTable,
      registerModal,
      handleCreate,
      handleEdit,
      handleDelete,
      handleSuccess,
      searchInfo,
      goBack,
      name
    };
  }
});
</script>
