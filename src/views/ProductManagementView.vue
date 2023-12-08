<template>
  <div class="ml-3">
    <div><h3>Danh sách sản phẩm</h3></div>
    <div>
      <table class="custom-table">
        <tr class="tieude">
          <th>Mã Sản phẩm</th>
          <th>Sản Phẩm</th>
          <th>Loại sản phẩm</th>
          <th>Tên sản phẩm</th>
          <th>Gía sản phẩm</th>
          <th>Giảm giá</th>
          <th>Thêm sản phẩm</th>
          <th>Sửa sản phẩm</th>
          <th>Xóa sản phẩm</th>
        </tr>

        <tr v-for="(item, index) in listProduct" :key="index">
          <td>{{ item.id }}</td>
          <td>
            <img
              :src="item.avartar_image_product"
              alt=""
              height="60"
              width="60"
            />
          </td>
          <td>{{ item.product_typeName }}</td>
          <td>{{ item.name_product }}</td>
          <td>{{ formatPrice(item.price) }}</td>
          <td>{{ item.discount }} %</td>
          <td><button @click="gotoFormThem">Them</button></td>
          <td><button>Sua</button></td>
          <td><button>Xoa</button></td>
        </tr>
      </table>
      <div v-if="showDetail" class="show-overlay">
        <div class="overlay"></div>
        <div class="custom-table-container">
          <h2>Thêm sản phẩm</h2>
          <v-form
            @submit.prevent="addProduct"
            class="formthem"
            ref="formThem"
            style="max-height: 600px; overflow-y: auto"
          >
            <p>Tên sản phẩm</p>
            <v-text-field
              v-model="productName"
              :name="productName"
              :rules="[rules.required]"
            ></v-text-field>
            <v-file-input
              ref="fileInput"
              @change="convertImageToBase64"
              label="Product Image"
              prepend-icon="mdi-camera"
              :name="productImage"
              :rules="[rules.required]"
              :error-messages="productImgErrorMessage"
            ></v-file-input>
            <p>Loại sản phẩm</p>
            <v-select
              v-model="productType"
              :items="listProductType"
              item-title="name_product_type"
              item-value="id"
              :name="productType"
              :rules="[rules.required]"
            ></v-select>
            <p>Gía sản phẩm</p>
            <v-text-field
              v-model="productPrice"
              type="number"
              :rules="[rules.required]"
              :name="productPrice"
            ></v-text-field>
            <p>Giảm giá</p>
            <v-text-field
              v-model="productDiscount"
              type="number"
              :name="productDiscount"
              :rules="[rules.required]"
            ></v-text-field>
            <p>Title</p>
            <v-textarea v-model="productTitle" variant="outlined" :rules="[rules.required]" :name="productTitle"></v-textarea>
            <p>Description</p>
            <v-textarea
              v-model="productDescription"
              variant="outlined"
              :rules="[rules.required]"
              :name="productDescription"
            ></v-textarea>
            <v-btn type="submit" color="green">Add Product</v-btn>
            <v-btn @click="hideform" color="blue-grey" class="ml-6">OK</v-btn>
          </v-form>
        </div>
      </div>
      <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-text>
          <p>{{ dialogTitle }}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn class="btn" @click="closeDialog">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { adminService } from "../services/Admin";
import { ref, onMounted } from "vue";
export default {
  data() {
    return {
      rules: {
        required: (value) => !!value || "Field is required",
      },
      listProduct: [
        {
          id: null,
          product_typeId: null,
          product_typeName: "",
          name_product: "",
          price: null,
          avartar_image_product: "",
          discount: null,
        },
      ],
      listProductType: [
        {
          id: 0,
          name_product_type: "",
        },
      ],

      showDetail: false,
      dialog:false,
      productImgErrorMessage: "",
      productName: "",
      productImage: null,
      productType: null,
      productPrice: null,
      productDiscount: null,
      productTitle: "",
      productDescription: "",
    };
  },
  async created() {
    await this.getListProduct();
    await this.getlistProductType();
  },
  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat("vi-VN").format(price);
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
          this.productImage = this.imgBase64;
        };
      }
    },
    async getListProduct() {
      await axios
        .get("https://localhost:7243/api/Product/GetListProduct")
        .then((respone) => {
          if (respone.data.length > 0) {
            this.listProduct = respone.data;
          } else {
            this.listProduct = [];
          }
        })
        .catch((error) => {});
    },
    async getlistProductType() {
      await adminService.api
        .get("/GetListProductType")
        .then((respone) => {
          if (respone.data.length > 0) {
            this.listProductType = respone.data;
          } else {
            this.listProductType = [];
          }
        })
        .catch((error) => {});
    },
    gotoFormThem() {
      this.showDetail = true;
    },
    closeDialog(){
this.dialog=false
    },
    hideform() {
      this.showDetail = false;
    },
    async addProduct() {
      const { valid } = await this.$refs.formThem.validate();
      if (this.productImage === null) {
        this.productImgErrorMessage = "Vui lòng chọn Image";
        return;
      } else {
        this.productImgErrorMessage = "";
      }
      if (valid) {
        const newProduct = {
          product_typeId: this.productType,
          name_product: this.productName,
          price: this.productPrice,
          avartar_image_product: this.productImage,
          title: this.productTitle,
          description: this.productDescription,
          discount:this.productDiscount,
        };
        await adminService.api
        .post("/ThemProduct",newProduct)
        .then((respone) => {
          var result = respone.data;
          if(result==0){
            this.dialogTitle="them san pham thanh cong!"
          }else{
            this.dialogTitle="them sna pham that bai!"
          }
          this.dialog = true
        })
        .catch((error) => {});
      }
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
.tieude {
  background-color: rgb(226, 219, 206);
}
.formthem {
  width: 600px;
}
button {
  color: green;
}
</style>
