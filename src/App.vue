<template>
  <notifications />
  <router-view></router-view>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useStore } from "./store";
import { useAuth } from "./store/auth/token";

onMounted(() => {
  const store = useStore();
  const auth = useAuth();
  auth.getProfile();
  if (!store.overall_tokens.length && auth.isAuthenticated) {
    store.fetchOverallTokens().then(() => {
      if (!store.watchlist.data.length) {
        store.getWatchlist();
      }
    });
  }
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap");
@import "./assets/scss/main.scss";

#app {
  font-family: "Manrope", sans-serif;
  box-sizing: border-box;
  overflow: hidden;
  min-height: 100vh;
}
</style>
<script lang="ts">
// @ts-ignore
window.fbAsyncInit = function () {
  // @ts-ignore
  FB.init({
    appId: "489252143151507",
    cookie: true,
    xfbml: true,
    version: "v15.0",
  });
  // @ts-ignore
  FB.AppEvents.logPageView();
};

(function (d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s) as HTMLScriptElement;
  js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode?.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");
</script>
