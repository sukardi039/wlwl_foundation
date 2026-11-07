<template>
  <div class="report-history">
    <section
      v-for="(page, index) in pages"
      :key="index"
      class="report-history-page"
      :style="{ minHeight: pageHeight + 'px' }"
    >
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
            <th :rowspan="day.teamActions.length ? 5 : 4" scope="rowgroup">
              {{ dayLabel(day.day) }}
            </th>
            <th scope="row">{{ $t("DrillReport.history.actions") }}</th>
            <td v-for="member in history.members" :key="member" class="history-actions">
              <div v-for="action in actions(day, member)" :key="action">{{ actionLabel(action) }}</div>
              <span v-if="!actions(day, member).length">{{ unavailable }}</span>
            </td>
          </tr>
          <tr v-if="day.teamActions.length">
            <th scope="row">{{ $t("DrillReport.history.team-actions") }}</th>
            <td :colspan="history.members.length" class="history-actions">
              <div v-for="action in day.teamActions" :key="action">{{ actionLabel(action) }}</div>
            </td>
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
    </section>
  </div>
</template>

<script>
import { buildReportHistory, paginateHistory, readingColour } from "../../utils/reportHistory";

export default {
  name: "ReportHistory",
  props: { data: { type: Object, required: true } },
  data() {
    return { metrics: ["skills", "morale", "efficiency"], heights: {}, availableHeight: Infinity,
      pageHeight: 1650, oversized: false };
  },
  computed: {
    history() { return buildReportHistory(this.data); },
    pages() {
      const pages = paginateHistory(this.history.days, this.heights, this.availableHeight);
      return pages.length ? pages : [[]];
    },
    unavailable() { return this.$t("DrillReport.history.unavailable"); },
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
      if (value === null) return this.unavailable;
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
        const content = page.querySelector("footer").getBoundingClientRect().bottom -
          page.querySelector("header").getBoundingClientRect().top;
        const padding = parseFloat(getComputedStyle(page).paddingTop) +
          parseFloat(getComputedStyle(page).paddingBottom);
        available = Math.min(available, this.pageHeight - (content - bodyHeight + padding) - 4);
      });
      const oversized = Object.values(heights).some(height => height > available);
      if (this.oversized !== oversized) this.oversized = oversized;
      if (JSON.stringify(heights) !== JSON.stringify(this.heights)) this.heights = heights;
      if (this.availableHeight !== available) this.availableHeight = available;
    },
    async prepareForExport(width, height) {
      const page = this.$el.querySelector(".report-history-page");
      this.pageHeight = Math.floor(height * page.scrollWidth / width);
      await this.$nextTick();
      this.measurePages();
      await this.$nextTick();
      this.measurePages();
      await this.$nextTick();
      if (this.oversized || Array.from(this.$el.querySelectorAll(".report-history-page"))
        .some(page => page.scrollHeight > this.pageHeight + 1)) {
        throw new Error("History day exceeds PDF page height");
      }
    },
  },
};
</script>

<style scoped>
.report-history-page {
  width: 1100px;
  box-sizing: border-box;
  padding: 36px 28px;
  background: white;
  margin-bottom: 24px;
}
.report-history-page header p { margin: 8px 0; }
.history-legend span { display: inline-block; padding: 3px 8px; margin: 0 3px; }
.history-legend .value-ll, .history-low { color: white; }
.history-notice { color: #9b1c1c; }
.history-table { width: 100%; border-collapse: collapse; table-layout: fixed; font-size: 14px; }
.history-table th, .history-table td {
  border: 1px solid #bbb;
  padding: 5px 6px;
  text-align: center;
  overflow-wrap: anywhere;
  vertical-align: middle;
}
.history-table thead th { background: #eee; }
.history-day-column { width: 70px; }
.history-detail-column { width: 150px; }
.history-table tbody { break-inside: avoid; }
.history-table tbody + tbody { border-top: 3px solid #888; }
.history-actions { text-align: left !important; }
.report-history-page footer { padding-top: 12px; text-align: right; font-size: 13px; }
</style>
