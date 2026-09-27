<template>
  <v-dialog persistent fullscreen v-model="paramdata">
    <v-row style="height: 90vh" align="center">
      <v-col cols="1"></v-col>
      <v-col cols="10">
        <v-card class="member-detail">
          <v-card-title :class="md"></v-card-title>
          <v-card-text class="member-background">
            <div v-if="data.action == 'INTRODUCTION' || showStaffOnly">
              <v-row dense style="height: 270px; align: center;">
                <v-col cols="4">
                  <DrillStaffHead :myStaff="myStaff" :paramdata="paramdata" />
                </v-col>
                <v-col cols="8">
                  <v-row height="4px"><v-col></v-col></v-row>
                  <v-row dense class="text-end">
                    <v-col
                      ><v-btn
                        variant="outlined"
                        rounded
                        color="#434b5e"
                        v-if="showStaffOnly"
                        @click.stop="$emit('Close-Staff')"
                      >
                        <span class="msg-btn">{{
                          $t("DrillPlatform.noted")
                        }}</span> </v-btn
                      ><v-btn
                        variant="outlined"
                        rounded
                        color="#434b5e"
                        v-else
                        @click.stop="$emit('End-Message', 'introduced')"
                      >
                        <span class="msg-btn">{{
                          $t("DrillPlatform.noted")
                        }}</span>
                      </v-btn></v-col
                    >
                  </v-row>
                  <v-row dense>
                    <v-col>
                      <DrillStaffStatus
                        :myStaff="myStaff"
                        :paramdata="paramdata"
                        :page=true
                      />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row class="member-selfintro member-detail pa-1" align="center">
                <v-col cols="1"></v-col>
                <v-col>
                  <span style="font-size:1.17em;">
                  {{
                    paramdata.staff_det.staff[myStaff.staffName]
                      .staffSelfIntroduction
                  }}</span>
                </v-col>
              </v-row>
            </div>
            <div
              v-if="
                data.action != 'INTRODUCTION' &&
                  !showStaffOnly &&
                  myStaff.introduced &&
                  (myStaff.staffName || myStaff.actioned) &&
                  (!applyAll || true)
              "
            >
              <v-row>
                <v-col cols="4">
                  <v-row dense style="height: 270px"
                    ><v-col>
                      <DrillStaffHead
                        :myStaff="myStaff"
                        :paramdata="paramdata"
                      /> </v-col
                  ></v-row>
                  <v-row>
                    <v-col>
                      <DrillStaffStatus
                        :myStaff="myStaff"
                        :paramdata="paramdata"
                        :page=true
                        v-if="myStaff.staffName"
                      />
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="8">
                  <div v-if="data.action == 'SELECT_STYLE'">
                    <v-row height="4px"><v-col></v-col></v-row>
                    <v-row class="member-detail" align="center" text-end>
                      <v-col cols="8"><h3>{{ $t("DrillPlatform.tickStyle") }}</h3></v-col
                      ><v-col cols="4" class="text-end">
                        <v-btn
                          variant="outlined"
                          rounded
                          color="#434b5e"
                          @click="$emit('Close-Staff', myAction)"
                          ><span class="msg-btn">{{
                            $t("DrillPlatform.confirm")
                          }}</span></v-btn
                        >
                      </v-col></v-row
                    >
                    <v-row dense
                      ><v-col>
                        <DrillStyle
                          :currStyle="currStyle"
                          :paramdata="paramdata"
                          :styling="styling"
                          :oldStyle="oldStyle"
                          @Close-Style="styling = false"
                          @Clicked-Style="$emit('Clicked-Style', $event)"
                          @Submit-Style="$emit('Submit-Style', $event)"
                        /> </v-col
                    ></v-row>
                  </div>
                  <div v-if="data.action == 'MORE_ACTIONS'">
                    <v-row height="4px"><v-col></v-col></v-row>
                    <v-row class="member-detail" align="center" text-end>
                      <v-col cols="9"
                        ><v-row v-if="actMsg">
                          <v-col cols="3"
                            ><h3>{{ actMsg.head }}</h3></v-col
                          >
                          <v-col cols="9"
                            ><h3>{{ actMsg.text }}</h3></v-col
                          >
                        </v-row></v-col
                      ><v-col cols="3" class="text-end">
                        <v-btn
                          variant="outlined"
                          rounded
                          color="#434b5e"
                          v-if="(showSubAction) || !showSubAction"
                          @click="$emit('Close-SubAction')"
                          ><span class="msg-btn">{{
                            $t("DrillPlatform.cancel")
                          }}</span></v-btn
                        >
                        <v-btn
                          variant="outlined"
                          rounded
                          color="#434b5e"
                          v-if="myAction"
                          @click="$emit('Close-Staff', myAction)"
                          ><span class="msg-btn">{{
                            $t("DrillPlatform.confirm")
                          }}</span></v-btn
                        >
                      </v-col></v-row
                    >
                    <v-row dense
                      ><v-col>
                        <DrillSubAction
                          :subAction="subAction"
                          :paramdata="paramdata"
                          :mainAction="actionExp"
                          :actMsg="actMsg"
                          :oldStyle="oldStyle"
                          :myAction="myAction"
                          v-if="showSubAction || myAction == myStaff.actioned"
                          @SubAction-Clicked="myAction = $event"
                          @Submit-SubAction="$emit('Submit-SubAction', $event)"
                          @Close-SubAction="$emit('Clase-Subaction')"
                        />
                        <DrillShowAction
                          :subAction="subAction"
                          :paramdata="paramdata"
                          :mainAction="actionExp"
                          :actMsg="actMsg"
                          :oldStyle="oldStyle"
                          :myAction="myAction"
                          v-if="
                            !showSubAction &&
                              actionExp &&
                              (applyAll || myStaff.actioned)
                          "
                          @SubAction-Clicked="myAction = $event"
                          @Submit-SubAction="$emit('Submit-SubAction', $event)"
                          @Close-SubAction="$emit('Close-Subaction')"
                        /> </v-col
                    ></v-row>
                  </div>
                </v-col>
              </v-row>
              <v-row height="4px"><v-col></v-col></v-row>
            </div>
            <div v-if="myStaff.staffName > 0">
              <v-row :class="md" align="center">
                <v-col cols="2">
                  <v-img
                    v-if="em == '1-25'"
                    src="../../assets/emoji-1-25.gif"
                  ></v-img>
                  <v-img
                    v-if="em == '26-50'"
                    src="../../assets/emoji-26-50.gif"
                  ></v-img>
                  <v-img
                    v-if="em == '51-75'"
                    src="../../assets/emoji-51-75.gif"
                  ></v-img>
                  <v-img
                    v-if="em == '76-100'"
                    src="../../assets/emoji-76-100.gif"
                  ></v-img>
                </v-col>
                <v-col cols="10"><span class="member-detail" style="font-size:1.45em;">{{
                  paramdata.staff_det.staff[myStaff.staffName].staffDescription
                }}</span></v-col>
              </v-row>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="1"></v-col>
    </v-row>
  </v-dialog>
