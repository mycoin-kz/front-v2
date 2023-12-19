import { defineStore } from "pinia";
import { api } from "./api";

export const useAuth = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("jwt") || null,
    accessToken: localStorage.getItem("access_token") || null,
    refreshToken: localStorage.getItem("refresh_token") || null,
    user: null,
    auth_method: null,
  }),
  getters: {
    isAuthenticated(): boolean {
      return this.token !== null && !!this.token;
    },
  },
  actions: {
    setToken(token: string) {
      this.token = token;
      localStorage.setItem("jwt", this.token);
    },
    destroyToken() {
      this.token = null;
      localStorage.removeItem("jwt");
      // @ts-ignore router is not defined on Pinia
      this.router.push("/login");
    },
    async getProfile() {
      try {
        await api.get("auth/user");
        const res = await api.get("auth/profile");
        this.setToken("AUTH_TOKEN");
        this.user = res.data;
        return res;
      } catch (e: any) {
        if (e.response.status === 403 || e.response.status === 401) {
          this.destroyToken();
          this.user = null;
          return null;
        }
      }
    },
  },
});
