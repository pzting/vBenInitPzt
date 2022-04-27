import type { AppRouteModule } from "/@/router/types";

import { LAYOUT } from "/@/router/constant";
import { t } from "/@/hooks/web/useI18n";

const system: AppRouteModule = {
  path: "/business",
  name: "Business",
  component: LAYOUT,
  redirect: "/business/insurance",
  meta: {
    orderNo: 2000,
    // icon: 'ion:aperture-outline',
    /** 2022/3/14
     *作者:pzt
     *内容:
     **/
    roles: ["admin", "Business", "Insurance", "InsuranceDetail",
      "account_detail",
      "Salary",
      "SalaryDetail",
      "TaxDeduct",
      "Contract",
      "Invoice",
      "StandBook"
    ],
    icon: "ant-design:account-book-outlined",
    title: t("routes.menus.business.business")
  },
  children: [
    {
      path: "insurance",
      name: "Insurance",
      meta: {
        title: t("routes.menus.business.insurance"),
        ignoreKeepAlive: false,
        roles: ["admin", "Insurance"]
      },
      component: () => import("/@/views/business/insurance/index.vue")
    },
    {
      path: "insuranceDetail/:id/:name?",
      name: "InsuranceDetail",
      meta: {
        hideMenu: true,
        title: t("routes.menus.business.account_detail"),
        ignoreKeepAlive: true,
        showMenu: false,
        currentActiveMenu: "/business/insurance",
        roles: ["admin", "Insurance", "account_detail"]
      },
      component: () => import("/@/views/business/insurance/Detail.vue")
    },
    {
      path: "salary",
      name: "Salary",
      meta: {
        title: t("routes.menus.business.salary"),
        ignoreKeepAlive: true,
        roles: ["admin", "Salary"]
      },
      component: () => import("/@/views/business/salary/index.vue")
    },
    {
      path: "salaryDet",
      name: "SalaryDet",
      meta: {
        title: t("routes.menus.business.salary"),
        ignoreKeepAlive: true,
        showMenu: false,
        hideMenu: true,
        currentActiveMenu: "/business/standBook",
        roles: ["admin", "Salary"]
      },
      component: () => import("/@/views/business/salary/index.vue")
    },
    {
      path: "salaryDetail/:id/:name?/:status?",
      name: "SalaryDetail",
      meta: {
        hideMenu: true,
        title: t("routes.menus.business.salaryDetail"),
        roles: ["admin", "Salary"],
        ignoreKeepAlive: true,
        showMenu: false,
        currentActiveMenu: "/business/salary"
      },
      component: () => import("/@/views/business/salary/SalaryDetail.vue")
    },
    {
      path: "salaryTotal",
      name: "SalaryTotal",
      meta: {
        title: t("routes.menus.business.salaryTotal"),
        ignoreKeepAlive: true,
        roles: ["admin", "SalaryTotal"]
      },
      component: () => import("/@/views/business/salaryTotal/index.vue")
    },
    {
      path: "salaryTotalDetail/:id/:name/:status",
      name: "SalaryTotalDetail",
      meta: {
        hideMenu: true,
        title: t("routes.menus.business.salaryDetail"),
        roles: ["admin", "SalaryTotal"],
        ignoreKeepAlive: true,
        showMenu: false,
        currentActiveMenu: "/business/salaryTotal"
      },
      component: () => import("/@/views/business/salaryTotal/SalaryDetail.vue")
    },
    {
      path: "taxDeduct",
      name: "TaxDeduct",
      meta: {
        title: t("routes.menus.business.taxDeduct"),
        roles: ["admin", "TaxDeduct"],
        ignoreKeepAlive: true
      },
      component: () => import("/@/views/business/taxDeduct/index.vue")
    },
    /** 2022/4/25
     *作者:pzt
     *内容:移来移去
     **/
    {
      path: "contract",
      name: "Contract",
      meta: {
        title: t("routes.menus.people.contract"),
        ignoreKeepAlive: true,
        roles: ["admin", "Contract"]
      },
      component: () => import("/@/views/people/contract/index.vue")
    },
    {
      path: "contractDetail/:id/:name",
      name: "ContractDetail",
      meta: {
        hideMenu: true,
        title: t("routes.menus.people.contractDetail"),
        roles: ["admin", "Contract"],
        ignoreKeepAlive: true,
        showMenu: false,
        currentActiveMenu: "/business/contract"
      },
      component: () => import("/@/views/people/contract/ContractDetail.vue")
    },
    {
      path: "invoice",
      name: "Invoice",
      meta: {
        title: t("routes.menus.people.invoice"),
        roles: ["admin", "Invoice"],
        ignoreKeepAlive: false
      },
      component: () => import("/@/views/people/invoice/index.vue")
    },
    {
      path: "invoiceDet",
      name: "InvoiceDet",
      meta: {
        title: t("routes.menus.people.invoice"),
        roles: ["admin", "Invoice"],
        ignoreKeepAlive: true,
        showMenu: false,
        hideMenu: true,
        currentActiveMenu: "/business/standBook"
      },
      component: () => import("/@/views/people/invoice/index.vue")
    },
    {
      path: "standBook",
      name: "StandBook",
      meta: {
        title: t("routes.menus.people.standBook"),
        ignoreKeepAlive: false,
        roles: ["admin", "StandBook"]
      },
      component: () => import("/@/views/people/standBook/index.vue")
    }
  ]
};

export default system;
