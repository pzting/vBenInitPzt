import { BasicColumn } from "/@/components/Table";
import { FormSchema } from "/@/components/Table";
// import { h } from 'vue';
// import { Switch } from 'ant-design-vue';
// import { setRoleStatus } from '/@/api/demo/system';
// import { useMessage } from '/@/hooks/web/useMessage';

export const columns: BasicColumn[] = [
  {
    title: "角色名称",
    dataIndex: "roleName",
    width: 200
  }
  /*{
    title: '状态',
    dataIndex: 'status',
    width: 120,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.status === '1',
        checkedChildren: '已启用',
        unCheckedChildren: '已禁用',
        loading: record.pendingStatus,
        onChange(checked: boolean) {
          record.pendingStatus = true;
          const newStatus = checked ? '1' : '0';
          const { createMessage } = useMessage();
          setRoleStatus(record.id, newStatus)
            .then(() => {
              record.status = newStatus;
              createMessage.success(`已成功修改角色状态`);
            })
            .catch(() => {
              createMessage.error('修改角色状态失败');
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
    },
  },*/
];

export const searchFormSchema: FormSchema[] = [
  {
    field: "roleNme",
    label: "角色名称",
    component: "Input",
    colProps: { span: 8 }
  }
];

export const formSchema: FormSchema[] = [
  {
    field: "roleName",
    label: "角色名称",
    required: true,
    component: "Input"
  },
  {
    label: "数据权限",
    field: "dataAuthIds",
    slot: "dataAuthIds",
    component: "Select"
  },
  {
    label: "页面权限",
    field: "authIds",
    slot: "authIds",
    component: "Input"
  }
];
