// import {getAllRoleList, isAccountExist} from '/@/api/demo/system';
import { BasicColumn } from "/@/components/Table";
import { FormSchema } from "/@/components/Table";
import { h } from "vue";
import { Tag } from "ant-design-vue";
import { getDeptList } from "/@/api/people";

export const columns: BasicColumn[] = [
  {
    title: "企业名称",
    resizable: true,
    sorter: true,
    dataIndex: "enterpriseName",
    width: 260
  },
  {
    title: "员工数",
    dataIndex: "employeeNum",
    width: 80
  },
  {
    title: "缴费年月",
    dataIndex: "insuranceDate",
    sorter: true,
    width: 100
  },
  {
    title: "支出",
    children: [
      {
        title: "支出状态",
        dataIndex: "payStatus",
        width: 80,
        customRender: ({ record }) => {
          const enable = record.payStatus;
          const color = enable == "UNPAID" ? "error" : enable == "PAID" ? "success" : "";
          const text = enable == "UNPAID" ? "未打款" : enable == "PAID" ? "已打款" : "-";
          return h(Tag, { color }, () => text);
        }
      },
      {
        title: "服务费(支出)",
        dataIndex: "insuranceServicePay",
        width: 100
      },
      {
        title: "总计(支出)",
        dataIndex: "insuranceTotalPay",
        width: 100
      }
    ]
  },
  {
    title: "收入",
    children: [
      {
        title: "收入状态",
        dataIndex: "incomeStatus",
        width: 100,
        customRender: ({ record }) => {
          const enable = record.incomeStatus;
          const color = enable == "UNRECEIVED" ? "error" : enable == "RECEIVED" ? "success" : "";
          const text = enable == "UNRECEIVED" ? "未到账" : enable == "RECEIVED" ? "已收款" : "-";
          return h(Tag, { color }, () => text);
        }
      },
      {
        title: "服务费(收入)",
        dataIndex: "servicePay",
        width: 100
      },
      {
        title: "总计(收入)",
        dataIndex: "totalPay",
        width: 100
      },
      {
        title: "收入票据上传",
        dataIndex: "billFileNo",
        key: "billFileNo",
        width: 120
      }
    ]
  },
  {
    title: "社保/公积金个人金额",
    dataIndex: "employeePay",
    width: 200
  },
  {
    title: "社保/公积金",
    dataIndex: "enterprisePay",
    width: 200
  },
  {
    title: "上传人",
    dataIndex: "createUserName",
    width: 100
  }

  /*{
    title: "社保对应excel文件",
    dataIndex: "insuranceFileNo",
    width: 200
  },*/


];

export const searchFormSchema: FormSchema[] = [
  {
    field: "enterpriseName",
    label: "企业名称",
    component: "ApiSelect",
    componentProps: {
      api: getDeptList,
      resultField: "items",
      showSearch: true,
      labelField: "enterpriseName",
      valueField: "enterpriseName"
    },
    colProps: { span: 6 }
  },
  {
    label: "缴费年月",
    field: "insuranceDate",
    component: "MonthPicker",
    colProps: { span: 6 },
    componentProps: {
      valueFormat: "YYYY-MM-DD"
    }
  },
  {
    label: "收入状态",
    field: "incomeStatus",
    component: "Select",
    colProps: { span: 6 },
    componentProps: {
      options: [
        { label: "未到账", value: "UNRECEIVED" },
        { label: "已收款", value: "RECEIVED" }
      ]
    }
  },
  {
    label: "支出状态",
    field: "payStatus",
    component: "Select",
    colProps: { span: 6 },
    componentProps: {
      options: [
        { label: "未打款", value: "UNPAID" },
        { label: "已打款", value: "PAID" }
      ]
    }
  }
];
export const searchMonthDetailFormSchema: FormSchema[] = [
  {
    label: "缴费年月",
    field: "insuranceDate",
    component: "MonthPicker",
    colProps: { span: 8 },
    componentProps: {
      valueFormat: "YYYY-MM-DD"
    }
  }
];
export const searchDetailPageFormSchema: FormSchema[] = [
  {
    field: "employeeName",
    label: "员工姓名",
    component: "Input",
    colProps: { span: 8 }
  }
  /*{
    field: 'nickname',
    label: '昵称',
    component: 'Input',
    colProps: {span: 8},
  },*/
];
export const moveFormSchema: FormSchema[] = [
  {
    field: "enterpriseId",
    label: "所属部门",
    component: "TreeSelect",
    componentProps: {
      fieldNames: {
        title: "enterpriseName",
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
    label: "所属部门",
    component: "TreeSelect",
    componentProps: {
      fieldNames: {
        title: "enterpriseName",
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
  }
];
export const insuranceDetailPageColumns: BasicColumn[] = [
  {
    title: "社保状态",
    dataIndex: "current",
    width: 80,
    customRender: ({ record }) => {
      const enable = record.current;
      const color = enable ? "processing" : "success";
      const text = enable ? "当月社保" : "补缴社保";
      return h(Tag, { color }, () => text);
    }
  },
  {
    title: "员工姓名",
    dataIndex: "employeeName",
    width: 120
  },
  {
    title: "社保/公积金个人金额",
    dataIndex: "employeePay",
    width: 220
  },
  {
    title: "社保/公积金个人实付金额(包含补缴金额)",
    dataIndex: "employeeRealPay",
    width: 280
  },
  {
    title: "本月社保/公积金",
    dataIndex: "enterprisePay",
    width: 220
  },
  {
    title: "社保/公积金企业实付金额(包含补缴金额)",
    dataIndex: "enterpriseRealPay",
    width: 280
  },
  {
    title: "身份证",
    dataIndex: "idCard",
    width: 200
  },
  {
    title: "年月",
    dataIndex: "insuranceDate",
    width: 120
  },
  {
    title: "备注",
    dataIndex: "memo",
    width: 120
  },
  {
    title: "社保id",
    dataIndex: "insuranceId",
    width: 120
  }
];
export const monthDetailColumns: BasicColumn[] = [
  {
    title: "社保状态",
    dataIndex: "current",
    width: 80,
    customRender: ({ record }) => {
      const enable = record.current;
      const color = enable ? "processing" : "success";
      const text = enable ? "当月社保" : "补缴社保";
      return h(Tag, { color }, () => text);
    }
  },
  {
    title: "社保/公积金个人金额",
    dataIndex: "employeePay",
    width: 120
  },
  {
    title: "社保/公积金",
    dataIndex: "enterprisePay",
    width: 120
  },
  {
    title: "年月",
    dataIndex: "insuranceDate",
    width: 120
  },
  {
    title: "备注",
    dataIndex: "memo",
    width: 120
  }
];
export const monthPayColumns: BasicColumn[] = [
  {
    title: "社保状态",
    dataIndex: "current",
    width: 80,
    customRender: ({ record }) => {
      const enable = record.current;
      const color = enable ? "processing" : "success";
      const text = enable ? "当月社保" : "补缴社保";
      return h(Tag, { color }, () => text);
    }
  },
  {
    title: "社保/公积金个人金额",
    dataIndex: "employeePay",
    width: 120
  },
  {
    title: "社保/公积金",
    dataIndex: "enterprisePay",
    width: 120
  },
  {
    title: "年月",
    dataIndex: "insuranceDate",
    width: 120
  },
  {
    title: "备注",
    dataIndex: "memo",
    width: 120
  }
];
