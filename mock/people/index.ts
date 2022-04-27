import { MockMethod } from "vite-plugin-mock";
import { resultPageSuccess, resultSuccess } from "../../mock/_util";

const accountList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 20; index++) {
    result.push({
      id: `${index}`,
      account: "@first",
      phone: "1234565",
      salaryPay: `1565${index}`,
      service: `32${index}`,
      tax: `12${index}`,
      idCard: `1234565432134233${index}`,
      employeeName: "@cname()",
      role: "@first",
      contractEndDate: "@datetime",
      contractStartDate: "@datetime",
      bankAddress: "@cword(5,8)",
      bankCard: "@cword(2,4)",
      bankName: "@cword(2,4)",
      bankCity: "@city(true)",
      "work|1": [true, false]
    });
  }
  return result;
})();
const contractList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 20; index++) {
    result.push({
      // id: `${index}`,
      id: index,
      contractName: "@cname()",
      contractNo: "@cname()",
      createUserName: "@cname()",
      startDate: "@datetime",
      endDate: "@datetime",
      basicRate: `1565${index}`,
      contractId: `32${index}`,
      costRate: `12${index}`,
      salesRate: `3${index}`,
      memo: "@cword(5,8)"
    });
  }
  return result;
})();
const contractRateList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 20; index++) {
    result.push({
      id: `${index}`,
      basicRate: `3`,
      contractId: `${index}`,
      costRate: `3`,
      salesRate: `3${index}`
    });
  }
  return result;
})();
const invoiceList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 20; index++) {
    result.push({
      id: `${index}`,
      enterpriseName: "@cname()",
      createUserName: "@cname()",
      payDate: "@datetime",
      basicRate: `1565${index}`,
      costRate: `12${index}`,
      salesRate: `3${index}`,
      labourPay: `3${index}`,
      payTime: "@datetime",
      enterpriseId: "1",
      contractId: "1",
      contractRateId: "1",
      createTime: "@datetime"
    });
  }
  return result;
})();
const standBookList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 20; index++) {
    result.push({
      id: `${index}`,
      enterpriseName: "@cname()",
      salesMan: "@cname()",
      contractId: `32${index}`,
      contractNo: `32${index}`,
      totalProfit: `1565${index}`,
      realTotalPay: `12${index}`,
      totalPay: `3${index}`,
      "fromType|1": ["SALARY", "INVOICE", null]
    });
  }
  return result;
})();


const salaryList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 20; index++) {
    result.push({
      id: `${index}`,
      idCard: "1234565432134233",
      insuranceDetailId: "1234565432134233",
      insurancePay: "1565",
      memo: "@cword(15,20)",
      realSalaryPay: "565",
      salaryDate: "@datetime",
      salaryPay: "2565",
      taxPay: "65",
      workDays: "20"
    });
  }
  return result;
})();


const deptList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 2; index++) {
    result.push({
      id: ["1", "2"][index],
      path: `${index}`,
      enterpriseName: ["河南鼎稳通信技术有限公司", "华南分部", "西北分部"][index],
      contactName: "@cname",
      contactPhone: "18720933412",
      employeeNum: "1234",
      kValue: "432345",
      orderNo: index + 1,
      createTime: "@datetime",
      remark: "@cword(10,20)",
      "status|1": ["0", "0", "1"],
      type: "MAIN",
      children: (() => {
        const children: any[] = [];
        for (let j = 0; j < 4; j++) {
          children.push({
            id: `${index}-${j}`,
            path: `${index}-${j}`,
            enterpriseName: ["河南鼎稳", "湖北二局", "漯河初池", "许昌豪迈"][j],
            orderNo: j + 1,
            contactName: "@cname",
            contactPhone: "18720933412",
            employeeNum: "1234",
            kValue: "432345",
            createTime: "@datetime",
            remark: "@cword(10,20)",
            "status|1": ["0", "1"],
            type: "SUB",
            parentId: `${index}`,
            children: (() => {
              const children: any[] = [];
              for (let k = 0; k < 3; k++) {
                children.push({
                  id: `${index}-${j}-${k}`,
                  path: `${index}-${j}-${k}`,
                  enterpriseName: ["十堰", "武汉", "随州"][k],
                  orderNo: k + 1,
                  contactName: "@cname",
                  contactPhone: "18720933412",
                  employeeNum: "1234",
                  kValue: "432345",
                  createTime: "@datetime",
                  remark: "@cword(10,20)",
                  "status|1": ["0", "1"],
                  type: "",
                  parentId: `${index}-${j}`,
                  children: undefined
                });
              }
              return children;
            })()
          });
        }
        return children;
      })()
    });
  }
  return result;
})();


