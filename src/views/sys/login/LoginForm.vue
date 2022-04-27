<template>
  <LoginFormTitle v-show="getShow" class="enter-x" />
  <Form
    class="p-4 enter-x"
    :model="formData"
    :rules="getFormRules"
    ref="formRef"
    v-show="getShow"
    @keypress.enter="handleLogin"
  >
    <FormItem name="account" class="enter-x">
      <Input
        size="large"
        v-model:value="formData.account"
        :placeholder="t('sys.login.userName')"
        class="fix-auto-fill"
      />
    </FormItem>
    <FormItem name="password" class="enter-x">
      <InputPassword
        size="large"
        visibilityToggle
        v-model:value="formData.password"
        :placeholder="t('sys.login.password')"
      />
    </FormItem>
    <FormItem name="imageVC">
      <div style="display: flex">
        <Input
          v-model:value="formData.imageVC"
          :placeholder="t('sys.login.imageVC')"
          size="large"
          style="width: 340px; min-width: 100px"
        />
        <img
          :src="` data:image/png;base64,${imageUrl}`"
          :style="{ cursor: 'pointer' }"
          alt=""
          @click="handleImageVC"
        />
      </div>
    </FormItem>
    <!--  <ARow class="enter-x">
      <ACol :span="12">
        <FormItem>
          <Checkbox v-model:checked="rememberMe" size="small">
            {{ t('sys.login.rememberMe') }}
          </Checkbox>
        </FormItem>
      </ACol>
      <ACol :span="12">
        <FormItem :style="{ 'text-align': 'right' }">
          <Button type="link" size="small" @click="setLoginState(LoginStateEnum.RESET_PASSWORD)">
            {{ t('sys.login.forgetPassword') }}
          </Button>
        </FormItem>
      </ACol>
    </ARow> -->

    <FormItem class="enter-x">
      <Button type="primary" size="large" block @click="handleLogin"
              :loading="loading">
        {{ t("sys.login.loginButton") }}
      </Button>
      <!-- <Button size="large" class="mt-4 enter-x" block @click="handleRegister">
        {{ t('sys.login.registerButton') }}
      </Button> -->
    </FormItem>
    <!--  <ARow class="enter-x">
      <ACol :md="8" :xs="24">
        <Button block @click="setLoginState(LoginStateEnum.MOBILE)">
          {{ t('sys.login.mobileSignInFormTitle') }}
        </Button>
      </ACol>
      <ACol :md="8" :xs="24" class="!my-2 !md:my-0 xs:mx-0 md:mx-2">
        <Button block @click="setLoginState(LoginStateEnum.QR_CODE)">
          {{ t('sys.login.qrSignInFormTitle') }}
        </Button>
      </ACol>
      <ACol :md="7" :xs="24">
        <Button block @click="setLoginState(LoginStateEnum.REGISTER)">
          {{ t('sys.login.registerButton') }}
        </Button>
      </ACol>
    </ARow> -->
    <!-- 
    <Divider class="enter-x">{{ t('sys.login.otherSignIn') }}</Divider>

    <div class="flex justify-evenly enter-x" :class="`${prefixCls}-sign-in-way`">
      <GithubFilled />
      <WechatFilled />
      <AlipayCircleFilled />
      <GoogleCircleFilled />
      <TwitterCircleFilled />
    </div> -->
  </Form>
</template>
<script lang="ts" setup>
import { reactive, ref, unref, computed } from "vue";

import { Checkbox, Form, Input, Row, Col, Button, Divider } from "ant-design-vue";
import {
  GithubFilled,
  WechatFilled,
  AlipayCircleFilled,
  GoogleCircleFilled,
  TwitterCircleFilled
} from "@ant-design/icons-vue";
import LoginFormTitle from "./LoginFormTitle.vue";

import { useI18n } from "/@/hooks/web/useI18n";
import { useMessage } from "/@/hooks/web/useMessage";

import { useUserStore } from "/@/store/modules/user";
import { LoginStateEnum, useLoginState, useFormRules, useFormValid } from "./useLogin";
import { useDesign } from "/@/hooks/web/useDesign";
//import { onKeyStroke } from '@vueuse/core';
import { getImageVC } from "/@/api/sys/user";

const ACol = Col;
const ARow = Row;
const FormItem = Form.Item;
const InputPassword = Input.Password;
const { t } = useI18n();
const { notification, createErrorModal } = useMessage();
const { prefixCls } = useDesign("login");
const userStore = useUserStore();

const { setLoginState, getLoginState } = useLoginState();
const { getFormRules } = useFormRules();

const formRef = ref();
const loading = ref(false);
const rememberMe = ref(false);

const formData = reactive({
  account: "",
  password: ""
});
const imageUrl = ref("");
const trackId = ref("");
const { validForm } = useFormValid(formRef);

//onKeyStroke('Enter', handleLogin);

const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN);

async function handleImageVC() {
  const res = await getImageVC();
  imageUrl.value = res.imgData;
  trackId.value = res.trackId;
}

handleImageVC();
// let a = process.env.NODE_ENV;
// console.log(a, "a");
// VITE_PUBLIC_DEVPATH
// console.log(import.meta.env.VITE_PUBLIC_HOST);
// console.log(import.meta.env.MODE, "import.meta.env.MODE");
// console.log(import.meta.env.BASE_URL, "import.meta.env.BASE_URL");
console.log(import.meta.env.PROD);
console.log(import.meta.env.DEV);
console.log(import.meta.env.MODE);

async function handleLogin() {
  const data = await validForm();
  if (!data) return;
  try {
    loading.value = true;
    const userInfo = await userStore.login({
      password: data.password,
      username: data.account,
      trackId: trackId.value,
      imageVC: data.imageVC,
      mode: "none" //不要默认的错误提示
    });
    if (userInfo) {
      notification.success({
        message: t("sys.login.loginSuccessTitle"),
        description: `${t("sys.login.loginSuccessDesc")}: ${userInfo.realName}`,
        duration: 3
      });
    }
  } catch (error) {
    createErrorModal({
      title: t("sys.api.errorTip"),
      content: (error as unknown as Error).message || t("sys.api.networkExceptionMsg"),
      getContainer: () => document.body.querySelector(`.${prefixCls}`) || document.body
    });
  } finally {
    handleImageVC();
    loading.value = false;
  }
}
</script>