</template>

<script>
import DrillMessageBar from "./DrillMessageBar";
import DrillStyle from "./DrillStyle";
import DrillAction from "./DrillAction";
import DrillSubAction from "./DrillSubAction";
import DrillShowAction from "./DrillShowAction";
import DrillStaffHead from "./DrillStaffHead";
import DrillStaffStatus from "./DrillStaffStatus";
export default {
  name: "DrillStaff",
  components: {
    DrillMessageBar,
    DrillStyle,
    DrillAction,
    DrillSubAction,
    DrillShowAction,
    DrillStaffHead,
    DrillStaffStatus,
  },
  data() {
    return {
      myAction: "",
      em: "",
      md: "",
    };
  },
  props: {
    paramdata: [],
    staff: {},
    oldStyle: false,
    myMessage: [],
    currentMessage: 0,
    mCount: 0,
    curMsg: 0,
    blocking: false,
    data: [],
    styling: false,
    currStyle: "",
    actionExp: "",
    actMsg: [],
    subAction: "",
    showSubAction: false,
    applyAll: false,
    showStaffOnly: false,
  },
  computed: {
    myStaff() {
      let ms = {};
      if (!this.applyAll || this.data.action == "SELECT_STYLE") {
        ms = this.staff;
      } else {
        //        console.log(this.data.content.summary.length)
        let x = this.data.content.summary[this.data.content.summary.length - 1]
          .teamAvg;
        ms.staffName = -1;
        ms.introduced = 1;
        ms.staffDescription = "";
        ms.staffExp = this.$t("DrillPlatform.allStaff");
        ms.skillsValue = x.skills;
        ms.skillsAdded = x.skillsAdd;
        ms.moraleValue = x.morale;
        ms.moraleAdded = x.moraleAdd;
        ms.efficiencyValue = x.efficiency;
        ms.efficiencyAdded = x.efficiencyAdd;
      }
      //      console.log(ms)
      return ms;
    },
  },
  methods: {
    getPhoto(staffId) {
      if (staffId) {
        if (staffId == -1) {
          return this.paramdata.params_ref.params.fileURL + "allStaff.png";
        }
        return (
          this.paramdata.params_ref.params.fileURL +
          this.paramdata.staff_det.staff[staffId].staffPhoto
        );
      }
      return this.paramdata.params_ref.params.fileURL + "default.png";
    },
    nextMessage() {
      this.currentMessage++;
    },
    msgColor(v) {
      return "color: " + (v > 0 ? "grey" : "red");
    },
    avgValue(m) {
      return Math.round(
        (m.skillsValue * 1 + m.moraleValue * 1 + m.efficiencyValue * 1) / 3
      );
    },
    emoji(v) {
      var c = "76-100";
      if (v < 26) {
        c = "1-25";
      } else if (v < 51) {
        c = "26-50";
      } else if (v < 76) {
        c = "51-75";
      } else {
        c = "76-100";
      }
      this.em = c;
    },
    mood(v) {
      let c = "";
      if (v > 75) {
        c = "mood-hh";
      } else if (v > 50) {
        c = "mood-mh";
      } else if (v > 25) {
        c = "mood-ml";
      } else {
        c = "mood-ll";
      }
      this.md = c;
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
  },
  created() {
    if (!this.showSubAction) {
      this.myAction = this.actionExp;
    }
    this.emoji(this.avgValue(this.myStaff));
    this.mood(this.avgValue(this.myStaff));
  },
};
</script>

<style></style>
