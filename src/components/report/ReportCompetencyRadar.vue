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
              <h2>
                {{ $t("portalname")
                }}{{ $t("DrillReport.competency-radar-title") }}
              </h2>
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
              {{ $t("DrillReport.competency-explain") }}
            </v-card-title>
            <v-card-text>
              <v-row dense class="text-center">
                <v-col cols="1"></v-col>
                <v-col cols="2"
                  ><h4>
                    {{ $t("DrillReport.competency-indicator-1") }}
                  </h4></v-col
                >
                <v-col cols="2"
                  ><h4>
                    {{ $t("DrillReport.competency-indicator-3") }}
                  </h4></v-col
                >
                <v-col cols="2"
                  ><h4>
                    {{ $t("DrillReport.competency-indicator-5") }}
                  </h4></v-col
                >
                <v-col cols="2"
                  ><h4>
                    {{ $t("DrillReport.competency-indicator-7") }}
                  </h4></v-col
                >
                <v-col cols="2"
                  ><h4>
                    {{ $t("DrillReport.competency-indicator-9") }}
                  </h4></v-col
                >
                <v-col cols="1"></v-col>
              </v-row>
              <v-row dense class="text-center">
                <v-col cols="1"></v-col>
                <v-col cols="2">
                  <v-progress-linear
                    background-color="grey lighten-2"
                    :value="100"
                    :color="valueColor(1)"
                    height="10"
                  >
                  </v-progress-linear>
                </v-col>
                <v-col cols="2">
                  <v-progress-linear
                    background-color="grey lighten-2"
                    :value="100"
                    :color="valueColor(3)"
                    height="10"
                  >
                  </v-progress-linear>
                </v-col>
                <v-col cols="2">
                  <v-progress-linear
                    background-color="grey lighten-2"
                    :value="100"
                    :color="valueColor(5)"
                    height="10"
                  >
                  </v-progress-linear>
                </v-col>
                <v-col cols="2">
                  <v-progress-linear
                    background-color="grey lighten-2"
                    :value="100"
                    :color="valueColor(7)"
                    height="10"
                  >
                  </v-progress-linear>
                </v-col>
                <v-col cols="2">
                  <v-progress-linear
                    background-color="grey lighten-2"
                    :value="100"
                    :color="valueColor(9)"
                    height="10"
                  >
                  </v-progress-linear>
                </v-col>
                <v-col cols="1"></v-col>
              </v-row>
              <v-row dense class="text-center">
                <v-col cols="1"></v-col>
                <v-col cols="2"><h4>(1, 2)</h4></v-col>
                <v-col cols="2"><h4>(3, 4)</h4></v-col>
                <v-col cols="2"><h4>(5, 6)</h4></v-col>
                <v-col cols="2"><h4>(7, 8)</h4></v-col>
                <v-col cols="2"><h4>(9, 10)</h4></v-col>
                <v-col cols="1"></v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="1"></v-col>
      </v-row>
      <v-row>
        <v-col cols="1"></v-col>
        <v-col>
          <v-card width="100%">
            <v-card-text>
              <Radar
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
      <v-row>
        <v-col cols="1"></v-col>
        <v-col>
          <v-card>
            <v-card-text>
              {{ $t("DrillReport.competency-radar-key") }}
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="1"></v-col>
      </v-row>
    </v-container>
    <v-container> </v-container>
  </v-container>
</template>

