<template>
  <main-layout>
    Hi there! This section is yet to be developed. Please go back to
    <router-link to="/feed">main page</router-link>
  </main-layout>
</template>

<script setup lang="ts">
import { generateHeadMeta } from "@/helpers/generate-head";
import { useHead } from "@vueuse/head";
useHead(generateHeadMeta("Explore"));
</script>
