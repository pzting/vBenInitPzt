<template>
  <PageWrapper contentClass="flex" contentFullHeight dense fixedHeight>
    <BasicTable :searchInfo="searchInfo" @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">
          {{ t("basic.add") }}
        </a-button>
      </template>
      <template #bodyCell="{ column,record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
            {
              icon: 'clarity:note-edit-line',
              tooltip: t('basic.edit'),
              onClick: handleEdit.bind(null, record),
            },
            /*{
              icon: 'ant-design:delete-outlined',
              color: 'error',
              tooltip: '删除',
              popConfirm: {
                title: '是否确认删除',
                placement:'topRight',
                confirm: handleDelete.bind(null, record),
              },
            },*/
          ]"
          />
        </template>
      </template>
    </BasicTable>
    <SaveModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
import { BasicTable, TableAction, useTable } from "/@/components/Table";
import { PageWrapper } from "/@/components/Page";
// import { t } from "/@/hooks/web/useI18n";
import { useModal } from "/@/components/Modal";
import SaveModal from "./SaveModal.vue";
import { columns, searchFormSchema } from "./index.data";
import { contractDelete, userDealPageListUser, userDealAddScore } from "/@/api/currencyTraders";
import { useI18n } from "/@/hooks/web/useI18n";

export default defineComponent({
  name: "Contract",
  components: {
    BasicTable,
    PageWrapper,
    SaveModal,
    TableAction
  },
  setup() {
    const { t } = useI18n();
    const [registerModal, { openModal }] = useModal();
    const searchInfo = reactive<Recordable>({});
    const [registerTable, { reload }] = useTable({
      // title: "合同管理",
      api: userDealPageListUser,
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
        title: t("basic.action"),
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

    // 编辑
    function handleEdit(record: Recordable) {
      openModal(true, {
        isUpdate: true,
        record
      });
    }

    async function handleSuccess({ values }) {
      await userDealAddScore(values);
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
      t,
      searchInfo
    };
  }
});
</script>
