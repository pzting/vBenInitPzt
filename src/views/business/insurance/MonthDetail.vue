<template>
  <BasicTable @register="registerTable" />
</template>

<script>
import { defineComponent } from "vue";
import { BasicTable, useTable } from "/@/components/Table";
import { insuranceMonthDetailPage } from "/@/api/business";
import {
  monthDetailColumns as columns,
  searchMonthDetailFormSchema as searchFormSchema
} from "./account.data";

export default defineComponent({
  name: "MonthDetail",
  components: { BasicTable },
  props: ["idCard", "insuranceDate"],
  setup(props) {
    // 此处可以得到用户ID
    const [registerTable, { reload }] = useTable({
      title: "社保详情",
      api: insuranceMonthDetailPage,
      rowKey: "id",
      columns,
      pagination: false,
      //formSchema
      formConfig: {
        labelWidth: 120,
        schemas: searchFormSchema,
        autoSubmitOnEnter: true
      },
      striped: false,
      // useSearchForm: true,
      showTableSetting: true,
      bordered: true,
      showIndexColumn: false,
      canResize: false,
      searchInfo: { idCard: props.idCard, insuranceDate: props.insuranceDate }
    });

    return {
      registerTable
    };
  }
});
</script>

<style></style>
