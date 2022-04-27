// import {getAllRoleList, isAccountExist} from '/@/api/demo/system';
import { BasicColumn, FormSchema } from "/@/components/Table";

export const columns: BasicColumn[] = [
  {
    title: "协议名称",
    dataIndex: "contractName",
    width: 200
  },
  {
    title: "编号",
    dataIndex: "contractNo",
    width: 200
  },
  {
    title: "协议时间",
    dataIndex: "startDate",
    width: 140
  },
  {
    title: "截止时间",
    dataIndex: "endDate",
    width: 140
  },
  {
    title: "甲方",
    dataIndex: "jiaFang",
    width: 120
  },
  {
    title: "乙方",
    dataIndex: "yiFang",
    width: 120
  },
  {
    title: "k值",
    dataIndex: "kValue",
    width: 120
  },
  {
    title: "销售人员",
    dataIndex: "salesMan",
    width: 120
  },
  {
    title: "服务费率",
    dataIndex: "serviceRate",
    width: 120
  },
  {
    title: "备注",
    dataIndex: "memo",
    width: 200
  }
];
export const contractDetailcolumns: BasicColumn[] = [
  {
    title: "基本税率",
    dataIndex: "basicRate",
    width: 120
  },
  {
    title: "成本税率",
    dataIndex: "costRate",
    width: 120
  },
  {
    title: "合作税率",
    dataIndex: "salesRate",
    width: 120
  }
];
export const searchFormSchema: FormSchema[] = [
  {
    field: "jiaFang",
    label: "甲方",
    component: "Input",
    colProps: { span: 8 }
  }
];
export const contractDetailSearchFormSchema: FormSchema[] = [
  {
    field: "employeeName",
    label: "员工姓名",
    component: "Input",
    colProps: { span: 8 }
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

//save弹框
export const modalFormSchema: FormSchema[] = [
  {
    field: "contractName",
    component: "Input",
    label: "协议名称",
    required: true
  },
  {
    field: "contractNo",
    component: "Input",
    label: "编号",
    required: true
  },
  {
    field: "startDate",
    component: "DatePicker",
    componentProps: {
      valueFormat: "YYYY-MM-DD"
    },
    label: "协议时间",
    required: true
  },
  {
    field: "endDate",
    component: "DatePicker",
    componentProps: {
      valueFormat: "YYYY-MM-DD"
    },
    label: "截止时间",
    required: true
  },
  {
    field: "enterpriseId",
    label: "甲方",
    component: "Select",
    required: true,
    componentProps: {
      fieldNames: {
        label: "enterpriseName",
        key: "id",
        value: "id"
      },
      // labelInValue: true,
      getPopupContainer: () => document.body
    }
  },
  {
    field: "yiFang",
    component: "Input",
    label: "乙方",
    required: true
  },
  /*{
    field: "jiaFang",
    component: "Input",
    label: "乙方",
    ifShow:false,
    required: true
  },*/
  {
    field: "kValue",
    component: "Input",
    label: "k值",
    required: true
  },
  {
    field: "salesMan",
    component: "Input",
    label: "销售人员",
    required: true
  },
  {
    field: "serviceRate",
    component: "Input",
    label: "服务费率",
    /*componentProps: ({ schema, formModel }) => {
      return {
        placeholder: '自定义placeholder',
        onChange: (e: any) => {
          console.log(e);
        },
      };
    },*/
    renderComponentContent: () => {
      return {
        suffix: () => "%"
      };
    },
    required: true
  },
  {
    label: "备注",
    field: "memo",
    component: "InputTextArea"
  }
];
export const contractDetailFormSchema: FormSchema[] = [
  {
    field: "basicRate",
    label: "基本-成本",
    helpMessage: ["基本税率-成本税率"],
    component: "Select",
    required: true
    /*componentProps: {
      fieldNames: {
        label: "enterpriseName",
        key: "id",
        value: "id"
      },
      getPopupContainer: () => document.body
    }*/
  },
  {
    label: "合作税率",
    field: "salesRate",
    component: "Input",
    required: true
  }
];
