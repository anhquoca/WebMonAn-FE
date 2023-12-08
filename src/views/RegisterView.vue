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
              <v-form
              ref="form"
                @submit.prevent="register"
              >
                <v-text-field
                  v-model="fullName"
                  label="Họ và tên"
                  :rules="[rules.required]"
                ></v-text-field>
                <v-text-field
                  v-model="email"
                  label="Email"
                  :rules="[rules.required, rules.email]"
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  label="Mật khẩu"
                  type="password"
                  :rules="[rules.required]"
                ></v-text-field>
                <v-text-field
                  v-model="confirmPassword"
                  label="Xác nhận mật khẩu"
                  type="password"
                  :rules="[rules.required, rules.confirmPassword]"
                ></v-text-field>
                <v-btn :loading="loading" color="primary" type="submit">Đăng ký</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
          <v-dialog v-model="dialog" max-width="400">
            <v-card>
              <v-card-text>
                <p>{{ dialogTitle }}</p>
              </v-card-text>
              <v-card-actions>
                <v-btn class="btn" v-if="dialogSusces" @click="goToLogin">OK</v-btn>
                <v-btn  class="btn" v-if="dialogError" @click="dialogFailure">Nhập lại</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </v-container>
    <Footer></Footer>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
export default {
  name: "RegisterView",

  components: {
    Header,
    Footer,
  },
  data() {
    return {
      rules: {
        required: (value) => !!value || "Field is required",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
        confirmPassword: (value) => {
          if (value == this.password) {
            return true;
          } else {
            return "Incorrect ConfirmPassword";
          }
        },
      },
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      loading: false,
      dialog:false,
      dialogSusces: false,
      dialogError:false,
      dialogTitle:""
    };
  },
  methods: {
    async register() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        this.loading = true;
        const model = {
          user_name: this.fullName,
          account_password: this.password,
          email: this.email,
        };
        axios
          .post("https://localhost:7243/api/Account/register", model)
          .then((respone) => {
            const result = respone.data;
            this.loading=false
            if (result == 0) {
              this.dialog = true;
              this.dialogSusces=true;
              this.dialogTitle="Bạn đã đăng ký thành công!"
            } else {
              this.dialog = true;
              this.dialogError=true;
              this.dialogTitle="Email da ton tai !"
            }
          })
          .catch((error) => {});
      }
    },
    goToLogin() {
      this.$router.push("/login");
    },
    dialogFailure(){
      this.dialog=false
    }
  },
};
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
  height: auto;
}
.container {
  margin-top: 50px;
  margin-bottom: 100px;
}
.btn{
  background-color: rgb(100, 79, 79);
  margin-left:15px ;
  color: white;
}

</style>
