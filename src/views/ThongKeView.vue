<template>
  <div class="ml-3">
    <div><h3>Thống kê doanh thu</h3></div>
    <v-row>
      <v-col>
        <v-select
          v-model="thongKe.month"
          :items="months"
          item-title="text"
          item-value="value"
          label="Chọn Tháng"
        ></v-select>
      </v-col>
      <v-col>
        <v-select
          v-model="thongKe.quarter"
          :items="quarters"
          item-title="text"
          item-value="value"
          label="Chọn Quý"
        ></v-select>
      </v-col>
      <v-col>
        <v-select
          v-model="thongKe.year"
          :items="years"
          label="Chọn Năm"
          @click="show"
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-btn class="ml-3" @click="ThongKeDoanhThu" color="blue-grey"
        >Xem Thống kê</v-btn
      >
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Doanh thu</v-card-title>
          <v-card-text>
            <p>Tổng doanh thu: {{ formatPrice(totalRevenue) }} VND</p>
            <p class="mt-3">Số đơn hàng: {{ totalOrders }}</p>
            <!-- Các thông tin thống kê khác -->
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
import { adminService } from "../services/Admin";
export default {
  data() {
    return {
      thongKe: {
        year: null,
        month: null,
        quarter: null,
      },
      years: [2023, 2022, 2021, 2020],
      months: [
        { value: 1, text: "Tháng 1" },
        { value: 2, text: "Tháng 2" },
        { value: 3, text: "Tháng 3" },
        { value: 4, text: "Tháng 4" },
        { value: 5, text: "Tháng 5" },
        { value: 6, text: "Tháng 6" },
        { value: 7, text: "Tháng 7" },
        { value: 8, text: "Tháng 8" },
        { value: 9, text: "Tháng 9" },
        { value: 10, text: "Tháng 10" },
        { value: 11, text: "Tháng 11" },
        { value: 12, text: "Tháng 12" },
      ],
      quarters: [
        { value: 1, text: "Qúy 1" },
        { value: 2, text: "Qúy 2" },
        { value: 3, text: "Qúy 3" },
        { value: 4, text: "Qúy 4" },
      ],
      totalOrders: 0,
      totalRevenue: 0,
    };
  },
  methods: {
    ThongKeDoanhThu() {
      adminService.api.post('/Thongkedoanhthu', this.thongKe)
        .then((respone) => {
          this.totalRevenue = respone.data.tongDoanhThu;
          this.totalOrders = respone.data.soHoaDon;
          this.reset();
        })
        .catch((error) => {
          //this.$router.push('/login');
          console.log("Error:", error);
        });
    },
    reset() {
      this.thongKe.month = null;
      this.thongKe.quarter = null;
      this.thongKe.year = null;
    },
    formatPrice(price) {
      return new Intl.NumberFormat("vi-VN").format(price);
    },
    
  },
};
</script>

<style scoped></style>
