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
                            tooltip:'编辑',
                            onClick: handleEdit.bind(null, record),
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
import { roleList, roleSave } from "/@/api/system";

import { useDrawer } from "/@/components/Drawer";
import Drawer from "./Drawer.vue";

import { columns, searchFormSchema } from "./index.data";

export default defineComponent({
  name: "Role",
  components: {
    BasicTable,
    Drawer,
    TableAction
  },
  setup() {
    const [registerDrawer, { openDrawer }] = useDrawer();
    const [registerTable, { reload }] = useTable({
      title: "角色列表",
      api: roleList,
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
        // slots: { customRender: "action" },
        // fixed: undefined
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

    async function handleSuccess(data) {
      await roleSave(data);
      reload();
    }

    return {
      registerTable,
      registerDrawer,
      handleCreate,
      handleEdit,
      handleSuccess
    };
  }
});
</script>
