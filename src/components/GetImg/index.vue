<template>
  <span class="thumb">
    <Image v-if="fileNo" :src="fileUrl" :width="104" />
  </span>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { propTypes } from "/@/utils/propTypes";
import { Image } from "ant-design-vue";
import { fileGetUrl } from "/@/api/sys/upload";

export default defineComponent({
  components: { Image },
  props: {
    fileNo: propTypes.string.def(""),
    fileName: propTypes.string.def("")
  },
  setup(props) {
    let fileUrl = ref("");

    async function getUrl() {
      if (!props.fileNo) {
        return;
      }
      const { url } = await fileGetUrl({
        fileNo: props.fileNo
      });
      fileUrl.value = import.meta.env.VITE_PUBLIC_HOST + url;
    }

    // let a = process.env.NODE_ENV;
    // console.log(a, "a");
    // VITE_PUBLIC_DEVPATH
    // console.log(import.meta.env.VITE_PUBLIC_HOST);
    getUrl();
    return {
      fileUrl
    };
  }
});
</script>
<style lang="less">
.thumb {
  img {
    position: static;
    display: block;
    cursor: zoom-in;
    border-radius: 4px;
    object-fit: cover;
  }
}
</style>