export default [
  {
    /** 2022/3/16
     *作者:pzt
     *内容:员工管理
     **/
    url: "/basic-api/employee/page",
    timeout: 100,
    method: "post",
    response: ({ query }) => {
      const { page = 1, pageSize = 20 } = query;
      return resultPageSuccess(page, pageSize, accountList);
    }
  },
  {
    url: "/basic-api/employee/save",
    timeout: 500,
    method: "post",
    response: ({ body }) => {
      return resultSuccess(`${body} can use`);
    }
  },
  {
    url: "/basic-api/employee/replaceEnterprise",
    timeout: 500,
    method: "post",
    response: ({ body }) => {
      return resultSuccess(`${body} can use`);
    }
  },
  {
    url: "/basic-api/employee/import",
    timeout: 500,
    method: "post",
    response: () => {
      return resultSuccess(`${new Date().getTime()}  `);
    }
  },
  {
    url: "/basic-api/employee/salary",
    timeout: 100,
    method: "post",
    response: (res) => {
      const { body } = res;
      const { page = 1, pageSize = 20 } = body;
      return resultPageSuccess(page, pageSize, salaryList);
    }
  },

  /** 2022/3/16
   *作者:pzt
   *内容:企业管理页面
   **/
  {
    url: "/basic-api/enterprise/tree",
    timeout: 100,
    method: "post",
    response: () => {
      return resultSuccess({ items: deptList });
    }
  },
  {
    url: "/basic-api/enterprise/save",
    timeout: 500,
    method: "post",
    response: ({ body }) => {
      return resultSuccess(`${body} can use`);
    }
  },
  {
    url: "/basic-api/enterprise/delete",
    timeout: 500,
    method: "post",
    response: ({ body }) => {
      return resultSuccess(`${body} can use`);
    }
  },

  /** 2022/4/24
   *作者:pzt
   *内容:合同管理
   **/
  {
    url: "/basic-api/contract/list",
    timeout: 100,
    method: "post",
    response: () => {
      return resultSuccess({ items: contractList });
    }
  },
  {
    url: "/basic-api/contract/page",
    timeout: 100,
    method: "post",
    response: ({ query }) => {
      const { page = 1, pageSize = 20 } = query;
      return resultPageSuccess(page, pageSize, contractList);
    }
  },
  {
    url: "/basic-api/contract/save",
    timeout: 500,
    method: "post",
    response: ({ body }) => {
      return resultSuccess(`${body} can use`);
    }
  },
  {
    url: "/basic-api/contract/delete",
    timeout: 500,
    method: "post",
    response: ({ body }) => {
      return resultSuccess(`${body} can use`);
    }
  },
  {
    url: "/basic-api/contractRate/list",
    timeout: 100,
    method: "post",
    response: () => {
      return resultSuccess({ items: contractRateList });
    }
  },
  {
    url: "/basic-api/contractRate/save",
    timeout: 500,
    method: "post",
    response: ({ body }) => {
      return resultSuccess(`${body} can use`);
    }
  },
  {
    url: "/basic-api/contractRate/delete",
    timeout: 500,
    method: "post",
    response: ({ body }) => {
      return resultSuccess(`${body} can use`);
    }
  },


  /** 2022/4/24
   *作者:pzt
   *内容:劳务单
   **/
  {
    url: "/basic-api/invoice/page",
    timeout: 100,
    method: "post",
    response: ({ query }) => {
      const { page = 1, pageSize = 20 } = query;
      return resultPageSuccess(page, pageSize, invoiceList);
    }
  },
  {
    url: "/basic-api/invoice/save",
    timeout: 500,
    method: "post",
    response: ({ body }) => {
      return resultSuccess(`${body} can use`);
    }
  },
  {
    url: "/basic-api/invoice/paid",
    timeout: 500,
    method: "post",
    response: ({ body }) => {
      return resultSuccess(`${body} can use`);
    }
  },
  {
    url: "/basic-api/invoice/confirm",
    timeout: 500,
    method: "post",
    response: ({ body }) => {
      return resultSuccess(`${body} can use`);
    }
  },


  /** 2022/4/25
   *作者:pzt
   *内容:台账
   **/
  {
    url: "/basic-api/standBook/page",
    timeout: 100,
    method: "post",
    response: ({ query }) => {
      const { page = 1, pageSize = 20 } = query;
      return resultPageSuccess(page, pageSize, standBookList);
    }
  },
  {
    url: "/basic-api/standBook/detailList",
    timeout: 100,
    method: "post",
    response: () => {
      return resultSuccess({ items: standBookList });
    }
  }
] as MockMethod[];
