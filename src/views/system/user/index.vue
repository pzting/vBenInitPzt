<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> {{ title("basic.add") }}</a-button>
      </template>
      <template #bodyCell="{ column,record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
            {
              icon: 'clarity:note-edit-line',
              tooltip: title('basic.edit'),
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:tool-outlined',
              color: 'error',
              tooltip: title('system.user.resetPassword'),
              popConfirm: {
                title: title('system.user.resetPasswordTip'),
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
import { title } from "/@/hooks/web/useI18n";
import { columns, searchFormSchema } from "./index.data";

export default defineComponent({
  name: "User",
  components: { BasicTable, Drawer, TableAction },
  setup() {
    const [registerDrawer, { openDrawer }] = useDrawer();
    const [registerTable, { reload }] = useTable({
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
        title: title("basic.action"),
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

    function handleDelete(record: Recordable) {
      userResetPwd({ userId: record.id }).then(() => {
        reload();
      });
    }

    async function handleSuccess(data) {
      await userSave(data);
      reload();
    }

    return {
      registerTable,
      registerDrawer,
      handleCreate,
      title,
      handleEdit,
      handleDelete,
      handleSuccess
    };
  }
});
</script>
