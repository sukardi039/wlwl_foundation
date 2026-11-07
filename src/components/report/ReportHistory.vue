<template>
  <div class="report-history">
    <v-container
      v-for="(page, index) in pages"
      :key="index"
      class="report-history-page"
    >
      <v-container class="report-frame history-frame" :style="exporting ? { minHeight: (pageHeight - 24) + 'px' } : {}">
      <v-row class="report-result-spacer"><v-col /></v-row>
      <v-row>
      <v-col cols="1" />
      <v-col>
      <v-card>
      <v-card-text class="history-content">
      <header>
        <h2>{{ $t("DrillReport.history.title") }}</h2>
        <p>{{ $t("DrillReport.history.explain") }}</p>
        <p class="history-legend">
          {{ $t("DrillReport.history.legend") }}
          <span class="value-ll">0-25</span>
          <span class="value-ml">&gt;25-50</span>
          <span class="value-mh">&gt;50-75</span>
          <span class="value-hh">&gt;75-100</span>
        </p>
        <p v-if="history.incomplete" class="history-notice">
          {{ $t("DrillReport.history.incomplete") }}
        </p>
        <p v-if="missingActionLabels" class="history-notice">
          {{ $t("DrillReport.personal-takeaways.missing-action-label") }}
        </p>
        <p v-if="oversized" class="history-notice">{{ $t("DrillReport.history.oversized") }}</p>
      </header>
      <p v-if="!history.days.length">{{ $t("DrillReport.history.empty") }}</p>
      <table v-else class="history-table">
        <thead>
          <tr>
            <th class="history-day-column">{{ $t("DrillHistory.day") }}</th>
            <th class="history-detail-column">{{ $t("DrillReport.history.detail") }}</th>
            <th v-for="member in history.members" :key="member">{{ member }}</th>
          </tr>
        </thead>
        <tbody v-for="day in page" :key="day.key" :data-history-day="day.key">
          <tr>
            <th rowspan="4" scope="rowgroup">
              {{ dayLabel(day.day) }}
            </th>
            <template v-if="day.teamActions.length">
              <th scope="row">{{ $t("DrillReport.history.team-actions") }}</th>
              <td :colspan="history.members.length" class="history-actions">
                <div v-for="action in day.teamActions" :key="action">{{ actionLabel(action) }}</div>
              </td>
            </template>
            <template v-else>
              <th scope="row">{{ $t("DrillReport.history.actions") }}</th>
              <td v-for="member in history.members" :key="member" class="history-actions">
                <div v-for="action in actions(day, member)" :key="action">{{ actionLabel(action) }}</div>
              </td>
            </template>
          </tr>
          <tr v-for="metric in metrics" :key="metric">
            <th scope="row">{{ $t("DrillHistory." + metric) }}</th>
            <td
              v-for="member in history.members"
              :key="member"
              :class="[readingColour(reading(day, member, metric)), { 'history-low': reading(day, member, metric) !== null && reading(day, member, metric) <= 25 }]"
            >
              {{ readingLabel(day, member, metric) }}
            </td>
          </tr>
        </tbody>
      </table>
      <footer>{{ $t("DrillReport.history.page", { page: index + 1, pages: pages.length }) }}</footer>
      </v-card-text>
      </v-card>
      </v-col>
      <v-col cols="1" />
      </v-row>
      </v-container>
    </v-container>
  </div>
</template>

<script>
import { buildReportHistory, paginateHistory, readingColour } from "../../utils/reportHistory";
import { mapState } from "vuex";

