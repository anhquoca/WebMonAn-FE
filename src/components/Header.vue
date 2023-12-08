<template>
  <div class="">
    <Head>
      <Title>P0LYFOOD| Do an thuan chay</Title>
    </Head>
    <div class="header1">
      <v-sheet class="title1 py-1">
        <div class="d-inline px-3 me-auto">Tieng Viet</div>
        <v-sheet>
          <div class="d-inline px-3">
            <v-icon
              size="x-large"
              color="black"
              icon="mdi mdi-airplane"
            ></v-icon>
            Giao hàng toàn quốc & nhanh chóng
          </div>
        </v-sheet>
      </v-sheet>
    </div>
    <div class=" header2 ">
      <v-sheet class="d-flex align-content-center pt-4" :height="150">
        <div class="d-inline px-3 pl-12">
          <router-link to="/">
            <v-img
              :width="140"
              aspect-ratio="16/9"
              cover
              src="https://res.cloudinary.com/do9rcgv5s/image/upload/v1692137209/e2nw6oqvtlvpqmdwtmnh.png"
            ></v-img>
          </router-link>
        </div>
        <div class="classula">
          <ul class="ulclass d-flex">
            <li>Trang chủ</li>
            <li>Gioi thiệu</li>
            <li>Thực đơn</li>
            <li>Tin Tức</li>
            <li>Liên Hệ</li>
          </ul>
        </div>

        <div class="">
          <v-icon
            size="x-large"
            icon="mdi mdi-magnify"
            class="mt-3"
            @click=""
          ></v-icon>
        </div>
        <v-menu transition="scale-transition">
          <template v-slot:activator="{ props }">
            <div icon v-bind="props" class="ml-5">
              <img
                class="roundedimage ml-5"
                :src="avatar"
                alt=""
              />
            </div>
          </template>
          <v-list class="listitem">
            <v-list-item v-if="kiemtra" @click="goTo('/my-account')">
              <v-list-item-title>Tài khoản của tôi</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="kiemtra" @click="goTo('/')">
              <v-list-item-title>Lịch sử đơn hàng</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="kiemtra" @click="logout">
              <v-list-item-title>Đăng xuất</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="!kiemtra" @click="goTo('/login')">
              <v-list-item-title>Đăng nhập</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="!kiemtra" @click="goTo('/register')">
              <v-list-item-title>Đăng ký</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <div class="d-flex">
          <v-icon
            class="ml-3 mt-3"
            size="x-large"
            color="black"
            icon="mdi mdi-compare-horizontal"
            @click="clicksosanh"
          ></v-icon>
          <v-sheet class="rounded-circle mb-3 mr-2">{{
            userStore.slSoSanh
          }}</v-sheet>
        </div>
        <div class="d-flex yeuthich">
          <v-icon
            class="ml-3 mt-3"
            size="x-large"
            color="black"
            icon="mdi mdi-heart-outline"
            @click="clickyeuthich"
          ></v-icon>
          <v-sheet class="rounded-circle mb-3">{{ userStore.slYeuThich }}</v-sheet>
        </div>
        <router-link to="/cart" class="router-link">
          <div class="d-flex giohang">
            <v-icon
              class="ml-3 mt-3"
              size="x-large"
              :color="isMouseOver ? 'light-green-accent-4' : 'black'"
              icon="mdi mdi-basket-fill"
              @mouseover="isMouseOver = true"
              @mouseleave="isMouseOver = false"
            ></v-icon>
            <v-sheet class="rounded-circle mb-3">{{
              cartStore.cartItemCount
            }}</v-sheet>
          </div>
        </router-link>
      </v-sheet>
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useUserStore } from "@/store/userStore";
import { useCartStore } from "@/store/cart";
export default {
  name: "Header",
  setup() {
    const cartStore = useCartStore();
    const userStore = useUserStore();
    const isMouseOver = ref(false);
    const kiemtra = ref(false);
    const avatar = ref("");
    onMounted(async () => {
      await userStore.fetchUserData();
      avatar.value = userStore.imgUser || "";
      if(userStore.userId != null){
        kiemtra.value = true;
      }else{
        kiemtra.value = false
      }
    });
    return {cartStore, isMouseOver, userStore,avatar, kiemtra };
  },
  data() {
    return {};
  },
  methods: {
    goTo(route) {
      this.$router.push(route);
      this.dropdown = false;
    },
    async logout(){
     await axios
          .post(`https://localhost:7243/api/Account/logout/${this.userStore.userId}`)
          .then((respone) => {
            const result = respone.data;
            if(result == 0){
              localStorage.clear();
              window.location.href = "/login";
            }
          });
    }
  },
};
</script>
<style scoped>
.title1 {
  display: flex;
}
.header1 {
  border-bottom: 1px solid red;
}
.ulclass {
  list-style: none;
  overflow: hidden;
}
.navlink {
  text-decoration: underline;
}
li {
  margin-left: 10px;
}
.classula {
  margin-left: 300px;
  margin-top: 20px;
  margin-right: 100px;
}
.roundedimage {
  border-radius: 50%;
  cursor: pointer;
  width: 65px;
  height: 65px;
}
.giohang .yeuthich .sosanh .search {
  cursor: pointer;
}
.router-link {
  text-decoration: none;
  color: #000;
}
.listitem{
  top: -45px;
}
</style>