<script>
import { Radar } from "vue-chartjs/legacy";

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
  name: "ReportCompetency",
  components: {
    Radar,
  },
  data() {
    return {
      avgCompetency: [],
      myCompetency: [],
      chartData: {
        labels: [
          this.$t("DrillReport.competency-skills-title") +
            "(" +
            this.data.content.competency.skillsCompetency +
            ")",
          this.$t("DrillReport.competency-morale-title") +
            "(" +
            this.data.content.competency.moraleCompetency +
            ")",
          this.$t("DrillReport.competency-efficiency-title") +
            "(" +
            this.data.content.competency.efficiencyCompetency +
            ")",
          this.$t("DrillReport.competency-leadership-title") +
            "(" +
            this.data.content.competency.leaderShipCompetency +
            ")",
          this.$t("DrillReport.competency-drive-title") +
            "(" +
            this.data.content.competency.driveCompetency +
            ")",
        ],
        datasets: [
          {
            label: this.$t("DrillReport.competency-name"),
            backgroundColor: "rgba(255,99,132,1)",
            borderColor: "rgba(255,99,132,1)",
            pointBackgroundColor: "rgba(255,99,132,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(255,99,132,1)",
            data: [
              this.data.content.competency.skillsCompetency,
              this.data.content.competency.moraleCompetency,
              this.data.content.competency.efficiencyCompetency,
              this.data.content.competency.leaderShipCompetency,
              this.data.content.competency.driveCompetency,
            ],
          },
          {
            label: this.$t("DrillReport.competency-avg-name"),
            backgroundColor: "rgba(179,181,198,0.2)",
            borderColor: "rgba(179,181,198,1)",
            pointBackgroundColor: "rgba(179,181,198,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(179,181,198,1)",
            data: [
              this.data.content.avg_competency.skillsCompetency,
              this.data.content.avg_competency.moraleCompetency,
              this.data.content.avg_competency.efficiencyCompetency,
              this.data.content.avg_competency.leaderShipCompetency,
              this.data.content.avg_competency.driveCompetency,
            ],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales:{
          r:{
            min: 0,
            max: 10,
          }
        }
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
    valueColor(v) {
      let c = "";
      if (v > 8) {
        c = "#27AE60";
      } else if (v > 6) {
        c = "#2ECC71";
      } else if (v > 4) {
        c = "#F1C40F";
      } else if (v > 2) {
        c = "#F39C12";
      } else {
        c = "#E74C3C";
      }
      return c;
    },
    competentSkills(s, e) {
      let c = 1;
      let p = 0;
      if (s >= e) {
        p = (s - e) / s;
        if (p < 0.15) {
          c = 4;
        } else if (p < 0.2) {
          c = 3;
        } else if (p < 0.25) {
          c = 2;
        }
      } else {
        p = (e - s) / s;
        if (p > 0.5) {
          c = 10;
        } else if (p > 0.4) {
          c = 9;
        } else if (p > 0.3) {
          c = 8;
        } else if (p > 0.2) {
          c = 7;
        } else if (p > 0.1) {
          c = 6;
        } else {
          c = 5;
        }
      }
      return c;
    },
    competentMorale(s, e) {
      let c = 1;
      let p = 0;
      let z = 0;
      if (s >= e) {
        z = s;
        p = (s - e) / s;
        if (p < 0.15) {
          c = 4;
        } else if (p < 0.2) {
          c = 3;
        } else if (p < 0.25) {
          c = 2;
        }
      } else {
        z = 100 - s;
        if (z == 0) {
          c = 6;
        } else {
          p = (e - s) / z;
          if (p > 0.9) {
            c = 10;
          } else if (p > 0.8) {
            c = 9;
          } else if (p > 0.6) {
            c = 8;
          } else if (p > 0.4) {
            c = 7;
          } else if (p > 0.2) {
            c = 6;
          } else {
            c = 5;
          }
        }
      }
      return c;
    },
    competentEfficiency(s, e) {
      let c = 1;
      let p = 0;
      let z = 0;
      if (s >= e) {
        z = s;
        p = (s - e) / s;
        if (p < 0.15) {
          c = 4;
        } else if (p < 0.2) {
          c = 3;
        } else if (p < 0.25) {
          c = 2;
        }
      } else {
        z = 100 - s;
        if (z == 0) {
          c = 6;
        } else {
          p = (e - s) / z;
          if (p > 0.9) {
            c = 10;
          } else if (p > 0.8) {
            c = 9;
          } else if (p > 0.6) {
            c = 8;
          } else if (p > 0.4) {
            c = 7;
          } else if (p > 0.2) {
            c = 6;
          } else {
            c = 5;
          }
        }
      }
      return c;
    },
    competentLeadership(s, e) {
      let c = 1;
      let p = 0;
      if (e > 0 && s > 0) {
        p = e / s;
        p = p >= 1 ? 1 : p;
        c = Math.round(p * 10);
      }
      return c;
    },
    competentDrive(s, e) {
      let c = 1;
      let p = 0;
      if (e > s) {
        c = 10;
      } else {
        if (e > 0 && s > 0) {
          if (e > s) {
            c = 10;
          } else {
            p = e / s;
            c = Math.round(p * 10);
          }
        }
      }
      return c;
    },
  },
  created() {
    console.log(this.chartData.datasets[0].data);
    let c = 0;
    this.chartData.datasets[1].data.forEach((v) => (c = c + v));
    if (c > 0) {
      console.log(this.chartData.datasets[1].data);
    } else {
      this.chartData.datasets.pop();
    }
  },
};
</script>

<style></style>
