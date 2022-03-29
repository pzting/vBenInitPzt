import type { AppRouteModule } from "/@/router/types";

import { LAYOUT } from "/@/router/constant";
import { t } from "/@/hooks/web/useI18n";

const system: AppRouteModule = {
  path: "/system",
  name: "System",
  component: LAYOUT,
  redirect: "/system/role",
  meta: {
    orderNo: 2000,
    icon: "ion:settings-outline",
    title: t("routes.demo.system.moduleName"),
    roles: ["admin", "System",
      "Role",
      "User",
      "AuthorityPoint",
      "Authority",
      "ChangePassword"
    ]
  },
  children: [
    /*{
      path: "account",
      name: "AccountManagement",
      meta: {
        title: t("routes.demo.system.account"),
        ignoreKeepAlive: false
      },
      component: () => import("/@/views/demo/system/account/index.vue")
    },*/
    {
      path: "role",
      name: "Role",
      meta: {
        title: t("routes.menus.system.role"),
        ignoreKeepAlive: true,
        roles: ["admin", "Role"]
      },
      component: () => import("/@/views/system/role/index.vue")
    },
    {
      path: "user",
      name: "User",
      meta: {
        title: t("routes.menus.system.user"),
        ignoreKeepAlive: true,
        roles: ["admin", "User"]
      },
      component: () => import("/@/views/system/user/index.vue")
    },
    {
      path: "authorityPoint",
      name: "AuthorityPoint",
      meta: {
        title: t("routes.menus.system.authorityPoint"),
        ignoreKeepAlive: true,
        roles: ["admin", "AuthorityPoint"]
      },
      component: () => import("/@/views/system/authorityPoint/index.vue")
    },
    {
      path: "authority",
      name: "Authority",
      meta: {
        title: t("routes.menus.system.authority"),
        ignoreKeepAlive: true,
        roles: ["admin", "Authority"]
      },
      component: () => import("/@/views/system/authority/index.vue")
    },
    {
      path: "changePassword",
      name: "ChangePassword",
      meta: {
        title: t("routes.menus.system.password"),
        ignoreKeepAlive: false,
        roles: ["admin", "ChangePassword"]
      },
      component: () => import("/@/views/system/password/index.vue")
    }
  ]
};

export default system;
