<template>
  <div>
    <Header @cart-clicked="handleCartClicked"></Header>
    <div class="container" v-if="product.id">
      <div class="product-details-container">
        <div class="product-images">
          <img
            class="mt-2"
            :src="product.avartar_image_product"
            alt="Product Image"
          />
          <p v-if="product.number_of_views != 0" class="mt-3">
            Số lượt xem: {{ product.number_of_views }}
          </p>
          <div class="mt-2">
            Đánh giá:
            <span v-for="star in product.point_evaluation" :key="star">
              <span class="mdi mdi-star yellow-star"></span>
            </span>
            <span
              v-for="emptyStar in 5 - product.point_evaluation"
              :key="emptyStar"
            >
              <span class="mdi mdi-star-outline green-star"></span>
            </span>
          </div>
        </div>
        <div class="product-info">
          <h2>{{ product.name_product }}</h2>
          <h4>Đã bán: {{ product.number_of_solds }}</h4>
          <div class="d-flex">
            <div class="giathucte">
              {{
                formatPrice((product.price * (100 - product.discount)) / 100)
              }}
              VND
            </div>
            <div class="giagoc ml-3 mt-3">
              {{ formatPrice(product.price) }} VND
            </div>
          </div>
          <div class="mt-3">{{ product.title }}</div>
          <div class="themsanpham mt-12 pt-12">
            <div class="d-flex">
              <div class="soluong">
                <div class="mt-2">
                  <button @click="decrementQuantity">
                    <span class="mdi mdi-minus"></span>
                  </button>
                  <input
                    class="quantity ml-1 mr-1"
                    type="number"
                    id="quantity"
                    v-model="quantity"
                    min="1"
                    @input="updateQuantity"
                  />
                  <button @click="incrementQuantity">
                    <span class="mdi mdi-plus"></span>
                  </button>
                </div>
              </div>
              <div>
                <button
                  class="addToCartButton ml-2"
                  @click="ThemSanPhamVaoGioHang"
                >
                  THÊM
                </button>
              </div>
            </div>
          </div>
          <div>
            <div class="d-flex mt-8">
              <div>Danh mục:</div>
              <div>
                <button class="buttons ml-1" @click="GoToAllDanhmuc">
                  All
                </button>
              </div>
              <div>
                <button
                  class="buttons ml-3"
                  @click="GoToDanhmuc(product.product_type.product_typeId)"
                >
                  {{ product.product_type.name_product_type }}
                </button>
              </div>
            </div>
            <div class="d-flex mt-2">
              <div class="mt-1">Nhãn :</div>
              <div>
                <button
                  class="buttonNhan buttons ml-2"
                  @click="GoToDanhmuc(product.product_type.product_typeId)"
                >
                  {{ product.product_type.name_product_type }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container2">
      <v-tabs fixed-tabs bg-color="white" v-model="tabs">
        <v-tab value="motasanpham"> Mô tả chi tiết </v-tab>
        <v-tab value="danhgia" @click="kiemtraquyendanhgiasanpham">
          Đánh giá
        </v-tab>
      </v-tabs>
      <v-window v-model="tabs">
        <v-window-item value="motasanpham">
          <v-card flat>
            <v-card-text>{{ product.description }}</v-card-text>
          </v-card>
        </v-window-item>
        <v-window-item value="danhgia">
          <v-card flat>
            <div class="">
              <div
                v-if="listProductReview.length > 0"
                v-for="(item, index) in listProductReview"
                class="danhgiasp1"
              >
                <div class="d-flex">
                  <div>
                    <img
                      :src="item.user.imgUser"
                      alt=""
                      height="80"
                      width="80"
                    />
                  </div>
                  <div>
                    <div class="d-flex">
                      <div>
                        {{ item.user.user_name }}
                      </div>
                      <div>
                        <span v-for="star in item.point_evaluation" :key="star">
                          <span class="mdi mdi-star yellow-star"></span>
                        </span>
                        <span
                          v-for="emptyStar in 5 - item.point_evaluation"
                          :key="emptyStar"
                        >
                          <span class="mdi mdi-star-outline green-star"></span>
                        </span>
                      </div>
                    </div>
                    <div>{{ item.content_rated }}</div>
                  </div>
                </div>
              </div>
              <div class="danhgiasp1" v-if="listProductReview.length == 0">
                Sản phẩm chưa được bình luận
              </div>
              <div>
                <div
                  v-if="kiemtraquyendanhgiasanpham != false"
                  class="danhgiasp mt-4"
                >
                  <div>
                    <label>Đánh giá của bạn:</label>
                    <div>
                      <span
                        v-for="star in 5"
                        :key="star"
                        class="mdi mdi-star"
                        :class="[
                          {
                            'yellow-star':
                              star <= productReviewModel.point_evaluation,
                            'gray-star':
                              star > productReviewModel.point_evaluation,
                          },
                        ]"
                        @click="setRatingReview(star)"
                      ></span>
                    </div>
                  </div>
                  <div class="mt-2">
                    <label for="comment">Bình luận:</label>
                    <textarea
                      id="comment"
                      v-model="productReviewModel.content_rated"
                      rows="3"
                      cols="50"
                      placeholder="Nhập bình luận của bạn..."
                    ></textarea>
                    <v-btn @click="themDanhGiaSanPham" color="green" :loading="loadingdanhgia"
                      >Lưu lại đánh giá của bạn!</v-btn
                    >
                  </div>
                </div>
                <div
                  v-if="kiemtraquyendanhgiasanpham != true"
                  class="danhgiasp mt-4"
                >
                  <p>Bạn cần mua sản phẩm để có thể tham gia đánh giá !</p>
                </div>
              </div>
            </div>
          </v-card>
        </v-window-item>
      </v-window>
    </div>
    <div class="container3">
      <h1 class="sanphamlienquan">Sản phẩm liên quan</h1>
      <v-container fluid>
        <v-row>
          <v-col
            v-for="product in listProduct"
            :key="product.id"
            cols="12"
            md="3"
          >
            <div>
              <v-card width="270">
                <router-link :to="`/product/${product.id}`" class="router-link">
                  <div class="giamgiaproduct">- {{ product.discount }}%</div>
                  <div>
                    <img
                      :src="product.avartar_image_product"
                      alt=""
                      height="250"
                      width="300"
                    />
                  </div>
                  <div>{{ product.name_product }}</div>
                </router-link>
                <div class="d-flex">
                  <div>
                    {{
                      formatPrice(
                        (product.price * (100 - product.discount)) / 100
                      )
                    }}
                    VND
                  </div>
                  <div class="bold1 ml-2">
                    <span class="mdi mdi-minus"></span>
                  </div>
                  <div class="giatiengoc ml-4">
                    {{ formatPrice(product.price) }}VND
                  </div>
                </div>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <v-snackbar
      class="center-snackbar"
      v-model="showSnackbar"
      :timeout="2000"
      bottom
      left
    >
      {{ product.name_product }} đã được thêm vào giỏ hàng!
    </v-snackbar>
    <v-snackbar
      class="center-snackbar"
      v-model="showSnackbarDanhgia"
      :timeout="2000"
      bottom
      left
    >
      Đánh giá của bạn đã được ghi nhân!
    </v-snackbar>
    <Footer></Footer>
  </div>
