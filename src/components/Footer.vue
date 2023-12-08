<template>
  <footer class="footer bg-blue-grey-darken-4 text-center d-flex flex-column">
    <div class="overlay"></div>
    <div class="test">
      <v-row class="mb-12">
        <v-col class="text-center ml-12" cols="3">
          <v-img
            src="https://res.cloudinary.com/do9rcgv5s/image/upload/v1692137209/e2nw6oqvtlvpqmdwtmnh.png"
            width="100%"
            height="100px"
          ></v-img>
          <p>Poly Food là nhà hàng Thuần chay và Cung cấp thực phẩm chay</p>
        </v-col>
        <v-col class="text-left" cols="2">
          <h3>Cửa hàng</h3>
          <p>Về chúng tôi</p>
          <p>Liên hệ</p>
          <p>Tin tức</p>
          <p>Hỗ trợ</p>
        </v-col>
        <v-col class="text-left" cols="3">
          <h3>Chính sách mua hàng</h3>
          <p>Điều khoản</p>
          <p>Chính sách & Bảo mật</p>
          <h3 class="mt-3">Theo dõi chúng tôi</h3>
          <div class="d-flex">
            <a href="https://www.facebook.com/"
              ><v-icon icon="mdi-facebook" color="indigo-darken-4"></v-icon
            ></a>
            <a href="https://www.youtube.com/"
              ><v-icon icon="mdi-youtube" color="red" class="ml-2"></v-icon
            ></a>
            <a href="https://www.twitter.com/"
              ><v-icon
                icon="mdi-twitter"
                color="indigo-accent-4"
                class="ml-2"
              ></v-icon
            ></a>
            <a href="https://www.twitter.com/"
              ><v-icon
                icon="mdi-instagram"
                color="lime-accent-4"
                class="ml-2"
              ></v-icon
            ></a>
          </div>
        </v-col>
        <v-col class="text-left" cols="3">
          <h3>Đăng ký ngay</h3>
          <p>
            <i
              >Nhận thông báo mới nhất qua email về những tin tức của chúng
              tôi</i
            >
          </p>
          <v-text-field
            v-model="email"
            class="email mb-2 mr-12"
            type="input"
            label="Nhập email cua bạn"
          ></v-text-field>
          <button @click="Dangky" class="buutondangky">
            <u>ĐĂNG KÝ</u>
          </button>
        </v-col>
      </v-row>
      <v-divider></v-divider>
    </div>
  </footer>
</template>
<script>
export default {
  data: () => ({
    email: "",
  }),
};
</script>
<style scoped>
.footer {
  background-image: url("https://toplisthanoi.com/wp-content/uploads/2021/06/5cua-hang-hoa-qua-sach-ha-noi-min-min-e1624554017405.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  background-color: rgba(0, 0, 0, 0.3);
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
}
.test {
  position: relative;
  margin-top: 80px;
}
p {
  margin-top: 6px;
}
</style>
