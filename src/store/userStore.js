import { defineStore } from "pinia";
import {
  getThongTinUser
} from "@/store/api";
export const useUserStore = defineStore("useUserStore", {
  state: () => ({
    userId: localStorage.getItem("userId") || null,
    token: localStorage.getItem("token") || null,
    email: localStorage.getItem("email") || null,
    userName: localStorage.getItem("userName") || null,
    address: localStorage.getItem("address") || null,
    phone: localStorage.getItem("phone") || null,
    userInfo: localStorage.getItem("userInfo") || null,
    userRole: localStorage.getItem("userRole") || null,
    slCartItem: localStorage.getItem("slCartItem") || null,
    slSoSanh: 0,
    slYeuThich: 0,
    imgUser: localStorage.getItem("imgUser") || null,
  }),
  actions: {
    setUserId(userId) {
      this.userId = userId;
      localStorage.setItem("userId", userId);
    },
    setUserInfo(token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      const decodedPayload = JSON.parse(atob(base64));
      const userRole = decodedPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      this.userRole = userRole;
      this.userInfo = decodedPayload;
      this.token = token;
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("userRole", JSON.stringify(userRole));
      localStorage.setItem("userInfo", JSON.stringify(decodedPayload));
    },
    async fetchUserData(){
      const userData = await getThongTinUser(this.userId)
      this.imgUser = userData.userImage;
      this.slCartItem = userData.slCartItem;
      this.email = userData.email;
      this.userName =userData.userName;
      this.address = userData.address;
      this.phone = userData.phone
      localStorage.setItem("email", userData.email);
      localStorage.setItem("userName", userData.userName);
      localStorage.setItem("address", userData.address);
      localStorage.setItem("phone", userData.phone);
      localStorage.setItem("imgUser", userData.imgUser);
      localStorage.setItem("slCartItem", userData.slCartItem);
    }
  },

});
