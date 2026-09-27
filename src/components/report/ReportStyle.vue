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
              <h2>{{ $t("DrillReport.style-title") }}</h2>
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
              <v-row class="align-center">
                <v-col cols="1"></v-col>
                <v-col
                  ><h3>{{ $t("DrillReport.style-explain") }}:</h3></v-col
                >
                <v-col cols="1"></v-col>
              </v-row>
              <v-row>
                <v-col cols="1"></v-col>
                <v-col cols="2"
                  ><h3>{{ $t("DrillReport.style-propotion") }}:</h3></v-col
                >
                <v-col
                  ><h4>
                    {{ $t("DrillReport.style-propotion-explain") }}
                  </h4></v-col
                >
                <v-col cols="1"></v-col>
              </v-row>
              <v-row>
                <v-col cols="1"></v-col>
                <v-col cols="2"
                  ><h3>{{ $t("DrillReport.style-accuracy") }}:</h3></v-col
                >
                <v-col
                  ><h4>
                    {{ $t("DrillReport.style-accuracy-explain") }}
                  </h4></v-col
                >
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
          <v-card>
            <v-card-text>
              <v-row dense class="text-center">
                <v-col cols="5"></v-col>
                <v-col>
                  <v-btn outlined class="ba-0" :color="valueColor(9)">{{
                    $t("DrillReport.style-highSkill")
                  }}</v-btn>
                </v-col>
                <v-col cols="5"></v-col>
              </v-row>
              <v-row dense>
                <v-col cols="1"></v-col>
                <v-col>
                  <ReportStyleDetail :data="data" styleType="3-partner" />
                </v-col>
                <v-divider vertical></v-divider>
                <v-col>
                  <ReportStyleDetail :data="data" styleType="4-deligate" />
                </v-col>
                <v-col cols="1"></v-col>
              </v-row>
              <v-row dense class="align-center text-center">
                <v-col cols="1"></v-col>
                <v-col cols="2">
                  <v-btn outlined class="ba-0" :color="valueColor(1)">{{
                    $t("DrillReport.style-lowMorale")
                  }}</v-btn>
                </v-col>
                <v-col><v-divider></v-divider></v-col>
                <v-col cols="2">
                  <v-btn outlined class="ba-0" :color="valueColor(9)">{{
                    $t("DrillReport.style-highMorale")
                  }}</v-btn>
                </v-col>
                <v-col cols="1"></v-col>
              </v-row>
              <v-row dense>
                <v-col cols="1"></v-col>
                <v-col>
                  <ReportStyleDetail :data="data" :styleType="paramdata.params_ref.params.theory_type==1?'1-instruct':'2-coach'" />
                </v-col>
                <v-divider vertical></v-divider>
                <v-col>
                  <ReportStyleDetail :data="data" :styleType="paramdata.params_ref.params.theory_type==1?'2-coach':'1-instruct'" />
                </v-col>
                <v-col cols="1"></v-col>
              </v-row>
              <v-row dense class="text-center">
                <v-col cols="5"></v-col>
                <v-col>
                  <v-btn outlined class="ba-0" :color="valueColor(1)">{{
                    $t("DrillReport.style-lowSkill")
                  }}</v-btn>
                </v-col>
                <v-col cols="5"></v-col>
              </v-row>
              <v-row>
                <v-col cols="1"></v-col>
                <v-col>
                  <strong>{{
                    $t("DrillReport.style-prefer-" + stylePrefer())
                  }}</strong>
                </v-col>
                <v-col cols="1"></v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="1"></v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import ReportStyleDetail from "./ReportStyleDetail.vue";
export default {
  name: "ReportStyle",
  components: {
    ReportStyleDetail,
  },
  data() {
    return {};
  },
  props: {
    data: {},
  },
  computed: {
    ...mapState({
      signedinuser: "signedinuser",
      paramdata: "paramdata",
    }),
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
    competentLeadershipPct(s, e) {
      let c = 10;
      if (e > 0 && s > 0) {
        c = ((e / s) * 100).toFixed(2);
        if (c > 100) {
          c = 100.0;
        }
      }
      return c;
    },
    stylePropotion(t) {
      let c = 0;
      let s =
        this.data.content.analysis.style.total +
        this.data.content.analysis.action_style.total;
      let e =
        this.data.content.analysis.style[t].count +
        this.data.content.analysis.action_style[t].count;
      if (s > 0 && e > 0) {
        c = (e / s) * 100;
      }
      return c.toFixed(2);
    },
    stylePrefer() {
      let c = "";
      let p = 0;
      let s = 0;
      p = Math.round(this.stylePropotion("1-instruct"));
      if (p > s) {
        c = "1-instruct";
        s = p;
      }
      p = Math.round(this.stylePropotion("2-coach"));
      if (p > s) {
        c = "2-coach";
        s = p;
      }
      p = Math.round(this.stylePropotion("3-partner"));
      if (p > s) {
        c = "3-partner";
        s = p;
      }
      p = Math.round(this.stylePropotion("4-deligate"));
      if (p > s) {
        c = "4-deligate";
        s = p;
      }
      return c;
    },
  },
};
</script>

<style></style>
