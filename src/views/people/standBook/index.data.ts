// import {getAllRoleList, isAccountExist} from '/@/api/demo/system';
import { BasicColumn } from "/@/components/Table";
import { FormSchema } from "/@/components/Table";
import { h } from "vue";
import { Tag } from "ant-design-vue";
import { contractList, getDeptList } from "/@/api/people";

export const columns: BasicColumn[] = [
  {
    title: "客户单位",
    dataIndex: "enterpriseName",
    width: 200
  },
  {
    title: "合同编号",
    dataIndex: "contractNo",
    width: 200
  },
  {
    title: "总支出",
    dataIndex: "realTotalPay",
    width: 80
  },
  {
    title: "总收入",
    dataIndex: "totalPay",
    width: 100
  },
  {
    title: "销售人员",
    dataIndex: "salesMan",
    width: 100
  },
  {
    title: "毛利",
    dataIndex: "totalProfit",
    width: 100
  },
  {
    title: "详情类",
    dataIndex: "fromType",
    width: 100,
    customRender: ({ record }) => {
      const enable = record.fromType;
      const color = enable == "SALARY" ? "success" : enable == "INVOICE" ? "processing" : "default";
      const text = enable == "SALARY" ? "工资单" : enable == "INVOICE" ? "劳务单" : "-";
      return h(Tag, { color }, () => text);
    }
  }

];

export const searchFormSchema: FormSchema[] = [
  // {
  //   field: "enterpriseName",
  //   label: "客户单位",
  //   component: "ApiSelect",
  //   /*componentProps: {
  //     api: getDeptList,
  //     resultField: "items",
  //     showSearch: true,
  //     labelField: "enterpriseName",
  //     valueField: "enterpriseName"
  //   },*/
  //   componentProps: ({ formActionType, formModel }) => {
  //     return {
  //       api: getDeptList,
  //       resultField: "items",
  //       showSearch: true,
  //       labelField: "enterpriseName",
  //       valueField: "enterpriseName",
  //       onChange: async (e: any) => {
  //         const contractListRes = await contractList({ enterpriseId: e });
  //         let contractListOptions = contractListRes.items;
  //         if (e === undefined) {
  //           contractListOptions = [];
  //         }
  //         formModel.contractId = undefined; //  reset city value
  //         formModel.contractRateId = undefined; //  reset city value
  //         const { updateSchema } = formActionType;
  //         updateSchema({
  //           field: "contractId",
  //           componentProps: {
  //             options: contractListOptions
  //           }
  //         });
  //       }
  //     };
  //   },
  //   colProps: { span: 8 }
  // },
  /*{
    field: "contractId",
    label: "合同",
    component: "Select",
    componentProps: {
      fieldNames: {
        label: "contractNo",
        key: "id",
        value: "id"
      },
      getPopupContainer: () => document.body
    },
    colProps: { span: 8 }
  }*/
];

