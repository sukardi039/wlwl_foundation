<template>
  <v-container class="pa-0">
    <!-- new codes -->
    <v-card class="staff-head" :color="cardColor(member)" height="24vh">
      <v-row dense style="height: 20vh">
        <v-col cols="9">
          <!-- staff pic -->
          <div style="height: 5px;"></div>
          <v-row
            dense
            align="center"
            class="text-center"
            style="position: absolute z-index: 1; height: 18vh;"
          >
            <v-col>
              <v-container class="pa-0 ma-0">
                <v-img
                  :src="getPhoto(member.staffName)"
                  style="z-index: 1; height:18vh"
                ></v-img>
              </v-container>
            </v-col>
          </v-row>
          <v-row dense style="height: 10vh;">
            <v-col cols="9">
              <div style="height: 5px;"></div>
              <v-row dense style="height: 13vh;">
                <v-col cols="8">
                  <div style="height: 5px;"></div>
                  <v-tooltip v-if="member.evaluated" bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-img
                        src="../../assets/evaluated.gif"
                        v-bind="attrs"
                        v-on="on"
                        style="z-index: 2; position: relative; top: -20vh; left: 0;"
                        width="40"
                      ></v-img>
                    </template>
                    <span class="AltText"
                      >{{ $t("DrillPlatform.evaluated") }}:
                      {{ i18Msg(member.evalResult) }}</span
                    >
                  </v-tooltip>
                  <v-img v-else src="../../assets/unevaluated.gif"></v-img>
                </v-col>
                <v-col cols="4">
                  <v-tooltip v-if="member.msgCount" bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <div
                        v-bind="attrs"
                        v-on="on"
                        @click.stop="$emit('Member-Msg', member)"
                        style="z-index: 2; position: relative; top: -19vh;"
                      >
                        <v-img
                          v-if="!member.readMsg"
                          src="../../assets/msgnotread.gif"
                          width="40"
                          class="top-right"
                        ></v-img>
                        <v-img
                          v-if="member.readMsg"
                          src="../../assets/msgread.gif"
                          @click.stop="$emit('Member-Msg', member)"
                          width="40"
                          class="top-right"
                        ></v-img>
                      </div>
                    </template>
                    <span class="AltText">{{
                      $t("DrillPlatform.tellBoss")
                    }}</span>
                  </v-tooltip>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="8">
                  <v-tooltip
                    v-if="member.staffName > 0 && data.action != 'INTRODUCTION'"
                    bottom
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-img
                        src="../../assets/knowMe.png"
                        @click.stop="$emit('Check-Staff', member)"
                        v-bind="attrs"
                        v-on="on"
                        class="bottom-left"
                        width="26"
                        style="z-index: 2; position: relative; top: -18vh; right:0vh;"
                      ></v-img>
                    </template>
                    <span class="AltText">{{
                      $t("DrillPlatform.myInfo")
                    }}</span>
                  </v-tooltip>
                  <v-tooltip
                    v-if="
                      member.staffName < 1 &&
                        member.away == 0 &&
                        hasRecruit(data)
                    "
                    bottom
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-img
                        src="../../assets/interview.png"
                        v-bind="attrs"
                        v-on="on"
                        class="bottom-left"
                        width="30"
                        style="z-index: 2; position: relative; top: -18vh; right:0vh;"
                      ></v-img>
                    </template>
                    <span class="AltText">{{
                      $t("DrillPlatform.interview")
                    }}</span>
                  </v-tooltip>
                  <v-img src="../../assets/unevaluated.gif" v-else></v-img>
                </v-col>
                <v-col cols="4">
                  <v-tooltip v-if="member.away && member.staffName > 0" bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-img
                        src="../../assets/absent.gif"
                        v-bind="attrs"
                        v-on="on"
                        class="bottom-right"
                        width="30"
                        style="z-index: 2; position: relative; top: -18vh; right:0vh;"
                      ></v-img>
                    </template>
                    <span class="AltText">
                      {{ $t("DrillPlatform.away") }}{{ member.away
                      }}{{ $t("DrillPlatform.days") }}</span
                    >
                  </v-tooltip>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="3">
          <!-- magnifying glass -->
          <v-row dense class="text-center" style="height: 30px;">
            <v-col>
              <!-- selected for action -->
              <div
                v-if="
                  (actionExp && actionOn == 'members' && member.offdays < 1) ||
                    member.actioned > 0
                "
              ></div>
              <span
                class="mdi mdi-checkbox-marked-outline"
                small
                v-if="member.actioned"
              ></span>
            </v-col>
          </v-row>
          <v-row dense class="text-center">
            <v-col>
              <!-- Check history -->
              <v-tooltip bottom v-if="member.introduced && member.staffName">
                <template v-slot:activator="{ on, attrs }">
                  <span
                    class="mdi mdi-magnify icon-highlight"
                    small
                    v-bind="attrs"
                    v-on="on"
                    @click.stop="$emit('Profile-Progress', member)"
                  >
                  </span>
                </template>
                <span class="AltText">{{ $t("DrillHistory.title") }}</span>
              </v-tooltip>
            </v-col>
          </v-row>
          <v-row dense class="text-center" style="font-size: 0.85em;">
            <v-col>
              <h6 v-if="member.actioned || !member.away">
                {{ member.staffName ? $t(memberAction(member.actionExp)) : "" }}
              </h6>
              <h6 v-if="member.away">
                {{
                  member.staffName ? $t(memberActionByName(member.awayFor)) : ""
                }}
              </h6>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row dense class="align-center">
        <v-col cols="5" class="text-center"
          ><h4>
            <div v-if="member.staffName && member.introduced">
              {{ member.staffExp }}
            </div>
            <div v-else-if="data.action != 'INTRODUCTION'">
              <div
                v-if="
                  member.staffName < 1 && member.away == 0 && hasRecruit(data) && false
                "
              >
                <v-row dense style="height: 6vh;"><v-col></v-col></v-row>
                <v-btn v-if="!actionExp" outlined rounded class="header-btn">
                  <span style="font-size: 0.8em; font-weight: bold;">{{
                    $t("_u.a_recruit")
                  }}</span>
                </v-btn>
              </div>
              <div v-else>
                {{ $t("DrillPlatform.vacancy") }}
              </div>
            </div>
          </h4>
        </v-col>
        <v-col cols="5" class="text-end">
          <h5 v-if="data.action != 'INTRODUCTION'">
            {{ member.staffName ? $t(member.styleExp) : "" }}
          </h5>
        </v-col>
        <v-col cols="2" class="text-start">
          <v-img
            v-if="data.action == 'SELECT_STYLE' && member.staffName"
            src="../../assets/pen.gif"
            height="10px"
            width="10px"
          ></v-img>
        </v-col>
      </v-row>
    </v-card>
    <div v-if="flashAdded">
      <v-row style="height: 20px;">
        <v-col></v-col>
      </v-row>
      <v-row
        :class="flashBackColor(flashAdded, member.addedAvg)"
        class="text-center pl-10 pr-10"
        style="height: 8vh; color: lightgrey; font-size: 2.7em;"
        align="center"
        justify="center"
        v-if="member.addedAvg || member.touched"
      >
        <v-col cols="10"
          ><span>
            {{ member.addedAvg > 0 ? "+" : "" }}{{ member.addedAvg }}
          </span></v-col
        >
      </v-row>
    </div>
    <div v-if="member.introduced && member.staffName && !flashAdded">
      <v-row dense class="align-center">
        <v-col>
          <!-- status -->
          <DrillStaffStatus
            :myStaff="member"
            :paramdata="paramdata"
            :slim="h < 720"
          />
        </v-col>
      </v-row>
    </div>
    <div class="text-center" v-if="!member.introduced">
      <br />
      <br />
      <span
        style="font-weight: bold; text-shadow: 1px 1px 2px yellow;"
        v-if="member.state == 'blink' || member.state == 'normal'"
      >
        {{ $t("DrillPlatform.knowMe") }}
      </span>
    </div>
  </v-container>
