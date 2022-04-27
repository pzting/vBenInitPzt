import { FormSchema } from "/@/components/Table";

export const uploadFormSchema: FormSchema[] = [
  {
    label: "缴费年月",
    field: "insuranceDate",
    component: "MonthPicker",
    componentProps: {
      valueFormat: "YYYY-MM-DD"
    },
    required: true
  },
  {
    label: "选择企业",
    field: "enterpriseId",
    slot: "enterpriseId",
    required: true,
    component: "Select"
  }
];
