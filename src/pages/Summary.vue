<template>
  <main-layout>
    <div class="text-center" v-if="store.loading">
      <loading-spinner />
    </div>
    <div class="mainpage" v-else>
      <token-summary></token-summary>
      <socials></socials>
    </div>
  </main-layout>
</template>

<script setup lang="ts">
import TokenSummary from "@/components/TokenSummary/index.vue";
import Socials from "@/components/SocialMediaQuality/index.vue";
import LoadingSpinner from "@/components/UI/Loader.vue";

import { useStore } from "@/store/index";
import { useRoute } from "vue-router";

const store = useStore();

const id = useRoute().params.id as string;
store.tokens[id] || useStore().fetchData(id);
</script>

<style lang="scss">
.mainpage {
  display: flex;
  flex-direction: column;
  grid-gap: 1.5rem;
}
.block {
  background: #fcfcfc;
  border-radius: 15px;
  display: inline-block;
}
</style>