</template>

<script>
import DrillStaffStatus from "./DrillStaffStatus";
export default {
  name: "StaffCard",
  components: {
    DrillStaffStatus,
  },
  data() {
    return {
      h: 0,
    };
  },
  props: {
    paramdata: [],
    data: [],
    member: [],
    actionExp: "",
    actionOn: "",
    cardHeight: 0,
    flashAdded: "",
  },
  methods: {
    cardColor(m) {
      var c = "";
      if (!m.staffName || m.away) {
        c = "#f2f2f2";
      } else if (m.actioned) {
        c = "#d2d589";
      } else {
        c = "#d9e4f8";
      }
      return c;
    },
    getPhoto(staffId) {
      if (staffId) {
        return (
          this.paramdata.params_ref.params.fileURL +
          this.paramdata.staff_det.staff[staffId].staffPhoto
        );
      }
      return this.paramdata.params_ref.params.fileURL + "default.png";
    },
    msgColor(v) {
      return "color: " + (v > 0 ? "grey" : "red");
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
    flashColor(v) {
      let c = "transparent";
      if (v < 0) {
        c = "flash-sub";
      }
      if (v >= 0) {
        c = "flash-add";
      }
      return c;
    },
    flashBackColor(f, v) {
      let c = "white";
      if (f) {
        if (v < 0) {
          c = "flash-back-sub";
        }
        if (v > 0) {
          c = "flash-back-add";
        }
        // if (v == 0){
        //   c = 'grey';
        // }
      }
      return c;
    },
    memberFlashColor(f, v) {
      let c = "transparent";
      if (f) {
        if (v < 0) {
          c = "member-flash-sub";
        }
        if (v > 0) {
          c = "member-flash-add";
        }
      }
      return c;
    },
    i18Msg(tx) {
      if (tx) {
        while (tx.search(/&#/) >= 0 && tx.search(/#&/) >= 0) {
          var s1 = tx.search(/&#/);
          var s2 = tx.search(/#&/);
          var t1 = tx.substring(0, s1);
          var i1 = tx.substring(s1 + 2, s2);
          var t2 = tx.substring(s2 + 2);
          tx = t1 + this.$t(i1) + t2;
        }
      }
      return tx;
    },
    dbg(ev) {
      console.log(ev);
    },
    memberAction(v) {
      //      console.log("v=", v);
      let c = "";
      let b = "";
      let a = "";
      if (v) {
        this.paramdata.action_det.action.forEach((e) => {
          if (e.displayKey == v) {
            b = e;
          }
        });
        //        console.log(b);
        if (b) {
          this.paramdata.action_det.action.forEach((e) => {
            if (e.actionName == b.parentAction) {
              a = e;
            }
          });
          //          console.log(a);
          if (a) {
            c = a.displayKey;
            //            console.log("c=", c);
          }
        }
      }
      return c;
    },
    memberActionByName(v) {
      //      console.log("v=", v);
      let c = "";
      let b = "";
      let a = "";
      if (v) {
        this.paramdata.action_det.action.forEach((e) => {
          if (e.actionName == v) {
            b = e;
          }
        });
        //        console.log(b);
        if (b) {
          this.paramdata.action_det.action.forEach((e) => {
            if (e.actionName == b.parentAction) {
              a = e;
            }
          });
          //          console.log(a);
          if (a) {
            c = a.displayKey;
            //            console.log("c=", c);
          }
        }
      }
      return c;
    },
    hasRecruit(v) {
      let c = 0;
      for (let r = 0; r < v.content.control.maxRecruits; r++) {
        if (v.content.recruits[r].staffName > 0) {
          c++;
        }
      }
      return c;
    },
  },
  created() {
    this.h = screen.height;
  },
};
</script>

<style>
@keyframes blinking {
  0% {
    background-color: #fafbc1;
  }
  100% {
  }
}
#blink {
  animation: blinking 0.35s infinite;
}
.indicator {
  position: relative;
  left: -4px;
  top: -4px;
  width: 160px;
  height: 18vh;
  z-index: 21;
}
.top-right {
  position: relative;
  top: 0px;
  left: 30px;
}
.bottom-right {
  position: relative;
  top: 10px;
  left: 30px;
}
.bottom-left {
  position: relative;
  top: 10px;
  left: 0px;
}
</style>
