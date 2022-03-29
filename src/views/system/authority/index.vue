<template>
  <PageWrapper contentFullHeight contentClass="flex">
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增</a-button>
      </template>
      <template #bodyCell="{ column,record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
            {
              icon: 'ant-design:plus-outlined',
              tooltip: '添加子权限',
              onClick: handleEdit.bind(null, { parentAuthId: record.authId || '-1' }, '新增'),
            },
            {
              icon: 'clarity:note-edit-line',
              tooltip: '编辑权限',
              onClick: handleEdit.bind(
                null,
                { ...record, parentAuthId: record.parentAuthId || '-1' },
                '修改',
              ),
            },
          ]"
          />
        </template>
      </template>
    </BasicTable>
    <Drawer @register="registerDrawer" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
import { defineComponent, nextTick } from "vue";
import { PageWrapper } from "/@/components/Page";
import { BasicTable, useTable, TableAction } from "/@/components/Table";
import { authorityTree, authoritySave } from "/@/api/system";

import { useDrawer } from "/@/components/Drawer";
import Drawer from "./Drawer.vue";

import { columns, searchFormSchema } from "./index.data";

export default defineComponent({
  name: "Authority",
  components: { BasicTable, PageWrapper, Drawer, TableAction },
  setup() {
    const [registerDrawer, { openDrawer }] = useDrawer();
    const [registerTable, { reload, expandAll }] = useTable({
      title: "权限列表",
      api: authorityTree,
      columns,
      formConfig: {
        labelWidth: 120,
        schemas: searchFormSchema
      },
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
      openDrawer(true, {
        record: { parentAuthId: "-1" },
        isUpdate: true,
        title: "新增"
      });
    }

    function handleEdit(record: Recordable, title) {
      openDrawer(true, {
        record,
        isUpdate: true,
        title
      });
    }


    async function handleSuccess(res) {
      await authoritySave(res);
      reload();
    }

    function onFetchSuccess() {
      // 演示默认展开所有表项
      nextTick(expandAll);
    }

    return {
      registerTable,
      registerDrawer,
      handleCreate,
      handleEdit,
      handleSuccess,
      onFetchSuccess
    };
  }
});
</script>
