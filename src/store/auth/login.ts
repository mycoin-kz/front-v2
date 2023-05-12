import { defineStore } from "pinia";
import { useAuth } from "./token";
import { API_LOGIN, API_LOGOUT } from "./api";
// @ts-expect-error
import { notify } from "@kyvg/vue3-notification";
import { useStore } from "..";
import _axios from "axios";

const axios = _axios.create({ withCredentials: true });

export const useLogin = defineStore("login", {
  state: () => ({
    loading: false,
  }),
  actions: {
    login(payload: any) {
      const auth = useAuth();
      this.loading = true;
      axios
        .post(API_LOGIN, payload)
        .then(() => {
          auth.setToken("AUTH_TOKEN");
          return auth.getProfile();
        })
        .then((profile) => {
          const store = useStore();
          store.fetchOverallTokens();
          store.getWatchlist();
          notify({
            type: "success",
            title: "Success",
            text: "Signed in as " + profile?.data.name,
          });
          // @ts-ignore
          this.router.push("/");
        })
        .catch(() => {
          notify({
            type: "error",
            title: "Error when trying to sign in",
            text: "Unhandled error in server response. Probably you have entered invalid credentials.",
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    logout() {
      const auth = useAuth();
      this.loading = true;
      axios
        .post(API_LOGOUT)
        .then(() => {
          notify({
            text: "See you soon!",
          });
          auth.destroyToken();
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
});
