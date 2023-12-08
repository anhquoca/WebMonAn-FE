<template>
  <Header></Header>
  <v-container fluid fill-height>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card>
          <v-card-title>
            <span class="headline">Xác nhận tài khoản</span>
          </v-card-title>
          <v-card-text>
            <v-form v-model="form" @submit.prevent="onSubmitPassword">
              <v-text-field
                v-model="password"
                label="Mật khẩu mới"
                type="password"
                :rules="[rules.required]"
                clearable
                :readonly="loading"
              ></v-text-field>
              <v-text-field
                v-model="confirmPassword"
                label="Xác nhận mật khẩu"
                type="password"
                :rules="[rules.required, rules.confirmPassword]"
                :readonly="loading"
                clearable
              ></v-text-field>

              <!-- Nút gửi mã xác thực -->
              <v-btn
                :disabled="!form"
                :loading="loading"
                type="submit"
                color="primary"
                >Cập nhật mật khẩu</v-btn
              >
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-text>
          <p>{{ dialogTitle }}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn class="btn" @click="openDialog" color="green">OK</v-btn>
          <v-btn v-if="login" class="btn" @click="gotoLogin" color="green">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
  <Footer></Footer>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";

import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
export default {
  name: "ConfirmPasswordView",

  components: {
    Header,
    Footer,
  },
  data() {
    return {
      rules: {
        required: (value) => !!value || "Field is required",
        confirmPassword: (value) => {
          if (value == this.password) {
            return true;
          } else {
            return "Incorrect ConfirmPassword";
          }
        },
      },
      form: false,
      password: "",
      confirmPassword: "",
      loading: false,
      token: null,
      dialog: false,
      login:false,
    };
  },
  created() {
    this.token = this.$route.query.token;
  },

  methods: {
    async onSubmitPassword() {
      if (!this.form) return;
      this.loading = true;
      const model = {
        password: this.password,
        token: this.token,
      };
      await axios
        .post("https://localhost:7243/api/Account/ResetPassword", model)
        .then((respone) => {
          this.loading = false;
          const result = respone.data;
          if (result == 0) {
            this.dialogTitle = "Đặt lại mật khẩu thành công!";
            this.login=true
          }
          if (result == 2) {
            this.dialogTitle = "Mật khẩu mới không được trùng với mật khẩu cũ!";
          }
          if (result == 1) {
            this.dialogTitle = "Đặt lại mật khẩu thất bại!";
          }
          this.dialog = true;
        });
    },
    openDialog() {
      this.dialog = false;
    },
    gotoLogin(){
      this.dialog = false;
      this.$router.push("/login")
    }
  },
};
</script>

<style scoped>
.app {
  margin-top: 50px;
}
</style>
