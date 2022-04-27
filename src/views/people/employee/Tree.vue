<template>
  <div class="bg-white m-4 mr-0 overflow-hidden">
    <BasicTree
      :clickRowToExpand="false"
      :fieldNames="{ key: 'path', title: 'enterpriseName' }"
      :treeData="treeData"
      :search="false"
      title="企业列表"
      toolbar
      @select="handleSelect"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

import { BasicTree, TreeItem } from "/@/components/Tree";
import { getDeptList } from "/@/api/people";

export default defineComponent({
  name: "Tree",
  components: { BasicTree },

  emits: ["select"],
  setup(_, { emit }) {
    const treeData = ref<TreeItem[]>([]);

    async function fetch() {
      const res = await getDeptList({});
      treeData.value = res.items;
    }

    function handleSelect(keys) {
      emit("select", keys[0]);
    }

    onMounted(() => {
      fetch();
    });
    return { treeData, handleSelect };
  }
});
</script>
