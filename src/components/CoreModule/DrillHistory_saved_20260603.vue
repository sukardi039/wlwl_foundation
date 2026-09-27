<template>
  <v-container class="pa-0">
    <v-dialog persistent v-model="data" scrollable>
      <v-card style="font-size: 0.85em;">
        <v-card-title class="detail-head">
          <v-row dense height="10px" class="text-start align-center">
            <v-col cols="2">
              <v-row>
                <v-col cols="2">
                  <span class="mdi mdi-magnify icon-highlight"></span>
                </v-col>
                <v-col>{{ $t("DrillHistory.title") }}</v-col>
              </v-row>
            </v-col>
            <v-col>
              <v-row dense class="detail-head" v-if="!instructor">
                <v-col v-for="mb in currentStaff()" :key="mb.styaffName">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-avatar
                        size="70"
                        class="grey lighten-2"
                        v-bind="attrs"
                        v-on="on"
                        @click.stop="$emit('Profile-Progress', mb)"
                      >
                        <v-img
                          :src="getPhoto(mb.staffName)"
                          alt=""
                          height="65px"
                          contain
                        />
                      </v-avatar>
                    </template>
                    <span class="AltText">{{ mb.staffExp }}</span>
                  </v-tooltip>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="1" class="text-end">
                      <v-btn
          v-if="!genPDF && false"
          outlined
          rounded
          height="25px"
          @click.stop="
            genPDF = 1;
            doPDF();
          "
        >
          <span class="mdi mdi-download" style="font-size: 0.8em;">{{
            $t("DrillReport.download")
          }}</span>
        </v-btn>

                            <v-btn
                outlined
                rounded
                height="25px"
                @click.stop="$emit('Close-History')"
              >
                <span class="mdi mdi-close" style="font-size: 0.8em;">{{
                  $t("DrillPlatform.cancel")
                }}</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-divider></v-divider>
          <div id="hdr" class="comp">
          <v-row class="text-center font-weight-bold">
            <v-col cols="1">
              <v-row dense>
                <v-col cols="2"></v-col>
                <v-col
                  >{{ $t("DrillHistory.week") }}/{{
                    $t("DrillHistory.day")
                  }}</v-col
                >
              </v-row>
            </v-col>
            <v-col cols="2">{{ $t("DrillHistory.member") }}</v-col>
            <v-col cols="1">{{ $t("DrillHistory.phase") }}</v-col>
            <v-col cols="2">{{ $t("DrillHistory.action") }}</v-col>
            <v-col>{{ $t("DrillHistory.skills") }}</v-col>
            <v-col>{{ $t("DrillHistory.morale") }}</v-col>
            <v-col>{{ $t("DrillHistory.efficiency") }}</v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row
            dense
            class="text-center"
            :class="index % 2 ? 'hdr0' : 'hdr1'"
            v-for="(s, index) in data.content.summary"
            :key="index"
            @click.stop="toggleStep(s.step)"
          >
            <v-col>
              <v-row dense>
                <v-col cols="1">
                  <v-row dense>
                    <v-col cols="2"
                      ><h3>{{ plusOrMinus(s.step) }}</h3></v-col
                    >
                    <v-col
                      ><h4>
                        {{ dayToWeekDay(s.day, data.content.day) }}
                      </h4></v-col
                    >
                  </v-row>
                </v-col>
                <v-col cols="2">
                  <v-row dense>
                    <v-col
                      ><h5>{{ data.content.analysis.reportUser }}</h5></v-col
                    >
                  </v-row>
                  <v-row dense>
                    <v-col>
                      <v-progress-linear
                        :background-color="redOrGreen(s.teamAvg.totalAdd)"
                        :value="s.teamAvg.total"
                        :color="valueColor(s.teamAvg.total)"
                        height="10"
                      >
                      </v-progress-linear>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="1"
                  ><h5>{{ $t("DrillPlatform." + s.phase) }}</h5></v-col
                >
                <v-col cols="2" class="text-left">
                  <v-row dense>
                    <v-col
                      ><h5>{{ $t(s.team.action) }}</h5></v-col
                    >
                  </v-row>
                  <v-row dense>
                    <v-col
                      ><h5>{{ $t(s.team.action + "_e") }}</h5></v-col
                    >
                  </v-row>
                </v-col>
                <v-col>
                  <v-row dense>
                    <v-col
                      ><h5>
                        {{ s.teamAvg.skills }} ({{ s.teamAvg.skillsAdd }})
                      </h5></v-col
                    >
                  </v-row>
                  <v-row dense>
                    <v-col>
                      <v-progress-linear
                        :background-color="redOrGreen(s.teamAvg.skillsAdd)"
                        :value="s.teamAvg.skills"
                        :color="valueColor(s.teamAvg.skills)"
                        height="10"
                      >
                      </v-progress-linear>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col>
                  <v-row dense>
                    <v-col
                      ><h5>
                        {{ s.teamAvg.morale }} ({{ s.teamAvg.moraleAdd }})
                      </h5></v-col
                    >
                  </v-row>
                  <v-row dense>
                    <v-col>
                      <v-progress-linear
                        :background-color="redOrGreen(s.teamAvg.moraleAdd)"
                        :value="s.teamAvg.morale"
                        :color="valueColor(s.teamAvg.morale)"
                        height="10"
                      >
                      </v-progress-linear>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col>
                  <v-row dense>
                    <v-col
                      ><h5>
                        {{ s.teamAvg.efficiency }} ({{
                          s.teamAvg.efficiencyAdd
                        }})
                      </h5></v-col
                    >
                  </v-row>
                  <v-row dense>
                    <v-col>
                      <v-progress-linear
                        :background-color="redOrGreen(s.teamAvg.efficiencyAdd)"
                        :value="s.teamAvg.efficiency"
                        :color="valueColor(s.teamAvg.efficiency)"
                        height="10"
                      >
                        <template> </template>
                      </v-progress-linear>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" class="text-left" v-if="s.bossMsg">
                  <v-row dense v-for="(b, bindex) in s.bossMsg" :key="bindex">
                    <v-col cols="4"></v-col>
                    <v-col cols="8"
                      ><h5
                        >{{ $t("DrillPlatform.yourBoss") }}: 
                        {{ $t(msg[b]) }}</h5
                      ></v-col
                    >
                  </v-row>
                </v-col>
                <v-col cols="12" class="text-left" v-if="s.bossRev">
                  <v-row dense v-for="(b, bindex) in s.bossRev" :key="bindex">
                    <v-col cols="4"></v-col>
                    <v-col cols="8"
                      ><h5
                        >{{ $t("DrillPlatform.reviewer") }}: 
                        {{ $t(msg[b]) }}</h5
                      ></v-col
                    >
                  </v-row>
                </v-col>
                <v-col cols="12" v-else></v-col>
                <v-col cols="12" v-if="step == s.step">
                  <v-row
                    dense
                    class="detail-detail"
                    v-for="(m, sindex) in s.member"
                    :key="sindex"
                    style="font-size: 0.8em;"
                  >
                    <v-col cols="1"></v-col>
                    <v-col cols="1">
                      <v-avatar size="35" class="grey lighten-2">
                        <v-img
                          :src="getPhoto(getStaffId(m.staff))"
                          alt=""
                          height="40px"
                          contain
                        />
                      </v-avatar>
                    </v-col>
                    <v-col cols="2">
                        <v-col>{{ m.staff }}</v-col>
                    </v-col>
                    <v-col cols="2" class="text-left">
                      <v-row dense>
                        <v-col>{{
                          i18Msg(multiAction(m.action, ""))
                        }}</v-col></v-row
                      >
                      <v-row dense>
                        <v-col>{{
                          i18Msg(multiAction(m.action, "_e"))
                        }}</v-col></v-row
                      >
                    </v-col>
                    <v-col>
                      <v-row dense>
                        <v-col>{{ m.skills }} ({{ m.skillsAdd }})</v-col>
                      </v-row>
                      <v-row dense>
                        <v-col>
                          <v-progress-linear
                            :background-color="redOrGreen(m.skillsAdd)"
                            :value="m.skills"
                            :color="valueColor(m.skills)"
                            height="8"
                          >
                          </v-progress-linear>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col>
                      <v-row dense>
                        <v-col>{{ m.morale }} ({{ m.moraleAdd }})</v-col>
                      </v-row>
                      <v-row dense>
                        <v-col>
                          <v-progress-linear
                            :background-color="redOrGreen(m.moraleAdd)"
                            :value="m.morale"
                            :color="valueColor(m.morale)"
                            height="8"
                          >
                          </v-progress-linear>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col>
                      <v-row dense>
                        <v-col
                          >{{ m.efficiency }} ({{ m.efficiencyAdd }})</v-col
                        >
                      </v-row>
                      <v-row dense>
                        <v-col>
                          <v-progress-linear
                            :background-color="redOrGreen(m.efficiencyAdd)"
                            :value="m.efficiency"
                            :color="valueColor(m.efficiency)"
                            height="8"
                          >
                          </v-progress-linear>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" class="text-left" v-if="m.message">
                      <v-row>
                        <v-col cols="4"></v-col>
                        <v-col cols="8">{{ i18Msg(m.message) }}</v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-divider></v-divider>
            </v-col>
          </v-row>
            
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
export default {
  name: "DrillHistory",
  data() {
    return {
      step: -1,
      locSstaff: [],
      genPDF: false,
    };
  },
  props: {
    data: [],
    msg: [],
    paramdata: [],
    instructor: false,
    // step: 0,
  },
  methods: {
    getPhoto(staffId) {
      if (staffId) {
        return (
          this.paramdata.params_ref.params.fileURL +
          this.paramdata.staff_det.staff[staffId].staffPhoto
        );
      }
      return this.paramdata.params_ref.params.fileURL + "default.png";
    },
    getStaffId(v) {
      let s = 0;
      s = this.data.content.staffs.find((e) => e.staffExp == v);
      return s.staffName;
    },
    currentStaff() {
      let w = [];
      for (let c = 1; c <= this.data.content.control.maxMembers; c++) {
        if (this.data.content.members[c].staffName > 0) {
          w.push(this.data.content.members[c]);
        }
      }
      return w;
    },
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
    avgValue(m) {
      return Math.round(
        (m.skillsValue * 1 + m.moraleValue * 1 + m.efficiencyValue * 1) / 3
      );
    },
    valueColor(v) {
      let c = "";
      if (v > 75) {
        c = "value-hh";
      } else if (v > 50) {
        c = "value-mh";
      } else if (v > 25) {
        c = "value-ml";
      } else {
        c = "value-ll";
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
    plusOrMinus(v) {
      let c = "+";
      if (this.step >= 0 && v == this.step) {
        c = "-";
      }
      return c;
    },
    toggleStep(s) {
      if (s == this.step) {
        this.step = -1;
      } else if (this.step == -1) {
        this.step = s;
      }
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
    async doPDF() {
      var width = document.getElementById("hdr").scrollWidth;
      var height = document.getElementById("hdr").scrollHeight;
      var cop = document.querySelector(".comp");
      var doc = new jsPDF("l", "px", [height, width]);
      await html2canvas(cop).then((canvas) => {
        console.log(canvas);
        doc.addImage(
          canvas.toDataURL("image/jpeg", 1),
          "jpg",
          0,
          0,
          width,
          height,
          "",
          "NONE"
        );
        doc.save(`compare.pdf`);
        //                    }
      });
      this.genPDF = false;
    },
  },
  created() {
    this.currentStaff();
  },
};
</script>

<style></style>
