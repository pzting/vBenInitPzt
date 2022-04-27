import type { AppRouteModule } from "/@/router/types";

import { LAYOUT } from "/@/router/constant";
import { t } from "/@/hooks/web/useI18n";

const system: AppRouteModule = {
  path: "/currencyTraders",
  name: "currencyTraders",
  component: LAYOUT,
  redirect: "/currencyTraders/currencyUserList",
  meta: {
    // orderNo: 2000,
    icon: "ant-design:usergroup-add-outlined",
    title: t("routes.menus.currencyTraders.currencyTraders"),
    roles: ["admin", "currencyTraders",
      "currencyUserList",
      "AccountDetail",
      "Dept"
    ]
  },
  children: [
    {
      path: "currencyUserList",
      name: "currencyUserList",
      meta: {
        title: t("routes.menus.currencyTraders.currencyUserList"),
        ignoreKeepAlive: false,
        roles: ["admin", "Account"]
      },
      component: () => import("/@/views/currencyTraders/currencyUserList/index.vue")
    }
    /*{
      path: "employeeDetail/:id/:name",
      name: "EmployeeDetail",
      meta: {
        hideMenu: true,
        title: t("routes.menus.people.employeeDetail"),
        roles: ["admin", "Account"],
        ignoreKeepAlive: true,
        showMenu: false,
        currentActiveMenu: "/people/employee"
      },
      component: () => import("/@/views/people/employee/Detail.vue")
    },*/
  ]
};

export default system;
