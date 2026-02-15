<template>
  <v-container flex class="pa-0 ma-0">
    <DrillMessage
      :myMessage="myMessage"
      :currentMessage="currentMessage"
      :mCount="msgCount"
      :oldStyle="oldStyle"
      v-if="msgCount && blocking"
      @End-Message="endMessage($event)"
      @Next-Message="nextMessage()"
    />
    <DrillProfile
      :data="data"
      :member="currentMember"
      :step="historyStep"
      v-if="showProfile"
      @Close-Profile="showProfile = false"
    />
    <DrillOrderStat
      :data="data"
      :paramdata="paramdata"
      :task="orderTask"
      :waiting="ordersWait"
      :processing="ordersProcess"
      :taskEff="taskEff"
      v-if="showOrderStat"
      @Close-OrderStat="showOrderStat = false"
    />
    <DrillOrderDone
      :data="data"
      :paramdata="paramdata"
      :done="ordersDone"
      :staff="doneStaff"
      :task="doneTask"
      v-if="showOrderDone"
      @Close-OrderDone="showOrderDone = false"
    />
    <DrillSubAction
      :subAction="subAction"
      :paramdata="paramdata"
      :mainAction="actionExp"
      v-if="showSubAction"
      @Submit-SubAction="submitSubAction($event)"
      @Close-SubAction="closeSubAction()"
    />
    <DrillRecruit
      :data="data"
      :paramdata="paramdata"
      :recruiting="recruiting"
      @Close-Recruit="recruiting = false"
      @Submit-Recruit="submitRecruit($event)"
    />
    <DrillStyle
      :currStyle="currentStyle"
      :paramdata="paramdata"
      v-if="styling"
      @Close-Style="styling = false"
      @Clicked-Style="clickedStyle($event)"
      @Submit-Style="submitStyle($event)"
    />
    <DrillStaff
      :staff="currentMember"
      :paramdata="paramdata"
      :oldStyle="oldStyle"
      :myMessage="myMessage"
      :blocking="blocking"
      :currentMessage="currentMessage"
      :mCount="msgCount"
      :data="data"
      :styling="styling"
      :currStyle="currentStyle"
      :actionExp="actionExp"
      :actMsg="actMsg"
      :subAction="subAction"
      :showSubAction="showSubAction"
      :applyAll="applyAll"
      :showStaffOnly="showStaffOnly"
      v-if="showingStaff"
      @Profile-Progress="profileProgress($event)"
      @Member-Msg="memberMsg($event)"
      @End-Message="
        endMessage($event);
        showingStaff = false;
      "
      @Next-Message="nextMessage()"
      @Clicked-Style="clickedStyle($event)"
      @Submit-Style="submitStyle($event)"
      @Close-Staff="closeShowStaff($event)"
      @Submit-SubAction="submitSubAction($event)"
      @Close-SubAction="closeShowStaff()"
    />
    <DrillStaffMessage
      :data="data"
      :paramdata="paramdata"
      :myMessage="myMessage"
      :blocking="blocking"
      :currentMessage="currentMessage"
      :mCount="msgCount"
      :oldStyle="oldStyle"
      v-if="staffMsg"
      @End-Message="endMessage($event)"
      @Next-Message="nextMessage()"
    />
    <DrillStyleConfirm
      :data="data"
      :paramdata="paramdata"
      v-if="confirmStyle"
      @Submit-Style="
        $emit('Submit-Style', $event);
        confirmStyle = false;
      "
      @Abort-Style="confirmStyle = false"
    />
    <DrillActionConfirm
      :data="data"
      :actMsg="actMsg"
      :applyAll="applyAll"
      :selectedRecruit="selectedRecruit"
      :selectedRecruitExp="selectedRecruitExp"
      :memberActioned="memberActioned()"
      :actionExp="actionExp"
      :clicked1to1="clicked1to1"
      :actionInfo="actionInfo"
      :addMore="true"
      v-if="confirmAction"
      @Close-Action="closeAction()"
      @Submit-Action="submitAction($event)"
      @More-Action="confirmAction = false"
    />
    <v-dialog
      persistent
      fullscreen
      style="overflow: hidden;"
      v-model="data"
      class="pa-0 ma-0"
    >
      <v-card class="pa-0 ma-0" style="overflow: hidden; height: 99vh;">
        <v-row dense class="pa-0 ma-0">
          <v-col>
            <DrillHeader
              :data="data"
              :eTime="eTime"
              :paramdata="paramdata"
              :instructor="false"
              :oldStyle="oldStyle"
              :currentDrill="currentDrill"
              :show="showStatus || data.action != 'INTRODUCTION'"
              v-if="showStaffBox || data.action != 'INTRODUCTION'"
              @Profile-Progress="profileProgress($event)"
              @End-Drill="$emit('End-Drill')"
              @Drill-Chat="drillChat()"
            />
          </v-col>
        </v-row>
        <v-row dense v-if="showStaffBox || data.stepNumber >= 1">
          <v-col>
            <!-- task progress bar and member cards by task section -->
            <v-row dense v-if="data.content.members">
              <!-- action selector -->
              <v-col class="action-box" cols="2">
                <v-container class="pa-0 ma-0 action-panel">
                  <v-row dense class="justify-center">
                    <!-- action selector -->
                    <v-col
                      v-if="
                        data.action == 'MORE_ACTIONS' &&
                          !flashAdded &&
                          !parentMsgCount
                      "
                    >
                      <v-container class="pa-0 ma-0" v-if="!actionExp">
                        <h3 class="action-head pa-1 ma-1">
                          {{ $t("DrillPlatform.chooseAction") }}
                        </h3>
                        <!-- 1 to 1 action -->
                        <v-container>
                          <DrillActionMenu
                            :actions="actionFilter(paramdata.action_det.action)"
                            :data="data"
                            :head="$t('DrillPlatform.1toMore')"
                            @actionSelected="
                              actionExp = $event;
                              selectedAction($event);
                            "
                          />
                        </v-container>
                      </v-container>
                    </v-col>
                    <v-container v-if="actMsg.head">
                      <v-row dense>
                        <v-col
                          cols="12"
                          style="grey lighten-2"
                          class="text-smaller"
                        >
                          <h3>{{ actMsg.head }}</h3>
                        </v-col>
                        <v-col cols="12" class="text-small">
                          <h4>{{ actMsg.text }}</h4>
                        </v-col>
                      </v-row>
                      <v-row dense v-if="!applyAll">
                        <v-col>
                          <v-row
                            dense
                            v-for="mb in actionMembers(data.content.members)"
                            :key="mb.staffName"
                          >
                            <v-col>
                              <v-row dense>
                                <v-col
                                  ><h4>{{ mb.staffExp }}</h4></v-col
                                >
                              </v-row>
                              <v-row dense>
                                <v-col cols="1"></v-col>
                                <v-col auto
                                  ><h5>{{ $t(mb.actionExp + "_e") }}</h5></v-col
                                >
                              </v-row>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                      <v-row dense v-else>
                        <v-col
                          ><h4 v-if="selectedRecruit < 1">
                            {{ $t("DrillPlatform.allStaff") }}
                          </h4></v-col
                        >
                      </v-row>
                      <v-row dense>
                        <v-col>
                          <h4>{{ selectedRecruitExp }}</h4>
                        </v-col>
                      </v-row>
                    </v-container>
                    <!-- submit buttons -->
                    <v-col cols="12" class="text-end">
                      <v-btn
                        rounded
                        color="#434b5e"
                        v-if="
                          ((data.action == 'MORE_ACTIONS' && actionExp) ||
                            clicked1to1) &&
                            !confirmAction
                        "
                        @click.stop="closeAction()"
                        ><span class="action-btn">{{
                          $t("DrillPlatform.cancel")
                        }}</span></v-btn
                      >
                      <v-btn
                        rounded
                        color="#434b5e"
                        v-if="
                          data.action == 'MORE_ACTIONS' &&
                            memberActioned() &&
                            actionExp &&
                            !confirmAction
                        "
                        @click.stop="submitAction(data)"
                        ><span class="action-btn">{{
                          $t("DrillPlatform.confirm")
                        }}</span></v-btn
                      >
                    </v-col>
                  </v-row>
                  <v-row dense>
                    <v-col>
                      <v-container
                        v-if="
                          data.action == 'SELECT_STYLE' &&
                            allStyle() &&
                            !flashAdded &&
                            !parentMsgCount
                        "
                        class="pa-0 ma-0"
                      >
                        <h3 class="action-head pa-1 ma-1">
                          {{ $t("DrillPlatform.chooseStyle") }}
                        </h3>
                        <v-divider></v-divider>
                        <v-divider></v-divider>
                        <br />
                        <v-container class="text-end">
                          <v-btn
                            rounded
                            color="#434b5e"
                            v-if="data.action == 'SELECT_STYLE'"
                            @click.stop="
                              confirmingStyle();
                              clearMessage();
                            "
                            ><span class="action-btn">{{
                              $t("DrillPlatform.continue")
                            }}</span></v-btn
                          >
                        </v-container>
                      </v-container>
                      <v-container
                        v-if="data.action == 'INTRODUCTION'"
                        class="pa-0 ma-0"
                      >
                        <v-img
                          :src="require('../../assets/boss.jpg')"
                          width="100%"
                        ></v-img>
                        <h3 class="action-head pa-1 ma-1">
                          {{ $t("DrillPlatform.toIntroduce") }}
                        </h3>
                        <v-divider></v-divider>
                        <v-divider></v-divider>
                        <br />
                      </v-container>
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
              <!-- task progress -->
              <v-col
                cols="2"
                v-for="tsk in data.content.task_eff"
                :key="tsk.taskName"
                class="progress-box"
              >
                <v-hover v-slot="{ hover }">
                  <v-card
                    flat
                    class="text-center pa-0 ma-0"
                    :class="{ 'progress-hover': hover }"
                    ><v-row dense
                      ><v-col cols="1"></v-col
                      ><v-col>
                        <v-btn
                          class="progress-btn"
                          block
                          elevation="8"
                          outlined
                          rounded
                          @click.stop="showOrders(tsk)"
                          ><span>{{ tsk.taskDisplayName }}</span
                          ><span v-if="data.content.orderStatus[tsk.stage]"
                            >({{
                              data.content.orderStatus[tsk.stage].done
                            }})</span
                          ></v-btn
                        ></v-col
                      ><v-col cols="1"></v-col> </v-row
                  ></v-card>
                </v-hover>
                <v-row dense>
                  <v-col
                    cols="12"
                    v-for="(member, index) in data.content.members"
                    :key="index"
                    class="pa-0"
                  >
                    <!-- member card -->
                    <v-hover v-slot="{ hover }">
                      <v-card
                        :height="cardHeight('px')"
                        :color="cardColor(member.offdays)"
                        class="pa-0 ma-1"
                        v-if="
                          member.task == tsk.taskName &&
                            (member.staffName || true)
                        "
                        :elevation="
                          hover &&
                          (data.action == 'INTRODUCTION' ||
                            (data.action == 'MORE_ACTIONS' &&
                              actionExp &&
                              actionOn == 'members' &&
                              member.offdays < 1)) &&
                          member.offdays < 1
                            ? 8
                            : 2
                        "
                        @click.stop="memberCardClicked(member)"
                        :id="member.state"
                      >
                        <v-card-text>
                          <v-container class="pa-0" v-if="!oldStyle">
                            <StaffCard
                              :member="member"
                              :paramdata="paramdata"
                              :data="data"
                              :actionExp="actionExp"
                              :actionOn="actionOn"
                              :flashAdded="flashAdded"
                              @Profile-Progress="profileProgress($event)"
                              @Member-Msg="memberMsg($event)"
                              @Check-Staff="checkStaff($event)"
                            />
                          </v-container>
                        </v-card-text>
                      </v-card>
                    </v-hover>
                    <v-divider v-if="member.task == tsk.taskName"></v-divider>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="2" v-if="chat">
            <Chat :cardHeight="cardHeight() * 1 + cardHeight() * 1" />
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

