import axios from "axios";
export const addToCartApi = async (AddToCartModel) => {
  try {
    const response = await axios.post(
      "https://localhost:7243/api/Cart/ThemSanPhamVaoCart",
      AddToCartModel
    );
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};
export const getCartApi = async (userId) => {
  const response = await axios.get(`https://localhost:7243/api/Cart/GetCartItems/${userId}`);
  return response.data;
};
export const getThongTinUser = async (userId) => {
  const response = await axios.get(`https://localhost:7243/api/Users/thongtinUser/${userId}`)
  return response.data;
};
export const XoaSanPhamKhoiGioHang = async (cartItemId) => {
  try {
    const response = await axios.delete(
      `https://localhost:7243/api/Cart/XoaSanPhamKhoiGioHang/${cartItemId}`);
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};
export const XoaGioHang = async (userId) => {
  try {
    const response = await axios.delete(
      `https://localhost:7243/api/Cart/XoaGioHang/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};
