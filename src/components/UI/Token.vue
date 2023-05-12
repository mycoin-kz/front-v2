<template>
  <div class="token-thumbnail">
    <img :src="token.imageurl" :alt="token.coinname" class="token-image-round" />
    <span class="fz-14 coinname">{{ token.coinname }}</span>
    <span class="fz-14 gray token-symbol">{{ token.symbol }}</span>
  </div>
</template>

<script lang="ts">
export default {
  props: ["token"],
};
</script>

<style lang="scss">
.token-image-round {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
}
.token-thumbnail {
  display: flex;
  align-items: center;
  grid-gap: 0.5rem;

  .coinname {
    margin-left: 0.25rem;
  }
}
</style>
