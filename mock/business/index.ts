import { MockMethod } from "vite-plugin-mock";
import { resultError, resultPageSuccess, resultSuccess } from "../../mock/_util";
// import { insuranceDetailPageColumns } from "../../src/views/business/insurance/account.data";
// import {monthDetailColumns} from "/@/views/business/insurance/employee.data";

const accountList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 20; index++) {
    result.push({
      id: `${index}`,
      billFileNo: `1234565432134233${index}`,
      insuranceFileNo: `123453${index}`,
      employeeNum: `233${index}`,
      employeePay: `3423${index}`,
      servicePay: `4323${index}`,
      totalPay: `1332${index}`,
      enterprisePay: `43553${index}`,
      insuranceServicePay: `12${index}`,
      insuranceTotalPay: `32${index}`,
      enterpriseName: "@cname()",
      insuranceDate: "@datetime",
      "insuranceStatus|1": ["UNPAID", "PAID", "CONFIRMED"]
    });
  }
  return result;
})();
/** 2022/3/21
 *作者:pzt
 *内容:专项扣除列表
 **/
const taxDeductPageList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 20; index++) {
    result.push({
      id: `${index}`,
      childrenEdu: `2323${index}`,
      continueEdu: `312${index}`,
      houseRent: `232${index}`,
      idCard: `3231242332323${index}`,
      illnessMedical: `4323${index}`,
      supportElderly: `1332${index}`,
      taxDeductTotal: `432553${index}`,
      employeeName: "@cname()",
      taxDeductDate: "@datetime"
    });
  }
  return result;
})();
/** 2022/3/21
 *作者:pzt
 *内容:社保详情
 **/
const insuranceDetailPageList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 20; index++) {
    result.push({
      id: `${index}`,
      insuranceId: `23${index}`,
      idCard: `12345654134233${index}`,
      insuranceFileNo: `123453${index}`,
      employeePay: `233${index}`,
      employeeRealPay: `3423${index}`,
      enterprisePay: `4323${index}`,
      enterpriseRealPay: `1332${index}`,
      memo: "@cword(15,20)",
      employeeName: "@cname()",
      insuranceDate: "@datetime",
      "current|1": [true, false]
    });
  }
  return result;
})();
/** 2022/3/20
 *作者:pzt
 *内容: 工资单
 **/
const salaryPageList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 20; index++) {
    result.push({
      // id: `${index}`,
      servicePay: `4323${index}`,
      contactPhone: `1332322${index}`,
      createUserName: "@cname()",
      contactName: "@cname",
      memo: "@cword(15,20)",
      enterpriseName: "@cword(5,8)",
      realSalaryPay: `1332${index}`,
      employeeNum: `23${index}`,
      salaryDate: "@datetime",
      insuranceDate: "@datetime",
      payDate: "@datetime",
      taxPay: `43553${index}`,
      "salaryStatus|1": ["UNPAID", "PAID", "CONFIRMED"]
    });
  }
  return result;
})();
const salaryTotalPageList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 20; index++) {
    result.push({
      id: `${index}`,
      enterpriseName: "@cword(5,8)",
      payDate: "@datetime",
      servicePay: `4323${index}`,
      realSalaryPay: `23${index}`,
      taxPay: `32${index}`,
      totalPay: `3322${index}`
    });
  }
  return result;
})();
/** 2022/3/22
 *作者:pzt
 *内容:员工工资详情
 **/
const salaryDetailPageList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 20; index++) {
    result.push({
      id: `${index}`,
      bankAddress: "@cword(5,8)",
      bankCard: "@cword(2,4)",
      bankName: "@cword(2,4)",
      bankCity: "@city(true)",
      employeeName: "@cname()",
      idCard: `1234565432134233${index}`,
      insuranceDetailId: `232${index}`,
      salaryId: `32${index}`,
      salaryPay: `2421${index}`,
      taxPay: `321${index}`,
      insurancePay: `1232${index}`,
      realSalaryPay: `3232${index}`,
      memo: "@cword(15,20)",
      salaryDate: "@datetime"
    });
  }
  return result;
})();
const monthPayList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 20; index++) {
    result.push({
      id: `${index}`,
      employeePay: `12353${index}`,
      enterprisePay: `232${index}`,
      memo: "@cword(15,20)",
      insuranceDate: "@datetime",
      "current|1": [true, false]
    });
  }
  return result;
})();
const monthDetailList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 20; index++) {
    result.push({
      id: `${index}`,
      employeePay: `12353${index}`,
      enterprisePay: `232${index}`,
      memo: "@cword(15,20)",
      insuranceDate: "@datetime",
      "current|1": [true, false]
    });
  }
  return result;
})();


