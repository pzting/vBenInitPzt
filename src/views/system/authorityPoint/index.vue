<template>
  <PageWrapper contentClass="flex" contentFullHeight>
    <!--    <div class="pt-4 m-4 desc-wrap">-->
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
              onClick: handleEdit.bind(null, { pid: record.authPointId || '-1' }, '新增'),
            },
            {
              icon: 'clarity:note-edit-line',
              tooltip: '编辑权限',
              onClick: handleEdit.bind(null, { ...record, pid: record.pid || '-1' }, '修改'),
            },
          ]"
          />
        </template>
      </template>
    </BasicTable>
    <Drawer @register="registerDrawer" @success="handleSuccess" />
    <!--    </div>-->
  </PageWrapper>
</template>
<script lang="ts">
import { defineComponent, nextTick } from "vue";
import { PageWrapper } from "/@/components/Page";
import { BasicTable, useTable, TableAction } from "/@/components/Table";
import { authorityPointTree, authorityPointSave } from "/@/api/system";

import { useDrawer } from "/@/components/Drawer";
import Drawer from "./Drawer.vue";

import { columns, searchFormSchema } from "./index.data";

export default defineComponent({
  name: "AuthorityPoint",
  components: { BasicTable, PageWrapper, Drawer, TableAction },
  setup() {
    const [registerDrawer, { openDrawer }] = useDrawer();
    const [registerTable, { reload, expandAll }] = useTable({
      title: "权限点列表",
      api: authorityPointTree,
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
        record: { pid: "-1" },
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
      await authorityPointSave(res);
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
