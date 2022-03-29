import { BasicColumn } from "/@/components/Table";
import { FormSchema } from "/@/components/Table";

export const columns: BasicColumn[] = [
  {
    title: "登录账号",
    dataIndex: "accountName",
    width: 200
  },
  {
    title: "用户姓名",
    dataIndex: "username",
    width: 200
  }

];

export const searchFormSchema: FormSchema[] = [
  {
    field: "accountName",
    label: "登录账号",
    component: "Input",
    colProps: { span: 8 }
  }
];

export const formSchema: FormSchema[] = [
  {
    field: "username",
    label: "用户姓名",
    required: true,
    component: "Input"
  },
  {
    field: "accountName",
    label: "登录账号",
    required: true,
    component: "Input"
  },
  {
    field: "password",
    label: "登录密码",
    required: true,
    component: "InputPassword"
  },
  {
    field: "roleIds",
    component: "Select",
    label: "角色选择",
    slot: "roleIds",
    required: true
  }
];
export const formEditSchema: FormSchema[] = [
  {
    field: "username",
    label: "用户姓名",
    required: true,
    component: "Input"
  },
  {
    field: "roleIds",
    component: "Select",
    label: "角色选择",
    slot: "roleIds",
    required: true
  }
];
