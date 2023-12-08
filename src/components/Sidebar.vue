<template>
<div >
    <v-card>
    <v-layout>
      <v-navigation-drawer
        image="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
        permanent
        theme="dark"
      >
        <div class="d-flex mt-3 ml-3"><v-icon icon="mdi mdi-account-outline" size="x-large"></v-icon>  <h2>Admin</h2></div>
        <v-list>
          <router-link to="/admin/product-management" class="nav-link">
            <v-list-item>
              <v-list-item-icon>
                <v-icon icon="mdi-view-list">mdi-view-list</v-icon>Quản lý Sản
                phẩm
              </v-list-item-icon>
            </v-list-item>
          </router-link>

          <router-link to="/admin/order-management" class="nav-link">
            <v-list-item>
              <v-icon icon="mdi-cart"></v-icon>Quản lý Đơn hàng
            </v-list-item>
          </router-link>

          <router-link to="/admin/category-management" class="nav-link">
            <v-list-item>
              <v-list-item-icon>
                <v-icon icon="mdi-format-list-bulleted"></v-icon>Quản lý Loại Sản Phẩm
              </v-list-item-icon>
            </v-list-item>
          </router-link>
          <router-link to="/admin/revenue-statistics" class="nav-link">
            <v-list-item>
              <v-list-item-icon>
                <v-icon icon="mdi-format-list-bulleted"></v-icon>Thống kê doanh thu
              </v-list-item-icon>
            </v-list-item>
          </router-link>
        </v-list>
      </v-navigation-drawer>
    </v-layout>
  </v-card>
</div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>
<style scoped>
.nav-link {
  text-decoration: none !important;
  color: white;
}
</style>
