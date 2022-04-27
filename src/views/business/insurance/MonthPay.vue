<template>
  <BasicTable @register="registerTable" />
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import { BasicTable } from "/@/components/Table";
import { useTable } from "../../../components/Table";
import { insuranceMonthPayPage } from "/@/api/business";
import {
  monthPayColumns as columns,
  searchMonthDetailFormSchema as searchFormSchema
} from "./account.data";

export default defineComponent({
  name: "MonthPay",
  components: { BasicTable },
  props: ["idCard", "insuranceDate"],
  setup(props) {
    const route = useRoute();
    // 此处可以得到用户ID
    const id = ref(route.params?.id);
    const [registerTable, { reload }] = useTable({
      title: "社保详情",
      api: insuranceMonthPayPage,
      rowKey: "id",
      columns,
      pagination: false,
      striped: false,
      formConfig: {
        labelWidth: 120,
        schemas: searchFormSchema,
        autoSubmitOnEnter: true
      },
      useSearchForm: false,
      showTableSetting: true,
      bordered: true,
      showIndexColumn: false,
      canResize: false,
      searchInfo: { idCard: props.idCard, insuranceDate: props.insuranceDate }
    });

    return {
      id,
      registerTable
    };
  }
});
</script>

<style></style>
