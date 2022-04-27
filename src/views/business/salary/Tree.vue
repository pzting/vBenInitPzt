<template>
  <BasicTree
    :clickRowToExpand="false"
    :fieldNames="{ key: 'id', title: 'enterpriseName' }"
    :selectable="false"
    :search="false"
    :treeData="treeData"
    checkable
    search
    showLine
    title="企业列表"
    toolbar
    @check="handleSelect"
  />
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

import { BasicTree, TreeItem } from "/@/components/Tree";
import { getDeptList } from "/@/api/people";
import { filterSelectTreeId } from "/@/utils";

export default defineComponent({
  name: "Tree",
  components: { BasicTree },

  emits: ["select"],
  setup(_, { emit }) {
    const treeData = ref<TreeItem[]>([]);

    async function fetch() {
      const treeDataRes = await getDeptList();
      treeData.value = treeDataRes.items;
    }


    function handleSelect(keys) {
      let data = filterSelectTreeId(treeData.value, keys);
      emit("select", { enterpriseId: data.id, teamIds: data.arr });
    }

    onMounted(() => {
      fetch();
    });
    return { treeData, handleSelect };
  }
});
</script>