import DrillMessage from "./DrillMessage";
import DrillStaffMessage from "./DrillStaffMessage";
import DrillProfile from "./DrillProfile";
import DrillSubAction from "./DrillSubAction";
import DrillActionMenu from "./DrillActionMenu";
import DrillRecruit from "./DrillRecruit";
import DrillStyle from "./DrillStyle";
import DrillStyleConfirm from "./DrillStyleConfirm";
import DrillStaff from "./DrillStaff";
import DrillOrderStat from "./DrillOrderStat";
import DrillOrderDone from "./DrillOrderDone";
import DrillHeader from "./DrillHeader";
import DrillActionConfirm from "./DrillActionConfirm";
import StaffCard from "./StaffCard.vue";
import Template from "../../views/Template.vue";
import Chat from "../Chat/ChatBox";
export default {
  name: "DrillPlatform",
  components: {
    DrillMessage,
    DrillStaffMessage,
    DrillProfile,
    DrillSubAction,
    DrillActionMenu,
    DrillRecruit,
    DrillStyle,
    DrillStyleConfirm,
    DrillStaff,
    DrillOrderStat,
    DrillOrderDone,
    DrillHeader,
    DrillActionConfirm,
    StaffCard,
    Template,
    Chat,
    DrillActionConfirm,
  },
  data() {
    return {
      myMessage: [],
      msgCount: 0,
      currentMessage: 0,
      action: "",
      actionExp: "",
      task: "",
      taskExp: "",
      markBox: "",
      actionOn: "",
      recruitList: [],
      selectedRecruit: "",
      selectedRecruitExp: "",
      imsg: {
        from: "",
        text: "",
        act: "",
      },
      showProfile: false,
      historyStep: "",
      applyAll: false,
      subAction: [],
      showSubAction: false,
      subActionMember: {},
      blocking: false,
      showOrderStat: false,
      showOrderDone: false,
      orderTask: "",
      currentMember: {},
      ordersWait: [],
      ordersProcess: [],
      ordersDone: [],
      taskEff: {},
      doneStaff: [],
      doneTask: [],
      actMsg: {},
      absolute: true,
      recruiting: false,
      styling: false,
      currentStyle: "",
      showingStaff: false,
      clicked1to1: 0,
      oldStyle: false,
      chat: false,
      staffMsg: false,
      confirmStyle: false,
      screenHeight: 0,
      showStatus: false,
      showStaffOnly: false,
      confirmAction: false,
      actionInfo: "",
    };
  },
  props: {
    data: [],
    eTime: "",
    flashAdded: false,
    parentMsgCount: 0,
    currentDrill: 0,
    showStaffBox: false,
    drillUser: "",
  },
  computed: {
    ...mapState({
      signedinuser: "signedinuser",
      paramdata: "paramdata",
    }),
  },
  methods: {
    cardHeight(v) {
      // console.log(screen.height)
      return ((screen.height - 300) / 2).toFixed() + v;
      // return "230px";
    },
    cardColor(ev) {
      return ev > 0 ? "grey lighten-2" : "";
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
    msgColor(v) {
      return "color: " + (v > 0 ? "lightgrey" : "red");
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
    buildMessage(from, text, act, who) {
      this.imsg.from = from;
      this.imsg.text = this.i18Msg(text);
      this.imsg.act = act;
      this.imsg.who = who;
      this.myMessage[++this.msgCount] = { ...this.imsg };
      //      this.msgCount++
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
    nextMessage() {
      this.currentMessage++;
    },
    clearMessage() {
      this.msgCount = 0;
      this.currentMessage = 0;
      this.myMessage = [];
    },
    endMessage(ev) {
      this.staffMsg = false;
      this.clearMessage();
      switch (ev) {
        case "introduced":
          //          console.log("endMessage");
          if (this.all_introduced()) {
            this.buildMessage(
              this.$t("DrillPlatform.yourBoss"),
              this.$t("DrillPlatform.allIntroduced"),
              "end_introduction",
              -3
            );
            this.blocking = true;
            this.currentMessage = 1;
          }
          break;
        case "end_introduction":
          this.blocking = false;
          this.$emit("Submit-Intro", this.data);
          break;
        case "members_msg_read":
          this.currentMember.readMsg = 1;
          break;
      }
    },
    introduce(m) {
      if (m.state == "blink" || m.state == "normal") {
        this.myMessage = [];
        this.msgCount = 0;
        this.buildMessage(
          m.staffExp,
          this.paramdata.staff_det.staff[m.staffName].staffSelfIntroduction,
          "introduced",
          m.staffName
        );
        this.currentMessage = 1;
        this.msgCount = 1;
        if (!m.introduced) {
          m.introduced = 1;
        }
      }
    },
    all_introduced() {
      let done = true;
      let c = 0;
      for (c = 1; c <= this.data.content.control.maxMembers; c++) {
        //        console.log(c, this.data.content.control.maxMembers)
        //        if (this.data.content.members[c]){
        this.data.content.members[c].state = "normal";
        if (
          this.data.content.members[c].staffName &&
          !this.data.content.members[c].introduced
        ) {
          done = false;
        }
        //         c++
      }
      this.showStatus = done;
      return done;
      //      }
    },
    checkStaff(ev) {
      if (ev.staffName) {
        this.showStaffOnly = true;
        this.currentMember = ev;
        this.showingStaff = true;
        //        console.log(this.showStaffOnly, ev.staffName);
      }
    },
    showStaff(ev) {
      if (ev.staffName) {
        if (ev.state == "blink" || ev.state == "normal") {
          this.currentMember = ev;
          this.showingStaff = true;
          if (!ev.introduced || this.data.action == "INTRODUCTION") {
            this.introduce(ev);
          }
          if (this.data.action == "SELECT_STYLE") {
            this.currentStyle = ev.style;
          }
        }
      }
    },
    selectStyle(member) {
      if (
        this.data.action == "SELECT_STYLE" ||
        (this.data.action == "INTRODUCTION" && member.introduced > 0)
      ) {
        this.currentMember = member;
        this.currentStyle = member.style;
        this.styling = true;
      }
    },
    clickedStyle(ev) {
      this.currentStyle = ev;
    },
    confirmingStyle() {
      this.confirmStyle = true;
    },
    submitStyle(ev) {
      this.currentMember.style = ev;
      this.currentMember.styleExp = this.paramdata.style_det.style.find(
        (s) => s.name == ev
      ).displayKey;
      this.styling = false;
    },
    submitRecruit(rr) {
      let v = 0;
      if (rr) {
        this.actionOn = this.paramdata.action_det.action.find(
          (a) => a.actionType == "recruits"
        );
        if (this.actionOn) {
          this.applyAll = this.actionOn.applyAll;
          this.action = this.actionOn.actionName;
          this.actionExp = this.actionOn.displayKey;
          this.selectedRecruitExp = rr.staffExp;
          this.currentMember.actioned = 1;
          this.currentMember.action = this.action;
          for (let c = 1; c <= this.data.content.control.maxMembers; c++) {
            if (this.data.content.members[c].staffNumber) {
              this.data.content.members[c].actioned = 0;
              this.data.content.members[c].action = "";
              this.data.content.members[c].actionExp = "";
              this.data.content.members[c].offdays = 0;
              this.checkMaxActionMember();
              this.checkMinMember(this.data.content.members[c]);
            }
          }
          // this.taskExp = rr.taskExp
          // this.task = this.paramdata.task_ref.task[this.taskExp]
          // let rr = this.data.content.recruits.find(
          //   (r) => r.staffExp == this.selectedRecruitExp
          // );
          this.selectedRecruit = rr.staffName;
          rr.actioned = 1;
          rr.action = this.action;
          rr.actionExp = this.actionExp;
          rr.offdays = 0;
          //        rr.offdays = ar.duration
          if (this.taskExp) v = 1;
          this.recruiting = false;
          this.actionMessage(this.action);
          this.confirmAction = true;
        }
      }
      return v;
    },
    submitAction(ev) {
      const ar = this.paramdata.action_det.action.find(
        (a) => a.displayKey === this.actionExp
      );
      this.confirmAction = false;
      let s = 0;
      if (this.actionOn == "members") {
        this.task =
          ar.withTask > 0 ? this.paramdata.task_ref.task[this.taskExp] : "None";
        s = this.selectedMembers(
          this.data.content.members,
          ar,
          this.data.content.control.maxMembers
        );
      } else {
        s = this.selectedRecruits(
          this.data.content.recruits,
          ar,
          this.data.content.control.maxRecruits
        );
      }
      //      this.task = this.paramdata.task_ref.task[this.taskExp];
      if (
        ((s >= ar.minStaff && s <= ar.maxStaff) || ar.applyAll > 0) &&
        (ar.withTask === 0 || this.task)
      ) {
        this.clearMessage();
        //        this.data.content[ar.actionType] = {...this.data.content.members}
        this.data.content.control.task = this.task;
        this.data.content.control.taskExp = this.taskExp;
        //       this.data.content.control.action = this.action
        this.data.content.control.action = this.paramdata.action_ref.action[
          this.actionExp
        ];
        this.data.content.control.actionExp = this.actionExp;
        this.$emit("Submit-Action", this.data);
        this.actionExp = "";
        this.action = "";
        this.clicked1to1 = 0;
        this.clearActMessage();
        //        this.$emit('Submit-Action', this.data)
      } else {
        this.alertMessage(this.$t("general.incomplete"));
      }
    },
    selectedMembers(m, ar, x) {
      let c = 1;
      let v = 0;
      for (c = 1; c <= x; c++) {
        if (m[c].staffName) {
          if (m[c].actioned || ar.applyAll > 0) {
            v++;
            if (!m[c].action) {
              m[c].action = this.action;
              m[c].actionExp = this.actionExp;
            }
            m[c].offdays = 0;
            //              m[c].offdays = ar.duration
          } else {
            m[c].action = "";
            m[c].actionExp = "";
          }
        }
      }
      return v;
    },
    selectedRecruits(m, ar) {
      let v = 0;
      if (this.selectedRecruitExp) {
        let rr = this.data.content.recruits.find(
          (r) => r.staffExp == this.selectedRecruitExp
        );
        this.selectedRecruit = rr.staffName;
        rr.actioned = 1;
        rr.action = this.action;
        rr.actionExp = this.actionExp;
        rr.offdays = 0;
        //        rr.offdays = ar.duration
        if (this.taskExp) v = 1;
      }
      return v;
    },
    selectedAction(ev) {
      this.action = this.paramdata.base_ref.actions[ev];
      let act = this.paramdata.action_det.action.find(
        (a) => a.actionName == this.action
      );
      if (
        this.data.content.used.actions[act.actionName] &&
        act.useLimit <= this.data.content.used.actions[act.actionName]
      ) {
        this.action = "";
        this.actionExp = "";
        act = "";
        return;
      }
      // if focused staff is not in list
      if (act.focusedStaff > 0 && this.whereStaff(act.focusedStaff) == 0) {
        this.action = "";
        this.actionExp = "";
        act = "";
        return;
      }
      if (act.perWeek > 0) {
        // console.log(this.data.content.week)
        // console.log(this.data.content.day[this.data.dayNumber].week)
        if (
          this.data.content.week[
            this.data.content.day[this.data.dayNumber].week
          ][this.action]
        ) {
          this.alertMessage(this.$t("DrillPlatform.exceedQuota"));
          this.actionExp = "";
          this.clicked1to1 = 0;
          this.clearActMessage();
          return false;
        }
      }
      // if action for the whole team
      this.applyAll =
        this.paramdata.action_det.action.find(
          (a) => a.actionName == this.action
        ).applyAll > 0
          ? true
          : false;
      if (this.applyAll) {
        if (this.paramdata.action_lst.subAction[this.action]) {
          this.subAction = this.paramdata.action_det.subAction[this.action];
          for (let c = 1; c <= this.data.content.control.maxMembers; c++) {
            if (this.data.content.members[c].away > 0 && !act.anyTime) {
              this.data.content.members[c].offdays = 1;
            }
          }
          this.subActionMember = ev;
          this.showSubAction = true;
          this.showingStaff = true;
        }
      }
      for (let c = 1; c <= this.data.content.control.maxMembers; c++) {
        if (this.applyAll) {
          if (this.data.content.members[c].away < 1 || act.anyTime > 0) {
            this.data.content.members[c].actioned = 1;
            this.data.content.members[c].action = this.action;
            this.data.content.members[c].actionExp = ev;
            this.data.content.members[c].offdays = 0;
          } else {
            this.data.content.members[c].offdays = 1;
          }
        } else {
          //          console.log("anyTime", act.anyTime);
          this.data.content.members[c].actioned = 0;
          this.data.content.members[c].action = "";
          this.data.content.members[c].actionExp = "";
          if (this.data.content.members[c].away < 1 || act.anyTime > 0) {
            this.data.content.members[c].offdays = 0;
          } else {
            this.data.content.members[c].offdays = 1;
          }
          this.checkMaxActionMember();
          this.checkMinMember(this.data.content.members[c]);
        }
      }
      this.actionOn = this.paramdata.action_det.action.find(
        (a) => a.actionName == this.action
      ).actionType;
      if (this.actionOn == "recruits") {
        this.recruitList = [];
        this.recruitRef = [];
        let r = 0;
        this.clicked1to1 = 0;
        this.clearActioned();
        while (r < 10) {
          if (this.data.content.recruits[r]) {
            if (this.data.content.recruits[r].staffName) {
              this.recruitList.push(this.data.content.recruits[r].staffExp);
              this.data.content.recruits[r].actioned = 0;
            }
          }
          r++;
        }
      } else if (this.clicked1to1 > 0 && this.actionOn != "recruits") {
        //        this.data.content.members[this.clicked1to1].actioned = 1
        this.memberCardClicked(this.memberRecord(this.clicked1to1));
      }
      this.actionMessage(this.action);
      // set all members actioned if action apply to all
      if (act.managementAction == 1) {
        this.confirmAction = true;
      }
      if (act.focusedStaff > 0) {
        this.memberCardClicked(
          this.data.content.members[this.whereStaff(act.focusedStaff)]
        );
      }
    },
    actionMessage(ev) {
      let act = this.paramdata.action_det.action.find(
        (a) => a.actionName == ev
      );
      this.actionInfo = act;
      let msg =
        this.$t(act.displayKey + "_e") +
        " " +
        this.$t("DrillPlatform.duration") +
        act.duration +
        ", " +
        this.$t("DrillPlatform.members");
      if (act.applyAll > 0 && this.selectedRecruit < 1) {
        msg = msg + this.$t("DrillPlatform.allStaff");
      } else {
        msg = msg + act.minStaff;
        if (act.minStaff !== act.maxStaff) {
          msg = msg + " - " + act.maxStaff;
        }
      }
      this.actMsg.title = this.$t(act.displayKey + "_title");
      this.actMsg.head = this.$t(
        this.paramdata.action_exp.action[act.actionName]
      );
      this.actMsg.text = msg;
      // this.myMessage = []
      // this.msgCount = 0
      // this.currentMessage = 0
      // this.buildMessage(this.paramdata.action_exp.action[act.actionName], msg)
      // this.currentMessage = 1
      // this.msgCount = 1
      //      console.log(this.actMsg);
    },
    clearActMessage() {
      this.actMsg.head = "";
      this.actMsg.text = "";
    },
    memberClicked(ev) {
      if (this.applyAll) {
        return;
      }
      // check minimum member size
      if (this.action) {
        if (ev.actioned) {
          ev.actioned = 0;
          for (let c = 1; c <= this.data.content.control.maxMembers; c++) {
            if (this.data.content.members[c]["task"] == ev.task) {
              this.data.content.members[c]["offdays"] = 0;
            }
          }
        } else {
          //         if (v>ac.minMemberSize){
          ev.actioned = 1;
          if (this.paramdata.action_lst.subAction[this.action]) {
            this.subAction = this.paramdata.action_det.subAction[this.action];
            this.subActionMember = ev;
            this.showSubAction = true;
          }
          this.checkMinMember(ev);
          //        }
        }
        this.checkMaxActionMember();
        this.$emit("Refresh-Action", this.data.content.members);
        this.showStaff(ev);
        // remove own task for evaluation action
        this.subAction = this.checkEvaluateSubAction(
          this.subAction,
          this.currentMember
        );
      }
    },
    checkEvaluateSubAction(v, s) {
      let c = [];
      v.forEach((e) => {
        //     console.log(e.parentAction+'-'+s.task, e.actionName, e.parentAction+'-'+s.task == e.actionName)
        if (e.parentAction + "-" + s.task != e.actionName) {
          c.push(e);
        }
      });
      return c;
    },
    checkMinMember(ev) {
      let ac = this.paramdata.action_det.action.find(
        (a) => a.actionName == this.action
      );
      let v = 0;
      for (let c = 1; c <= this.data.content.control.maxMembers; c++) {
        if (
          this.data.content.members[c]["task"] == ev.task &&
          !this.data.content.members[c]["actioned"] &&
          this.data.content.members[c].away == 0
        ) {
          v++;
        }
      }
      //      console.log(ac.actionName, v, ac.minMemberSize)
      if (v <= ac.minMemberSize) {
        // set other member of the same task off
        for (let c = 1; c <= this.data.content.control.maxMembers; c++) {
          if (
            ac.actionType != "members" &&
            this.data.content.members[c]["staffName"]
          ) {
            this.data.content.members[c]["offdays"] = 1;
          } else if (
            this.data.content.members[c]["task"] == ev.task &&
            !this.data.content.members[c]["actioned"]
          ) {
            this.data.content.members[c]["offdays"] = 1;
          }
        }
      }
    },
    checkMaxActionMember() {
      let ac = this.paramdata.action_det.action.find(
        (a) => a.actionName == this.action
      );
      let v = 0;
      for (let c = 1; c <= this.data.content.control.maxMembers; c++) {
        if (this.data.content.members[c]["actioned"]) {
          v++;
        }
        //        console.log(c, v, this.data.content.members[c]['dayoffs']==0, this.data.content.members[c]['staffName'], this.data.content.members[c]['actioned'])
      }
      //      console.log(v, ac.maxStaff)
      if (v >= ac.maxStaff) {
        for (let c = 1; c <= this.data.content.control.maxMembers; c++) {
          if (
            !this.data.content.members[c]["dayoffs"] &&
            !this.data.content.members[c]["actioned"]
          ) {
            this.data.content.members[c]["offdays"] = 1;
          }
        }
      } else {
        for (let c = 1; c <= this.data.content.control.maxMembers; c++) {
          if (
            !this.data.content.members[c]["actioned"] &&
            this.data.content.members[c]["away"] < 1
          ) {
            this.data.content.members[c]["offdays"] = 0;
          }
          this.checkMinMember(this.data.content.members[c]);
        }
      }
    },
    submitSubAction(ev) {
      if (this.applyAll) {
        for (let c = 1; c <= this.data.content.control.maxMembers; c++) {
          if (this.data.content.members[c].staffName) {
            this.data.content.members[c].actionExp = ev;
            this.data.content.members[
              c
            ].action = this.paramdata.action_ref.action[ev];
          }
        }
        this.actionMessage(this.paramdata.action_ref.action[ev]);
      } else {
        this.subActionMember.actionExp = ev;
        this.subActionMember.action = this.paramdata.action_ref.action[ev];
        //        this.actionMessage(this.subActionMember.action);
      }
      this.subAction = [];
      this.showSubAction = false;
      this.confirmAction = true;
    },
    closeSubAction() {
      this.subAction = [];
      this.clearActMessage();
      this.showSubAction = false;
      if (this.applyAll) {
        for (let c = 1; c <= this.data.content.control.maxMembers; c++) {
          this.data.content.members[c].actioned = 0;
          this.data.content.members[c].action = "";
          this.data.content.members[c].actionExp = "";
          this.data.content.members[c].offdays = 0;
          this.action = "";
          this.actionExp = "";
          this.clicked1to1 = 0;
        }
        this.applyAll = false;
      } else {
        if (this.showSubAction) {
          this.subActionMember.actionExp = "";
          this.subActionMember.action = "";
          this.subActionMember.actioned = 0;
        } else {
          //          console.log('currentMember', this.currentMember)
          this.currentMember.actionExp = "";
          this.currentMember.action = "";
          this.currentMember.actioned = 0;
        }
        if (this.findAction(this.action).focusedStaff > 0) {
          this.action = "";
          this.actionExp = "";
          this.clicked1to1 = 0;
        } else {
          //        this.checkMinMember(this.subActionMember)
          this.checkMaxActionMember();
          this.actionMessage(this.action);
        }
      }
    },
    closeAction() {
      this.action = "";
      this.actionExp = "";
      this.clicked1to1 = 0;
      this.actionOn = "";
      this.selectedRecruit = 0;
      this.selectedRecruitExp = "";
      this.confirmAction = false;
      this.clearActioned();
      this.clearOffDays();
      this.clearActMessage();
      for (let c = 1; c <= this.data.content.control.maxMembers; c++) {
        if (this.data.content.members[c].staffName) {
          this.data.content.members[c].actionExp = "";
        }
      }
    },
    findAction(v) {
      let z = "";
      for (let c = 0; c < this.paramdata.action_det.action.length; c++) {
        if (this.paramdata.action_det.action[c].actionName == v) {
          z = this.paramdata.action_det.action[c];
        }
      }
      return z;
    },
    memberMsg(m) {
      this.myMessage = [];
      this.msgCount = 0;
      this.currentMessage = 0;
      this.currentMember = m;
      for (let c = 1; c <= m.msgCount; c++) {
        this.buildMessage(
          m.staffExp,
          m.message[c],
          "members_msg_read",

          m.staffName
        );
      }
      this.currentMessage = 1;
      this.msgCount = m.msgCount;
      this.blocking = false;
      if (this.currentMessage === this.msgCount) {
        this.currentMember.readMsg = 1;
      }
      this.staffMsg = true;
    },
    showOrders(ev) {
      return;
      if (this.signedinuser.instructor < 1) {
        return;
      }
      this.orderTask = ev;
      let odn = 1;
      this.ordersWait = [];
      this.ordersProcess = [];
      const order = Object.entries(this.data.content.orders);
      const staff = Object.entries(this.data.content.staffs);
      order.forEach((o) => {
        o[1].orderNumber = odn++;
        if (
          o[1].state == ev.stage - 1 &&
          (o[1].workNeeded == 0 || o[1].state == 0)
        ) {
          this.ordersWait.push(o[1]);
        }
        if (o[1].state == ev.stage && o[1].workNeeded > 0) {
          // o[1].staffExp = staff.find(
          //   (s) => s[1].staffName == o[1].assignedTo
          // )[1].staffExp;
          o[1].staffExp = this.paramdata.staff_det.staff[
            o[1].assignedTo
          ].staffName;
          this.ordersProcess.push(o[1]);
        }
      });
      this.taskEff = this.paramdata.task_eff[
        this.paramdata.product_ref.product[this.data.content.productExp]
      ][ev.taskName];
      this.taskEff.instructor = this.signedinuser.instructor;
      //      console.log(this.taskEff)
      this.showOrderStat = true;
    },
    showCompleted() {
      let odn = 1;
      this.ordersDone = [];
      this.doneStaff = [];
      this.doneTask = [];
      const order = Object.entries(this.data.content.orders);
      const staff = Object.entries(this.data.content.staffs);
      //      const tasks = Object.entries(this.paramdata.task_det.task);
      const tasks = Object.entries(this.data.content.task_eff);
      order.forEach((o) => {
        o[1].orderNumber = odn++;
        if (o[1].state == 5 && o[1].workNeeded == 0) {
          //          o[1].staffExp = staff.find(s=>s[1].staffName==o[1].assignedTo)[1].staffExp
          this.ordersDone.push(o[1]);
        }
      });
      staff.forEach((s) => {
        this.doneStaff.push(s[1]);
      });
      tasks.forEach((s) => {
        this.doneTask.push(s[1]);
      });
      this.showOrderDone = true;
    },
    memberCardClicked(ev) {
      if (this.flashAdded) {
        this.$emit("End-Flash");
        return;
      }
      this.msgCount = 0;
      if (this.data.action == "INTRODUCTION") {
        this.introduce(ev);
        this.showStaff(ev);
      }
      if (this.data.action == "SELECT_STYLE") {
        this.styling = true;
        this.showStaff(ev);
      }
      if (this.data.action == "MORE_ACTIONS") {
        if (
          ev.offdays < 1 &&
          ev.staffName &&
          this.actionExp &&
          this.actionOn == "members"
        ) {
          this.memberClicked(ev);
        } else if (
          ev.offdays < 1 &&
          ev.staffName &&
          ev.away < 1 &&
          this.actionOn != "recruits"
        ) {
          if (!this.action) {
            return;
          }
          for (let c = 1; c <= this.data.content.control.maxMembers; c++) {
            this.data.content.members[c].actioned = 0;
          }
          this.clicked1to1 = ev.staffName;
          ev.actioned = 1;
          this.$emit("Refresh-Action", this.data.content.members);
        } else if (ev.offdays > 0 && ev.staffName) {
          //          if  {
          return;
        } else {
          if (this.action == 'swap-task' && ev.staffName < 1){
            this.memberClicked(ev)
          }
          // for (let c = 1; c <= this.data.content.control.maxMembers; c++) {
          //   if (this.data.content.members[c].staffName) {
          //     this.data.content.members[c].actioned = 0;
          //   }
          // }
        }
        if (!ev.staffName) {
          if (this.action != "recruit") {
            return;
          }
          if (ev.away < 1) {
            this.currentMember = ev;
            ev.actioned = 1;
            this.recruiting = true;
            this.task = ev.task;
            this.taskExp = ev.taskExp;
          } else {
            this.alertMessage(this.$t("DrillPlatform.noApplicant"));
          }
        }
      }
    },
    showStyleDesc(ev) {
      if (ev) {
        this.clearMessage();
        this.buildMessage(
          this.$t(ev),
          this.paramdata.style_des.style[ev],
          null,
          -1
        );
        this.blocking = false;
        this.currentMessage = 1;
      }
    },
    allStyle() {
      let v = true;
      for (let c = 1; c <= this.data.content.control.maxMembers; c++) {
        if (
          this.data.content.members[c].staffName &&
          !this.data.content.members[c].style
        ) {
          v = false;
        }
      }
      return v;
    },
    avgValue(m) {
      return Math.round(
        (m.skillsValue * 1 + m.moraleValue * 1 + m.efficiencyValue * 1) / 3
      );
    },
    memberActioned() {
      let v = 0;
      for (let c = 1; c <= this.data.content.control.maxMembers; c++) {
        if (this.data.content.members[c].actioned > 0) {
          v++;
        }
      }
      return v;
    },
    profileProgress(ev) {
      this.currentMember = ev;
      this.showProfile = true;
    },
    profileChanged() {
      let v = 0;
      for (let c = 1; c <= this.data.content.control.maxMembers; c++) {
        if (this.data.content.members[c].addedAvg) {
          v++;
        }
      }
      return v;
    },
    memberRecord(ev) {
      for (let c = 1; c <= this.data.content.control.maxMembers; c++) {
        if (this.data.content.members[c].staffName == ev) {
          return this.data.content.members[c];
        }
      }
    },
    clearActioned() {
      for (let c = 1; c <= this.data.content.control.maxMembers; c++) {
        this.data.content.members[c].actioned = 0;
      }
    },
    clearOffDays() {
      for (let c = 1; c <= this.data.content.control.maxMembers; c++) {
        this.data.content.members[c].offdays = 0;
      }
    },
    closeShowStaff(ev) {
      this.showingStaff = false;
      if (!this.showStaffOnly) {
        this.clearMessage();
        if (this.data.action == "INTRODUCTION") {
          this.endMessage("introduced");
        }
        if (this.data.action == "SELECT_STYLE") {
          this.submitStyle(this.currentStyle);
          this.currentStyle = "";
        }
        if (this.data.action == "MORE_ACTIONS") {
          //        console.log("act", ev);
          if (ev) {
            this.submitSubAction(ev);
          } else {
            this.closeSubAction();
          }
        }
      }
      this.showStaffOnly = false;
    },
    alertMessage(ev) {
      this.buildMessage(this.$t("DrillPlatform.notice"), ev, null, -1);
      this.blocking = true;
      this.currentMessage = 1;
    },
    actionMembers(ev) {
      var s = [];
      var m = Object.entries(ev);
      m.forEach((e) => {
        if (e[1].actioned == 1) {
          s.push(e[1]);
        }
      });
      //      console.log(s)
      return s;
    },
    actionFilter(v) {
      var c = [];
      v.forEach((act) => {
        if (act.actionName == act.parentAction && act.show > 0) {
          c.push(act);
        }
      });
      return c;
    },
    action1To1(v) {
      var c = [];
      v.forEach((act) => {
        if (
          act.actionName == act.parentAction &&
          act.show > 0 &&
          act.maxStaff == 1 &&
          act.applyAll == 0
        ) {
          c.push(act);
        }
      });
      return c;
    },
    actionManagement(v) {
      var c = [];
      v.forEach((act) => {
        if (
          act.actionName == act.parentAction &&
          act.show > 0 &&
          act.maxStaff < 1
        ) {
          c.push(act);
        }
      });
      return c;
    },
    dbg(ev) {
      console.log(ev);
    },
    drillChat() {
      this.chat = this.chat ? false : true;
    },
    whereStaff(v) {
      let z = 0;
      for (let c = 1; c <= this.data.content.control.maxMembers; c++) {
        if (this.data.content.members[c].staffName == v) {
          z = c;
          break;
        }
      }
      return z;
    },
  },
  created() {
    //    console.log("h:", screen.height, "w:", screen.width);
    this.screenHeight = screen.height;
  },
  mounted() {
    //       this.clearMessage()
  },
};
</script>

<style></style>
