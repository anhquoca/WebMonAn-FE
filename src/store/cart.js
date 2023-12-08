// src/store/cart.js
import { defineStore } from "pinia";
import {
  addToCartApi,
  getCartApi,
  XoaSanPhamKhoiGioHang,
  XoaGioHang,
} from "@/store/api";
export const useCartStore = defineStore("cart", {
  state: () => ({
    cartItems: [],
    totalCartPrice: 0,
  }),
  getters: {
    cartItemCount: (state) => state.cartItems.length,
    listCartItem: (state) => state.cartItems,
    totalCartPriceWithoutDiscount(state) {
      return state.cartItems.reduce(
        (total, item) => total + item.quantity * item.product.price,
        0
      );
    },
    totalCartPrice(state) {
      return state.cartItems.reduce(
        (total, item) =>
          total +
          (item.quantity *
            (item.product.price * (100 - item.product.discount))) /
            100,
        0
      );
    },
  },
  mutations: {},
  actions: {
    async addToCart(userId, productId, quantity) {
      const AddToCartModel = {
        userId: userId,
        productId: productId,
        quantity: quantity,
      };
      await addToCartApi(AddToCartModel);
      const existingItem = this.cartItems.find(
        (item) => item.productId === productId
      );
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.cartItems.push({
          productId: productId,
          product: {
          },
          quantity: quantity,
        });
      }
      this.saveToLocalStorage();
    },
    
    async fetchCart(userId) {
      const newcartItems = await getCartApi(userId);
      this.cartItems = newcartItems;
      this.saveToLocalStorage();
    },
    async DeleteCartItem(cartItemId) {
      const response = await XoaSanPhamKhoiGioHang(cartItemId);
      const indexToRemove = this.cartItems.findIndex(
        (item) => item.id === cartItemId
      );
      if (indexToRemove !== -1) {
        this.cartItems.splice(indexToRemove, 1);
      }
      this.saveToLocalStorage();
    },
    
    async DeleteCart(userId) {
      try {
        await XoaGioHang(userId);
        this.cartItems.splice(0);
        this.saveToLocalStorage();
      } catch (error) {
        console.error("Error clearing the cart:", error);
      }
    },
    async refrestCart() {
      try {
        this.cartItems.splice(0);
        this.saveToLocalStorage();
      } catch (error) {
      }
    },
    saveToLocalStorage() {
      localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
    },
    loadFromLocalStorage() {
      const storedCartItems = localStorage.getItem("cartItems");
      this.cartItems = storedCartItems ? JSON.parse(storedCartItems) : [];
    },
  },
});
export function setupCartStore() {
  // Initialize the store and load cartItems from local storage
  const cartStore = useCartStore();
  cartStore.loadFromLocalStorage();
  return cartStore;
}
