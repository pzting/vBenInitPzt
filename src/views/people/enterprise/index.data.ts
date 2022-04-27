import { BasicColumn } from "/@/components/Table";
import { FormSchema } from "/@/components/Table";
import { h } from "vue";
import { Tag } from "ant-design-vue";

export const columns: BasicColumn[] = [
  {
    title: "名称",
    dataIndex: "enterpriseName",
    width: 160,
    align: "left"
  },
  {
    title: "联系人",
    dataIndex: "contactName",
    width: 160,
    align: "left"
  },
  {
    title: "手机号",
    dataIndex: "contactPhone",
    width: 160,
    align: "left"
  },
  {
    title: "员工数",
    dataIndex: "employeeNum",
    width: 160,
    align: "left"
  },
  {
    title: "K值",
    dataIndex: "kValue",
    width: 160,
    align: "left"
  },
  {
    title: "管理费",
    dataIndex: "service",
    width: 160,
    align: "left"
  },
  {
    title: "税金",
    dataIndex: "tax",
    width: 160,
    align: "left"
  },
  /* {
     title: '公司path',
     dataIndex: 'path',
     width: 160,
     align: 'left',
   },*/
  {
    title: "类型",
    dataIndex: "type",
    width: 80,
    customRender: ({ record }) => {
      const status = record.type;
      let text = "";
      if (status === "MAIN") {
        text = "主公司";
      } else if (status === "SUB") {
        text = "分公司";
      } else {
        text = "队伍";
      }
      return h(Tag, {}, () => text);
    }
  }
  /*{
    title: '状态',
    dataIndex: 'status',
    width: 80,
    customRender: ({ record }) => {
      const status = record.status;
      const enable = ~~status === 0;
      const color = enable ? 'green' : 'red';
      const text = enable ? '启用' : '停用';
      return h(Tag, { color: color }, () => text);
    },
  },*/
];

export const searchFormSchema: FormSchema[] = [
  {
    field: "enterpriseName",
    label: "名称",
    component: "Input",
    colProps: { span: 8 }
  }
  /* {
     field: 'status',
     label: '状态',
     component: 'Select',
     componentProps: {
       options: [
         { label: '启用', value: '0' },
         { label: '停用', value: '1' },
       ],
     },
     colProps: { span: 8 },
   },*/
];

export const formSchema: FormSchema[] = [
  {
    field: "enterpriseName",
    label: "名称",
    component: "Input",
    required: true
  },
  {
    field: "parentId",
    label: "上级企业",
    component: "TreeSelect",
    componentProps: {
      fieldNames: {
        label: "enterpriseName",
        key: "id",
        value: "id"
      },
      getPopupContainer: () => document.body
    }
  },
  {
    field: "contactName",
    label: "联系人",
    component: "Input"
  },
  {
    field: "contactPhone",
    label: "手机号",
    component: "Input",
    componentProps: {
      maxlength: 11
    }
  },
  {
    field: "kValue",
    label: "K值",
    component: "Input"
  },
  {
    field: "service",
    label: "管理费",
    component: "Input"
  },
  {
    field: "tax",
    label: "税金",
    component: "Input"
  }
];
