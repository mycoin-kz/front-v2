<template>
  <div class="text-center page">
    Thanks for signing in, soon you will be redirected to an authorized application...
  </div>
</template>

<script setup lang="ts">
import { googleLogin } from "@/store/auth/google/login";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
onMounted(() => {
  const google_code = route.query.code as string;
  if (google_code) {
    googleLogin(google_code);
  } else {
    router.push("");
  }
});
</script>
