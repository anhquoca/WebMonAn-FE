import { createRouter, createWebHistory } from "vue-router";
import Register from "../views/RegisterView.vue";
import Login from "../views/LoginView.vue";
import ForgotPassword from "../views/ForgotPasswordView.vue";
import ConfirmPassword from "../views/ConfirmPasswordView.vue";
import MyAccount from "../views/MyAccountView.vue";
import Home from "../views/HomeView.vue";
import Product from "../views/ProductView.vue";
import Cart from "../views/CartView.vue";
import Admin from "../views/AdminView.vue";
import ListOrder from "../views/ListOrderView.vue";
import ThongKe from "../views/ThongKeView.vue";
import Checkout from "../views/CheckoutView.vue";
import SuccessfulOnlinePayment from "../views/SuccessfulOnlinePaymentView";
import AccountAuthentication from "../views/AccountAuthenticationView";
import ProductManagement from "../views/ProductManagementView";
const routes = [
  {
    path: "/",
    children: [
      {
        path: "/",
        name: "Home",
        component: Home,
      },
    ],
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: ForgotPassword,
  },
  {
    path: "/my-account",
    name: "my-account",
    component: MyAccount,
  },
  {
    path: "/confirm-password/reset-password",
    name: "confirm-password",
    component: ConfirmPassword,
  },
  {
    path: "/product/:productId",
    name: "product",
    component: Product,
  },
  {
    path: "/cart",
    name: "cart",
    component: Cart,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    children: [
      {
        path: "product-management",
        name: "ProductManagement",
        component: ProductManagement,
      },
      {
        path: "order-management",
        name: "OrderManagement",
        component: ListOrder,
      },
      {
        path: "category-management",
        name: "CategoryManagement",
        component: Login,
      },
      {
        path: "revenue-statistics",
        name: "RevenueStatistics",
        component: ThongKe,
      },
    ],
  },
  {
    path: "/checkout",
    name: "checkout",
    component: Checkout,
  },
  {
    path: "/Successful-online-payment",
    name: "Successful-online-payment",
    component: SuccessfulOnlinePayment,
  },
  {
    path: "/AccountAuthentication",
    name: "AccountAuthentication",
    component:AccountAuthentication,
  }
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});
router.afterEach(() => {

  window.scrollTo(0, 0);
});
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "Web món ngon ";
  next();
});
export default router;
