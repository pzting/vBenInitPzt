<template>
  <PageWrapper :title="`${name}的社保详情`" contentBackground @back="goBack">
    <div class="pt-4 m-4 desc-wrap">
      <DetailPage />
      <!--      <a-tabs v-model:activeKey="activeKey">
              <a-tab-pane key="detailPage" tab="社保详情">
                <DetailPage/>
              </a-tab-pane>
              <a-tab-pane key="monthDetail" force-render tab="社保详情(当月缴纳，其他月补缴)">
                <MonthDetail/>
              </a-tab-pane>
              <a-tab-pane key="monthPay" tab="社保缴纳的金额详情(当月缴纳，其他月补缴)">
                <MonthPay/>
              </a-tab-pane>
            </a-tabs>-->
    </div>
  </PageWrapper>
</template>

<script>
  import { defineComponent, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { PageWrapper } from '/@/components/Page';
  import { useGo } from '/@/hooks/web/usePage';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { Tabs } from 'ant-design-vue';
  import { BasicTable } from '/@/components/Table';
  import DetailPage from './DetailPage.vue';
  // import MonthDetail from "./MonthDetail.vue";
  // import MonthPay from "./MonthPay.vue";

  export default defineComponent({
    name: 'InsuranceAccountDetail',
    components: {
      BasicTable,
      // MonthPay,
      // MonthDetail,
      DetailPage,
      PageWrapper,
      ATabs: Tabs,
      ATabPane: Tabs.TabPane,
    },
    setup() {
      const route = useRoute();
      const go = useGo();
      // 此处可以得到用户ID
      const idCard = ref(route.params?.id);
      const name = ref(route.params?.name);
      const currentKey = ref('detail');
      const activeKey = ref('detailPage');
      const { setTitle } = useTabs();
      // TODO
      // 本页代码仅作演示，实际应当通过idCard从接口获得用户的相关资料

      // 设置Tab的标题（不会影响页面标题）
      setTitle(`社保详情：${name.value}`);

      // 页面左侧点击返回链接时的操作
      function goBack() {
        // 本例的效果时点击返回始终跳转到账号列表页，实际应用时可返回上一页
        go('/business/insurance');
      }

      return { idCard, activeKey, name, currentKey, goBack };
    },
  });
</script>

<style></style>
