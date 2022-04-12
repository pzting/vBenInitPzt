import { MockMethod } from "vite-plugin-mock";
import { resultError, resultPageSuccess, resultSuccess } from "../../mock/_util";

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

const roleList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 4; index++) {
    result.push({
      id: index + 1,
      orderNo: `${index + 1}`,
      roleName: ["超级管理员", "管理员", "文章管理员", "普通用户"][index],
      roleValue: "@first",
      createTime: "@datetime",
      remark: "@cword(10,20)",
      menu: [["0", "1", "2"], ["0", "1"], ["0", "2"], ["2"]][index],
      "status|1": ["0", "1"]
    });
  }
  return result;
})();

const deptList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 1; index++) {
    result.push({
      id: `${index}`,
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

const menuList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 3; index++) {
    result.push({
      id: `${index}`,
      icon: ["ion:layers-outline", "ion:git-compare-outline", "ion:tv-outline"][index],
      component: "LAYOUT",
      type: "0",
      menuName: ["Dashboard", "权限管理", "功能"][index],
      permission: "",
      orderNo: index + 1,
      createTime: "@datetime",
      "status|1": ["0", "0", "1"],
      children: (() => {
        const children: any[] = [];
        for (let j = 0; j < 4; j++) {
          children.push({
            id: `${index}-${j}`,
            type: "1",
            menuName: ["菜单1", "菜单2", "菜单3", "菜单4"][j],
            icon: "ion:document",
            permission: ["menu1:view", "menu2:add", "menu3:update", "menu4:del"][index],
            component: [
              "/dashboard/welcome/index",
              "/dashboard/analysis/index",
              "/dashboard/workbench/index",
              "/dashboard/test/index"
            ][j],
            orderNo: j + 1,
            createTime: "@datetime",
            "status|1": ["0", "1"],
            parentMenu: `${index}`,
            children: (() => {
              const children: any[] = [];
              for (let k = 0; k < 4; k++) {
                children.push({
                  id: `${index}-${j}-${k}`,
                  type: "2",
                  menuName: "按钮" + (j + 1) + "-" + (k + 1),
                  icon: "",
                  permission:
                    ["menu1:view", "menu2:add", "menu3:update", "menu4:del"][index] +
                    ":btn" +
                    (k + 1),
                  component: [
                    "/dashboard/welcome/index",
                    "/dashboard/analysis/index",
                    "/dashboard/workbench/index",
                    "/dashboard/test/index"
                  ][j],
                  orderNo: j + 1,
                  createTime: "@datetime",
                  "status|1": ["0", "1"],
                  parentMenu: `${index}-${j}`,
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
  }
] as MockMethod[];
