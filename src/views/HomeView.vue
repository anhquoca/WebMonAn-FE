<template>
<div>
  <div  v-if="dataLoaded">
    <Header :imgUser="userImage" :slCartItem="slCartItem"></Header>
    <div class="listimg">
      <v-carousel hide-delimiters class="carousel">
        <h1 class="tieude1">
          <p><i>Xin chào</i></p>
          <p><i>Đã đến với chúng tôi</i></p>
        </h1>
        <v-carousel-item
          class="carousel"
          src="https://beptueu.vn/hinhanh/tintuc/top-15-hinh-anh-mon-an-ngon-viet-nam-khien-ban-khong-the-roi-mat-9.jpg"
          cover
        ></v-carousel-item>
        <v-carousel-item
          class="carousel"
          src="https://mamcomviet.com/wp-content/uploads/2017/07/hinh-anh-nhung-mon-an-ngon-14.jpg"
          cover
        ></v-carousel-item>
        <v-carousel-item
          class="carousel"
          src="https://beptueu.vn/hinhanh/tintuc/top-15-hinh-anh-mon-an-ngon-viet-nam-khien-ban-khong-the-roi-mat.jpeg"
          cover
        ></v-carousel-item>
        <v-carousel-item
          class="carousel"
          src="https://beptueu.vn/hinhanh/tintuc/top-15-hinh-anh-mon-an-ngon-viet-nam-khien-ban-khong-the-roi-mat-2.jpg"
          cover
        ></v-carousel-item>
      </v-carousel>
    </div>
    <div class="ml-8 mt-4 ">
      <h2 class="mt-8 tieudea">Món Ăn Bán Chạy</h2>
      <v-row class="mt-8 mb-12 mr-2">
                <v-col
                  v-for="product in listProductBanChay"
                  :key="product.id"
                  cols="12"
                  md="3"
                >
                  <div>
                    <v-card width="300">
                      <router-link :to="`/product/${product.id}`" class="router-link">
                        <div class="giamgiaproduct">- {{ product.discount}}%</div>
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
                        <div class="giatiengoc ml-4">
                          {{ formatPrice(product.price) }}VND
                        </div>
                      </div>
                    </v-card>
                  </div>
                </v-col>
              </v-row>
    </div>
    <div class="ml-8 mt-4 tieudea">
      <h2>Món ăn theo danh mục</h2>
    </div>
    <div class="bangsanpham ml-6">
      <v-card>
        <v-tabs v-model="tab" color="deep-purple-accent-4" center-active>
          <div class="d-flex" v-for="item in listProductType" :key="item.id">
            <v-tab :value="item.id">{{ item.name_product_type }} </v-tab>
          </div>
        </v-tabs>
        <v-window v-model="tab">
          <v-window-item
            v-for="item in listProductType"
            :key="item.id"
            :value="item.id"
          >
            <v-container fluid>
              <v-row>
                <v-col
                  v-for="product in filteredProducts"
                  :key="product.id"
                  cols="12"
                  md="3"
                >
                  <div>
                    <v-card width="300">
                      <router-link :to="`/product/${product.id}`" class="router-link">
                        <div class="giamgiaproduct">- {{ product.discount}}%</div>
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
                        <div class="giatiengoc ml-4">
                          {{ formatPrice(product.price) }}VND
                        </div>
                      </div>
                    </v-card>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-window-item>
        </v-window>
      </v-card>
    </div>
    <div>
      <v-sheet :height="550" :width="auto" class="title2">
        <div class="d-flex">
          <div class="ml-8 mt-9 ">
            <div class="tieudea">
              <h1 class="doimauchu">Món ngon hôm nay</h1>
            </div>
            <div class="mt-3">
              <h2 class="doimauchu">
                Salad hồ đào nhiệt đới
              </h2>
            </div>
            <div class="doimauchu1">
              <p>Sự kết hợp giữa hạt hồ đào đa dinh dưỡng với cà chua chín mọng, củ cải đỏ tươi<br>giòn, những lát đào thanh ngọt và những cọng xà lách mơn mởn cùng sốt <br> chanh dây chua nhẹ, món ăn như một bản phối đầy sắc màu sẽ khai vị cho bữa chay <br> thêm phần tuyệt hảo</p>
            </div>
          </div>
          <div class="imagelink">
            <img
              src="https://res.cloudinary.com/do9rcgv5s/image/upload/v1695115340/ejsoaqebpskyneltbsex.png"
              alt=""
              height="450"
            />
          </div>
        </div>
      </v-sheet>
    </div>
    <div class="ml-8 mt-4 tieudea">
    </div>
    <Footer></Footer>
  </div>
  <div v-if="!dataLoaded" class="center-container">
    Đang tải...
    <v-progress-circular
      indeterminate
      color="primary"
      size="80"
      class="ml-3"
    ></v-progress-circular>
  </div>
