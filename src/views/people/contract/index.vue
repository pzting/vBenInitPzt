<template>
  <PageWrapper contentClass="flex" contentFullHeight dense fixedHeight>
    <BasicTable :searchInfo="searchInfo" @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增</a-button>
      </template>
      <template #bodyCell="{ column,record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
            {
              icon: 'clarity:note-edit-line',
              tooltip: '编辑',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'clarity:info-standard-line',
              tooltip: '查看合同税率',
              onClick: handleView.bind(null, record),
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
  </PageWrapper>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
import { BasicTable, TableAction, useTable } from "/@/components/Table";
import { PageWrapper } from "/@/components/Page";

import { useModal } from "/@/components/Modal";
import Modal from "./Modal.vue";
import { columns, searchFormSchema } from "./account.data";
import { useGo } from "/@/hooks/web/usePage";
import { contractDelete, contractPage, contractSave } from "/@/api/people";

export default defineComponent({
  name: "Contract",
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
    const [registerTable, { reload }] = useTable({
      title: "合同管理",
      api: contractPage,
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
        width: 120,
        title: "操作",
        dataIndex: "action",
        key: "action"
      }
    });


    // 预览
    function handleView(record: Recordable) {
      go(`/business/contractDetail/${record.id}/${record.contractNo}`);
    }


    // 新建
    function handleCreate() {
      openModal(true, {
        isUpdate: false
      });
    }

    // 编辑
    function handleEdit(record: Recordable) {
      openModal(true, {
        isUpdate: true,
        record
      });
    }

    async function handleSuccess({ values }) {
      const record = await contractSave(values);
      reload();
    }


    //删除
    function handleDelete(record: Recordable) {
      contractDelete({
        id: record.id
      }).then(() => {
        reload();
      });
    }

    return {
      registerTable,
      registerModal,
      handleCreate,
      handleDelete,
      handleEdit,
      handleSuccess,
      handleView,
      searchInfo
    };
  }
});
</script>
