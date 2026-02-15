<template>
  <v-container>
    <v-container class="report-frame">
      <v-row class="report-result-spacer">
        <v-col> </v-col>
      </v-row>
      <v-row>
        <v-col cols="1"></v-col>
        <v-col>
          <v-card width="100%">
            <v-card-text>
              <div v-if="resultSummary() == 'in-progress'">
                <h2>{{ $t("DrillReport.result-" + resultSummary()) }}</h2>
              </div>
              <div v-if="resultSummary() != 'in-progress'">
                <h2>
                  {{ $t("DrillReport.result-" + resultSummary()) }}
                  {{
                    $t(
                      "DrillReport.result-general-" +
                        resultGeneral(
                          this.data.content.summary[0].teamAvg.total,
                          this.data.content.current.teamAvg.total
                        )
                    )
                  }}
                  {{
                    $t(
                      "DrillReport.result-efficiency-" +
                        resultEfficiency(
                          this.data.content.summary[0].teamAvg.efficiency,
                          this.data.content.current.teamAvg.efficiency
                        )
                    )
                  }}
                  {{
                    $t(
                      "DrillReport.result-adaptable-" +
                        resultAdaptable(
                          data.content.analysis.style.desire_intent.count +
                            data.content.analysis.style.desire_actual.count +
                            data.content.analysis.style.intent_actual.count,
                          data.content.analysis.style.desire_intent.positive +
                            data.content.analysis.style.desire_actual.positive +
                            data.content.analysis.style.intent_actual.positive
                        )
                    )
                  }}
                </h2>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="1"></v-col>
      </v-row>
      <v-row>
        <v-col cols="1"></v-col>
        <v-col>
          <v-card width="100%">
            <v-card-title>
              {{ $t("DrillReport.result-explain") }}
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col
                  ><h3>
                    {{ $t("DrillReport.result-revenue-explain") }}
                  </h3></v-col
                >
              </v-row>
              <v-row dense>
                <v-col cols="2" class="text-end"></v-col>
              </v-row>
              <v-row dense align="center">
                <v-col cols="2"></v-col>
                <v-col cols="2" class="text-end" style="font-weight: bold;">{{
                  $t("DrillReport.overallValue")
                }}</v-col>
                <v-col cols="6">
                  <v-progress-linear
                    background-color="grey lighten-2"
                    :value="targetPercent()"
                    color="blue"
                    height="20"
                  >
                    <span>
                      {{ $t("DrillPlatform.dollarSign")
                      }}{{ data.content.valueToComplete }}</span
                    >
                  </v-progress-linear>
                </v-col>
                <v-col cols="2"></v-col>
              </v-row>
              <v-row dense>
                <v-col cols="2"></v-col>
                <v-col cols="2" class="text-end" style="font-weight: bold;">{{
                  $t("DrillReport.value")
                }}</v-col>
                <v-col cols="6">
                  <v-progress-linear
                    background-color="grey lighten-2"
                    :value="valuePercent()"
                    :color="
                      valueColor(
                        (data.content.orderValue *
                          data.content.orderStatus.ordersCompleted *
                          100) /
                          data.content.valueToComplete
                      )
                    "
                    height="20"
                  >
                    <span
                      >{{ $t("DrillPlatform.dollarSign")
                      }}{{
                        data.content.orderValue *
                          data.content.orderStatus.ordersCompleted
                      }}</span
                    >
                  </v-progress-linear>
                </v-col>
                <v-col cols="2" class="text-end"></v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="1"></v-col>
      </v-row>
      <v-row>
        <v-col cols="1"></v-col>
        <v-col cols="10">
          <v-card width="100%">
            <v-card-title>
      <v-row>
        <v-col cols="1"></v-col>
        <v-col cols="10" class="text-center">{{$t('DrillReport.result-weekly')}}</v-col>
        <v-col cols="1"></v-col>
      </v-row>

            </v-card-title>
            <v-card-text>
      <lineChart
        :chart-options="chartOptions"
        :chart-data="chartData"
        :chart-id="chartId"
        :dataset-id-key="datasetIdKey"
        :plugins="plugins"
        :css-classes="cssClasses"
        :styles="styles"
        :width="width"
        :height="height"
      />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="1"></v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { Line as lineChart } from "vue-chartjs/legacy";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  RadialLinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  PointElement,
  RadialLinearScale,
  LineElement
);
export default {
  name: "ReportResult",
  components: {
    lineChart,
  },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            label: this.$t("DrillReport.result-skills-title"),
            backgroundColor: "rgba(179,181,198,0.2)",
            borderColor: "rgba(179,181,198,1)",
            pointBackgroundColor: "rgba(179,181,198,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(179,181,198,1)",
            data: [],
            },
          {
            label: this.$t("DrillReport.result-morale-title"),
            backgroundColor: "rgba(255,99,132,1)",
            borderColor: "rgba(255,99,132,1)",
            pointBackgroundColor: "rgba(255,99,132,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(255,99,132,1)",
            data: [],
          },
          {
            label: this.$t("DrillReport.result-efficiency-title"),
            backgroundColor: "rgba(120,181,198,0.2)",
            borderColor: "rgba(120,181,198,1)",
            pointBackgroundColor: "rgba(120,181,198,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(120,181,198,1)",
            data: [],
          },
          // {
          //   label: this.$t("DrillReport.result-target-title"),
          //   backgroundColor: "rgba(75,75,198,0.2)",
          //   borderColor: "rgba(75,75,198,1)",
          //   pointBackgroundColor: "rgba(75,75,198,1)",
          //   pointBorderColor: "#fff",
          //   pointHoverBackgroundColor: "#fff",
          //   pointHoverBorderColor: "rgba(75,75,198,1)",
          //   data: [],
          // },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  props: {
    data: {},
    chartId: {
      type: String,
      default: "radar-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    resultSummary() {
      let result = "in-progress";
      //        result = 'timeout'
      if (
        this.data.action != "INTRODUCTION" &&
        this.data.action != "SELECT_STYLE" &&
        this.data.action != "MORE_ACTIONS"
      ) {
        switch (this.data.action) {
          case "TIME_OUT":
          case "FAILED":
            if (
              this.data.content.valueToComplete ==
              this.data.content.orderValue *
                this.data.content.orderStatus.ordersCompleted
            ) {
              result = "complete";
            } else if (
              this.data.content.valueToComplete <
              this.data.content.orderValue *
                this.data.content.orderStatus.ordersCompleted
            ) {
              result = "over-target";
            } else {
              result = "timeout";
            }
            break;
          case "COMPLETED":
            if (
              this.data.content.valueToComplete ==
              this.data.content.orderValue *
                this.data.content.orderStatus.ordersCompleted
            ) {
              result = "complete";
            } else if (
              this.data.content.valueToComplete <
              this.data.content.orderValue *
                this.data.content.orderStatus.ordersCompleted
            ) {
              result = "over-target";
            }
            break;
        }
      }
      return result;
    },
    resultGeneral(b, f) {
      let result = "";
      if (f >= b) {
        if ((f - b) / b > 0.2) {
          result = "vh";
        } else {
          result = "h";
        }
      } else {
        if ((b - f) / b <= 0.2) {
          result = "l";
        } else {
          result = "vl";
        }
      }
      return result;
    },
    resultEfficiency(b, f) {
      let result = "";
      if (f >= b) {
        if ((f - b) / b > 0.3) {
          result = "vh";
        } else {
          result = "h";
        }
      } else {
        if ((b - f) / b <= 0.2) {
          result = "l";
        } else {
          result = "vl";
        }
      }
      return result;
    },
    resultAdaptable(s, e) {
      let c = 1;
      let p = 0;
      let result = "";
      if (e > 0 && s > 0) {
        p = e / s;
        p = p >= 1 ? 1 : p;
        c = Math.round(p * 10);
      }
      if (c > 8) {
        result = "vh";
      } else if (c > 5) {
        result = "h";
      } else if (c > 3) {
        result = "l";
      } else {
        result = "vl";
      }
      return result;
    },
    targetPercent() {
      let p = 100;
      if (
        this.data.content.orderValue *
          this.data.content.orderStatus.ordersCompleted >
        this.data.content.valueToComplete
      ) {
        p =
          ((this.data.content.valueToComplete * 100) /
            this.data.content.orderValue) *
          this.data.content.orderStatus.ordersCompleted;
      }
      return p;
    },
    valuePercent() {
      let p = 100;
      if (
        this.data.content.orderValue *
          this.data.content.orderStatus.ordersCompleted <
        this.data.content.valueToComplete
      ) {
        p =
          (this.data.content.orderValue *
            this.data.content.orderStatus.ordersCompleted *
            100) /
          this.data.content.valueToComplete;
      }
      return p;
    },
    valueColor(v) {
      let c = "";
      // if (v > 80) {
      //   c = "#27AE60";
      // } else if (v > 60) {
      //   c = "#2ECC71";
      // } else if (v > 40) {
      //   c = "#F1C40F";
      // } else if (v > 20) {
      //   c = "#F39C12";
      // } else {
      //   c = "#E74C3C";
      // }
      if (v > 75) {
        c = "#27AE60";
      } else if (v > 50) {
        c = "#2ECC71";
      } else if (v > 25) {
        c = "#F39C12";
      } else {
        c = "#E74C3C";
      }
      return c;
    },
    findSummary(v, t) {
      let z = "";
      for (let c = 0; c < this.data.content.summary.length; c++) {
        if (
          this.data.content.summary[c].phase == t &&
          this.data.content.summary[c].day == v
        ) {
          z = this.data.content.summary[c];
          break;
        }
      }
      return z;
    },
    getChartData() {
      this.chartData.labels = [];
      this.chartData.datasets[0].data = []; // skills
      this.chartData.datasets[1].data = []; // morale
      this.chartData.datasets[2].data = []; // efficiency
      // this.chartData.datasets[3].data = []; // target
      let d = 0;
      let r = this.findSummary(d, "INTRODUCTION");
      if (r) {
        this.setChartData(r, d, '');
      }
      while (r) {
        d++;
        r = this.findSummary(d*5, "MORE_ACTIONS");
        if (r) {
          this.setChartData(r, d, this.$t('DrillReport.result-week'));
        }
      }
      r = this.data.content.summary[this.data.content.summary.length - 1];
      this.setChartData(r, r.day, '.');
    },
    setChartData(r, v, w) {
      if (w!='.'){
        this.chartData.labels = [...this.chartData.labels, v+w];
      } else {
        this.chartData.labels = [...this.chartData.labels, this.$t('DrillReport.result-endDrill')];
      }
      this.chartData.datasets[0].data = [
        ...this.chartData.datasets[0].data,
        r.teamAvg.skills,
      ];
      this.chartData.datasets[1].data = [
        ...this.chartData.datasets[1].data,
        r.teamAvg.morale,
      ];
      this.chartData.datasets[2].data = [
        ...this.chartData.datasets[2].data,
        r.teamAvg.efficiency,
      ];
      // this.chartData.datasets[3].data = [
      //   ...this.chartData.datasets[3].data,
      //   ((r.orderDone?r.orderDone:0) * 100) / this.data.content.ordersToComplete,
      // ];
//      console.log(r.orderDone, this.data.content.ordersToComplete);
    },
  },
  created() {
    this.getChartData();
    console.log(this.chartData);
  },
};
</script>

<style></style>
