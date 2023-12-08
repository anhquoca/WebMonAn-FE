<template>
  <div>
    <Header></Header>
    <div class="container">
      <h1>Thông báo xác thực tài khoản!</h1>
      <v-dialog v-model="dialog" max-width="400">
        <v-card>
          <v-card-text>
            {{ dialogTitle }}ádsa
          </v-card-text>
          <v-card-text class="d-flex">
            <v-btn class="btn" @click="colseDialog" color="green">Ok</v-btn>
            <v-btn class="btn" @click="goToHome" color="green">Login</v-btn>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";
import { useUserStore } from "@/store/userStore";
import { useCartStore } from "@/store/cart";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
export default {
  name: "",
  components: {
    Header,
    Footer,
  },
  setup() {
    const cartStore = useCartStore();
    return { cartStore };
  },
  created() {
    this.paymentCallback();
  },
  data() {
    return {
      dialog: false,
      dialogTitle: "",
    };
  },
  methods: {
    colseDialog() {
      this.dialog = false;
    },
    goToHome() {
      this.dialog = false;
      this.$router.push("/login");
    },
    paymentCallback() {
      this.cartStore.refrestCart();
      const model = {
        email: this.$route.query.email,
        token: this.$route.query.token,
      };
      axios
        .get("https://localhost:7243/api/Account/VerifyEmail", model)
        .then((respone) => {
          const result = respone.data;
          if (result == 0) {
            this.dialogTitle = "Xác minh tài khoản thành công!";
            this.dialog = true;
          }
          if (result == 1) {
            this.dialogTitle = "Xác minh tài khoản thất bại!";
            this.dialog = true;
          }
        })
        .catch((error) => {});
    },
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
.container {
  margin: 5% 5% 5% 5%;
  padding-bottom: 10%;
}
</style>
