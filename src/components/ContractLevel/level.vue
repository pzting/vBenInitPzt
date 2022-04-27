<template #enterpriseId="{ model, field }">
  <a-select
    v-model:value="model[field]"
    :options="options"
    allowClear
    mode="multiple"
    placeholder="请选择"
  />
</template>

<script>
import { computed, defineComponent, ref, unref } from "vue";

export default defineComponent({
  name: "level",
  components: {},
  setup(_) {
    const options = ref([]);
    getDeptList({}).then(res => {
      options.value = res.items;
    });
    return { options };
  }
});
</script>

<style scoped>

</style>
