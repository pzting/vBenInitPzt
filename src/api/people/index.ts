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
