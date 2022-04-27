import { defHttp } from "/@/utils/http/axios";

enum Api {
  /** 2022/3/16
   *作者:pzt
   *内容:员工管理
   **/
  enterpriseTreeApi = "/enterprise/tree",
  enterpriseSaveApi = "/enterprise/save",
  enterpriseDeleteApi = "/enterprise/delete",

  /** 2022/3/16
   *作者:pzt
   *内容:企业管理
   **/
  employeePageApi = "/employee/page",
  employeeSaveApi = "/employee/save",
  replaceEnterpriseApi = "/employee/replaceEnterprise",
  employeeImportApi = "/employee/import",
  employeeSalaryApi = "/employee/salary",
  employeeNormalApi = "/employee/normal",

  /** 2022/4/21
   *作者:pzt
   *内容:合同
   **/
  contractDeleteApi = "/contract/delete",
  contractListApi = "/contract/list",
  contractPageApi = "/contract/page",
  contractSaveApi = "/contract/save",
  contractRateDeleteApi = "/contractRate/delete",
  contractRateListApi = "/contractRate/list",
  contractRateSaveApi = "/contractRate/save",

  /** 2022/4/21
   *作者:pzt
   *内容:劳务单
   **/
  invoiceConfirmApi = "/invoice/confirm",
  invoicePageApi = "/invoice/page",
  invoicePaidApi = "/invoice/paid",
  invoiceSaveApi = "/invoice/save",
  invoiceDeleteApi = "/invoice/delete",

  /** 2022/4/24
   *作者:pzt
   *内容:台账管理
   **/
  standBookPageApi = "/standBook/page",
  standBookDetailListApi = "/standBook/detailList",
}

/** 2022/3/17
 *作者:pzt
 *内容:员工管理
 **/
export const getAccountList = (params) =>
  defHttp.post({ url: Api.employeePageApi, params });
export const employeeSave = (params) =>
  defHttp.post({ url: Api.employeeSaveApi, params });
export const replaceEnterprise = (params) =>
  defHttp.post({ url: Api.replaceEnterpriseApi, params });
export const employeeImport = (params) =>
  defHttp.post({ url: Api.employeeImportApi, params });
export const getEmployeeSalary = (params) =>
  defHttp.post({ url: Api.employeeSalaryApi, params });
export const employeeNormal = (params) =>
  defHttp.post({ url: Api.employeeNormalApi, params });

/** 2022/3/17
 *作者:pzt
 *内容:企业管理
 **/
export const getDeptList = (params) =>
  defHttp.post({ url: Api.enterpriseTreeApi, params });
export const setEnterpriseSave = (params) =>
  defHttp.post({ url: Api.enterpriseSaveApi, params });
export const setEnterpriseDelete = (params) =>
  defHttp.post({ url: Api.enterpriseDeleteApi, params });


/** 2022/4/21
 *作者:pzt
 *内容:合同
 **/
export const contractDelete = (params) =>
  defHttp.post({ url: Api.contractDeleteApi, params });
export const contractList = (params) =>
  defHttp.post({ url: Api.contractListApi, params });
export const contractPage = (params) =>
  defHttp.post({ url: Api.contractPageApi, params });
export const contractSave = (params) =>
  defHttp.post({ url: Api.contractSaveApi, params });
export const contractRateDelete = (params) =>
  defHttp.post({ url: Api.contractRateDeleteApi, params });
export const contractRateList = (params) =>
  defHttp.post({ url: Api.contractRateListApi, params });
export const contractRateSave = (params) =>
  defHttp.post({ url: Api.contractRateSaveApi, params });

/** 2022/4/21
 *作者:pzt
 *内容:劳务单
 **/
export const invoiceConfirm = (params) =>
  defHttp.post({ url: Api.invoiceConfirmApi, params });
export const invoicePage = (params) =>
  defHttp.post({ url: Api.invoicePageApi, params });
export const invoicePaid = (params) =>
  defHttp.post({ url: Api.invoicePaidApi, params });
export const invoiceSave = (params) =>
  defHttp.post({ url: Api.invoiceSaveApi, params });
export const invoiceDelete = (params) =>
  defHttp.post({ url: Api.invoiceDeleteApi, params });

/** 2022/4/24
 *作者:pzt
 *内容:台账管理
 **/
export const standBookPage = (params) =>
  defHttp.post({ url: Api.standBookPageApi, params });
export const standBookDetailList = (params) =>
  defHttp.post({ url: Api.standBookDetailListApi, params });
