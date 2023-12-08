<template>
  <Header></Header>
  <v-container fluid fill-height>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-btn color="green" width="100%">Cập nhật thông tin</v-btn>
        <v-card width="800">
          <v-card-text>
            <v-form ref="form" class="d-flex mt-2">
              <v-sheet width="450">
                <p>Tên người dùng</p>
                <v-text-field v-model="userName" variant="solo" clearable></v-text-field>
                <p>Email</p>
                <v-text-field
                  v-model="email"
                  variant="solo"
                  readonly
                ></v-text-field>
                <p>Địa chỉ</p>
                <v-text-field v-model="diachi" variant="solo" clearable></v-text-field>
                <p>Số Điện thoại</p>
                <v-text-field
                  v-model="phone"
                  clearable
                  variant="solo"
                  :rules="[rules.phone]"
                  type="number"
                ></v-text-field>
              </v-sheet>

              <v-sheet class="ml-4" width="400">
                <v-img
                  class="avatar"
                  :src="avatar"
                  alt="Image"
                  width="100"
                  height="100"
                ></v-img>
                <v-file-input
                  ref="fileInput"
                  class="avatarinput"
                  color="deep-purple-accent-4"
                  counter
                  label="Chọn ảnh"
                  multiple
                  prepend-icon="mdi-camera"
                  @change="convertImageToBase64"
                ></v-file-input>
              </v-sheet>
            </v-form>

            <!-- Nút đăng ký -->
            <v-btn @click="updateThongTin" color="primary" :loading="loading"
              >Lưu thông tin</v-btn
            >
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-container fluid fill-height class="mb-12 mt-12">
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-btn @click="toggleFormPassword" color="green" width="100%"
          >Cập nhật mật khẩu</v-btn
        >
        <v-card v-if="showForm" width="800">
          <v-card-text>
            <v-form ref="formPassword">
              <p>Mật khẩu hiện tại</p>
              <v-text-field
                clearable
                v-model="passwordOld"
                type="password"
                :rules="[rules.required]"
              ></v-text-field>
              <p>Mật khẩu mới</p>
              <v-text-field
                clearable
                v-model="passwordNew"
                type="password"
                :rules="[rules.required]"
              ></v-text-field>
              <P>Xác nhận mật khẩu</P>
              <v-text-field
                clearable
                v-model="confirmPassword"
                type="password"
                :rules="[rules.required, rules.confirmPassword]"
              ></v-text-field>
              <v-btn @click="updatePassword" color="primary" :loading="loadingz"
                >Lưu thay đổi</v-btn
              >
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-text>
          <p>{{ dialogTitle }}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn class="btn" @click="openDialog">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
  <Footer></Footer>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useUserStore } from "@/store/userStore";

import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
export default {
  name: "MyAccountView",
  components: {
    Header,
    Footer,
  },
  setup() {
    const userStore = useUserStore();
    const userId = userStore.userId;
    const email = userStore.email;
    const userName = ref("");
    const phone = ref("");
    const diachi = ref("");
    const avatar = ref("");
    onMounted(async () => {
      await userStore.fetchUserData();
      userName.value = userStore.userName || "";
      phone.value = userStore.phone || "";
      diachi.value = userStore.address || "";
      avatar.value = userStore.imgUser || "";
    });
    return { userId, userStore, email, userName, phone, diachi, avatar };
  },
  created() {},
  data() {
    return {
      showForm: false,
      passwordOld: "",
      passwordNew: "",
      confirmPassword: "",
      imgBase64: "",
      dialog: false,
      dialogTitle: "",
      loading: false,
      loadingz: false,
      rules: {
        required: (value) => !!value || "Field is required",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
        phone: (value) => {
          const pattern = /^\d{10}$/;
          return pattern.test(value) || "Số điện thoại phải có 10 chữ số";
        },
        confirmPassword: (value) => {
          if (value == this.passwordNew) {
            return true;
          } else {
            return "Incorrect ConfirmPassword";
          }
        },
      },
    };
  },
  methods: {
    toggleFormPassword() {
      this.showForm = !this.showForm;
    },
    async convertImageToBase64() {
      const fileInput =
        this.$refs.fileInput.$el.querySelector("input[type=file]");
      const file = fileInput.files[0];

      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.imgBase64 = reader.result;
          this.avatar = this.imgBase64;
        };
      }
    },
    openDialog() {
      this.dialog = false;
    },
    async updateThongTin() {
      console.log(this.email)
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        this.loading = true;
        const model = {
          user_name: this.userName,
          phone: this.phone,
          imgUser: this.avatar,
          address: this.diachi,
          email: this.email,
        };
        await axios
          .put("https://localhost:7243/api/Users/updateProfile", model)
          .then((respone) => {
            this.userStore.fetchUserData();
            this.loading = false;
            const result = respone.data;
            if (result == 0) {
              this.dialogTitle = "Cập nhật thông tin hồ sơ thành công!";
            } else {
              this.dialogTitle = "Cập nhật thông tin thất bại!";
            }
            this.dialog = true;
          });
    
      }
    },
    async updatePassword() {
      const { valid } = await this.$refs.formPassword.validate();
      if (valid) {
        this.loadingz = true;
        const model = {
          passwordOld: this.passwordOld,
          passwordNew: this.passwordNew,
          userId: this.userId,
        };
        await axios
          .post("https://localhost:7243/api/Users/updatePassword", model)
          .then((respone) => {
            this.loadingz = false;
            const result = respone.data;
            if (result == 5) {
              this.dialogTitle = "Mật khẩu cũ không chính xác!";
            }
            if (result == 2) {
              this.dialogTitle =
                "Mật khẩu mới không được trùng với mật khẩu cũ!";
            }
            if (result == 0) {
              this.dialogTitle = "Cập nhật mật khẩu thành công!";
            }
            if (result == 1) {
              this.dialogTitle = "Cập nhật mật khẩu thất bại!";
            }
            this.dialog = true;
          });
      }
    },
  },
};
</script>

<style scoped>
.avatar {
  margin-left: 80px;
}
.avatarinput {
  width: 200px;
  height: 40px;
  margin-top: 20px;
  margin-left: 30px;
}
v-text-field {
  height: 30px;
}
</style>
