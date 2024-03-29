<template>
  <div class="twitter-chart block" v-if="store.tokens[id].fulldata.twitter">
    <div class="block-head">
      <Icons icon="twitter" class="icon-32" />
      <h3 class="fw-600">Twitter</h3>
    </div>
    <div class="chart-inner">
      <div class="diagram">
        <div class="diagram-layer">
          <p class="label fw-400 fz-14">
            Better than <br /><span style="color: #2cafff"
              >{{ store.tokens[id].summarydata.twitter_perc.toFixed(2) }}%</span
            >
            tokens
          </p>
        </div>
        <apexchart
          height="100%"
          width="100%"
          :options="options"
          :series="[store.tokens[id].summarydata.twitter_perc]"
        ></apexchart>
      </div>
      <div class="stats">
        <span class="key">Followers</span>
        <span class="value grey">{{ store.tokens[id].fulldata.twitter.followers || "-" }}</span>
        <span class="key">Following</span>
        <span class="value grey">{{ store.tokens[id].fulldata.twitter.following || "-" }}</span>
        <span class="key">Favourites</span>
        <span class="value grey">{{ store.tokens[id].fulldata.twitter.favourites || "-" }}</span>
        <span class="key">Lists</span>
        <span class="value grey">{{ store.tokens[id].fulldata.twitter.lists || "-" }}</span>
        <span class="key">Statuses</span>
        <span class="value grey">{{ store.tokens[id].fulldata.twitter.statuses || "-" }}</span>
      </div>
      <div class="followers-chart">
        <h3 class="fw-600 fz-14">Followers last 30 days</h3>
        <div class="followers-placeholder">
          <img src="@/assets/img/followers.png" alt="Followers last 30 days" />
          <span class="fz-18">Coming Soon!</span>
        </div>
      </div>
      <div class="no-data" v-if="!store.tokens[id].summarydata.twitter_perc">
        <span class="fz-16">No data available for this block</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store/index";
import { reactive } from "@vue/reactivity";
import { useRoute } from "vue-router";

const id = useRoute().params.id;

const store = useStore();
const options = reactive({
  chart: {
    type: "radialBar",
    sparkline: {
      enabled: true,
    },
    parentHeightOffset: 0,
    grid: {
      padding: {
        left: 0,
        right: 0,
      },
    },
  },
  plotOptions: {
    radialBar: {
      hollow: {
        size: "60%",
      },
      track: {
        background: "#E4E8EF",
      },
      dataLabels: {
        name: {
          show: false,
        },
        value: {
          show: true,
          color: "#808191",
          offsetY: 5,
          fontSize: "14px",
          fontWeight: "700",
          fontFamily: "Manrope",
          formatter: (val) => "",
        },
      },
    },
  },
  fill: {
    colors: ["#2CAFFF"],
  },
  states: {
    hover: {
      filter: "none",
    },
    normal: {
      filter: "none",
    },
    active: {
      filter: "none",
    },
  },
});
</script>

<style lang="scss">
.stats-circle {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  display: inline-block;
  margin-right: 10px;
}

.stats-elem {
  display: flex;
  align-items: center;
  grid-gap: 1rem;

  .key {
    flex-grow: 1;
  }
}
.twitter-chart {
  grid-row: 1/2;
  grid-column: 1/3;
}
.followers-placeholder {
  height: 14rem;
  position: relative;

  img {
    filter: blur(3px);
  }

  span {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.followers-chart {
  display: flex;
  flex-direction: column;
  grid-gap: 1rem;
  h3 {
    margin: 0;
  }
}
</style>
