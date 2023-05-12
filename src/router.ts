import Login from "@/pages/auth/login.vue";
import Logout from "@/pages/auth/logout.vue";
import Register from "@/pages/auth/register.vue";
import ResetPass from "@/pages/auth/forgot_password.vue";
import GoogleLogin from "@/pages/auth/google_login.vue";

import Summary from "@/pages/Summary.vue";
import Feed from "@/pages/Feed.vue";
import Explore from "@/pages/Explore.vue";
import Watchlist from "@/pages/Watchlist.vue";
import Portfolio from "@/pages/Portfolio.vue";
import Profile from "@/pages/Profile.vue";

import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from "./store/auth/token";

const routes = [
  {
    path: "/feed",
    name: "Feed",
    component: Feed,
  },
  {
    path: "/explore",
    name: "Explore",
    component: Explore,
  },
  {
    path: "/watchlist",
    name: "Watchlist",
    component: Watchlist,
  },
  {
    path: "/portfolio",
    name: "Portfolio",
    component: Portfolio,
  },
  {
    path: "/profile",
    name: "My Profile",
    component: Profile,
  },
  {
    path: "/explore/:id",
    name: "Summary",
    component: Summary,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      module: "auth",
    },
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      module: "auth",
    },
  },
  {
    path: "/reset_pass",
    name: "ResetPass",
    component: ResetPass,
    meta: {
      module: "auth",
    },
  },
  {
    path: "/google",
    name: "GoogleLogin",
    component: GoogleLogin,
    meta: {
      module: "auth",
    },
  },
  {
    path: "",
    redirect: "/feed",
  },
];
export const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to) => {
  // useAuth().isAuthenticated && (to.params.id && useStore().fetchData(to.params.id))
  if (!useAuth().isAuthenticated && to.meta.module !== "auth") {
    console.log("user not authenticated");
    return { name: "Login" };
  } else if (useAuth().isAuthenticated && to.meta.module === "auth") {
    return "";
    // console.log('isAuthenticated:', useAuth().isAuthenticated, 'token: ' + useAuth().token)
  }
  // next()
});
