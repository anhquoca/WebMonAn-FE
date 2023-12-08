<template>
  <Header></Header>
  <v-container class="container fill-height" fluid>
    <v-row justify="center">
      <v-col cols="6">
        <v-card>
          <v-card-title class="headline">Quên Mật Khẩu</v-card-title>
          <v-card-text>
            <v-form ref="form">
              <v-text-field
              v-model="email"
              label="Email"
              outlined
              :rules="[rules.required, rules.email]"
            ></v-text-field>
            <v-btn @click="resetPassword" color="primary" :loading="loading"
              >Quên Mật Khẩu</v-btn
            >
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-text>
          <p>{{ about }}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn class="btn" @click="xacnhan">OK</v-btn>
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
  name: "ForgotPasswordView",

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
      },
      email: "",
      dialog: false,
      loading: false,
      about: "",
    };
  },
  methods: {
    async resetPassword() {
      const { valid } = await this.$refs.form.validate();
      if(valid){
        this.loading = true;
      const email = this.email
      await axios
        .post(`https://localhost:7243/api/Account/ForgotPassword/${email}`)
        .then((respone) => {
          this.about = respone.data;
          this.loading = false;

          this.dialog = true;
        })
        .catch((error) => {});
      }
    },
    xacnhan() {
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
.fill-height {
  height: 100%;
}
.container {
  margin-top: 50px;
  margin-bottom: 200px;
}
</style>