</template>

<script>
import axios from "axios";
import { useUserStore } from "@/store/userStore";
import { useCartStore } from "@/store/cart";
// Components
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
export default {
  name: "ProductView",
  components: {
    Header,
    Footer,
  },
  setup() {
    const userStore = useUserStore();
    const cartStore = useCartStore();
    return { userStore, cartStore };
  },
  data() {
    return {
      tabs: null,
      productId: null,
      quantity: 1,
      quyendanggiasanpham: false,
      showSnackbar: false,
      showSnackbarDanhgia:false,
      loadingdanhgia:false,
      productReviewModel: {
        productId: 0,
        userId: 0,
        content_rated: "",
        point_evaluation: 0,
      },
      product: {
        id: null,
        product_typeId: null,
        product_type: {
          id: null,
          name_product_type: "",
        },
        name_product: "",
        price: null,
        avartar_image_product: "",
        discount: null,
        title: "",
        description: "",
        number_of_views: 0,
        point_evaluation: 0,
        number_of_solds: 0,
      },
      listProduct: [
        {
          id: null,
          product_typeId: null,
          name_product: "",
          price: null,
          avartar_image_product: "",
          discount: null,
        },
      ],
      listProductReview: [
        {
          userId: 0,
          user: {
            user_name: "",
            imgUser: "",
          },
          content_rated: "",
          point_evaluation: 0,
        },
      ],
    };
  },
  watch: {
    $route(to) {
      window.location.href = to.fullPath;
    },
  },

  created() {
    this.$data.productId = this.$route.params.productId;
    this.getProduct();
    this.getListProduct();
    this.kiemtraquyendanhgiasanpham();
    this.getListProductReview();
  },
  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat("vi-VN").format(price);
    },
    incrementQuantity() {
      this.quantity++;
    },
    decrementQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    updateQuantity() {
      if (this.quantity < 1) {
        this.quantity = 1;
      }
    },
    setRatingReview(rating) {
      this.productReviewModel.point_evaluation = rating;
    },
    themDanhGiaSanPham() {
      this.productReviewModel.productId = this.productId;
      this.productReviewModel.userId = this.userStore.userId;
      this.ThemDanhGiaApi();
    },
    async ThemSanPhamVaoGioHang() {
      await this.cartStore.addToCart(
        this.userStore.userId,
        this.product.id,
        this.quantity
      );
      this.showSnackbar = true;
    },
    async getProduct() {
      await axios
        .get(`https://localhost:7243/api/Product/GetProduct/${this.productId}`)
        .then((respone) => {
          this.product = respone.data;
        })
        .catch((error) => {});
    },
    async getListProduct() {
      await axios
        .get(
          `https://localhost:7243/api/Product/GetListProductCungLoaiVoiProduct/${this.productId}`
        )
        .then((respone) => {
          if (respone.data.length > 0) {
            this.listProduct = respone.data;
          } else {
            this.listProduct = [];
          }
        })
        .catch((error) => {});
    },
    async kiemtraquyendanhgiasanpham() {
      const userProductModel = {
        userId: this.userStore.userId,
        productId: this.productId,
      };
      await axios
        .post(
          "https://localhost:7243/api/ProductReview/KiemTraQuyenDanhGiaSanPham",
          userProductModel
        )
        .then((respone) => {
          if (respone.data == 0) {
            this.kiemtraquyendanhgiasanpham = true;
          } else {
            this.kiemtraquyendanhgiasanpham = false;
          }
        })
        .catch((error) => {});
    },
    async getListProductReview() {
      await axios
        .get(
          `https://localhost:7243/api/ProductReview/getProductReviews/${this.productId}`
        )
        .then((respone) => {
          if (respone.data.length > 0) {
            this.listProductReview = respone.data;
          } else {
            this.listProductReview = [];
          }
        })
        .catch((error) => {});
    },
    ThemDanhGiaApi() {
      this.loadingdanhgia=true
      axios
        .post(
          "https://localhost:7243/api/ProductReview/ThemDanhGiaSanPham",
          this.productReviewModel
        )
        .then((respone) => {
          this.loadingdanhgia=false;
          this.showSnackbarDanhgia =true;
        })
        .catch((error) => {
          console.error("Error adding review:", error);
        });
    },
  },
};
</script>

