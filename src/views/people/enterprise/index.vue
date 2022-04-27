<template>
  <PageWrapper contentClass="flex" contentFullHeight>
    <BasicTable @fetch-success="onFetchSuccess" @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增</a-button>
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
              icon: 'ant-design:delete-outlined',
              color: 'error',
              tooltip: '删除',
              popConfirm: {
                placement: 'topRight',
                title: '是否确认删除',
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
import { PageWrapper } from "/@/components/Page";
import { defineComponent, nextTick } from "vue";
import { BasicTable, useTable, TableAction } from "/@/components/Table";
import { getDeptList, setEnterpriseDelete, setEnterpriseSave } from "/@/api/people";

import { useModal } from "/@/components/Modal";
import Modal from "./Modal.vue";

import { columns, searchFormSchema } from "./index.data";
import { message } from "ant-design-vue";

export default defineComponent({
  name: "Enterprise",
  components: { BasicTable, PageWrapper, Modal, TableAction },
  setup() {
    const [registerModal, { openModal }] = useModal();
    const [registerTable, { reload, expandAll }] = useTable({
      title: "企业列表",
      api: getDeptList,
      columns,
      formConfig: {
        labelWidth: 120,
        schemas: searchFormSchema
      },
      rowKey: "id",
      isTreeTable: true,
      pagination: false,
      striped: false,
      // useSearchForm: true,
      showTableSetting: true,
      bordered: true,
      showIndexColumn: false,
      canResize: false,
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

    function handleDelete(record: Recordable) {
      if (record.children.length != 0) {
        message.warning("下级分类还有内容，不能删除");
        return;
      }
      setEnterpriseDelete({ id: record.id }).then(() => {
        reload();
      });
    }

    async function handleSuccess(data) {
      await setEnterpriseSave(data);
      reload();
    }

    function onFetchSuccess() {
      console.log(9);
      // 演示默认展开所有表项
      nextTick(expandAll);
    }

    return {
      registerTable,
      registerModal,
      handleCreate,
      onFetchSuccess,
      handleEdit,
      handleDelete,
      handleSuccess
    };
  }
});
</script>
