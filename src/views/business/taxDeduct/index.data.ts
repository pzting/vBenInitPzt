// import {getAllRoleList, isAccountExist} from '/@/api/demo/system';
import { BasicColumn } from "/@/components/Table";
import { FormSchema } from "/@/components/Table";
// import {h} from 'vue';
// import {Tag} from 'ant-design-vue';
// import {t} from '/@/hooks/web/useI18n';

export const columns: BasicColumn[] = [
  {
    title: "姓名",
    dataIndex: "employeeName",
    width: 120
  },
  {
    title: "年份",
    dataIndex: "taxDeductDate",
    width: 200
  },
  {
    title: "身份证",
    dataIndex: "idCard",
    width: 200
  },
  {
    title: "子女教育",
    dataIndex: "childrenEdu",
    width: 120
  },
  {
    title: "继续教育",
    dataIndex: "continueEdu",
    width: 120
  },

  {
    title: "住房贷款/租金",
    dataIndex: "houseRent",
    width: 180
  },

  {
    title: "大病医疗",
    dataIndex: "illnessMedical",
    width: 200
  },
  {
    title: "赡养老人",
    dataIndex: "supportElderly",
    width: 200
  },

  {
    title: "总计",
    dataIndex: "taxDeductTotal",
    width: 200
  }
];

export const searchFormSchema: FormSchema[] = [
  {
    field: "employeeName",
    label: "姓名",
    component: "Input",
    colProps: { span: 8 }
  },
  {
    label: "年份",
    field: "taxDeductDate",
    component: "YearPicker",
    componentProps: {
      valueFormat: "YYYY-MM-DD"
    },
    colProps: { span: 8 }
  }
];
export const modalFormSchema: FormSchema[] = [
  {
    field: "employeeName",
    label: "姓名",
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
    label: "年份",
    field: "taxDeductDate",
    component: "YearPicker",
    componentProps: {
      valueFormat: "YYYY-MM-DD"
    },
    required: true
  },
  {
    field: "childrenEdu",
    label: "子女教育",
    component: "Input",
    required: true
  },
  {
    field: "continueEdu",
    label: "继续教育",
    component: "Input",
    required: true
  },

  {
    label: "住房贷款/租金",
    field: "houseRent",
    component: "Input",
    required: true
  },

  {
    label: "大病医疗",
    field: "illnessMedical",
    component: "Input",
    required: true
  },
  {
    label: "赡养老人",
    field: "supportElderly",
    component: "Input",
    required: true
  }
];
export const uploadFormSchema: FormSchema[] = [
  {
    label: "年份",
    field: "taxDeductDate",
    component: "YearPicker",
    componentProps: {
      valueFormat: "YYYY-MM-DD"
    },
    required: true
  }
];
