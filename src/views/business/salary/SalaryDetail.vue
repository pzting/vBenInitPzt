<template>
  <PageWrapper :title="`${name}的工资单`" contentBackground @back="goBack">
    <div class="pt-4 m-4 desc-wrap">
      <BasicTable :canResize="false" :searchInfo="searchInfo" @register="registerTable">
        <template v-if="status==='UNPAID'" #toolbar>
          <a-button type="primary" @click="handleCreate">新增</a-button>
        </template>
        <template #bodyCell="{ column,record }">
          <template v-if="column.key === 'action'">
            <TableAction
              :actions="[
              {
                icon: 'clarity:note-edit-line',
                tooltip: '编辑员工资料',
                ifShow:status==='UNPAID',
                onClick: handleEdit.bind(null, record),
              },
            ]"
            />
          </template>
        </template>
      </BasicTable>
    </div>
    <SalaryDetailModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { BasicUpload } from "/@/components/Upload";
import { useGo } from "/@/hooks/web/usePage";
import { useRoute } from "vue-router";
import { BasicTable, useTable, TableAction } from "/@/components/Table";
import { salaryDetailPage, salaryDetailSave } from "/@/api/business";
import { PageWrapper } from "/@/components/Page";
import { useTabs } from "/@/hooks/web/useTabs";
import { useModal } from "/@/components/Modal";
import SalaryDetailModal from "./SalaryDetailModal.vue";

import {
  salaryDetailcolumns as columns,
  salaryDetailSearchFormSchema as searchFormSchema
} from "./account.data";
import { message } from "ant-design-vue";
import { uploadApi } from "/@/api/sys/upload";

export default defineComponent({
  name: "SalaryDetail",
  components: { BasicTable, PageWrapper, BasicUpload, SalaryDetailModal, TableAction },
  setup() {
    const route = useRoute();
    const { setTitle } = useTabs();
    const go = useGo();
    const id = ref(route.params?.id);
    const name = ref(route.params?.name);
    const status = ref(route.params?.status);
    const idCardList = ref();
    const [registerModal, { openModal }] = useModal();
    const searchInfo = reactive<Recordable>({});
    const [registerTable, { reload, updateTableDataRecord, getRowSelection }] = useTable({
      title: "员工列表",
      api: salaryDetailPage,
      rowKey: "idCard",
      // rowSelection: {type: 'checkbox'},
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
      searchInfo: { salaryId: id.value },
      handleSearchInfoFn(info) {
        console.log("handleSearchInfoFn", info);
        return info;
      },
      actionColumn: {
        width: 120,
        title: "操作",
        dataIndex: "action",
        ifShow: status.value === "UNPAID",
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
        message.info("请先选择员工");
        // return
      }
      console.log(idCardList.value, "data");
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

    function handleDelete(record: Recordable) {
      console.log(record);
    }

    async function handleSuccess({ values }) {
      await salaryDetailSave({ ...values, salaryId: id.value });
      reload();
      /* if (isUpdate) {
       // 演示不刷新表格直接更新内部数据。
       // 注意：updateTableDataRecord要求表格的rowKey属性为string并且存在于每一行的record的keys中
       const result = updateTableDataRecord(values.id, values);
       console.log(result);
     } else {
       reload();
     }*/
    }

    function handleSelect(deptId = "") {
      searchInfo.deptId = deptId;
      reload();
    }

    setTitle(`工资单:${name.value}`);

    // 页面左侧点击返回链接时的操作
    function goBack() {
      // 本例的效果时点击返回始终跳转到账号列表页，实际应用时可返回上一页
      go("/business/salary");
    }

    return {
      uploadApi,
      registerTable,
      registerModal,
      handleCreate,
      handleMove,
      handleEdit,
      handleDelete,
      handleSuccess,
      handleSelect,
      searchInfo,
      goBack,
      name,
      status
    };
  }
});
</script>
