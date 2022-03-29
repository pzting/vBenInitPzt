<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增</a-button>
      </template>
      <template #bodyCell="{ column,record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
            {
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:tool-outlined',
              color: 'error',
              tooltip: '重置密码',
              popConfirm: {
                title: '是否重置密码为(abc123)？',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
          />
        </template>
      </template>
    </BasicTable>
    <Drawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

import { BasicTable, useTable, TableAction } from "/@/components/Table";
import { userPage, userSave, userResetPwd } from "/@/api/system";

import { useDrawer } from "/@/components/Drawer";
import Drawer from "./Drawer.vue";

import { columns, searchFormSchema } from "./index.data";

export default defineComponent({
  name: "User",
  components: { BasicTable, Drawer, TableAction },
  setup() {
    const [registerDrawer, { openDrawer }] = useDrawer();
    const [registerTable, { reload }] = useTable({
      title: "用户列表",
      api: userPage,
      columns,
      formConfig: {
        labelWidth: 120,
        schemas: searchFormSchema
      },
      useSearchForm: true,
      showTableSetting: true,
      bordered: true,
      showIndexColumn: false,
      actionColumn: {
        width: 80,
        title: "操作",
        dataIndex: "action",
        key: "action"
        // slots: {customRender: 'action'},
        // fixed: undefined,
      }
    });

    function handleCreate() {
      openDrawer(true, {
        isUpdate: false
      });
    }

    function handleEdit(record: Recordable) {
      openDrawer(true, {
        record,
        isUpdate: true
      });
    }

    async function handleDelete(record: Recordable) {
      await userResetPwd({ userId: record.id });
      reload();
    }

    async function handleSuccess(data) {
      await userSave(data);
      reload();
    }

    return {
      registerTable,
      registerDrawer,
      handleCreate,
      handleEdit,
      handleDelete,
      handleSuccess
    };
  }
});
</script>
