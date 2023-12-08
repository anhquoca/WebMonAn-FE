<template>
  <div>
    <Header></Header>

    <v-row justify="center">
      <router-link to="/login" class="router mr-3" exact>
        Đăng Nhập
      </router-link>
      |
      <router-link to="/register" class="router ml-3" exact>
        Đăng Ký</router-link
      >
    </v-row>
    <v-container class="container fill-height" fluid>
      <v-row justify="center">
        <v-col cols="6">
          <v-card>
            <v-card-text>
              <v-form ref="form" @submit.prevent="login">
                <v-text-field
                  v-model="loginModel.email"
                  label="Email"
                  outlined
                  :rules="[rules.required, rules.email]"
                ></v-text-field>
                <v-text-field
                  v-model="loginModel.password"
                  label="Password"
                  type="password"
                  outlined
                  :rules="[rules.required]"
                ></v-text-field>
                <v-sheet class="d-flex">
                  <v-sheet class="me-auto"
                    ><v-btn type="submit" color="primary" :loading="loading">Login</v-btn></v-sheet
                  >
                  <div class="forgot">
                    <router-link to="/forgot-password">
                      <a href="http://">Forgot Password</a>
                    </router-link>
                  </div></v-sheet
                >
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-btn @click="scrollToTop" fab bottom right fixed color="primary">
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
    </v-container>
    <alert-message ref="alertMessage"></alert-message>
    <Footer></Footer>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";
import { useUserStore } from "@/store/userStore";

// Components
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import AlertMessage from "@/components/AlertMessage.vue";
export default defineComponent({
  name: "LoginView",
  components: {
    Header,
    Footer,
    AlertMessage,
  },
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  data() {
    return {
      loading:false,
      rules: {
        required: (value) => !!value || "Field is required",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
      loginModel: {
        email: "",
        password: "",
      },
      loginResponse: {
        userId: 0,
        token: null,
        resetPasswordToken: null,
        resetPasswordTokenExpiry: null,
      },
      tokentest: "asdasda123123",
    };
  },
  methods: {
   
    async login() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        this.loading=true
       await axios
          .post("https://localhost:7243/api/Account/login", this.loginModel)
          .then((respone) => {
            this.loginResponse = respone.data;
            if (this.loginResponse.token) {
              const userId = this.loginResponse.userId;
              const token = this.loginResponse.token;
              this.userStore.setUserId(userId);
              this.userStore.setUserInfo(token);
              if (this.userStore.userRole === "Admin") {
                this.loading=false
                this.$router.push("/admin/product-management");
              } else {
                this.loading=false
                this.$router.push("/");
              }
            } else {
              this.loading=false
              this.$refs.alertMessage.openDialog(respone.data);
            }
          })
          .catch((error) => {
            this.loading=false
            this.$refs.alertMessage.openDialog(
              "Đã xảy ra lỗi. Vui lòng thử lại sau.",
              error
            );
          });
      }
    },
    goToForgotPassword() {
      console.log("Forgot Password clicked");
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
});
</script>

<style scoped>
.router {
  text-decoration: none;
  color: #000;
}

v-row > span {
  margin: 0 5px;
  font-weight: bold;
}
.fill-height {
  height: 100%;
}
a {
  text-decoration: none;
}
.forgot {
  float: right;
}
.container {
  margin-top: 50px;
  margin-bottom: 100px;
}
</style>
