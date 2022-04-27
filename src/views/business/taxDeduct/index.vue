<template>
  <PageWrapper contentClass="flex" contentFullHeight dense fixedHeight>
    <BasicTable :searchInfo="searchInfo" @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增</a-button>
        <a-button type="primary" @click="handleUpload">上传</a-button>
        <a-button @click="handleDownloadByUrl">模板下载</a-button>
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
    <SaveModal @register="registerModal" @success="handleSuccess" />
    <UploadModal @register="registerUploadModal" @success="handleUploadSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { BasicUpload } from "/@/components/Upload";
import { BasicTable, useTable, TableAction } from "/@/components/Table";
import { taxDeductPage, taxDeductImport, taxDeductDelete, taxDeductSave } from "/@/api/business";
import { PageWrapper } from "/@/components/Page";

import { useModal } from "/@/components/Modal";
import SaveModal from "./SaveModal.vue";
import UploadModal from "./UploadModal.vue";

import { columns, searchFormSchema } from "./index.data";
import { uploadApi } from "/@/api/sys/upload";
import { downloadByUrl } from "/@/utils/file/download";

export default defineComponent({
  name: "TaxDeduct",
  components: { BasicTable, UploadModal, PageWrapper, BasicUpload, SaveModal, TableAction },
  setup() {
    const [registerModal, { openModal }] = useModal();
    const [registerUploadModal, { openModal: openUploadModal }] = useModal();
    const searchInfo = reactive<Recordable>({});
    const [registerTable, { reload }] = useTable({
      title: "专项附加扣除列表",
      api: taxDeductPage,
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
        console.log("handleSearchInfoFn", info);
        return info;
      },
      actionColumn: {
        width: 120,
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

    function handleUpload() {
      openUploadModal(true, {
        title: "上传"
      });
    }

    function handleEdit(record: Recordable) {
      openModal(true, {
        record,
        isUpdate: true
      });
    }

    function handleDelete(record: Recordable) {
      taxDeductDelete({ id: record.id }).then(() => {
        reload();
      });
    }

    async function handleSuccess({ values }) {
      await taxDeductSave(values);
      reload();
    }

    async function handleUploadSuccess({ values }) {
      await taxDeductImport(values);
      reload();
    }


    function handleDownloadByUrl() {
      downloadByUrl({
        url: "/resource/file/taxDudect.xlsx",
        target: "_self"
      });
    }

    return {
      handleUploadSuccess,
      uploadApi,
      registerTable,
      registerModal,
      handleCreate,
      handleUpload,
      handleEdit,
      handleDelete,
      handleSuccess,
      searchInfo,
      registerUploadModal,
      handleDownloadByUrl
    };
  }
});
</script>
