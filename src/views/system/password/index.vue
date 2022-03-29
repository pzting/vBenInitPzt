<template>
  <PageWrapper content="修改成功后会自动退出当前登录！" title="修改当前用户密码">
    <div class="py-8 bg-white flex flex-col justify-center items-center">
      <BasicForm @register="register" />
      <div class="flex justify-center">
        <a-button @click="resetFields"> 重置</a-button>
        <a-button class="!ml-4" type="primary" @click="handleSubmit"> 确认</a-button>
      </div>
    </div>
  </PageWrapper>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { PageWrapper } from "/@/components/Page";
import { BasicForm, useForm } from "/@/components/Form";
import { userUpdatePwd } from "/@/api/system";
import { formSchema } from "./index.data";
import { useUserStore } from "/@/store/modules/user";

export default defineComponent({
  name: "ChangePassword",
  components: { BasicForm, PageWrapper },
  setup() {
    const [register, { validate, resetFields }] = useForm({
      size: "large",
      labelWidth: 100,
      showActionButtonGroup: false,
      schemas: formSchema,
      baseColProps: {
        span: 24
      }
    });
    const userStore = useUserStore();

    async function handleSubmit() {
      try {
        const values = await validate();
        const { oldPassword, password } = values;
        await userUpdatePwd(values);
        // TODO custom api
        console.log(oldPassword, password);
        // const {router} = useRouter();
        // router.push(PageEnum.BASE_LOGIN);
        userStore.logout(true);
      } catch (error) {
      }
    }

    return { register, resetFields, handleSubmit };
  }
});
</script>
