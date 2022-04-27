import { FormSchema } from "/@/components/Table";
import { contractList, contractRateList, getDeptList } from "/@/api/people";

export const contractLevelSearchFormSchema: FormSchema[] = [
  {
    field: "enterpriseName",
    label: "客户单位",
    component: "ApiSelect",
    componentProps: ({ formActionType, formModel }) => {
      let tempOptions: any = [];
      return {
        api: getDeptList,
        resultField: "items",
        showSearch: true,
        // labelInValue: true,
        // valueField: "id",
        labelField: "enterpriseName",
        valueField: "enterpriseName",
        onOptionsChange: (options) => {
          if (tempOptions.length == 0) {
            tempOptions = [...options];
          }
          console.log("get options", options.length, options);
        },
        onChange: async (e: any) => {
          console.log("onChange");
          let contractListOptions = [];
          if (e !== undefined) {
            // const treeDataRes = await getDeptList({});
            console.log(tempOptions, "tempOptions");
            //前提是客户单位不能重名
            const enterpriseIds = tempOptions.filter(item => item.label == e);
            console.log(enterpriseIds, "enterpriseIds");
            const contractListRes = await contractList({ enterpriseId: enterpriseIds[0].id });
            // const contractListRes =   await contractList({ enterpriseId: e?.value }) ;
            // formModel.enterpriseName = e?.label;
            contractListOptions = contractListRes.items;
          }
          formModel.contractId = undefined; //  reset city value
          const { updateSchema } = formActionType;
          updateSchema({
            field: "contractId",
            componentProps: {
              options: contractListOptions
            }
          });
        }
      };
    },
    colProps: { span: 8 }
  },
  {
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
  }
];

export const contractLevelModalFormSchema: FormSchema[] = [
  /*{
    label: "数据权限",
    field: "dataAuthIds",
    slot: "enterpriseId",
    component: "Select"
  },*/
  {
    field: "enterpriseId",
    // slot: "enterpriseId",
    label: "客户单位",
    component: "ApiSelect",
    required: true,
    componentProps: ({ schema, formActionType, formModel }) => {
      const { updateSchema } = formActionType;
      console.log(formModel, "componentProps");
      //&& !formModel.contractRateId
      if (formModel.enterpriseId) {
        formActionType.clearValidate("enterpriseId");
        contractList({ enterpriseId: formModel.enterpriseId }).then(res => {
          const contractListOptions = res?.items;
          updateSchema({
            field: "contractId",
            componentProps: {
              fieldNames: {
                label: "contractNo",
                key: "id",
                value: "id"
              },
              showSearch: true,
              allowClear: false,
              options: contractListOptions,
              onChange: async () => {
                formModel.contractRateId = undefined; //  reset city value
                updateSchema({
                  field: "contractRateId",
                  componentProps: {
                    options: []
                  }
                });
              }

            }
          });
        });
      } else {
        formModel.contractId = undefined; //  reset city value
        formModel.contractRateId = undefined; //  reset city value
      }
      if (formModel.contractId) {
        contractRateList({ contractId: formModel.contractId }).then(res => {
          let contractRateListOptions = res?.items.map(item => {
            return {
              value: item.id,
              label: `基本税率${item.basicRate}%-成本税率${item.costRate}%-合作税率${item.salesRate}%`
            };
          });
          updateSchema({
            field: "contractRateId",
            componentProps: {
              allowClear: false,
              options: contractRateListOptions
            }
          });
        });
      } else {
        formModel.contractRateId = undefined; //  reset city value
      }
      return {
        api: getDeptList,
        resultField: "items",
        showSearch: true,
        allowClear: false,
        labelField: "enterpriseName",
        valueField: "id",
        onChange: async () => {
          formModel.contractId = undefined; //  reset city value
          formModel.contractRateId = undefined; //  reset city value
          updateSchema({
            field: "contractId",
            componentProps: {
              options: []
            }
          });
          updateSchema({
            field: "contractRateId",
            componentProps: {
              options: []
            }
          });
        }
      };
    }
  },
  {
    field: "contractId",
    label: "合同",
    component: "Select",
    componentProps: {
      options: []
    },
    required: true
  },
  {
    field: "contractRateId",
    label: "合同税率",
    component: "Select",
    componentProps: {
      options: []
    },
    required: true
  }
];
