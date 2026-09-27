<template>
  <v-container class="pa-0">
    <v-card
      class="staff-head"
      :color="cardColor(member)"
      height="110"
      style="z-index: 1;"
    >
      <v-row dense>
        <v-col cols="6">
          <div style="height: 5px;"></div>
          <v-row dense align="center" class="text-center">
            <v-col>
              <v-container class="pa-0 ma-0">
                <v-img
                  :src="getPhoto(member.staffName)"
                  width="90px"
                  @click.stop="$emit('Check-Staff', member)"
                  style="z-index: 20;"
                ></v-img>
              </v-container>
            </v-col>
          </v-row>
          <v-row
            dense
            class="indicator"
            @click.stop="$emit('Check-Staff', member)"
            style="width: 90px;"
          >
            <v-col cols="9">
              <div style="height: 5px;"></div>
              <v-row dense style="height: 60px;">
                <v-col cols="6">
                  <div style="height: 5px;"></div>
                  <v-tooltip v-if="member.evaluated" bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-img
                        src="../../assets/evaluated.gif"
                        v-bind="attrs"
                        v-on="on"
                      ></v-img>
                    </template>
                    <span class="AltText"
                      >{{ $t("DrillPlatform.evaluated") }}:
                      {{ i18Msg(member.evalResult) }}</span
                    >
                  </v-tooltip>
                  <v-img v-else src="../../assets/unevaluated.gif"></v-img>
                </v-col>
                <v-col cols="6">
                  <v-tooltip v-if="member.msgCount" bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <div
                        v-bind="attrs"
                        v-on="on"
                        @click.stop="$emit('Member-Msg', member)"
                      >
                        <v-img
                          v-if="!member.readMsg"
                          src="../../assets/msgnotread.gif"
                          width="100%"
                          class="top-right"
                        ></v-img>
                        <v-img
                          v-if="member.readMsg"
                          src="../../assets/msgread.gif"
                          @click.stop="$emit('Member-Msg', member)"
                          width="100%"
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
                <v-col cols="6">
                  <v-img src="../../assets/unevaluated.gif"></v-img>
                </v-col>
                <v-col cols="6">
                  <v-tooltip v-if="member.away && member.staffName > 0" bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-img
                        src="../../assets/absent.gif"
                        v-bind="attrs"
                        v-on="on"
                        class="bottom-right"
                      ></v-img>
                    </template>
                    <span class="AltText"
                      >{{ $t("DrillPlatform.away") }}{{ member.away
                      }}{{ $t("DrillPlatform.days") }}</span
                    >
                  </v-tooltip>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <!-- <v-row dense class="text-center" v-if="flashAdded && false">
            <v-col :class="flashColor(member.addedAvg)"
              ><h1 v-if="flashAdded && member.addedAvg && false">
                {{ member.addedAvg > 0 ? "+" : "" }}{{ member.addedAvg }}
              </h1></v-col
            >
          </v-row> -->
        </v-col>
        <v-col cols="6">
          <v-row dense style="height: 82px">
            <v-col cols="8">
              <!-- Name and Style -->
              <v-row dense style="height: 16px">
                <v-col></v-col>
              </v-row>
              <v-row dense v-if="member.introduced">
                <v-col>
                  <h4 v-if="member.staffName">
                    {{ member.staffExp }}
                  </h4>
                  <h4 v-else>
                    {{ $t("DrillPlatform.vacancy") }}
                  </h4>
                </v-col>
              </v-row>
              <v-row dense v-if="member.away || member.actioned">
                <v-col>
                  <h5 v-if="member.actioned">
                    {{
                      member.staffName ? $t(memberAction(member.actionExp)) : ""
                    }}
                  </h5>
                  <h5 v-if="member.away">
                    {{
                      member.staffName
                        ? $t(memberActionByName(member.awayFor))
                        : ""
                    }}
                  </h5>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="3">
              <v-row dense style="height: 20px">
                <v-col>
                  <!-- selected for action -->
                  <div
                    v-if="
                      (actionExp &&
                        actionOn == 'members' &&
                        member.offdays < 1) ||
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
              <v-row dense>
                <v-col>
                  <!-- Check history -->
                  <v-tooltip
                    bottom
                    v-if="member.introduced && member.staffName"
                  >
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
            </v-col>
          </v-row>
          <v-row dense>
            <v-col>
              <!-- member's style -->
              <v-row dense class="member-detail text-center align-center">
                <v-col cols="8" class="text-start"
                  ><h5 v-if="data.action != 'INTRODUCTION'">
                    {{ member.staffName ? $t(member.styleExp) : "" }}
                  </h5></v-col
                ><v-col clos="4" class="text-start"
                  ><v-img
                    v-if="data.action == 'SELECT_STYLE' && member.staffName"
                    src="../../assets/pen.gif"
                    height="10px"
                    width="10px"
                  ></v-img
                ></v-col>
              </v-row>
            </v-col>
          </v-row>
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
        style="height: 100px; color: lightgrey; font-size: 3.5em;"
        align="center"
        justify="center"
        v-if="member.addedAvg || member.touched"
      >
        <v-col cols="12"
          ><span>
           {{ member.addedAvg > 0 ? "+" : "" }}{{ member.addedAvg }}
          </span></v-col
        >
      </v-row>
    </div>
    <div v-if="member.introduced && member.staffName && !flashAdded">
      <v-row dense>
        <v-col>
          <!-- status -->
          <DrillStaffStatus
            :myStaff="member"
            :paramdata="paramdata"
            :slim="h < 800"
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
      console.log("v=", v);
      let c = "";
      let b = "";
      let a = "";
      if (v) {
        this.paramdata.action_det.action.forEach((e) => {
          if (e.displayKey == v) {
            b = e;
          }
        });
        console.log(b);
        if (b) {
          this.paramdata.action_det.action.forEach((e) => {
            if (e.actionName == b.parentAction) {
              a = e;
            }
          });
          console.log(a);
          if (a) {
            c = a.displayKey;
            console.log("c=", c);
          }
        }
      }
      return c;
    },
    memberActionByName(v) {
      console.log("v=", v);
      let c = "";
      let b = "";
      let a = "";
      if (v) {
        this.paramdata.action_det.action.forEach((e) => {
          if (e.actionName == v) {
            b = e;
          }
        });
        console.log(b);
        if (b) {
          this.paramdata.action_det.action.forEach((e) => {
            if (e.actionName == b.parentAction) {
              a = e;
            }
          });
          console.log(a);
          if (a) {
            c = a.displayKey;
            console.log("c=", c);
          }
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
  position: absolute;
  left: 0px;
  top: -10px;
  width: 90px;
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
</style>
