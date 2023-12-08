<!-- components/AlertMessage.vue -->
<template>
  <div v-if="isVisible" class="alert-message d-flex justify-center ">
    <div><v-icon class="mdi mdi-message-alert-outline" color="red"></v-icon></div>
    <div class="ml-2">{{ message }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false,
      message: "",
    };
  },
  methods: {
    openDialog(message) {
      this.message = message;
      this.isVisible = true;
      setTimeout(() => {
        this.isVisible = false;
      }, 2000);
    },
  },
};
</script>

<style scoped>
.alert-message {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: white; /* Màu đỏ hoặc màu bạn muốn */
  color: black;
  padding: 15px;
  text-align: center;
  cursor: pointer;
  min-width: 250px;
}

.alert-message span {
  float: right;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
}
</style>
