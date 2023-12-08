<template>
  <div>
    <Header></Header>
    <div class="container">
      <div style="font-size: larger">Các mặt hàng trong giỏ hàng của bạn.</div>
      <div>
        <table class="custom-table">
          <thead>
            <tr class="trclass">
              <th>Ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Đơn giá</th>
              <th>Số lượng</th>
              <th>Tổng phí</th>
              <th>Hoạt động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in cartItems">
              <td>
                <img
                  :src="item.product.avartar_image_product"
                  alt="Product Image"
                  height="50"
                />
              </td>
              <td>{{ item.product.name_product }}</td>
              <td>
                <span class="giatiengoc"
                  >{{ formatPrice(item.product.price) }} VND</span
                >
                -
                {{
                  formatPrice(
                    (item.product.price * (100 - item.product.discount)) / 100
                  )
                }}
                VND
              </td>
              <td>
                <div class="d-flex">
                  <div class="ml-3">
                    <button @click="decreaseQuantity(item)">-</button>
                  </div>
                  <div class="ml-3">{{ item.quantity }}</div>
                  <div class="ml-3">
                    <button @click="increaseQuantity(item)">+</button>
                  </div>
                </div>
              </td>
              <td>
                {{
                  (item.quantity *
                    item.product.price *
                    (100 - item.product.discount)) /
                  100
                }}
              </td>
              <td>
                <button @click="xoasanphamkhoigiohang(item.id)">
                  <v-icon
                    icon="mdi-close"
                    size="large"
                    class="delete-icon"
                  ></v-icon>
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="button-container">
          <button @click="continueShopping" class="button">
            TIẾP TỤC MUA SẮM
          </button>
          <button @click="clearCart()" class="button">XÓA GIỎ HÀNG</button>
          <v-dialog v-model="dialog" max-width="400">
            <v-card>
              <v-card-title></v-card-title>
              <v-card-text>
                Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng không?
              </v-card-text>
              <v-card-actions>
                <v-btn @click="closeDialog" text color="green"> Hủy </v-btn>
                <v-btn @click="confirmDelete" color="error" text>
                  Xác nhận
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </div>
      <div class="d-flex flex-row-reverse mb-6">
        <div class="thongtinthanhtoan">
          <div><p>Tổng số giỏ hàng</p></div>
          <div class="d-flex mt-3">
            <div class="me-auto">
              <p>Giá Gốc</p>
            </div>
            <div>
              {{ formatPrice(cartStore.totalCartPriceWithoutDiscount) }}
            </div>
          </div>
          <div class="d-flex mt-3">
            <div class="me-auto">
              <p>Tổng cộng</p>
            </div>
            <div>{{ formatPrice(cartStore.totalCartPrice) }}</div>
          </div>
          <div class="thanhtoangiohang mt-3">
            <div 
              ><button class="thanhtoan mt-2" @click="kiemtrathanhtoan">
                Tiến hành thanh toán
              </button></div
            >
          </div>
          <v-dialog v-model="dialogThanhToan" max-width="400">
        <v-card>
          <v-card-text>
            <p> Chưa có sản phẩm nào trong giỏ hàng ! </p>
          </v-card-text>
          <v-card-actions class="d-flex">
            <v-btn class="btn" @click="reloadData" color="green">OK</v-btn>
            <v-btn class="btn" @click="loadHome" color="green">Tiếp tục mua sắm</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useUserStore } from "@/store/userStore";
import { useCartStore } from "@/store/cart";
// Components
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
export default {
  name: "LoginView",
  components: {
    Header,
    Footer,
  },
  setup() {
    const userStore = useUserStore();
    const cartStore = useCartStore();
    const userId = userStore.userId;
    const cartItems = ref([]);
    onMounted(async () => {
      await cartStore.fetchCart(userId);
      cartItems.value = cartStore.cartItems;
    });
    return { userStore, cartStore, cartItems };
  },
  async created() {},
  data() {
    return {
      dialog:false,
      dialogThanhToan:false,
    };
  },
  methods: {
    xoasanphamkhoigiohang(cartItemId) {
      const isConfirmed = window.confirm(
        "Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng không?"
      );
      if (isConfirmed) {
        this.cartStore.DeleteCartItem(cartItemId);
      }
    },
    async increaseQuantity(item) {
      await this.cartStore.addToCart(this.userStore.userId, item.productId, 1);
    },
    async decreaseQuantity(item) {
      if (item.quantity == 1) {
        this.xoasanphamkhoigiohang(item.id);
      } else {
        await this.cartStore.addToCart(
          this.userStore.userId,
          item.productId,
          -1
        );
      }
    },
    kiemtrathanhtoan(){
      if(this.cartItems.length > 0){
this.$router.push("/checkout")
      }else{
        this.dialogThanhToan=true
      }

    },
    continueShopping() {
      this.$router.push("/");
    },
    async clearCart() {
      this.dialog = true
    },
    async confirmDelete() {
      await this.cartStore.DeleteCart(this.userStore.userId);
      this.closeDialog();
    },
    closeDialog() {
      this.dialog = false;
    },
    reloadData(){
this.dialogThanhToan=false;
    },
    loadHome(){
this.$router.push("/")
    },

    formatPrice(price) {
      return new Intl.NumberFormat("vi-VN").format(price);
    },
  },
};
</script>

<style scoped>
.container {
  margin: 2% 5% 5% 5%;
}
.custom-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.custom-table th,
.custom-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.grey-row {
  background-color: #f2f2f2;
}

.button-container {
  margin-top: 20px;
}

.button-container button {
  margin-right: 10px;
}
.trclass {
  background-color: #f2f2f2;
}
.button {
  background-color: #f2f2f2;
  border-radius: 15px;
  border: 1px solid #ddd;
  padding: 8px;
  padding-left: 25px;
  padding-right: 25px;
  text-align: center;
}
.giatiengoc {
  text-decoration: line-through;
  opacity: 0.5;
}
.delete-icon:hover {
  color: red;
}
.thongtinthanhtoan {
  border-radius: 10px;
  background-color: #f2f2f2;
  width: 35%;
  padding: 2%;
}
.thanhtoan {
  background-color: rgb(47, 154, 255);
  border-radius: 25px;
  border: 1px solid #ddd;
  color: white;
  padding: 8px;
  padding-left: 25px;
  padding-right: 25px;
  text-align: center;
  width: 100%;
}
.thanhtoangiohang {
  text-align: center;
}
</style>