export default [
  /** 2022/3/16
   *作者:pzt
   *内容:员工社保页面
   **/
  {
    url: "/basic-api/insurance/page",
    timeout: 100,
    method: "post",
    response: ({ query }) => {
      const { page = 1, pageSize = 20 } = query;
      return resultPageSuccess(page, pageSize, accountList);
    }
  },
  {
    url: "/basic-api/insurance/detailPage",
    timeout: 100,
    method: "post",
    response: ({ query }) => {
      const { page = 1, pageSize = 20 } = query;
      return resultPageSuccess(page, pageSize, insuranceDetailPageList);
    }
  },
  {
    url: "/basic-api/insurance/monthPay",
    timeout: 100,
    method: "post",
    response: ({ query }) => {
      const { page = 1, pageSize = 20 } = query;
      return resultPageSuccess(page, pageSize, monthPayList);
    }
  },
  {
    url: "/basic-api/insurance/monthDetail",
    timeout: 100,
    method: "post",
    response: ({ query }) => {
      const { page = 1, pageSize = 20 } = query;
      return resultPageSuccess(page, pageSize, monthDetailList);
    }
  },
  {
    url: "/basic-api/insurance/import",
    timeout: 500,
    method: "post",
    response: () => {
      return resultSuccess({
        time: `${new Date().getTime()}`
      });
    }
  },
  {
    url: "/basic-api/insurance/upBill",
    timeout: 500,
    method: "post",
    response: () => {
      return resultSuccess({
        time: `${new Date().getTime()}`
      });
    }
  },
  {
    url: "/basic-api/insurance/export",
    timeout: 500,
    method: "post",
    response: () => {
      return resultSuccess({
        time: `${new Date().getTime()}`
      });
    }
  },
  {
    url: "/basic-api/insurance/statusChange",
    timeout: 100,
    method: "post",
    response: () => {
      return resultSuccess({
        time: `${new Date().getTime()}`
      });
    }
  },
  {
    url: "/basic-api/insurance/delete",
    timeout: 100,
    method: "post",
    response: () => {
      return resultSuccess({
        time: {
          time: `${new Date().getTime()}`
        }
      });
    }
  },


  /** 2022/3/16
   *作者:pzt
   *内容:工资单页面
   **/
  {
    url: "/basic-api/salary/page",
    timeout: 100,
    method: "post",
    response: (res) => {
      const { body } = res;
      const { page = 1, pageSize = 20 } = body;
      return resultPageSuccess(page, pageSize, salaryPageList);
    }
  },
  {
    url: "/basic-api/salary/add",
    timeout: 100,
    method: "post",
    response: () => {
      return resultSuccess({
        obj: {
          salaryId: "1",
          createUsername: "创建人1"
        }
      });
    }
  },
  {
    url: "/basic-api/salary/detailSave",
    timeout: 100,
    method: "post",
    response: () => {
      return resultSuccess({
        time: `${new Date().getTime()}`
      });
    }
  },
  {
    url: "/basic-api/salary/detailPage",
    timeout: 100,
    method: "post",
    response: (res) => {
      const { body } = res;
      const { page = 1, pageSize = 20 } = body;
      return resultPageSuccess(page, pageSize, salaryDetailPageList);
    }
  },
  {
    url: "/basic-api/salary/statusChange",
    timeout: 100,
    method: "post",
    response: () => {
      return resultSuccess({
        time: `${new Date().getTime()}`
      });
    }
  },
  {
    url: "/basic-api/salary/export",
    timeout: 100,
    method: "post",
    response: () => {
      return resultSuccess({
        time: `${new Date().getTime()}`
      });
    }
  },


  /** 2022/4/7
   *作者:pzt
   *内容:工资单统计页面
   **/
  {
    url: "/basic-api/salary/totalPage",
    timeout: 100,
    method: "post",
    response: (res) => {
      const { body } = res;
      const { page = 1, pageSize = 20 } = body;
      return resultPageSuccess(page, pageSize, salaryTotalPageList);
    }
  },
  {
    url: "/basic-api/salary/totalDetail",
    timeout: 100,
    method: "post",
    response: (res) => {
      const { body } = res;
      const { page = 1, pageSize = 20 } = body;
      return resultPageSuccess(page, pageSize, salaryPageList);
    }
  },

  /** 2022/3/21
   *作者:pzt
   *内容:专项附加扣除列表页面
   **/
  {
    url: "/basic-api/taxDeduct/page",
    timeout: 100,
    method: "post",
    response: (res) => {
      const { body } = res;
      const { page = 1, pageSize = 20 } = body;
      return resultPageSuccess(page, pageSize, taxDeductPageList);
    }
  },
  {
    url: "/basic-api/taxDeduct/delete",
    timeout: 100,
    method: "post",
    response: ({ body }) => {
      return resultSuccess(`${body} can use`);
    }
  },
  {
    url: "/basic-api/taxDeduct/import",
    timeout: 100,
    method: "post",
    response: () => {
      return resultSuccess({
        time: `${new Date().getTime()}`
      });
    }
  },
  {
    url: "/basic-api/taxDeduct/save",
    timeout: 100,
    method: "post",
    response: ({ body }) => {
      return resultSuccess(`${body} can use`);
    }
  }
] as MockMethod[];
