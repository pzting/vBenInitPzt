import type { AppRouteModule } from "/@/router/types";

import { LAYOUT } from "/@/router/constant";
import { t } from "/@/hooks/web/useI18n";

const system: AppRouteModule = {
  path: "/people",
  name: "People",
  component: LAYOUT,
  redirect: "/people/employee",
  meta: {
    orderNo: 2000,
    // icon: 'ion:aperture-outline',
    /** 2022/3/14
     *作者:pzt
     *内容:
     **/
    icon: "ant-design:usergroup-add-outlined",
    title: t("routes.menus.people.people"),
    roles: ["admin", "People",
      "Account",
      "AccountDetail",
      "Dept"
    ]
  },
  children: [
    {
      path: "employee",
      name: "Employee",
      meta: {
        title: t("routes.menus.people.employee"),
        ignoreKeepAlive: false,
        roles: ["admin", "Account"]
      },
      component: () => import("/@/views/people/employee/index.vue")
    },
    {
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
    },
    {
      path: "enterprise",
      name: "Enterprise",
      meta: {
        title: t("routes.menus.people.enterprise"),
        roles: ["admin", "Dept"],
        ignoreKeepAlive: true
      },
      component: () => import("/@/views/people/enterprise/index.vue")
    }
  ]
};

export default system;
