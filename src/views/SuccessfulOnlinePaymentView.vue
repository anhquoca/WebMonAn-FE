<template>
  <div>
    <Header></Header>
    <div class="container">
      <h1>Thông báo đơn đặt hàng!</h1>
      <v-dialog v-model="dialog" max-width="400">
        <v-card>
          <v-card-text>
            <p>Đơn hàng của bạn đã thanh toán online thành công!</p>
          </v-card-text>
          <v-card-text>
            <p>Email đơn hàng sẽ được gửi đến bạn</p>
            <v-btn class="btn" @click="goToHome" color="green">OK</v-btn>
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
  name: "SuccessfulOnlinePaymentView",
  components: {
    Header,
    Footer,
  },
  setup() {
    const cartStore = useCartStore();
    return {cartStore };
  },
  created() {
    this.paymentCallback();
  },
  data() {
    return {
      dialog: true,
    };
  },
  methods: {
    goToHome() {
      this.dialog = false;
      this.$router.push("/checkout");
    },
    paymentCallback() {
      this.cartStore.refrestCart();
      const params = {
        vnp_BankCode: this.$route.query.vnp_BankCode,
        vnp_Amount: this.$route.query.vnp_Amount,
        vnp_BankTranNo: this.$route.query.vnp_BankTranNo,
        vnp_CardType: this.$route.query.vnp_CardType,
        vnp_OrderInfo: this.$route.query.vnp_OrderInfo,
        vnp_PayDate: this.$route.query.vnp_PayDate,
        vnp_ResponseCode: this.$route.query.vnp_ResponseCode,
        vnp_TmnCode: this.$route.query.vnp_TmnCode,
        vnp_TransactionNo: this.$route.query.vnp_TransactionNo,
        vnp_TransactionStatus: this.$route.query.vnp_TransactionStatus,
        vnp_TxnRef: this.$route.query.vnp_TxnRef,
        vnp_SecureHash: this.$route.query.vnp_SecureHash,
      };
      axios
        .get("https://localhost:7243/api/Order/paymentCallback", { params })
        .then((respone) => {
          const result = respone.data;
          console.log("ket qua", result);
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
