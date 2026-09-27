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
              <h2>{{ $t("DrillReport.efficiency-title") }}</h2>
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
              <h4>{{ $t("DrillReport.efficiency-explain") }}</h4>
            </v-card-title>
            <v-card-text> </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="1"></v-col>
      </v-row>
      <v-row>
        <v-col cols="1"></v-col>
        <v-col>
          <v-card width="100%">
            <v-card-text
              ><h4 style="font-weight: bold">
                <v-row dense>
                  <v-col cols="2">
                    {{ $t("DrillReport.efficiency-member") }}
                  </v-col>
                  <v-col class="text-center">
                    {{ $t("DrillReport.efficiency-value") }}
                  </v-col>
                  <v-col class="text-center">
                    {{ $t("DrillReport.efficiency-change") }}
                  </v-col>
                  <v-col cols="4" class="text-center">
                    {{ $t("DrillReport.efficiency-numberOfActions") }}
                  </v-col>
                </v-row>
              </h4>
              <v-divider></v-divider>
              <v-row
                dense
                v-for="(m, index) in getTotal(
                  data.content.members,
                  data.content.analysis.staff
                )"
                :key="index"
              >
                <v-col cols="2">{{ m.staffExp }}</v-col>
                <v-col class="text-center">{{ m.efficiencyValue }}</v-col>
                <v-col class="text-center">{{
                  m.efficiencyValue - m.initEfficiencyValue
                }}</v-col>
                <v-col cols="4" class="text-center">{{ m.total }}</v-col>
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
export default {
  name: "ReportEfficiency",
  data() {
    return {};
  },
  props: {
    data: {},
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
    getTotal(s, a) {
      let p = [];
      let z = Object.entries(s);
      let y = Object.entries(a);
      z.forEach(function(r) {
        if (r[1].staffName > 0){
          let c = 0;
          y.forEach(function(v) {
            if (v[0] == r[1].staffName) {
              c = v[1].total;
            }
          });
          r[1].total = c;
          p.push(r[1]);
        }
      });
      p.sort(function(c, d) {
        return d.total - c.total;
      });
      return p;
    },
  },
};
</script>

<style></style>
