// @ts-expect-error
import { notify } from "@kyvg/vue3-notification";
import { defineStore } from "pinia";
import { api } from "./auth/api";
import { useAuth } from "./auth/token";
import fulldata_json from "./fulldata.json";
import summary_json from "./summary.json";
import signals_json from "./signals.json";

export const useStore = defineStore("main", {
  state: () => ({
    loading: false,
    loading_overall: false,
    overall_tokens: [] as any[],
    error: "",
    tokens: {} as any,
    watchlist: {
      loading: false,
      data: [] as any[],
    },
  }),
  actions: {
    async fetchData(id: string) {
      this.loading = true;
      this.tokens[id] = {};

      return new Promise((resolve, reject) => {
        const fulldata = api.get(`fulldata/${id}`).then((res) => {
          this.tokens[id].fulldata = res.data;
        });

        const signalsdata = api.get(`signalsdata/${id}`).then((res) => {
          this.tokens[id].signalsdata = res.data;
        });
        const summarydata = api.get(`summarydata/${id}`).then((res) => {
          this.tokens[id].summarydata = res.data;
        });
        Promise.all([fulldata, signalsdata, summarydata])
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            this.error = err.message;
            notify({
              type: "error",
              title:
                "Error when fetching token data. " + import.meta.env.VITE_USE_MOCK_API &&
                "Using mock API",
              text: "Unhandled error in server response: " + this.error,
            });
            if (import.meta.env.VITE_USE_MOCK_API) {
              this.tokens[id].fulldata = fulldata_json;
              this.tokens[id].signalsdata = signals_json;
              this.tokens[id].summarydata = summary_json;
            } else {
              reject(err);
            }
          })
          .finally(() => (this.loading = false));
      });
    },
    async fetchOverallTokens() {
      this.loading_overall = true;
      console.log("fetching overall tokens...");
      return new Promise((resolve, reject) => {
        api
          .get("overall_tokens")
          .then((res) => {
            this.overall_tokens = res.data;
            this.loading_overall = false;
            resolve(res);
          })
          .catch((err) => {
            this.loading_overall = false;
            this.error = err.message;
            notify({
              type: "error",
              title:
                "Error when fetching token data. " + import.meta.env.VITE_USE_MOCK_API &&
                "Using mock API",
              text: "Unhandled error in server response: " + this.error,
            });
            if (import.meta.env.VITE_USE_MOCK_API) {
              console.log("fetch tokens failed, using mock data...");
              const tokens = [];
              for (let i = 0; i < 25; i++) {
                tokens.push(summary_json);
              }
              this.overall_tokens = tokens;
            } else {
              reject(err);
            }
          });
      });
    },
    async getWatchlist() {
      this.watchlist.loading = true;
      const store = useAuth();
      return new Promise((resolve, reject) => {
        api
          .get("watchlist", { withCredentials: true })
          .then((res) => {
            this.watchlist.data = res.data.map(
              (el: any) =>
                this.overall_tokens.filter(
                  (token: any) => token.cryptocompare_id + "" === el.token
                )[0]
            );
            this.watchlist.loading = false;
            resolve(res);
          })
          .catch((err) => {
            this.error = err.message;
            store.isAuthenticated ||
              notify({
                type: "error",
                title: "Error when fetching watchlist",
                text: "Unhandled error in server response: " + this.error,
              });
            this.watchlist.loading = false;
            reject(err);
          })
          .finally(() => {
            this.watchlist.loading = false;
          });
      });
    },
    async addToWatchlist(token_id: string) {
      this.watchlist.loading = true;
      return new Promise((resolve, reject) => {
        api
          .post(
            "watchlist",
            {
              token: token_id,
            },
            { withCredentials: true }
          )
          .then((res) => {
            this.watchlist.data = res.data.map(
              (el: any) =>
                this.overall_tokens.filter(
                  (token: any) => token.cryptocompare_id + "" === el.token
                )[0]
            );
            this.watchlist.loading = false;
            resolve(res);
          })
          .catch((err) => {
            this.error = err.message;
            notify({
              type: "error",
              title: "Error when fetching watchlist",
              text: "Unhandled error in server response: " + this.error,
            });
            this.watchlist.loading = false;
            reject(err);
          })
          .finally(() => {
            this.watchlist.loading = false;
          });
      });
    },
    async removeFromWatchlist(token_id: string) {
      this.watchlist.loading = true;
      return new Promise((resolve, reject) => {
        api
          .delete("watchlist/" + token_id, { withCredentials: true })
          .then((res) => {
            this.watchlist.data = res.data.map(
              (el: any) =>
                this.overall_tokens.filter(
                  (token: any) => token.cryptocompare_id + "" === el.token
                )[0]
            );
            this.watchlist.loading = false;
            resolve(res);
          })
          .catch((err) => {
            this.error = err.message;
            notify({
              type: "error",
              title: "Error when fetching watchlist",
              text: "Unhandled error in server response: " + this.error,
            });
            this.watchlist.loading = false;
            reject(err);
          })
          .finally(() => {
            this.watchlist.loading = false;
          });
      });
    },
  },
});
