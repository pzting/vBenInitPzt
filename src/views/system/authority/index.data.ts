import { BasicColumn } from "/@/components/Table";
import { FormSchema } from "/@/components/Table";
// import {h} from 'vue';
// import {Tag} from 'ant-design-vue';
// import {Icon} from '/@/components/Icon';

export const columns: BasicColumn[] = [
  {
    title: "名称",
    dataIndex: "authName",
    width: 200,
    align: "left"
  },
  {
    title: "权限CODE",
    dataIndex: "authCode",
    width: 200,
    align: "left"
  },
  {
    title: "备注",
    dataIndex: "authDesc",
    width: 200,
    align: "left"
  },
  {
    title: "父权限ID",
    dataIndex: "parentAuthId",
    width: 200,
    align: "left"
  },
  {
    title: "权限ID",
    dataIndex: "authId",
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
    field: "parentAuthId",
    label: "父权限点",
    component: "Input",
    dynamicDisabled: true
  },
  {
    field: "authId",
    label: "权限点",
    component: "Input",
    dynamicDisabled: true
  },
  {
    field: "authName",
    label: "名称",
    component: "Input",
    required: true
  },
  {
    field: "authCode",
    label: "权限CODE",
    component: "Input",
    required: true
  },
  {
    field: "authDesc",
    label: "备注",
    component: "InputTextArea"
  },
  {
    label: "权限点",
    field: "authIds",
    slot: "authIds",
    component: "Input"
  }
];
