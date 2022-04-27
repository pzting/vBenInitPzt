// import {getAllRoleList, isAccountExist} from '/@/api/demo/system';
import { BasicColumn } from "/@/components/Table";
import { FormSchema } from "/@/components/Table";
import { h } from "vue";
import { Tag } from "ant-design-vue";

export const columns: BasicColumn[] = [
  {
    title: "劳务状态",
    dataIndex: "invoiceStatus",
    width: 100,
    customRender: ({ record }) => {
      const enable = record.invoiceStatus;
      const color = enable == "UNPAID" ? "error" : enable == "PAID" ? "processing" : "success";
      const text = enable == "UNPAID" ? "未付款" : enable == "PAID" ? "待付款" : "已付款";
      return h(Tag, { color }, () => text);
    }
  },
  {
    title: "客户单位",
    dataIndex: "enterpriseName",
    width: 200
  },
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
    width: 120
  },
  {
    title: "结算款项",
    dataIndex: "billPay",
    width: 140
  },
  {
    title: "合同编号",
    dataIndex: "contractNo",
    width: 140
  },
  {
    title: "开票金额",
    dataIndex: "invoicePay",
    width: 120
  },
  {
    title: "k值",
    dataIndex: "kValue",
    width: 120
  },
  {
    title: "打款金额",
    dataIndex: "realPay",
    helpMessage: ["结算款项+劳务成本"],
    width: 120
  },
  {
    title: "收入",
    children: [
      {
        title: "服务费",
        dataIndex: "servicePay",
        helpMessage: "(开票金额/K)*服务费率",
        width: 120
      },
      {
        title: "税金",
        dataIndex: "taxSalesPay",
        helpMessage: "(开票金额/K)*合作费率",
        width: 120
      },
      {
        title: "总计",
        dataIndex: "totalPay",
        helpMessage: "服务费+税金",
        width: 120
      }
    ]
  },
  {
    title: "支出",
    children: [
      {
        title: "税金",
        dataIndex: "taxCostPay",
        helpMessage: "开票金额*成本费率",
        width: 120
      },
      {
        title: "劳务",
        dataIndex: "labourPay",
        helpMessage: "手动输入",
        width: 120
      },
      {
        title: "总计",
        dataIndex: "realTotalPay",
        helpMessage: "税金+劳务",
        width: 120
      }
    ]
  },

  {
    title: "上传的票据",
    dataIndex: "billFileNo",
    width: 120
  },

  {
    title: "劳务支出票据",
    dataIndex: "labourFileNo",
    width: 120
  },
  {
    title: "付款日期",
    dataIndex: "payTime",
    width: 100
  },
  {
    title: "创建日期",
    dataIndex: "createTime",
    width: 100
  },
  {
    title: "创建人",
    dataIndex: "createUserName",
    width: 100
  }
  /*{
    title: "enterpriseId",
    dataIndex: "enterpriseId",
    width: 100
  },
  {
    title: "contractId",
    dataIndex: "contractId",
    width: 100
  },
  {
    title: "contractRateId",
    dataIndex: "contractRateId",
    width: 100
  }*/
];
export const searchFormSchema: FormSchema[] = [
  /*{
    field: "enterpriseName",
    label: "客户单位",
    component: "ApiSelect",
    componentProps: ({ formActionType, formModel }) => {
      return {
        api: getDeptList,
        resultField: "items",
        showSearch: true,
        labelField: "enterpriseName",
        valueField: "enterpriseName",
        onChange: async (e: any) => {
          const contractListRes = await contractList({ enterpriseId: e });
          let contractListOptions = contractListRes.items;
          if (e === undefined) {
            contractListOptions = [];
          }
          formModel.contractId = undefined; //  reset city value
          formModel.contractRateId = undefined; //  reset city value
          const { updateSchema } = formActionType;
          updateSchema({
            field: "contractId",
            componentProps: {
              options: contractListOptions
            }
          });
        }
      };
    },
    colProps: { span: 8 }
  },
  {
    field: "contractId",
    label: "合同",
    component: "Select",
    componentProps: {
      fieldNames: {
        label: "contractNo",
        key: "id",
        value: "id"
      },
      getPopupContainer: () => document.body
    },
    colProps: { span: 8 }
  },*/
  {
    label: "劳务状态",
    field: "invoiceStatus",
    component: "Select",
    colProps: { span: 8 },
    componentProps: {
      options: [
        { label: "未付款", value: "UNPAID" },
        { label: "待付款", value: "PAID" },
        { label: "已付款", value: "CONFIRMED" }
      ]
    }
  }
];
export const modalFormSchema: FormSchema[] = [
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
  /*{
    field: "contractId",
    label: "合同",
    component: "Select",
    required: true,
    componentProps: {
      fieldNames: {
        label: "contractNo",
        key: "id",
        value: "id"
      },
      getPopupContainer: () => document.body
    }
  },*/
  // {
  //   field: "contractRateId",
  //   label: "合同税率",
  //   component: "Select",
  //   required: true
  //   /* componentProps: {
  //      fieldNames: {
  //        label: "basicRate",
  //        key: "id",
  //        value: "id"
  //      },
  //      getPopupContainer: () => document.body
  //    }*/
  // },
  {
    field: "realPay",
    component: "Input",
    label: "打款金额",
    helpMessage: ["结算款项+劳务成本"],
    required: true
  },
  {
    field: "billPay",
    component: "Input",
    label: "结算款项",
    required: true
  },
  {
    field: "invoicePay",
    component: "Input",
    label: "开票金额",
    required: true
  },
  {
    field: "labourPay",
    component: "Input",
    label: "劳务支出",
    required: true
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
export const confirmFormSchema: FormSchema[] = [
  {
    field: "payDate",
    component: "DatePicker",
    componentProps: {
      valueFormat: "YYYY-MM-DD"
    },
    label: "付款日期",
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
