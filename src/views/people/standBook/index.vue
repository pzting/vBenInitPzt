<template>
  <PageWrapper contentClass="flex" contentFullHeight dense>
    <!--    :searchInfo="searchInfo"-->
    <BasicTable

      @fetch-success="onFetchSuccess"
      @expand="handleExpand"
      @register="registerTable">
      <template #bodyCell="{ column,record }">
        <template v-if="column.key === 'action'">
          <!--     v-if="record.id"     -->
          <TableAction
            stopButtonPropagation
            :actions="[
            {
              icon: 'clarity:info-standard-line',
              tooltip: '查看详情',
              ifShow:(_)=>{
                return record.fromType
              },
              onClick: handleView.bind(null, record),
            },
          ]"
          />
        </template>
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts">
import { defineComponent, reactive, nextTick, ref } from "vue";
import { BasicTable, useTable, TableAction } from "/@/components/Table";
import { PageWrapper } from "/@/components/Page";


import { columns, searchFormSchema } from "./index.data";
import { useGo } from "/@/hooks/web/usePage";
import { standBookDetailList, standBookPage } from "/@/api/people";
import { router } from "/@/router";
import { contractLevelSearchFormSchema } from "/@/components/ContractLevel/index.data";
// import { useRouter } from "vue-router";

export default defineComponent({
  name: "StandBook",
  components: {
    BasicTable,
    PageWrapper,
    TableAction
  },
  setup() {

    const searchInfo = reactive<Recordable>({});
    const [registerTable, {
      collapseAll,
      getForm
    }] = useTable({
      title: "台账管理",
      api: standBookPage,
      // rowKey: "id",
      rowKey: (record) => {
        return `${record.contractId}${record.enterpriseName}${record.fromType}`;
      },
      // clickToRowSelect: false,
      columns,
      formConfig: {
        labelWidth: 80,
        schemas: [...contractLevelSearchFormSchema, ...searchFormSchema],
        autoSubmitOnEnter: true
      },
      afterFetch: (res) => {
        const arr = res.map((item, ind) => {
          return {
            ...item,
            ind,
            children: []
          };
        });
        console.log(arr, "arr");
        return arr;
      },
      ellipsis: true,
      showIndexColumn: false,
      useSearchForm: true,
      showTableSetting: true,
      isTreeTable: true,
      bordered: true,
      expandRowByClick: true,
      actionColumn: {
        width: 100,
        title: "操作",
        dataIndex: "action",
        key: "action"
      }
    });


    //展开
    function handleExpand(expanded, record) {
      console.log(getForm().getFieldsValue(), "searchInfo");
      if (expanded && !record.fromType) {
        standBookDetailList({
          ...getForm().getFieldsValue(),
          contractId: record.contractId
          /*incomeStatus: searchInfo.incomeStatus,
          payStatus: searchInfo.payStatus*/
        }).then(res => {
          record.children = res.items;
        });
      }
    }


    // router.push(pageEnum.BASE_LOGIN);
    function handleView(record: Recordable) {
      // reload();
      // go(`/business/insuranceDetail/${record.id}/${record.enterpriseName}`);
      // const { router } = useRouter();
      let path = "";
      if (record.fromType == "SALARY") {
        path = "/business/salaryDet";
      } else if (record.fromType == "INVOICE") {
        path = "/business/invoiceDet";
      }
      router.push({
        path,
        query: { contractId: record.contractId, enterpriseName: record.enterpriseName }
      });
    }

    function onFetchSuccess() {
      // 演示默认展开所有表项
      nextTick(collapseAll);
      // nextTick(expandAll);
    }

    return {
      registerTable,
      onFetchSuccess,
      handleExpand,
      handleView,
      searchInfo
    };
  }
});
</script>
