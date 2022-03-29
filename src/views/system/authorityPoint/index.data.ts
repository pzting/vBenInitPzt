import { BasicColumn } from "/@/components/Table";
import { FormSchema } from "/@/components/Table";
// import {h} from 'vue';
// import {Tag} from 'ant-design-vue';
// import {Icon} from '/@/components/Icon';

export const columns: BasicColumn[] = [
  {
    title: "名称",
    dataIndex: "authPointName",
    width: 200,
    align: "left"
  },
  {
    title: "API",
    dataIndex: "url",
    width: 200,
    align: "left"
  },
  {
    title: "备注",
    dataIndex: "authPointDesc",
    width: 200,
    align: "left"
  },
  {
    title: "父权限点ID",
    dataIndex: "pid",
    width: 200,
    align: "left"
  },
  {
    title: "权限点ID",
    dataIndex: "authPointId",
    width: 200,
    align: "left"
  }
];

export const searchFormSchema: FormSchema[] = [
  {
    field: "authPointName",
    label: "名称",
    component: "Input",
    colProps: { span: 8 }
  }
];

export const formSchema: FormSchema[] = [
  {
    field: "pid",
    label: "父权限点ID",
    component: "Input",
    dynamicDisabled: true
  },
  {
    field: "authPointId",
    label: "权限点ID",
    component: "Input",
    dynamicDisabled: true
  },
  {
    field: "authPointName",
    label: "名称",
    component: "Input",
    required: true
  },
  {
    field: "url",
    label: "API",
    component: "Input"
  },
  {
    field: "authPointDesc",
    label: "备注",
    component: "InputTextArea"
  }
];
