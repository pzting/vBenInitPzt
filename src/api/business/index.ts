import { defHttp } from "/@/utils/http/axios";

enum Api {
  /** 2022/3/16
   *作者:pzt
   *内容:员工社保页面
   **/
  insurancePageApi = "/insurance/page",
  insuranceListApi = "/insurance/list",
  insuranceDetailPageApi = "/insurance/detailPage",
  insuranceMonthPayPageApi = "/insurance/monthPay",
  insuranceMonthDetailPageApi = "/insurance/monthDetail",
  insuranceImportApi = "/insurance/import",
  insuranceExportApi = "/insurance/export",
  insuranceUpBillApi = "/insurance/upBill",
  insuranceStatusChangeApi = "/insurance/statusChange",
  insuranceDeleteApi = "/insurance/delete",
  insurancePaidApi = "/insurance/paid",
  insuranceReceivedApi = "/insurance/received",

  /** 2022/3/20
   *作者:pzt
   *内容:工资单页面
   **/
  salaryPageApi = "/salary/page",
  salaryAddApi = "/salary/add",
  salaryDetailPageApi = "/salary/detailPage",
  salaryDetailSaveApi = "/salary/detailSave",
  salaryExportApi = "/salary/export",
  salaryHistoryImportApi = "/salary/historyImport",
  salaryStatusChangeApi = "/salary/statusChange",
  salaryConfirmApi = "/salary/confirm",
  salaryDeleteApi = "/salary/delete",
  salaryPaidApi = "/salary/paid",
  salaryListApi = "/salary/list",

  /** 2022/4/7
   *作者:pzt
   *内容:工资单统计页面
   **/
  salaryTotalPageApi = "/salary/totalPage",
  salaryTotalDetailApi = "/salary/totalDetail",

  /** 2022/3/21
   *作者:pzt
   *内容: 专项附加扣除列表页面
   **/
  taxDeductPageApi = "/taxDeduct/page",
  taxDeductDeleteApi = "/taxDeduct/delete",
  taxDeductImportApi = "/taxDeduct/import",
  taxDeductSaveApi = "/taxDeduct/save",
}

/** 2022/3/17
 *作者:pzt
 *内容:员工社保详情列表-分页
 **/
export const insuranceDetailPage = (params) =>
  defHttp.post({ url: Api.insuranceDetailPageApi, params });
export const insuranceMonthPayPage = (params) =>
  defHttp.post({ url: Api.insuranceMonthPayPageApi, params });
export const insuranceMonthDetailPage = (params) =>
  defHttp.post({ url: Api.insuranceMonthDetailPageApi, params });
export const getPageList = (params) =>
  defHttp.post({ url: Api.insurancePageApi, params });
export const insuranceList = (params) =>
  defHttp.post({ url: Api.insuranceListApi, params });
export const insuranceImport = (params) =>
  defHttp.post({ url: Api.insuranceImportApi, params });
export const insuranceExport = (params) =>
  defHttp.post({ url: Api.insuranceExportApi, params });
export const insuranceUpBill = (params) =>
  defHttp.post({ url: Api.insuranceUpBillApi, params });
export const insuranceStatusChange = (params) =>
  defHttp.post({ url: Api.insuranceStatusChangeApi, params });
export const insuranceDelete = (params) =>
  defHttp.post({ url: Api.insuranceDeleteApi, params });
export const insurancePaid = (params) =>
  defHttp.post({ url: Api.insurancePaidApi, params });
export const insuranceReceived = (params) =>
  defHttp.post({ url: Api.insuranceReceivedApi, params });


/** 2022/3/20
 *作者:pzt
 *内容:工资单页面
 **/
export const salaryPage = (params) =>
  defHttp.post({ url: Api.salaryPageApi, params }, { errorMessageMode: "message" });
export const salaryAdd = (params) =>
  defHttp.post({ url: Api.salaryAddApi, params }, { errorMessageMode: "message" });
export const salaryExport = (params) =>
  defHttp.post({ url: Api.salaryExportApi, params }, { errorMessageMode: "message" });
export const salaryHistoryImport = (params) =>
  defHttp.post({ url: Api.salaryHistoryImportApi, params }, { errorMessageMode: "message" });
export const salaryStatusChange = (params) =>
  defHttp.post({ url: Api.salaryStatusChangeApi, params }, { errorMessageMode: "message" });
export const salaryConfirm = (params) =>
  defHttp.post({ url: Api.salaryConfirmApi, params }, { errorMessageMode: "message" });
export const salaryDelete = (params) =>
  defHttp.post({ url: Api.salaryDeleteApi, params }, { errorMessageMode: "message" });
export const salaryPaid = (params) =>
  defHttp.post({ url: Api.salaryPaidApi, params }, { errorMessageMode: "message" });
export const salaryDetailPage = (params) =>
  defHttp.post({ url: Api.salaryDetailPageApi, params }, { errorMessageMode: "message" });
export const salaryDetailSave = (params) =>
  defHttp.post({ url: Api.salaryDetailSaveApi, params }, { errorMessageMode: "message" });
export const salaryList = (params) =>
  defHttp.post({ url: Api.salaryListApi, params }, { errorMessageMode: "message" });


/** 2022/4/7
 *作者:pzt
 *内容:工资单统计页面
 **/
export const salaryTotalPage = (params) =>
  defHttp.post({ url: Api.salaryTotalPageApi, params }, { errorMessageMode: "message" });
export const salaryTotalDetail = (params) =>
  defHttp.post({ url: Api.salaryTotalDetailApi, params }, { errorMessageMode: "message" });

/** 2022/3/21
 *作者:pzt
 *内容: 专项附加扣除列表页面
 **/
export const taxDeductPage = (params) => defHttp.post({ url: Api.taxDeductPageApi, params });
export const taxDeductDelete = (params) => defHttp.post({ url: Api.taxDeductDeleteApi, params });
export const taxDeductImport = (params) => defHttp.post({ url: Api.taxDeductImportApi, params });
export const taxDeductSave = (params) => defHttp.post({ url: Api.taxDeductSaveApi, params });
