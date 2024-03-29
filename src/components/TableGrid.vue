<template>
  <div class="text-center" v-if="loading">
    <loading-spinner />
  </div>
  <div class="table-grid" v-else :style="{ '--fields-length': fields.length }">
    <table class="tokens-data">
      <thead>
        <tr>
          <th class="token-number">
            <span class="grey fw-400" @click="sort_by = null">#</span>
          </th>
          <th class="token-name">
            <span class="grey fw-400" @click="sort_by = 'coinname'">Token</span>
          </th>
          <th class="token-bullish" v-if="fields.includes('bullish')">
            <span class="green fw-400" @click="sort_by = 'bullish'">Bullish</span>
          </th>
          <th class="token-neutral" v-if="fields.includes('neutral')">
            <span class="yellow fw-400" @click="sort_by = 'neutral'">Neutral</span>
          </th>
          <th class="token-bearish" v-if="fields.includes('bearish')">
            <span class="red fw-400" @click="sort_by = 'bearish'">Bearish</span>
          </th>
          <th class="token-score" v-if="fields.includes('score')">
            <span class="grey fw-400" @click="sort_by = 'total_perc'">Score</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="token in page_tokens"
          :key="token.cryptocompare_id"
          @click="router.push('/explore/' + token.cryptocompare_id)"
        >
          <td class="token-number grey">{{ token.number }}</td>
          <td class="token-name">
            <token-thumb :token="token" />
          </td>
          <td class="fw-400 token-bullish" v-if="fields.includes('bullish')">
            {{ token.bullish || "N/A" }}
          </td>
          <td class="fw-400 token-neutral" v-if="fields.includes('neutral')">
            {{ token.neutral || "N/A" }}
          </td>
          <td class="fw-400 token-bearish" v-if="fields.includes('bearish')">
            {{ token.bearish || "N/A" }}
          </td>
          <td class="fw-400 token-score" v-if="fields.includes('score')">
            {{ token.total_perc ? token.total_perc.toFixed(2) : "N/A" }}
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination" v-if="pages() > 1">
      <Icons @click="page > 1 && page--" icon="arrowLeft" />
      <button
        @click="page = item"
        class="page-buttons btn-main"
        v-for="item in pages()"
        :key="item"
        :class="{ 'btn-purple': page === item }"
      >
        {{ item }}
      </button>
      <Icons @click="page < pages() && page++" icon="arrowRight" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, computed } from "vue";
import { useRouter } from "vue-router";

import TokenThumb from "@/components/UI/Token.vue";
import LoadingSpinner from "@/components/UI/Loader.vue";

const props = defineProps({
  tokens: {
    type: Array,
    default: () => [],
  },
  loading: Boolean,
  fields: {
    type: Array,
    default: () => ["bullish", "neutral", "bearish", "score"],
  },
});
const sort_by = ref<string | null>(null);
const router = useRouter();

const TOKENS_PER_PAGE = 14;
const page = ref(1);
const pages = () => Math.ceil(props.tokens.length / TOKENS_PER_PAGE);
const page_tokens = computed(() => {
  const res = [...props.tokens]
    .sort((a: any, b: any) => {
      if (sort_by.value === null) {
        return 1;
      }
      if (sort_by.value === "coinname") {
        if (a.coinname.toLowerCase() > b.coinname.toLowerCase()) {
          return 1;
        }
        if (b.coinname.toLowerCase() > a.coinname.toLowerCase()) {
          return -1;
        }
        return 0;
      }
      return b[sort_by.value] - a[sort_by.value];
    })
    .map((val: any, index) => ({ ...val, number: index + 1 }))
    .slice((page.value - 1) * TOKENS_PER_PAGE, page.value * TOKENS_PER_PAGE);
  return res;
});
</script>

<style lang="scss">
@import "@/assets/scss/_vars.scss";

.table-grid {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  grid-gap: 2.5rem;
  // margin-bottom: 4rem;
}
table.tokens-data {
  background: $white;
  border-radius: 16px;
  border-collapse: collapse;

  thead {
    background: transparent;
    th {
      padding: 1.75rem 0 1rem 0;
      border-bottom: 1px solid #e6e6ea;

      &.token-name {
        text-align: left;
      }
    }
  }
  tbody {
    tr {
      cursor: pointer;

      &:hover {
        background: rgba(0, 0, 0, 0.03);
      }
    }
    .token-number {
      padding-right: 0;
      padding-left: 0;
    }
    .token-name {
      padding: 0.75rem 0;
      text-align: left;
    }
  }
  tr {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 3.5rem 2fr repeat(var(--fields-length), 1fr);
  }
  td {
    text-align: center;
  }
  // .token-number{
  //   width: 1.5rem;
  // }
}
.pagination {
  display: flex;
  align-items: center;
  grid-gap: 0.5rem;
  justify-content: center;

  .page-buttons {
    border-radius: 50%;
    height: 2rem;
    width: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $white;
    color: $purple;
    padding: 0;
  }
  .component-icon {
    cursor: pointer;
  }
}
</style>

<style scoped>
th span {
  cursor: pointer;
}
</style>