</div>
</template>
<script>
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";
import { useUserStore } from "@/store/userStore";
import { useCartStore } from "@/store/cart";
// Components
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
export default {
  name: "HomeView",
  components: {
    Header,
    Footer,
  },
  
  setup() {
    const userStore = useUserStore();
    const cartStore = useCartStore();
    const userId = userStore.userId;
    return { userId, userStore,cartStore };
  },
  data() {
    return {
      tab: null,
      dataLoaded:false,
      welcomeMessageShown: false,
      listProductType: [{ id: 0, name_product_type: "" }],
      listProduct: [
        {
          id: 0,
          product_typeId: 0,
          name_product: "",
          price: 0,
          avartar_image_product: "",
          discount: 0,
        },
      ],
      listProductBanChay: [
        {
          id: 0,
          product_typeId: 0,
          name_product: "",
          price: 0,
          avartar_image_product: "",
          discount: 0,
        },
      ],
    };
  },

  async created() {
   await this.getThongTinUser(this.userId);
   await this.getListProductType();
   await this.getListProduct();
   await this.getListProductBanChay();
   this.dataLoaded=true
  },
  mounted() {
  },
  watch: {},
  computed: {
    filteredProducts() {
      const filteredList = this.listProduct.filter(
        (product) => product.product_typeId === this.tab
      );
      return filteredList;
    },
  },
  methods: {
    test(){
      const test = this.userStore.userInfo
      const userrole = this.userStore.userRole
      console.log(test['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'])
      console.log("role",userrole)
    },
    formatPrice(price) {
      return new Intl.NumberFormat("vi-VN").format(price);
    },
    async getThongTinUser(userId) {
      if (userId) {
      await this.userStore.fetchUserData();
      }
      await this.cartStore.fetchCart(userId);
      
    },
    async getListProductType() {
     await axios
        .get("https://localhost:7243/api/Product/GetListProductTheoDanhSach")
        .then((respone) => {
          this.listProductType = respone.data;
        })
        .catch((error) => {});
    },
    async getListProduct() {
      await axios
        .get("https://localhost:7243/api/Product/GetListProduct")
        .then((respone) => {
          this.listProduct = respone.data;
          this.tab = this.listProductType[0].id;
        })
        .catch((error) => {});
    },
    async getListProductBanChay() {
      await axios
        .get("https://localhost:7243/api/Product/GetListProductBanChay")
        .then((respone) => {
          this.listProductBanChay = respone.data;
          console.log(this.listProductBanChay)
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

.listimg {
  margin-top: -50px;
  position: relative;
  z-index: 2;
}
.tieude1 {
  position: absolute;
  top: 30px;
  left: 150px;
  z-index: 1;
}
.tieudea {
  font-style: italic;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.v-tabs {
  white-space: nowrap;
  overflow-x: auto;
}
.listtap {
  display: flex;
}
.router-link {
  text-decoration: none;
  color: #000;
}
.giatiengoc {
  text-decoration: line-through;
  opacity: 0.5;
}
.title2 {
  background-image: url("https://get.wallhere.com/photo/food-meat-vegetables-tomatoes-still-life-Onions-1734257.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  width: 100%;
}
.imagelink{
  margin-left: 10%;
  margin-top:3% ;
}
.doimauchu{
  color: black;
}
.doimauchu1{
  color: gainsboro;
}
.giamgiaproduct{
  background-color:green ;
  width:50px;
  color: white;
  position: absolute;
  margin-left:75% ;
  margin-top:3% ;
  text-align: center;
}
.center-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; 
}
</style>
