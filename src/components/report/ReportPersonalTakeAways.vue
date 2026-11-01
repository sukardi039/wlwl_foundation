<template>
  <v-container>
    <v-container class="report-frame">
      <v-row class="report-result-spacer"><v-col /></v-row>
      <v-row>
        <v-col cols="1" />
        <v-col>
          <v-card>
            <v-card-text>
              <h2>{{ $t("DrillReport.personal-takeaways.title") }}</h2>
              <p class="mt-3">{{ $t("DrillReport.personal-takeaways.explain") }}</p>
              <v-alert v-for="notice in findings.notices" :key="notice" type="info" text>
                {{ $t("DrillReport.personal-takeaways." + notice) }}
              </v-alert>
              <section v-for="section in sections" :key="section">
                <h3 class="mt-4 mb-2">{{ $t("DrillReport.personal-takeaways." + section) }}</h3>
                <p v-if="!findings[section].length">
                  {{ $t("DrillReport.personal-takeaways.no-" + section) }}
                </p>
                <div v-for="finding in findings[section]" :key="finding.key" class="mb-4">
                  <h4>{{ $t("DrillReport.personal-takeaways.heading-" + finding.key) }}</h4>
                  <p class="mb-1">{{ $t("DrillReport.personal-takeaways." + section + "-" + finding.key, parameters(finding)) }}</p>
                  <p v-if="finding.params.actions" class="mb-1">
                    {{ $t("DrillReport.personal-takeaways.history-example", parameters(finding)) }}
                  </p>
                  <p v-if="finding.params.actionsCount !== undefined" class="mb-1">
                    {{ $t("DrillReport.personal-takeaways.attention-context", parameters(finding)) }}
                  </p>
                </div>
              </section>
              <h3 class="mt-4 mb-2">{{ $t("DrillReport.personal-takeaways.principles") }}</h3>
              <ul>
                <li v-for="id in findings.principles" :key="id" class="mb-2">
                  {{ $t("DrillReport.takeaways-" + id) }}
                </li>
              </ul>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="1" />
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import { buildReportTakeaways } from "../../utils/reportTakeaways";

export default {
  name: "ReportPersonalTakeAways",
  props: {
    data: { type: Object, required: true },
  },
  data() {
    return { sections: ["strengths", "priorities"] };
  },
  computed: {
    ...mapState({ paramdata: "paramdata" }),
    findings() {
      const params = this.paramdata && this.paramdata.params_ref;
      const findings = buildReportTakeaways(this.data, params && params.params && params.params.theory_type);
      const labels = [...findings.strengths, ...findings.priorities].flatMap(finding => [
        ...(finding.params.action ? ["DrillReport.impact-" + finding.params.action] : []),
        ...(finding.params.actions || []),
      ]);
      if (labels.some(key => !this.$te(key, this.$i18n.locale))) {
        findings.notices.push("missing-action-label");
      }
      return findings;
    },
  },
  methods: {
    parameters(finding) {
      const params = { ...finding.params };
      ["startDay", "endDay", "day"].forEach(key => {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
          const value = params[key];
          const day = typeof value === "number" || (typeof value === "string" && value.trim())
            ? Number(value) : NaN;
          params[key] = Number.isInteger(day) && day >= 0
            ? day : this.$t("DrillReport.personal-takeaways.unavailable-day");
        }
      });
      Object.keys(params).forEach(key => {
        if (typeof params[key] === "number") {
          params[key] = new Intl.NumberFormat(this.$i18n.locale === "cn" ? "zh-CN" : this.$i18n.locale,
            { maximumFractionDigits: 1 }).format(params[key]);
        }
      });
      ["style", "fromStyle"].forEach(key => {
        if (params[key]) params[key] = this.$t("DrillReport.style-" + params[key]);
      });
      if (params.action) params.action = this.actionLabel("DrillReport.impact-" + params.action);
      if (params.actions) {
        params.actions = params.actions.map(action => this.actionLabel(action))
          .join(this.$t("DrillReport.personal-takeaways.action-separator"));
      }
      return params;
    },
    actionLabel(key) {
      return this.$te(key, this.$i18n.locale)
        ? this.$t(key) : this.$t("DrillReport.personal-takeaways.unavailable-action");
    },
  },
};
</script>

<style scoped>
.report-frame {
  height: auto;
  min-height: 1650px;
}
</style>
