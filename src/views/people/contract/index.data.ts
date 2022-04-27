import { FormSchema } from "/@/components/Table";

export const uploadFormSchema: FormSchema[] = [
  {
    label: "工资单年月",
    field: "salaryDate",
    component: "MonthPicker",
    componentProps: {
      valueFormat: "YYYY-MM-DD"
    },
    required: true
  },
  {
    label: "客户单位",
    field: "enterpriseId",
    slot: "enterpriseId",
    required: true,
    component: "Select"
  },
  {
    label: "备注",
    field: "memo",
    component: "InputTextArea"
  }
];