<style scoped>
.container {
  margin: 0% 5% 5% 5%;
}
.container2 {
  margin: 0% 5% 3% 4%;
}
.container3 {
  margin: 0% 5% 5% 4%;
}
.product-details-container {
  display: flex;
}

.product-images {
  width: 50%;
}

.product-info {
  margin-left: 5%;
  width: 40%;
}
.product-images img {
  width: 100%;
  height: 350px;
}
.giathucte {
  color: red;
  font-size: 30px;
  text-align: center;
}
.giagoc {
  text-decoration: line-through;
}
.themsanpham {
  border-top: 1px solid rgb(184, 178, 178);
}
.soluong {
  border: 1px solid rgb(184, 178, 178);
  height: 60px;
  width: 150px;
  text-align: center;
  font-size: 25px;
}
.quantity {
  width: 70px;
  text-align: center;
}
.addToCartButton {
  height: 60px;
  width: 120px;
  text-align: center;
  background-color: black;
  color: #fff;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}
.addToCartButton:hover {
  background-color: #ff9800;
  transition: background-color 0.3s ease-in-out;
}
.buttonNhan {
  border: 1px solid rgb(184, 178, 178);
  background-color: rgb(230, 221, 221);
  padding: 3px;
}
.buttons:hover {
  color: #ff9800;
}
.sanphamlienquan {
  text-align: center;
}
.giatiengoc {
  text-decoration: line-through;
  opacity: 0.5;
}
.giamgiaproduct {
  background-color: green;
  width: 50px;
  color: white;
  position: absolute;
  margin-left: 75%;
  margin-top: 3%;
  text-align: center;
}
.router-link {
  text-decoration: none;
  color: #000;
}
.yellow-star {
  color: #ffcc00;
}
.green-star {
  color: #c9aaaa;
}
.gray-star {
  color: #999; /* Màu xám */
}
.danhgiasp {
  border: 1px solid grey;
  border-radius: 10px;
  width: 40%;
  padding: 10px;
  float: right;
}
.danhgiasp1 {
  width: 55%;
  padding: 10px;
  float: left;
}
.center-snackbar {
  position: fixed;
  top: 50%;
  right: 65%;
  text-align: center;
}
</style>
