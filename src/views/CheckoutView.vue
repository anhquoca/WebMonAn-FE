<template>
  <div>
    <Header></Header>
    <div class="container">
      <v-row>
        <v-col cols="7">
          <v-form ref="form">
            <h3>Thông tin khách hàng</h3>
            <div>
              <div class="">Họ và Tên</div>
              <v-text-field
                v-model="orderModel.full_Name"
                density="compact"
                variant="outlined"
                :rules="[rules.required]"
              ></v-text-field>
            </div>
            <div>
              <div class="d-flex">
                <v-select
                  v-model="tinhThanhPho"
                  :items="listTinhThanhPho"
                  item-title="name"
                  item-value="code"
                  label="Chọn tỉnh thành"
                  return-object
                  :rules="[rules.required]"
                  :error-messages="tinhThanhPhoErrorMessage"
                  class="mr-5"
                ></v-select>

                <v-select
                  v-model="quanHuyen"
                  :items="listQuanHuyen"
                  label="Chọn quận huyện"
                  item-title="name"
                  item-value="code"
                  return-object
                  :rules="[rules.required]"
                  :error-messages="quanHuyenErrorMessage"
                  class="mr-5"
                ></v-select>

                <v-select
                  v-model="phuongXa"
                  :items="listPhuongXa"
                  label="Chọn phường xã"
                  item-title="name"
                  item-value="code"
                  return-object
                  :rules="[rules.required]"
                  :error-messages="phuongXaErrorMessage"
                ></v-select>
              </div>
            </div>
            <div>
              <div class="">Địa chỉ</div>
              <v-text-field
                v-model="diachichitiet"
                density="compact"
                variant="outlined"
                :rules="[rules.required]"
              ></v-text-field>
            </div>
            <div class="">
              <v-row>
                <v-col>
                  <div class="">Điện thoại</div>
                  <v-text-field
                    v-model="orderModel.phone"
                    density="compact"
                    variant="outlined"
                    type="number"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <div class="">Email</div>
                  <v-text-field
                    v-model="orderModel.email"
                    density="compact"
                    variant="outlined"
                    :rules="[rules.required, rules.email]"
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>
            <div>
              <div class="">Ghi chú</div>
              <v-textarea
                v-model="orderModel.note"
                variant="outlined"
              ></v-textarea>
            </div>
          </v-form>
        </v-col>
        <v-col cols="5">
          <h3>ĐƠN HÀNG</h3>
          <v-card>
            <div class="cart1">
              <v-row class="row1">
                <v-col> Sản Phẩm </v-col>
                <v-col> Tổng số lượng </v-col>
              </v-row>
              <div v-for="item in cartItems">
                <v-row>
                  <v-col
                    >{{ item.product.name_product }} X
                    {{ item.quantity }}</v-col
                  >
                  <v-col
                    >{{
                      formatPrice(
                        (item.product.price * (100 - item.product.discount)) /
                          100
                      )
                    }}
                    VND</v-col
                  >
                </v-row>
              </div>
              <v-row class="row2">
                <v-col> Chi phí vận chuyển</v-col>
                <v-col> đang tính chi phí </v-col>
              </v-row>
              <v-row class="row2">
                <v-col> <h3>Tổng cộng</h3></v-col>
                <v-col class="tongtien">
                  {{ formatPrice(cartStore.totalCartPrice) }} VND</v-col
                >
              </v-row>
              <v-row class="row2">
                <v-col> Thời gian giao hàng dự kiến: </v-col>
              </v-row>
              <v-row>
                <v-col
                  ><li>
                    Chi phí cuối cùng đã là chi phí đã được tính cùng với phí
                    vận chuyển
                  </li></v-col
                >
              </v-row>
            </div>
          </v-card>
          <div>
            <v-btn
              class="buton"
              color="orange-darken-2"
              @click="thanhtoankhinhanhang"
              :loading="loading"
              >THANH TOÁN KHI NHẬN HÀNG</v-btn
            >
          </div>
          <div>
            <v-btn
              class="buton"
              color="orange-darken-2"
              @click="thanhtoanonline"
              :loading="loading1"
              >THANH TOÁN ONLINE</v-btn
            >
          </div>
        </v-col>
      </v-row>
      <v-dialog v-model="dialog" max-width="400">
        <v-card>
          <v-card-text>
            <p>{{ dialogTitle }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn class="btn" @click="reloadData">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useUserStore } from "@/store/userStore";