export default {
  name: "ReportHistory",
  props: { data: { type: Object, required: true } },
  data() {
    return { metrics: ["skills", "morale", "efficiency"], heights: {}, availableHeight: Infinity,
      pageHeight: 1650, oversized: false, exporting: false };
  },
  computed: {
    ...mapState({ paramdata: "paramdata" }),
    history() { return buildReportHistory(this.data, this.paramdata); },
    pages() {
      const pages = paginateHistory(this.history.days, this.heights, this.availableHeight);
      return pages.length ? pages : [[]];
    },
    missingActionLabels() {
      return this.history.days.some(day => [...day.teamActions,
        ...Object.values(day.members).flatMap(member => member.actions)]
        .some(action => !this.$te(action, this.$i18n.locale)));
    },
  },
  mounted() { this.measurePages(); },
  updated() { this.measurePages(); },
  methods: {
    readingColour,
    actions(day, member) { return day.members[member] ? day.members[member].actions : []; },
    reading(day, member, metric) {
      return day.members[member] ? day.members[member][metric] : null;
    },
    actionLabel(action) {
      return this.$te(action, this.$i18n.locale) ? this.$t(action)
        : this.$t("DrillReport.personal-takeaways.unavailable-action");
    },
    dayLabel(day) {
      return day === 0 ? this.$t("DrillReport.history.baseline") : day === null
        ? this.$t("DrillReport.personal-takeaways.unavailable-day") : this.format(day);
    },
    format(value) {
      return new Intl.NumberFormat(this.$i18n.locale === "cn" ? "zh-CN" : this.$i18n.locale,
        { maximumFractionDigits: 1 }).format(value);
    },
    readingLabel(day, member, metric) {
      const value = this.reading(day, member, metric);
      if (value === null) return "";
      const change = day.members[member].changes[metric];
      return this.format(value) + (change === null ? "" :
        " (" + (change > 0 ? "+" : "") + this.format(change) + ")");
    },
    measurePages() {
      const heights = {};
      let available = Infinity;
      this.$el.querySelectorAll(".report-history-page").forEach(page => {
        const blocks = Array.from(page.querySelectorAll("[data-history-day]"));
        blocks.forEach(block => {
          heights[block.dataset.historyDay] = block.getBoundingClientRect().height;
        });
        const bodyHeight = blocks.reduce((total, block) =>
          total + block.getBoundingClientRect().height, 0);
        // Measure content, not the empty space introduced by the page's min-height.
        const card = page.querySelector(".history-content");
        const content = card.closest(".row").getBoundingClientRect().bottom -
          page.getBoundingClientRect().top;
        const frame = page.querySelector(".history-frame");
        const padding = parseFloat(getComputedStyle(page).paddingBottom) +
          parseFloat(getComputedStyle(frame).paddingBottom);
        available = Math.min(available, this.pageHeight - (content - bodyHeight + padding) - 4);
      });
      const oversized = Object.values(heights).some(height => height > available);
      if (this.oversized !== oversized) this.oversized = oversized;
      if (JSON.stringify(heights) !== JSON.stringify(this.heights)) this.heights = heights;
      if (this.availableHeight !== available) this.availableHeight = available;
    },
    async prepareForExport(width, height) {
      this.exporting = true;
      const page = this.$el.querySelector(".report-history-page");
      const frame = page.querySelector(".history-frame");
      this.pageHeight = Math.floor(height * page.scrollWidth / width);
      await this.$nextTick();
      this.measurePages();
      await this.$nextTick();
      this.measurePages();
      await this.$nextTick();
      if (this.oversized || Array.from(this.$el.querySelectorAll(".report-history-page"))
        .some(page => page.scrollHeight > this.pageHeight + 1)) {
        throw new Error("History entry exceeds PDF page height");
      }
    },
    async finishExport() {
      this.exporting = false;
      this.pageHeight = 1650;
      await this.$nextTick();
      this.measurePages();
      await this.$nextTick();
    },
  },
};
</script>

<style scoped>
.history-frame {
  height: auto;
  background-size: max(100%, 1100px) auto;
  background-repeat: no-repeat;
  background-position: left top;
}
.history-content {
  font-size: 13px;
  line-height: 1.4;
}
.history-content h2 { font-size: 20px; }
.report-history-page header p { margin: 8px 0; }
.history-legend span { display: inline-block; padding: 3px 8px; margin: 0 3px; }
.history-legend .value-ll, .history-low { color: white; }
.history-notice { color: #9b1c1c; }
.history-table { width: 100%; border-collapse: collapse; table-layout: fixed; font-size: 12px; }
.history-table th, .history-table td {
  border: 1px solid #bbb;
  padding: 4px 5px;
  text-align: center;
  overflow-wrap: anywhere;
  vertical-align: middle;
}
.history-table thead th { background: #eee; }
.history-day-column { width: 55px; }
.history-detail-column { width: 120px; }
.history-table tbody { break-inside: avoid; }
.history-table tbody + tbody { border-top: 3px solid #888; }
.history-actions { text-align: left !important; }
.report-history-page footer { padding-top: 12px; text-align: right; font-size: 12px; }
</style>
