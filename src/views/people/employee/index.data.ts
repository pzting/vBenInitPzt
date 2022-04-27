// import {getAllRoleList, isAccountExist} from '/@/api/demo/system';
import { BasicColumn } from "/@/components/Table";
import { FormSchema } from "/@/components/Table";
import { h } from "vue";
import { Tag } from "ant-design-vue";

export const columns: BasicColumn[] = [
  {
    title: "工资状态",
    dataIndex: "employeeStatus",
    width: 140,
    customRender: ({ record }) => {
      const enable = record.employeeStatus;
      // const color = enable ? "green" : "red";
      const color = enable == "NORMAL" ? "green" : enable == "NO_CONTRACT" ? "red" : "red";
      const text = enable == "NORMAL" ? "正常" : enable == "NO_CONTRACT" ? "未签合同发工资" : "3个月未发工资";
      return h(Tag, { color: color }, () => text);
    }
  },
  {
    title: "员工状态",
    dataIndex: "work",
    width: 80,
    customRender: ({ record }) => {
      const enable = record.work;
      const color = enable ? "green" : "red";
      const text = enable ? "在职" : "离职";
      return h(Tag, { color: color }, () => text);
    }
  },
  {
    title: "缴纳社保",
    dataIndex: "hasInsurance",
    width: 80,
    customRender: ({ record }) => {
      const enable = record.hasInsurance;
      const color = enable ? "green" : "red";
      const text = enable ? "已缴纳" : "未缴纳";
      return h(Tag, { color: color }, () => text);
    }
  },
  {
    title: "银行开户行",
    dataIndex: "bankAddress",
    width: 240
  },
  {
    title: "银行卡",
    dataIndex: "bankCard",
    width: 160
  },
  {
    title: "银行开户地",
    dataIndex: "bankCity",
    width: 140
  },
  {
    title: "银行名称",
    dataIndex: "bankName",
    width: 160
    // align: 'left',
    // resizable: true
  },
  {
    title: "合同到期日期",
    dataIndex: "contractEndDate",
    width: 120
    // auth: 'admin',
    /*  customRender: ({text}) => {
        return `<h1>${new Date(text).toLocaleDateString()}</h1>>`
      }*/
  },
  {
    title: "合同开始日期",
    dataIndex: "contractStartDate",
    width: 120
  },
  {
    title: "姓名",
    dataIndex: "employeeName",
    width: 100
  },
  {
    title: "身份证",
    dataIndex: "idCard",
    width: 160
  },
  {
    title: "手机号",
    dataIndex: "phone",
    width: 100
  },
  {
    title: "工资",
    dataIndex: "salaryPay",
    width: 100
  },
  {
    title: "合同类型",
    dataIndex: "contractType",
    width: 200
  },
  {
    title: "备注",
    dataIndex: "memo",
    width: 200
  }
];

export const searchFormSchema: FormSchema[] = [
  //employeeName
  {
    field: "employeeName",
    label: "姓名",
    component: "Input",
    colProps: { span: 6 }
  },
  {
    field: "phone",
    label: "手机号",
    component: "Input",
    colProps: { span: 6 }
  },
  {
    label: "工资状态",
    field: "employeeStatus",
    component: "Select",
    colProps: { span: 6 },
    componentProps: {
      options: [
        { label: "正常", value: "NORMAL" },
        { label: "未签合同发工资", value: "NO_CONTRACT" },
        { label: "3个月未发工资", value: "NO_SALARY" }
      ]
    }
  },
  {
    label: "员工状态",
    field: "work",
    component: "Select",
    colProps: { span: 6 },
    componentProps: {
      options: [
        { label: "在职", value: "true" },
        { label: "离职", value: "false" }
      ]
    }
  }
];
export const moveFormSchema: FormSchema[] = [
  {
    field: "enterpriseId",
    label: "所属企业",
    component: "TreeSelect",
    componentProps: {
      fieldNames: {
        label: "enterpriseName",
        key: "id",
        value: "id"
      },
      getPopupContainer: () => document.body
    },
    required: true
  }
];
export const accountFormSchema: FormSchema[] = [
  {
    field: "enterpriseId",
    label: "所属企业",
    component: "TreeSelect",
    componentProps: {
      fieldNames: {
        label: "enterpriseName",
        key: "id",
        value: "id"
      },
      getPopupContainer: () => document.body
    },
    required: true
  },
  {
    field: "bankAddress",
    label: "银行开户行",
    component: "Input",
    required: true
  },

  {
    label: "银行卡",
    field: "bankCard",
    component: "Input",
    required: true
  },
  {
    label: "银行开户地",
    field: "bankCity",
    component: "Input",
    required: true
  },
  {
    label: "银行名称",
    field: "bankName",
    component: "Input",
    required: true
  },
  {
    label: "合同到期日期",
    field: "contractEndDate",
    component: "DatePicker",
    componentProps: {
      valueFormat: "YYYY-MM-DD"
    },
    required: true
  },
  {
    label: "合同开始日期",
    field: "contractStartDate",
    component: "DatePicker",
    componentProps: {
      valueFormat: "YYYY-MM-DD"
    },
    required: true
  },
  {
    label: "姓名",
    field: "employeeName",
    component: "Input",
    required: true
  },
  {
    label: "身份证",
    field: "idCard",
    component: "Input",
    required: true
  },
  {
    label: "手机号",
    field: "phone",
    component: "Input",
    required: true
  },
  {
    label: "工资",
    field: "salaryPay",
    component: "Input",
    required: true
  },
  {
    label: "员工状态",
    field: "work",
    component: "Select",
    componentProps: {
      options: [
        { label: "在职", value: true },
        { label: "离职", value: false }
      ]
    },
    required: true
  },
  {
    label: "缴纳社保",
    field: "hasInsurance",
    component: "Select",
    componentProps: {
      options: [
        { label: "已缴纳", value: true },
        { label: "未缴纳", value: false }
      ]
    },
    required: true
  },
  {
    label: "合同类型",
    field: "contractType",
    component: "Input"
  },
  {
    label: "备注",
    field: "memo",
    component: "InputTextArea"
  }
];
export const salaryColumns: BasicColumn[] = [
  {
    title: "身份证",
    dataIndex: "idCard",
    width: 120
  },
  {
    title: "工资",
    dataIndex: "salaryPay",
    width: 200
  },
  {
    title: "个税",
    dataIndex: "taxPay",
    width: 200
  },
  {
    title: "社保金额",
    dataIndex: "insurancePay",
    width: 120
  },
  {
    title: "实发工资",
    dataIndex: "realSalaryPay",
    width: 180
  },
  {
    title: "备注",
    dataIndex: "memo",
    width: 120
  },
  {
    title: "工资日期",
    dataIndex: "salaryDate",
    width: 200
  },
  {
    title: "出勤天数",
    dataIndex: "workDays",
    width: 200
  }
];