import { useCartStore } from "@/store/cart";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
export default {
  name: "CheckoutView",

  components: {
    Header,
    Footer,
  },
  setup() {
    const userStore = useUserStore();
    const cartStore = useCartStore();
    const userId = userStore.userId;
    const cartItems = ref([]);
    const orderModel = ref({
      paymentId: 0,
      userId: userStore.userId,
      original_price: 0,
      actual_price: 0,
      full_Name: "",
      email: userStore.email,
      phone: "",
      address: "",
      note: "",
    });
    onMounted(async () => {
      await cartStore.fetchCart(userId);
      cartItems.value = cartStore.cartItems;
    });
    return { userStore, cartStore, cartItems, orderModel };
  },
  async created() {},
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
      form: false,
      diachichitiet: "",
      tinhThanhPho: {
        name: null,
        code: "",
      },
      quanHuyen: {
        name: null,
        code: "",
      },
      phuongXa: {
        name: null,
        code: "",
      },
      listTinhThanhPho: [
        {
          name: "",
          code: 0,
        },
      ],
      listQuanHuyen: [
        {
          name: "",
          code: 0,
        },
      ],
      listPhuongXa: [{ name: "", code: 0 }],
      listAllQuanHuyen: [
        {
          code: 0,
          codename: "",
          division_type: "",
          name: "",
          province_code: 0,
        },
      ],
      listAllPhuongXa: [
        {
          code: 0,
          codename: "0",
          district_code: 0,
          division_type: "",
          name: "",
        },
      ],
      loading: false,
      loading1: false,
      dialog: false,
      dialogTitle: "",
      tinhThanhPhoErrorMessage: "",
      quanHuyenErrorMessage: "",
      phuongXaErrorMessage: "",
    };
  },
  created() {
    this.getlistTinhThanhPho();
    this.getAlllistQuanHuyen();
    this.getlistPhuongXa();
  },
  watch: {
    tinhThanhPho: function () {
      this.quanHuyen.name = "";
      this.quanHuyen.code = 0;
      this.phuongXa.name = "";
      this.phuongXa.code = 0;
      this.listQuanHuyen = this.listAllQuanHuyen.filter(
        (item) => item.province_code === this.tinhThanhPho.code
      );
    },
    quanHuyen: function () {
      this.phuongXa.name = "";
      this.phuongXa.code = 0;
      this.listPhuongXa = this.listAllPhuongXa.filter(
        (item) => item.district_code === this.quanHuyen.code
      );
    },
  },
  methods: {
    test() {
      console.log(this.tinhThanhPho);
    },
    async thanhtoankhinhanhang() {
      if (this.cartItems.length == 0) {
        this.dialogTitle = "Chưa có sản phẩm nào trong giỏ hàng!";
        this.dialog = true;
        return;
      }
      const { valid } = await this.$refs.form.validate();
      if (!this.tinhThanhPho.name) {
        this.tinhThanhPhoErrorMessage = "Vui lòng chọn tỉnh thành";
        return;
      } else {
        this.tinhThanhPhoErrorMessage = "";
      }
      if (!this.quanHuyen.name) {
        this.quanHuyenErrorMessage = "Vui lòng chọn quận huyện";
        return;
      } else {
        this.quanHuyenErrorMessage = "";
      }
      if (!this.phuongXa.name) {
        this.phuongXaErrorMessage = "Vui lòng chọn phường xã";
        return;
      } else {
        this.phuongXaErrorMessage = "";
      }
      if (valid) {
        this.loading = true;
        this.orderModel.paymentId = 1;
        this.orderModel.address =
          this.phuongXa.name +
          "-" +
          this.quanHuyen.name +
          "-" +
          this.tinhThanhPho.name +
          ", Địa chỉ chi tiết: " +
          this.diachichitiet;
        const model = {
          paymentId: 1,
          userId: this.orderModel.userId,
          original_price: this.cartStore.totalCartPriceWithoutDiscount,
          actual_price: this.cartStore.totalCartPrice,
          full_Name: this.orderModel.full_Name,
          email: this.orderModel.email,
          phone: this.orderModel.phone,
          address: this.orderModel.address,
          note: this.orderModel.note,
        };
        await axios
          .post("https://localhost:7243/api/Order/ThanhToan", model)
          .then((response) => {
            const result = response.data;
            this.loading = false;
            if (result == 0) {
              this.dialogTitle = "Xác nhận đặt hàng hàng thành công!";
              this.$refs.form.reset();
              this.cartStore.refrestCart();
            } else {
              this.dialogTitle = "Qua trình đặt hàng xảy ra lỗi!";
            }
            this.dialog = true;
          })
          .catch((error) => {
            console.error("Error", error);
          });
      } else {
        console.log("");
      }
    },
    async thanhtoanonline() {
      if (this.cartItems.length == 0) {
        this.dialogTitle = "Chưa có sản phẩm nào trong giỏ hàng!";
        this.dialog = true;
        return;
      }
      const { valid } = await this.$refs.form.validate();
      if (!this.tinhThanhPho.name) {
        this.tinhThanhPhoErrorMessage = "Vui lòng chọn tỉnh thành";
        return;
      } else {
        this.tinhThanhPhoErrorMessage = "";
      }
      if (!this.quanHuyen.name) {
        this.quanHuyenErrorMessage = "Vui lòng chọn quận huyện";
        return;
      } else {
        this.quanHuyenErrorMessage = "";
      }
      if (!this.phuongXa.name) {
        this.phuongXaErrorMessage = "Vui lòng chọn phường xã";
        return;
      } else {
        this.phuongXaErrorMessage = "";
      }
      if (valid) {
        this.loading = true;
        this.orderModel.paymentId = 2;
        this.orderModel.address =
          this.phuongXa.name +
          "-" +
          this.quanHuyen.name +
          "-" +
          this.tinhThanhPho.name +
          ", Địa chỉ chi tiết: " +
          this.diachichitiet;
        const model = {
          paymentId: 2,
          userId: this.orderModel.userId,
          original_price: this.cartStore.totalCartPriceWithoutDiscount,
          actual_price: this.cartStore.totalCartPrice,
          full_Name: this.orderModel.full_Name,
          email: this.orderModel.email,
          phone: this.orderModel.phone,
          address: this.orderModel.address,
          note: this.orderModel.note,
        };
        await axios
          .post("https://localhost:7243/api/Order/ThanhToan", model)
          .then((response) => {
            const url = response.data.urlketqua
            this.loading = false;
            window.location.href=url;
          })
          .catch((error) => {
            console.error("Error", error);
          });
      } else {
        console.log("");
      }
    },
    reloadData() {
      this.dialog = false;
    },
    formatPrice(price) {
      return new Intl.NumberFormat("vi-VN").format(price);
    },
    getlistTinhThanhPho() {
      axios
        .get("https://provinces.open-api.vn/api/")
        .then((respone) => {
          this.listTinhThanhPho = respone.data;
        })
        .catch((error) => {});
    },
    getAlllistQuanHuyen() {
      axios
        .get("https://provinces.open-api.vn/api/d/", {
          params: {
            depth: 2,
          },
        })
        .then((respone) => {
          this.listAllQuanHuyen = respone.data;
        })
        .catch((error) => {});
    },
    getlistPhuongXa() {
      axios
        .get("https://provinces.open-api.vn/api/w", {
          params: {
            depth: 3,
          },
        })
        .then((respone) => {
          this.listAllPhuongXa = respone.data;
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
  margin: 3% 5% 5% 5%;
}
.cart1 {
  padding: 5%;
}
.row1 {
  border-bottom: 1px solid rgb(214, 193, 193);
}
.row2 {
  border-top: 1px solid rgb(214, 193, 193);
}
.buton {
  margin-top: 5%;
  border-radius: 15px;
  padding: 8px;
  text-align: center;
  width: 100%;
  height: 45px;
}
.tongtien {
  color: red;
}
.btn {
  background-color: gray;
  margin-left: 15px;
  color: white;
}
</style>
