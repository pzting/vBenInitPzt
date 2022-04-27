<template>
  <PageWrapper contentClass="flex" contentFullHeight dense>
    <DeptTree class="w-1/4 xl:w-1/5" @select="handleSelect" />
    <BasicTable :searchInfo="searchInfo" class="w-3/4 xl:w-4/5" @register="registerTable">
      <template #toolbar>
        <!--        :accept="['image/*']"-->
        <a-button type="primary" @click="handleCreate">新增员工</a-button>
        <a-button type="primary" @click="handleMove">移动员工</a-button>
        <BasicUpload
          :api="uploadApi"
          :maxSize="20"
          class="my-5"
          @change="handleChange"
        />
        <a-button @click="handleDownloadByUrl">模板下载</a-button>
        <a-button type="primary" @click="handleExport">导出</a-button>
      </template>
      <template #bodyCell="{ column,record }">
        <template v-if="column.key === 'action'">

          <TableAction
            :actions="[
            {
              icon: 'clarity:info-standard-line',
              tooltip: '查看工资历史',
              onClick: handleView.bind(null, record),
            },
            {
              icon: 'clarity:note-edit-line',
              tooltip: '编辑员工资料',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:money-collect-outlined',
              tooltip: '设置正常员工工资',
              // ifShow:()=>record.employeeStatus!=='NORMAL',
              ifShow: (_action) => {
                return record.employeeStatus!=='NORMAL'; // 根据业务控制是否显示: 非enable状态的不显示启用按钮
              },
              popConfirm: {
                title: '是否设置正常员工工资',
                confirm: handleSet.bind(null, record),
              },
            },
          ]"
          />
        </template>
      </template>
    </BasicTable>
    <AccountModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { BasicUpload } from "/@/components/Upload";
import { BasicTable, useTable, TableAction } from "/@/components/Table";
import { getAccountList, employeeImport, employeeNormal } from "/@/api/people";
import { PageWrapper } from "/@/components/Page";
import DeptTree from "./Tree.vue";

import { useModal } from "/@/components/Modal";
import AccountModal from "./Modal.vue";

import { columns, searchFormSchema } from "./index.data";
import { useGo } from "/@/hooks/web/usePage";
import { message } from "ant-design-vue";
import { uploadApi } from "/@/api/sys/upload";
import { downloadByUrl, postExcelFile } from "/@/utils/file/download";

export default defineComponent({
  name: "Employee",
  components: {
    BasicTable,
    PageWrapper,
    BasicUpload,
    DeptTree,
    AccountModal,
    TableAction
  },
  setup() {
    const go = useGo();
    const idCardList = ref();
    const [registerModal, { openModal }] = useModal();
    const searchInfo = reactive<Recordable>({});
    const [registerTable, { reload, getForm, updateTableDataRecord, getRowSelection }] = useTable({
      title: "员工列表",
      api: getAccountList,
      rowKey: "idCard",
      rowSelection: { type: "checkbox" },
      clickToRowSelect: false,
      columns,
      formConfig: {
        labelWidth: 100,
        schemas: searchFormSchema,
        autoSubmitOnEnter: true
      },
      showIndexColumn: false,
      useSearchForm: true,
      showTableSetting: true,
      bordered: true,
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

    function handleMove() {
      idCardList.value = getRowSelection().selectedRowKeys;
      if (idCardList.value.length == 0) {
        message.warn("请先选择员工");
        return;
      }
      openModal(true, {
        // isUpdate: false,
        idCardList: idCardList.value,
        title: "移动员工"
      });
    }

    function handleEdit(record: Recordable) {
      console.log(record);
      openModal(true, {
        record,
        isUpdate: true
      });
    }

    function handleSuccess() {
      reload();
      /*  if (isUpdate) {
          // 演示不刷新表格直接更新内部数据。
          // 注意：updateTableDataRecord要求表格的rowKey属性为string并且存在于每一行的record的keys中
          // const result = updateTableDataRecord(values.id, values);
          reload();
        } else {
          reload();
        }*/
    }

    function handleSelect(deptId = "") {
      searchInfo.path = deptId;
      reload();
    }

    function handleView(record: Recordable) {
      go(`/people/employeeDetail/${record.idCard}/${record.employeeName}`);
    }

    function handleChange(list: string[]) {
      list.forEach(async (fileNo) => {
        await employeeImport({ fileNo });
      });
      reload();
    }

    function handleSet(record: Recordable) {
      employeeNormal({
        idCard: record.idCard
      }).then(() => {
        reload();
      });
    }

    function handleDownloadByUrl() {
      downloadByUrl({
        url: "/resource/file/employee.xlsx",
        target: "_self"
      });
    }

    //导出
    // 导出
    async function handleExport() {
      await reload();
      const form = await getForm().getFieldsValue();
      await postExcelFile(
        {
          ...searchInfo,
          ...form
        },
        `api/employee/export`
      );
    }

    return {
      handleExport,
      handleChange,
      uploadApi,
      registerTable,
      registerModal,
      handleSet,
      handleCreate,
      handleMove,
      handleEdit,
      handleSuccess,
      handleSelect,
      handleView,
      searchInfo,
      handleDownloadByUrl
    };
  }
});
</script>
