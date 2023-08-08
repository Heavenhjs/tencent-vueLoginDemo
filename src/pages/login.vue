<template>
 <div class="login">
    <!-- 用卡片嵌登录表单 -->
    <el-card shadow="always">
      <div class="login-main">
        <!-- 登录左侧的图标 -->
        <div class="login-logo">
          <el-image
            :src="loginLogo"
            style="width: 100%; height: 100%"
          />
        </div>
        <!-- 主登录表单 -->
        <div class="login-form">
          <el-form
            :model="state.loginForm"
            :rules="rules"
          >
            <div class="login-form-title">
              欢迎登录
            </div>
            <el-form-item
              label="账号"
              prop="username"
            >
              <el-input
                v-model="state.loginForm.username"
                prefix-icon="Avatar"
                placeholder="请输入用户账号"
                style="width: 100%"
              />
            </el-form-item>
            <el-form-item
              label="密码"
              prop="password"
            >
              <el-input
                v-model="state.loginForm.password"
                prefix-icon="Lock"
                placeholder="请输入用户密码"
                type="password"
                style="width: 100%"
              />
            </el-form-item>
            <el-form-item>
              <el-checkbox
                v-model="state.loginForm.keepPassword"
                label="记住密码"
              />
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                round
                style="width: 100%"
                @click="submit()"
              >
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import  {useUserStore}  from "@/store/user";
import { useRouter } from "vue-router";
import systemAPI from "@/api/systemAPI";
// 使用的pinia
const userStore = useUserStore();
// 使用的router
const router = useRouter();
// logo的url获取
const loginLogo = new URL(
  "../assets/image/login-left.png",
  import.meta.url
).href;
const state = reactive({
  loginForm: {
    username: "",
    password: "",
    keepPassword: null,
  },
});

// 钩子函数
const login = async (param) => {
        await systemAPI
          .login(param)
          .then((result) => {
            // console.log(result.resultMsg);
            if (result.isSuccess == true) {
              // 使用store保存用户信息
              result.data && userStore.setUser(result.data);
              localStorage.setItem(
                "token",
                result.data ? result.data.token : ""
              );
              // 判断用户类型，普通用户进user/index，管理员进admin/index
              if (result.data && result.data.role == "user") {
                ElMessage.success("欢迎用户:" + result.data.nickName);
                // router.push({ path: "/index" });
              }
              if (result.data && result.data.role == "admin") {
                ElMessage.success("欢迎管理员:" + result.data.nickName);
                // router.push({ path: "/index" });
              }
            }
          })
          .catch((error) => {
            ElMessage.error("请求错误，请检查服务器:" + error);
          });
};

const submit = () =>{
  let param = {
        username: state.loginForm.username,
        password: state.loginForm.password,
      };
  login(param);
}
</script>

<style  lang="less"  scoped>

.login {
  background-image: url("../assets/image/login-bg.svg");
  background-size: 100% 100%;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 0;
  .el-card__body {
    padding: 0;
  }
  .login-main {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .login-logo {
      background: var(--theme);
      width: 20rem;
      padding: 8rem 5rem;
      border-top-right-radius: 38px;
      border-bottom-right-radius: 38px;
    }
    .login-form {
      width: 20rem;
      padding: 8rem 5rem;
      .login-form-title {
        font-size: 18px;
        font-weight: 700;
        text-align: center;
        padding-bottom: 2rem;
      }
      .other-login {
        text-align: center;
      }
    }
  }
}
</style>
