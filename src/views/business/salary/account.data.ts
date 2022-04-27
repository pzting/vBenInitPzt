// import {getAllRoleList, isAccountExist} from '/@/api/demo/system';
import { BasicColumn } from "/@/components/Table";
import { FormSchema } from "/@/components/Table";
import { h } from "vue";
import { Tag } from "ant-design-vue";
import { contractList, getDeptList } from "/@/api/people";

export const columns: BasicColumn[] = [
  {
    title: "工资单状态",
    dataIndex: "salaryStatus",
    width: 120,
    customRender: ({ record }) => {
      const enable = record.salaryStatus;
      const color = enable == "UNPAID" ? "error" : enable == "PAID" ? "processing" : "success";
      let text = enable == "UNPAID" ? "未发放" : enable == "PAID" ? "待发放" : "已发放";
      if (!record.id) {
        text = "-";
      }
      return h(Tag, { color }, () => text);
    }
  },
  {
    title: "上传日期",
    dataIndex: "createTime",
    width: 100
  },
  {
    title: "客户单位",
    dataIndex: "enterpriseName",
    width: 240
  },
  {
    title: "开票金额",
    dataIndex: "invoicePay",
    width: 140
  },
  /*{
    title: "合同编号",
    dataIndex: "无无",
    width: 240
  },
  {
    title: "税率",
    dataIndex: "无无",
    width: 240
  },
  {
    title: "开票金额",
    dataIndex: "无无",
    width: 240
  },*/
  {
    title: "应发工资",
    dataIndex: "salaryPay",
    width: 120
  },
  {
    title: "社保扣款",
    dataIndex: "insurancePay",
    width: 120
  },
  {
    title: "个税",
    dataIndex: "taxPay",
    width: 120
  },
  {
    title: "实发工资",
    dataIndex: "realSalaryPay",
    width: 120
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
    title: "票据",
    dataIndex: "billFileNo",
    width: 120
  },
  {
    title: "发放日期",
    dataIndex: "payDate",
    width: 100
  },
  {
    title: "合同编号",
    dataIndex: "contractNo",
    width: 200
  },
  //结束
  {
    title: "基本税率(%)",
    dataIndex: "basicRate",
    width: 100
  },
  {
    title: "成本税率(%)",
    dataIndex: "costRate",
    width: 100
  },
  {
    title: "合作税率(%)",
    dataIndex: "salesRate",
    width: 100
  },
  {
    title: "服务费率(%)",
    dataIndex: "serviceRate",
    width: 100
  },
  {
    title: "备注",
    dataIndex: "memo",
    width: 200
  },
  {
    title: "上传人",
    dataIndex: "createUserName",
    width: 80
  },
  {
    title: "工资单年月",
    dataIndex: "salaryDate",
    // defaultHidden: true,
    width: 100
  },
  {
    title: "社保年月",
    dataIndex: "insuranceDate",
    // defaultHidden: true,
    width: 100
  },
  {
    title: "联系人",
    dataIndex: "contactName",
    defaultHidden: true,
    width: 80
  },
  {
    title: "联系人电话",
    dataIndex: "contactPhone",
    defaultHidden: true,
    width: 120
  },
  {
    title: "发工资人数",
    dataIndex: "employeeNum",
    defaultHidden: true,
    width: 100
  }
];
export const salaryDetailcolumns: BasicColumn[] = [
  {
    title: "姓名",
    dataIndex: "employeeName",
    width: 120
  },
  {
    title: "身份证",
    dataIndex: "idCard",
    width: 160
  },
  {
    title: "实发工资",
    dataIndex: "realSalaryPay",
    width: 100
  },
  {
    title: "工资日期",
    dataIndex: "salaryDate",
    width: 100
  },
  {
    title: "社保金额",
    dataIndex: "insurancePay",
    width: 100
  },
  {
    title: "工资",
    dataIndex: "salaryPay",
    width: 100
  },
  {
    title: "个税",
    dataIndex: "taxPay",
    width: 100
  },
  {
    title: "银行开户行",
    dataIndex: "bankAddress",
    width: 200
  },
  {
    title: "银行卡",
    dataIndex: "bankCard",
    width: 160
  },
  {
    title: "银行开户地",
    dataIndex: "bankCity",
    width: 120
  },
  {
    title: "银行名称",
    dataIndex: "bankName",
    width: 200
  },
  {
    title: "单位",
    dataIndex: "mainEnterprise",
    width: 200
  },
  {
    title: "二级",
    dataIndex: "subEnterprise",
    width: 200
  },
  {
    title: "三级",
    dataIndex: "team",
    width: 200
  },
  {
    title: "备注",
    dataIndex: "memo",
    width: 200
  },
  {
    title: "社保明细id",
    dataIndex: "insuranceDetailId",
    width: 120
  },
  {
    title: "工资单id",
    dataIndex: "salaryId",
    width: 200
  }
];
export const searchFormSchema: FormSchema[] = [
  /*{
    field: "enterpriseName",
    label: "客户单位",
    component: "ApiSelect",
    componentProps: {
      api: getDeptList,
      resultField: "items",
      showSearch: true,
      labelField: "enterpriseName",
      valueField: "enterpriseName"
    },
    colProps: { span: 8 }
  },*/
  // {
  //   field: "enterpriseName",
  //   label: "客户单位",
  //   component: "ApiSelect",
  //   /*componentProps: {
  //     api: getDeptList,
  //     resultField: "items",
  //     showSearch: true,
  //     labelField: "enterpriseName",
  //     valueField: "enterpriseName"
  //   },*/
  //   componentProps: ({ formActionType, formModel }) => {
  //     return {
  //       api: getDeptList,
  //       resultField: "items",
  //       showSearch: true,
  //       labelField: "enterpriseName",
  //       valueField: "enterpriseName",
  //       onChange: async (e: any) => {
  //         const contractListRes = await contractList({ enterpriseId: e });
  //         let contractListOptions = contractListRes.items;
  //         if (e === undefined) {
  //           contractListOptions = [];
  //         }
  //         formModel.contractId = undefined; //  reset city value
  //         formModel.contractRateId = undefined; //  reset city value
  //         const { updateSchema } = formActionType;
  //         updateSchema({
  //           field: "contractId",
  //           componentProps: {
  //             options: contractListOptions
  //           }
  //         });
  //       }
  //     };
  //   },
  //   colProps: { span: 8 }
  // },
  // {
  //   field: "contractId",
  //   label: "合同",
  //   component: "Select",
  //   componentProps: {
  //     fieldNames: {
  //       label: "contractNo",
  //       key: "id",
  //       value: "id"
  //     },
  //     getPopupContainer: () => document.body
  //   },
  //   colProps: { span: 8 }
  // },
  {
    label: "日期类型",
    field: "month",
    component: "Select",
    colProps: { span: 8 },
    defaultValue: 1,
    componentProps: {
      options: [
        { label: "按月查找", value: 1 },
        { label: "按年查找", value: 0 }
      ]
    }
  },
  {
    label: "工资单状态",
    field: "salaryStatus",
    component: "Select",
    colProps: { span: 8 },
    componentProps: {
      options: [
        { label: "未发放", value: "UNPAID" },
        { label: "待发放", value: "PAID" },
        { label: "已发放", value: "CONFIRMED" }
      ]
    }
  },
  {
    label: "工资单年月",
    field: "salaryDate",
    component: "MonthPicker",
    colProps: { span: 8 },
    componentProps: {
      valueFormat: "YYYY-MM-DD"
    }
  }
];
export const salaryDetailSearchFormSchema: FormSchema[] = [
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
    field: "salaryDate",
    component: "MonthPicker",
    componentProps: {
      valueFormat: "YYYY-MM-DD"
    },
    label: "工资单年月",
    required: true
  },
  {
    field: "insuranceDate",
    component: "MonthPicker",
    componentProps: {
      valueFormat: "YYYY-MM-DD"
    },
    label: "社保年月",
    required: true
  },
  /*{
    field: "enterpriseId",
    label: "客户单位",
    component: "Select",
    required: true,
    componentProps: {
      fieldNames: {
        label: "enterpriseName",
        key: "id",
        value: "id"
      },
      getPopupContainer: () => document.body
    }
  },*/
  {
    label: "备注",
    field: "memo",
    component: "InputTextArea"
  }
];
export const statusChangeFormSchema: FormSchema[] = [
  {
    field: "servicePay",
    component: "Input",
    label: "服务费金额",
    required: true
  },
  {
    field: "realSalaryPay",
    component: "Input",
    label: "实发工资总额",
    required: true
  },
  {
    field: "taxPay",
    component: "Input",
    label: "个税总额",
    required: true
  }
];
export const salaryConfirmFormSchema: FormSchema[] = [
  {
    field: "payDate",
    component: "DatePicker",
    componentProps: {
      valueFormat: "YYYY-MM-DD"
    },
    label: "发放日期",
    required: true
  }
  /*{
    field: "status",
    label: "社保状态",
    component: "Select",
    componentProps: {
      options: [
        { label: "已打款", value: "PAID" },
        { label: "已确认", value: "CONFIRMED" }
      ]
    },
    required: true
  }*/
];
export const salaryPaidFormSchema: FormSchema[] = [
  {
    field: "status",
    label: "社保状态",
    component: "Select",
    componentProps: {
      options: [
        { label: "已打款", value: "PAID" },
        { label: "已确认", value: "CONFIRMED" }
      ]
    },
    required: true
  }
];
export const salaryDetailFormSchema: FormSchema[] = [
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
    label: "应发工资",
    field: "salaryPay",
    component: "Input",
    required: true
  },
  {
    label: "备注",
    field: "memo",
    component: "InputTextArea"
  }
];
/*export const salaryColumns: BasicColumn[] = [
  {
    title: "身份证",
    dataIndex: "idCard",
    width: 120
  },
  {
    title: "社保金额",
    dataIndex: "insurancePay",
    width: 120
  },
  {
    title: "备注",
    dataIndex: "memo",
    width: 120
  },
  {
    title: "实发工资",
    dataIndex: "realSalaryPay",
    width: 180
  },
  {
    title: "工资日期",
    dataIndex: "salaryDate",
    width: 200
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
    title: "出勤天数",
    dataIndex: "workDays",
    width: 200
  }
];*/
