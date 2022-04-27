<template>
  <PageWrapper :title="`${name}的工资历史`" contentBackground @back="goBack">
    <div class="pt-4 m-4 desc-wrap">
      <BasicTable @register="registerTable" />
    </div>
  </PageWrapper>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import { PageWrapper } from "/@/components/Page";
import { useGo } from "/@/hooks/web/usePage";
import { useTabs } from "/@/hooks/web/useTabs";
import { Tabs } from "ant-design-vue";
import { BasicTable } from "/@/components/Table";
import { useTable } from "../../../components/Table";
import { getEmployeeSalary } from "/@/api/people";
import { salaryColumns as columns } from "./index.data";

export default defineComponent({
  name: "EmployeeDetail",
  components: { BasicTable, PageWrapper, ATabs: Tabs, ATabPane: Tabs.TabPane },
  setup() {
    const route = useRoute();
    const go = useGo();
    // 此处可以得到用户ID
    const idCard = ref(route.params?.id);
    const name = ref(route.params?.name);
    const { setTitle } = useTabs();
    const [registerTable] = useTable({
      title: "工资历史",
      api: getEmployeeSalary,
      rowKey: "id",
      columns,
      // pagination: false,
      striped: false,
      // useSearchForm: true,
      showTableSetting: true,
      bordered: true,
      showIndexColumn: false,
      canResize: false,
      searchInfo: { idCard: idCard.value }
      /*beforeFetch: (res) => {
      return {idCard: idCard.value, ...res}
    }*/
    });
    // TODO
    // 本页代码仅作演示，实际应当通过idCard从接口获得用户的相关资料

    // 设置Tab的标题（不会影响页面标题）
    setTitle(`工资历史：${name.value}`);

    // 页面左侧点击返回链接时的操作
    function goBack() {
      // 本例的效果时点击返回始终跳转到账号列表页，实际应用时可返回上一页
      go("/people/employee");
    }

    return { idCard, name, registerTable, goBack };
  }
});
</script>

<style></style>
