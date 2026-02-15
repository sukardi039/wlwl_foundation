<template>
  <v-container>
    <v-dialog persistent v-model="data" scrollable>
      <v-card style="font-size: 0.8em;">
        <v-card-title class="detail-head">
          <v-row dense height="10px" class="text-start align-center"
            ><v-col cols="1">
              <span class="mdi mdi-magnify icon-highlight"></span
            ></v-col>
            <v-col>{{ $t("DrillHistory.title") }}</v-col>
            <v-col>{{ member.staffExp }}</v-col>
            <v-col class="text-end">
                            <v-btn
                outlined
                rounded
                height="25px"
                @click.stop="$emit('Close-Profile')"
              >
                <span class="mdi mdi-close" style="font-size: 0.8em;">{{
                  $t("DrillPlatform.cancel")
                }}</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-row class="text-center font-weight-bold">
            <v-col cols="1"
              >{{ $t("DrillHistory.week") }}/{{ $t("DrillHistory.day") }}</v-col
            >
            <v-col cols="2">{{ $t("DrillHistory.phase") }}</v-col>
            <v-col cols="3">{{ $t("DrillHistory.action") }}</v-col>
            <v-col>{{ $t("DrillHistory.skills") }}</v-col>
            <v-col>{{ $t("DrillHistory.morale") }}</v-col>
            <v-col>{{ $t("DrillHistory.efficiency") }}</v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row
            dense
            class="text-center"
            v-for="(s, index) in data.content.summary"
            :key="index"
            :class="index % 2 ? 'row0' : 'row1'"
            @click="$emit('Selected-Step', s.step)"
          >
            <v-col dense v-if="haveRecord(s.member, member)">
              <v-row dense v-for="(m, sindex) in s.member" :key="sindex">
                <v-col
                  dense
                  v-if="
                    m.staff == member.staffExp &&
                      (m.action ||
                        m.skillsAdd ||
                        m.moraleAdd ||
                        m.efficiencyAdd ||
                        m.message)
                  "
                >
                  <v-row dense>
                    <v-col cols="1"
                      ><h4>
                        {{ dayToWeekDay(s.day, data.content.day) }}
                      </h4></v-col
                    >
                    <v-col cols="2"
                      ><h5>{{ $t("DrillPlatform." + s.phase) }}</h5></v-col
                    >
                    <v-col cols="3" class="text-left">
                      <v-row dense>
                        <v-col>
                          <h5>{{ i18Msg(multiAction(m.action, "")) }}</h5>
                        </v-col>
                      </v-row>
                      <v-row dense>
                        <v-col>
                          <v-progress-linear
                            :background-color="redOrGreen(m.totalAdd)"
                            :value="m.total"
                            :color="valueColor(m.total)"
                            height="5"
                          >
                          </v-progress-linear>
                        </v-col>
                      </v-row>
                      <v-row dense>
                        <v-col>
                          <h5>{{ i18Msg(multiAction(m.action, "_e")) }}</h5>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col>
                      <v-row dense>
                        <v-col
                          ><h5>{{ m.skills }} ({{ m.skillsAdd }})</h5></v-col
                        >
                      </v-row>
                      <v-row dense>
                        <v-col>
                          <v-progress-linear
                            :background-color="redOrGreen(m.skillsAdd)"
                            :value="m.skills"
                            :color="valueColor(m.skills)"
                            height="5"
                          >
                          </v-progress-linear>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col>
                      <v-row dense>
                        <v-col>
                          <h5>{{ m.morale }} ({{ m.moraleAdd }})</h5>
                        </v-col>
                      </v-row>
                      <v-row dense>
                        <v-col>
                          <v-progress-linear
                            :background-color="redOrGreen(m.moraleAdd)"
                            :value="m.morale"
                            :color="valueColor(m.morale)"
                            height="5"
                          >
                          </v-progress-linear>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col>
                      <v-row dense>
                        <v-col>
                          <h5>{{ m.efficiency }} ({{ m.efficiencyAdd }})</h5>
                        </v-col>
                      </v-row>
                      <v-row dense>
                        <v-col> </v-col>
                      </v-row>
                      <v-progress-linear
                        :background-color="redOrGreen(m.efficiencyAdd)"
                        :value="m.efficiency"
                        :color="valueColor(m.efficiency)"
                        height="5"
                      >
                        <template> </template>
                      </v-progress-linear>
                    </v-col>
                    <v-col cols="12" class="text-left" v-if="m.message">
                      <v-row>
                        <v-col cols="3"></v-col>
                        <v-col cols="9">
                          <h5>{{ i18Msg(m.message) }}</h5>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-divider></v-divider>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "DrillProfile",
  props: {
    data: [],
    step: 0,
    member: {},
  },
  methods: {
    dayToWeekDay(day, d) {
      let z = "";
      if (day > 0) {
        let x = d[day];
        z =
          this.$t("DrillPlatform.week") +
          x.week +
          this.$t("DrillPlatform.week1") +
          "/" +
          this.$t("DrillPlatform.day") +
          x.weekday +
          this.$t("DrillPlatform.day1");
      }
      return z;
    },
    haveRecord(mn, mem) {
      let v = false;
      //      console.log("mn", mn);
      let m = mn[mem.staffName];
      if (
        m &&
        m.staff == mem.staffExp &&
        (m.action || m.skillsAdd || m.moraleAdd || m.efficiencyAdd || m.message)
      ) {
        v = true;
      }
      return v;
    },
    valueColor(v) {
      let c = "";
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
    redOrGreen(v) {
      let c = "transparent";
      if (v < 0) {
        c = "red lighten-4";
      }
      if (v > 0) {
        c = "green lighten-4";
      }
      return c;
    },
    i18Msg(tx) {
      while (tx.search(/&#/) >= 0 && tx.search(/#&/) >= 0) {
        var s1 = tx.search(/&#/);
        var s2 = tx.search(/#&/);
        var t1 = tx.substring(0, s1);
        var i1 = tx.substring(s1 + 2, s2);
        var t2 = tx.substring(s2 + 2);
        tx = t1 + this.$t(i1) + t2;
      }
      return tx;
    },
    multiAction(a, e) {
      let r = "";
      let c = 0;
      let s = a.split("/");
      s.forEach((v) => {
        if (c) {
          r = r + " / ";
        }
        r = r + "&#" + v + e + "#&";
        c++;
      });
      return r;
    },
  },
};
</script>

<style></style>
