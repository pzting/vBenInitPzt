import { BasicColumn } from "/@/components/Table";
import { FormSchema } from "/@/components/Table";
import { title } from "/@/hooks/web/useI18n";

export const columns: BasicColumn[] = [
  {
    title: title("system.user.account"),
    dataIndex: "accountName",
    width: 200
  },
  {
    title: title("system.user.userName"),
    dataIndex: "username",
    width: 200
  }

];

export const searchFormSchema: FormSchema[] = [
  {
    field: "accountName",
    label: title("system.user.account"),
    component: "Input",
    colProps: { span: 8 }
  }
];

export const formSchema: FormSchema[] = [
  {
    field: "username",
    label: title("system.user.userName"),
    required: true,
    component: "Input"
  },
  {
    field: "accountName",
    label: title("system.user.account"),
    required: true,
    component: "Input"
  },
  {
    field: "password",
    label: title("system.user.password"),
    required: true,
    component: "InputPassword"
  },
  {
    field: "roleIds",
    component: "Select",
    label: title("system.user.role"),
    slot: "roleIds",
    required: true
  }
];
export const formEditSchema: FormSchema[] = [
  {
    field: "username",
    label: title("system.user.userName"),
    required: true,
    component: "Input"
  },
  {
    field: "roleIds",
    component: "Select",
    label: title("system.user.role"),
    slot: "roleIds",
    required: true
  }
];
