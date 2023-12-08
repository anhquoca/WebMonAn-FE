<template>
  <div class="ml-3">
    <div><h3>Danh sách đơn đặt hàng</h3></div>
    <div>
      <table class="custom-table">
        <tr class="tieude">
          <th>Mã Đơn Hàng</th>
          <th>Phương Thức Thanh Toán</th>
          <th>Trạng Thái Đơn Hàng</th>
          <th>Giá Gốc</th>
          <th>Giá Thực Tế</th>
          <th>Ngày Tạo</th>
          <th>Tên Người Đặt</th>
          <th>Số Điện Thoại</th>
          <th>Địa Chỉ</th>
          <th>Xem chi tiết</th>
        </tr>

        <tr v-for="(item, index) in listOrder" :key="index">
          <td>{{ item.id }}</td>
          <td>{{ item.payment_method }}</td>
          <td>{{ item.status_name }}</td>
          <td>{{ formatPrice(item.original_price) }}</td>
          <td>{{ formatPrice(item.actual_price) }}</td>
          <td>{{ item.created_at }}</td>
          <td>{{ item.full_Name }}</td>
          <td>{{ item.phone }}</td>
          <td>{{ item.address }}</td>
          <td>
            <v-icon
              icon="mdi mdi-table-eye"
              color="green"
              size="large"
              @click="showListOrderDetail(item.id)"
            ></v-icon>
          </td>
        </tr>
      </table>
      <div v-if="showDetail" class="show-overlay">
        <div class="overlay"></div>
        <div class="custom-table-container">
          <table class="custom-table">
            <tr class="tieude">
                <th>Sản Phẩm</th>
                <th>Tên Sản Phẩm</th>
                <th>Số Lượng</th>
                <th>Giá gốc</th>
                <th>Giảm giá</th>
                <th>Tổng Giá </th>
            </tr>
            <tr v-for="item in lisOrderDetail">
                <td><img :src="item.product.avartar_image_product" alt="" height="60" width="60"></td>
                <td>{{ item.product.name_product }}</td>
                <td>{{ item.quantity }}</td>
                <td>{{ formatPrice(item.product.price) }}</td>
                <td>{{ item.product.discount }} %</td>
                <td>{{ formatPrice((item.product.price*item.quantity)*(100-item.product.discount)/100) }} VND</td>
            </tr>
          </table>
          <v-btn @click="hideListOrderDetail" color="blue-grey">OK</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { adminService } from "../services/Admin";
export default {
  data() {
    return {
      listOrder: [
        {
          id: 0,
          userId: 0,
          original_price: 0,
          actual_price: 0,
          full_Name: "",
          email: "",
          phone: "",
          address: "",
          payment_method: "",
          status_name: "",
          created_at: "",
        },
      ],
      lisOrderDetail: [
        {
          productId: 0,
          product: {
            id: 0,
            product_typeId: 0,
            name_product: "",
            price: 0,
            avartar_image_product: "",
            discount: 0,
          },
          price_total: 0,
          quantity: 0,
          orderStatus: "",
        },
      ],
      showDetail: false,
    };
  },
  created() {
    this.getListOrder();
  },
  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat("vi-VN").format(price);
    },
    showListOrderDetail(orderId) {
      adminService.api
        .get(`/GetOrderDetail/${orderId}`)
        .then((response) => {
          this.lisOrderDetail = response.data;
          this.showDetail = true;
          console.log(this.lisOrderDetail)
        })
        .catch((error) => {
          console.error("Error fetching order details:", error);
        });
    },
    hideListOrderDetail() {
      this.showDetail = false;
    },
    async getListOrder() {
      await adminService.api
        .get(`https://localhost:7243/admin/Admin/GetOrders`)
        .then((respone) => {
          this.listOrder = respone.data;
        })
        .catch((error) => {});
    },
  },
};
</script>

<style scoped>
.custom-table th,
.custom-table td {
  border: 1px solid #383030;
  padding: 8px;
  text-align: left;
}
.custom-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}
.custom-table-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
  display: none;
}

.show-overlay .overlay {
  display: block;
}
.tieude{
    background-color: rgb(226, 219, 206);
}
</style>
