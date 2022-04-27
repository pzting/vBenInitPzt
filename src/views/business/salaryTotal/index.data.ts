// import {getAllRoleList, isAccountExist} from '/@/api/demo/system';
import { BasicColumn } from "/@/components/Table";
import { FormSchema } from "/@/components/Table";
import { h } from "vue";
import { Tag } from "ant-design-vue";

export const columns: BasicColumn[] = [
  {
    title: "企业名",
    dataIndex: "enterpriseName",
    width: 180
  },
  {
    title: "实发工资总额",
    dataIndex: "realSalaryPay",
    width: 200
  },
  {
    title: "发放日期",
    dataIndex: "payDate",
    width: 200
  },
  {
    title: "个税总额",
    dataIndex: "taxPay",
    width: 200
  },
  {
    title: "收入",
    children: [
      {
        title: "服务费",
        dataIndex: "servicePay",
        width: 120
      },
      {
        title: "税金",
        dataIndex: "taxSalesPay",
        width: 120
      },
      {
        title: "收入总计",
        helpMessage: ["服务费金额 + 税金收入"],
        dataIndex: "totalPay",
        width: 120
      }
    ]
  },
  {
    title: "税金支出",
    dataIndex: "taxCostPay",
    width: 120
  },
  {
    title: "总计金额",
    dataIndex: "totalPay",
    width: 200
  }
];
export const searchFormSchema: FormSchema[] = [
  {
    label: "日期类型",
    field: "month",
    component: "Select",
    colProps: { span: 8 },
    defaultValue: "true",
    componentProps: {
      options: [
        { label: "按月查找", value: "true" },
        { label: "按年查找", value: "false" }
      ]
    }
  }
];
