<template>
  <PageWrapper :title="`${name}的工资单`" contentBackground @back="goBack">
    <div class="pt-4 m-4 desc-wrap">
      <BasicTable :canResize="false" :searchInfo="searchInfo" @register="registerTable">
      </BasicTable>
    </div>
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

import {
  salaryDetailcolumns as columns,
  salaryDetailSearchFormSchema as searchFormSchema
} from "../salary/account.data";
import { message } from "ant-design-vue";
import { uploadApi } from "/@/api/sys/upload";

export default defineComponent({
  name: "SalaryDetail",
  components: { BasicTable, PageWrapper, BasicUpload, TableAction },
  setup() {
    const route = useRoute();
    const { setTitle } = useTabs();
    const go = useGo();
    const id = ref(route.params?.id);
    const name = ref(route.params?.name);
    const status = ref(route.params?.status);
    const searchInfo = reactive<Recordable>({});
    const [registerTable, { reload, updateTableDataRecord, getRowSelection }] = useTable({
      title: "员工列表",
      api: salaryDetailPage,
      rowKey: "id",
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
      searchInfo: { salaryId: id.value }
    });

    setTitle(`工资单:${name.value}`);

    // 页面左侧点击返回链接时的操作
    function goBack() {
      // 本例的效果时点击返回始终跳转到账号列表页，实际应用时可返回上一页
      go("/business/salaryTotal");
    }

    return {
      uploadApi,
      registerTable,
      searchInfo,
      goBack,
      name,
      status
    };
  }
});
</script>
