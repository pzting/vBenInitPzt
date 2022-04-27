// import {getAllRoleList, isAccountExist} from '/@/api/demo/system';
import { BasicColumn, FormSchema } from "/@/components/Table";
import { title } from "/@/hooks/web/useI18n";

export const columns: BasicColumn[] = [
  {
    title: title("currencyTraders.currencyUserList.phone"),
    dataIndex: "phone",
    width: 200
  },
  {
    title: "password",
    dataIndex: "password",
    width: 200
  },
  {
    title: "score",
    dataIndex: "score",
    width: 140
  },
  {
    title: "loginIP",
    dataIndex: "loginIP",
    width: 140
  },
  {
    title: "loginDate",
    dataIndex: "loginDate",
    width: 120
  },
  {
    title: "createDate",
    dataIndex: "createDate",
    width: 120
  }
];
export const searchFormSchema: FormSchema[] = [
  {
    field: "phone",
    label: "phone",
    component: "Input",
    colProps: { span: 8 }
  }
];

//save弹框
export const saveModalFormSchema: FormSchema[] = [
  {
    field: "score",
    component: "Input",
    label: "score",
    required: true
  }
  /** 2022/4/27
   *作者:pzt
   *内容:模板示例
   **/
  /* {
     field: "createDate",
     component: "DatePicker",
     componentProps: {
       valueFormat: "YYYY-MM-DD"
     },
     label: "createDate",
     required: true
   },*/
  /*{
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
  },*/
  /*{
    field: "score",
    component: "Input",
    label: "score",
    /!*componentProps: ({ schema, formModel }) => {
      return {
        placeholder: '自定义placeholder',
        onChange: (e: any) => {
          console.log(e);
        },
      };
    },*!/
    renderComponentContent: () => {
      return {
        suffix: () => "%"
      };
    },
    required: true
  },*/
];
