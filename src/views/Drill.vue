<template>
  <v-container class="pa-0">
    <div v-if="(w < 1280 || h < 800) && ScreenNotChecked">
      <ScreenCheck
        :mod="w < 1280 || h < 800"
        :checkStatus="ScreenNotChecked"
        @checked="ScreenNotChecked = false"
      />
    </div>
    <div v-else>
      <v-container v-if="!ready">
        <DrillGetReady />
      </v-container>
      <v-container v-if="ready">
        <div v-if="paramData">
          <div v-if="!paramData.control.currentDrill && !metTheBoss">
            <DrillMeetBoss_1
              v-if="meetBossStep == 1"
              @meetNext="meetBossStep++"
            />
            <DrillMeetBoss_2
              v-if="meetBossStep == 2"
              :company="paramData.user.companyName"
              @meetTeam="metTheBoss = true"
            />
          </div>
          <div v-if="paramData.control.currentDrill || metTheBoss">
            <DrillList
              :data="paramData"
              :ctl="paramData.control"
              :user="paramData.user"
              v-if="drillStatus === 'LISTING' && ready"
              @Drill-Clicked="selectDrill($event)"
              @Drill-Reset="drillReset($event)"
              @Update-Name="updateName($event)"
            />
            <DrillReady
              :data="selectedDrill"
              v-if="drillStatus === 'GET_READY'"
              @Not-Ready="notReady()"
              @Proceed-Drill="proceedDrill($event)"
            />
            <DrillPlatform
              :data="drillRecord"
              :eTime="rTime"
              :flashAdded="flashAdded"
              :parentMsgCount="msgCount"
              :currentDrill="selectedDrill.seq"
              :showStaffBox="showStaffBox"
              :drillUser="drillUserName"
              v-if="drillStatus === 'IN_PROGRESS'"
              @Submit-Intro="submitIntroduction($event)"
              @Submit-Style="submitStyle($event)"
              @Submit-Action="submitAction($event)"
              @Refresh-Action="refreshAction($event)"
              @End-Drill="endDrill()"
              @End-Flash="clearMemberAdded()"
            />
            <DrillMessage
              :myMessage="myMessage"
              :currentMessage="currentMessage"
              :mCount="msgCount"
              :pic="pic"
              v-if="msgCount > 0 && !flashAdded"
              @End-Message="endMessage($event)"
              @Next-Message="nextMessage()"
            />
            <DrillEnd v-if="drillEndPage" :rTime="rTime" />
          </div>
        </div>
        <div v-else>
          <div v-if="drillResetPage">
            <DrillReset v-if="drillStatus === 'RESET' || drillResetPage" />
          </div>
          <div v-else>
            <v-row class="text-center align-center">
              <v-col>
                <h3>
                  {{ $t("Drill.notActive") }}
                </h3>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-container>
    </div>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import pako from "pako";

import DrillList from "../components/CoreModule/DrillList";
import DrillReady from "../components/CoreModule/DrillReady";
import DrillPlatform from "../components/CoreModule/DrillPlatform";
import DrillMessage from "../components/CoreModule/DrillMessage";
import DrillEnd from "../components/CoreModule/DrillEnd";
import DrillReset from "../components/CoreModule/DrillReset";
import DrillGetReady from "../components/CoreModule/DrillGetReady";
import DrillMeetBoss_1 from "../components/CoreModule/DrillMeetBoss_1.vue";
import DrillMeetBoss_2 from "../components/CoreModule/DrillMeetBoss_2.vue";
import ScreenCheck from "../components/ScreenCheck";
export default {
  name: "Drill",
  components: {
    DrillList,
    DrillReady,
    DrillPlatform,
    DrillMessage,
    DrillEnd,
    DrillReset,
    DrillGetReady,
    DrillMeetBoss_1,
    DrillMeetBoss_2,
    ScreenCheck,
  },
  data() {
    return {
      fetchbuffer: {
        restkey: "",
        mod: "",
        limit: 0,
        qdata: {},
        method: "POST",
      },
      w: 0,
      h: 0,
      ScreenNotChecked: true,
      paramData: [],
      //      baseParam: [],
      ready: false,
      drillStatus: "",
      selectedDrill: {},
      drillRecord: [],
      msgCount: 0,
      currentMessage: 0,
      myMessage: [],
      imsg: {},
      drillEndPage: false,
      drillSumData: [],
      rTime: "",
      flashAdded: false,
      flashTime: {},
      timer: false,
      drillResetPage: false,
      meetBossStep: 1,
      metTheBoss: false,
      showStaffBox: false,
      pic: "",
      drillUserName: "",
    };
  },
  computed: {
    ...mapState({
      signedinuser: "signedinuser",
      baseParam: "paramdata",
    }),
  },
  methods: {
    async GetInfo(mod, qry, verb, qstr, zip) {
      let qryStr = qstr ? qstr : "/backend/baseinfo/";
      this.fetchbuffer.restkey = this.signedinuser.restkey;
      this.fetchbuffer.classes = this.signedinuser.classes;
      this.fetchbuffer.mod = mod;
      this.fetchbuffer.limit = this.limit;
      this.fetchbuffer.method = verb ? verb : "POST";
      if (qry) {
        qryStr = qryStr + "?" + qry;
      }
      var fbuf = JSON.stringify(this.fetchbuffer);
      if (zip) {
        fbuf = pako.gzip(fbuf);
      }
      const res = await fetch(qryStr, {
        method: "POST",
        cache: "no-cache",
        headers: {
          "content-type": "application/json",
        },
        body: fbuf,
      });
      if (res.status === 200) {
        const Data = await res.json();
        return await Data;
      }
    },
    async GetParam() {
      this.paramData = await this.GetInfo(
        "",
        "",
        "POST",
        "/backend/drill/?" + this.signedinuser.userId,
        false
      );
      // console.log('parameter', this.paramData)
      this.drillUserName = this.paramData.user.userName;
    },
    async selectDrill(ev) {
      this.selectedDrill = ev;
      // this.paramData = await this.GetInfo("", "", "POST", "/backend/basicinformation/")
      // this.$store.commit('setParamdata', await this.paramData)
      if (ev.drillStatus > 100) {
        await this.proceedDrill(ev);
      } else {
        this.drillStatus = "GET_READY";
      }
    },
    notReady() {
      this.drillStatus = "LISTING";
      this.selectedDrill = {};
    },
    async proceedDrill(ev) {
      this.fetchbuffer.qdata = ev;
      this.drillRecord = await this.GetInfo(
        "INIT",
        "",
        "PUT",
        "/backend/drill/",
        false
      );
      this.$store.commit("setDrilldata", await this.drillRecord);
      console.log("dillRec", this.drillRecord);
      this.checkMessage(this.drillRecord);
      this.drillStatus = "IN_PROGRESS";
      this.drillEndPage = true;
      this.seteTime(this.drillRecord);
      this.drillRecord.content.analysis.reportUser = this.drillUserName;
      // this.setRTime(
      //   this.drillRecord.content.control.expireOn,
      //   this.drillRecord.timeNow
      // );
    },
    async submitIntroduction(ev) {
      // console.log("submit", ev);
      ev.content = JSON.stringify(ev.content);
      this.fetchbuffer.qdata = ev;
      this.drillRecord = await this.GetInfo(
        "ACTION",
        "",
        "PUT",
        "/backend/drill/",
        true
      );
      this.$store.commit("setDrilldata", await this.drillRecord);
      if (this.drillRecord.content.control.eTime == "0:00") {
        if (this.timer) {
          clearInterval(this.timer);
        }
        this.rTime = "0:00";
      }
      this.checkMessage(this.drillRecord);
      this.flashMemberAdded();
      // this.setRTime(
      //   this.drillRecord.content.control.expireOn,
      //   this.drillRecord.timeNow
      // );
    },
    async submitStyle(ev) {
      if (this.all_styled(ev)) {
        await this.submitIntroduction(ev);
      } else {
        alert(this.$t("general.incomplete"));
      }
    },
    async submitEnvironment() {
      let ev = this.drillRecord;
      // console.log("submit", ev);
      ev.content = JSON.stringify(ev.content);
      this.fetchbuffer.qdata = ev;
      this.drillRecord = await this.GetInfo(
        "ENVIRONMENT",
        "",
        "PUT",
        "/backend/drill/",
        true
      );
      this.$store.commit("setDrilldata", await this.drillRecord);
      this.checkMessage(this.drillRecord);
      this.flashMemberAdded();
      // this.setRTime(
      //   this.drillRecord.content.control.expireOn,
      //   this.drillRecord.timeNow
      // );
    },
    async submitAction(ev) {
      await this.submitIntroduction(ev);
    },
    endDrill() {
      this.drillStatus = "";
      // if (this.signedinuser.instructor==0 && this.drillRecord.content.control.status<600){
      //   // this.$emit('signed-off')
      //   document.getElementById('signingoff').click()
      // }
      document.getElementById("entryPage").click();
    },
    all_styled(ev) {
      let done = true;
      let c = 1;
      while (c <= ev.content.control.maxMembers && ev.content.members[c]) {
        if (ev.content.members[c].staffName && !ev.content.members[c].style) {
          done = false;
        }
        c++;
      }
      return done;
    },
    refreshAction(ev) {
      //      console.log(ev)
      this.drillRecord.content.members = { ...ev };
    },
    checkMessage(ev) {
      this.pic = require("../assets/blank.jpg");
      this.msgCount = 0;
      // show welcome messages
      let msg = "";
      if (ev.action === "COMPLETED") {
        // show ending message
        this.buildMessage(
          this.$t("DrillPlatform.notice"),
          this.$t("DrillPlatform.drillCompleted") +
            "<br> " +
            this.teamStatus(ev) +
            "<br>" +
            this.teamValue(ev),
          null,
          -3
        );
        this.pic = require("../assets/success.jpg");
        this.playSound(1);
        ev.content.celebrate = 0
      } else if (ev.action === "TIME_OUT") {
        // show ending message
        this.buildMessage(
          this.$t("DrillPlatform.notice"),
          this.$t("DrillPlatform.drillTimeout") +
            "<br> " +
            this.teamStatus(ev) +
            "<br>" +
            this.teamValue(ev),
          null,
          -1
        );
        this.pic = require("../assets/warning.jpg");
        this.playSound(4);
      } else if (ev.action === "FAILED") {
        if (ev.content.control.status == 700) {
          // show ending message
          this.buildMessage(
            this.$t("DrillPlatform.notice"),
            this.$t("DrillPlatform.drillFailed") +
              "<br> " +
              this.teamStatus(ev) +
              "<br>" +
              this.teamValue(ev),
            null,
            -1
          );
          this.pic = require("../assets/failure.jpg");
          this.playSound(2);
        } else if (ev.content.control.status == 750) {
          this.buildMessage(
            this.$t("DrillPlatform.notice"),
            this.$t("DrillPlatform.drillTeamFailed") +
              "<br> " +
              this.teamStatus(ev) +
              "<br>" +
              this.teamValue(ev),
            null,
            -1
          );
          this.pic = require("../assets/warning.jpg");
          this.playSound(4);
        }
      } else if (ev.action === "INTRODUCTION") {
        // this.buildMessage(
        //   this.$t("DrillPlatform.yourBoss"),
        //   this.$t("DrillPlatform.welcomeMessage")
        // );
        var tx =
          this.$t("DrillPlatform.ourProduct") +
          ev.content.productExp +
          this.$t("DrillPlatform.ourProduct1") +
          "<br /><br />" +
          // this.$t("DrillPlatform.orderValue") +
          // ev.content.orderValue +
          // "<br /><br />" +
          this.$t("DrillPlatform.departmentTarget") +
          // this.$t("DrillPlatform.orderTarget") +
          // ev.content.ordersToComplete +
          // this.$t("DrillPlatform.orderTargetUnit") +
          // " " +
          this.$t("DrillPlatform.valueTarget") +
          ev.content.valueToComplete
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, "$&,") +
          this.$t("DrillPlatform.valueDollar") +
          ", " +
          this.$t("DrillPlatform.valueUnit") +
          ev.content.orderValue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") +
          this.$t("DrillPlatform.valueDollar") +
          "<br /><br />" +
          this.$t("DrillPlatform.daysTarget") +
          this.$t("DrillPlatform.week") +
          ev.content.control.numberOfDays / 5 +
          this.$t("DrillPlatform.week1") +
          ", " +
          this.$t("DrillPlatform.total") +
          this.$t("DrillPlatform.day") +
          ev.content.control.numberOfDays +
          this.$t("DrillPlatform.day1") +
          "<br /><br />" +
          this.$t("DrillPlatform.timeTarget") +
          ev.content.control.timeLimit +
          this.$t("DrillPlatform.timeTarget1");
        this.buildMessage(this.$t("DrillPlatform.yourBoss"), tx, null, -3);
        this.buildMessage(
          this.$t("DrillPlatform.yourBoss"),
          this.$t("DrillPlatform.toIntroduce"),
          "startTime",
          -3
        );
      }
      if (ev.action === "MORE_ACTIONS" || ev.action === "SELECT_STYLE") {
        //        let evn = ev.content.day[ev.dayNumber]["event"];
        // show review  message
        if (ev.content.bossRev) {
          let stm = ev.content.bossRev;
          if (stm.count) {
            let c = 0;
            while (c < stm.count) {
              //              console.log(stm.count, c)
              if (stm.description && stm.description[c].length > 0) {
                console.log(
                  this.baseParam.bossmessage_ref.msg[stm.description[c]]
                );
                this.buildMessage(
                  this.$t("DrillPlatform.yourBoss"),
                  this.$t(
                    this.baseParam.bossmessage_ref.msg[stm.description[c]]
                  ),
                  null,
                  -4
                );
                stm.description[c] = "";
              }
              c++;
            }
          }
        }
        // show staff related message
        if (ev.content.staffMsg) {
          let stm = ev.content.staffMsg;
          if (stm.count) {
            let c = 0;
            if (c < stm.count) {
              //              console.log(stm.count, c)
              if (stm.description && stm.description[c].length > 0) {
                this.buildMessage(
                  this.$t("DrillPlatform.notice"),
                  stm.staffExp[c] + " " + stm.description[c],
                  null,
                  -1
                );
                stm.description[c] = "";
              }
              c++;
            }
          }
        }
        // show boss message
        if (ev.content.bossMsg) {
          let stm = ev.content.bossMsg;
          if (stm.count) {
            let c = 0;
            while (c < stm.count) {
              //              console.log(stm.count, c)
              if (stm.description && stm.description[c].length > 0) {
                this.buildMessage(
                  this.$t("DrillPlatform.yourBoss"),
                  this.$t(
                    this.baseParam.bossmessage_ref.msg[stm.description[c]]
                  ),
                  null,
                  -3
                );
                stm.description[c] = "";
              }
              c++;
            }
          }
        }
        // show environment message
        var evn = ev.content.day[ev.dayNumber]["event"];
        if (evn.count) {
          let c = 0;
          if (c < evn.count) {
            //              console.log(evn.count, c, ev.content.day[ev.dayNumber]['event'])
            if (evn.description && evn.description[c].length > 0) {
              this.buildMessage(
                this.$t("DrillPlatform.environment"),
                evn.staffExp[c] + this.$t(evn.description[c]),
                "end_environment",
                -2
              );
              evn.description[c] = "";
              evn.staffExp[c] = "";
            }
            c++;
          }
        }
        if (ev.content.newDeal) {
          this.playSound(3);
          ev.content.newDeal = 0;
        }
      }
      if (
        ev.action === "SELECT_STYLE" &&
        ev.content.day[ev.dayNumber]["event"].count == 0 &&
        ev.dayNumber > 1
      ) {
        this.buildMessage(
          this.$t("DrillPlatform.notice"),
          this.$t("DrillPlatform.styleReview"),
          null,
          -1
        );
      }
      if (this.msgCount) {
        if (this.drillRecord.content.celebrate){
          this.myMessage[this.msgCount].act = 'celebrateCheck';
        }
        this.currentMessage = 1;
      }
      console.log(this.myMessage)
    },
    buildMessage(from, text, act, who) {
      if (!act) {
        act = "";
      }
      if (!who) {
        who = "";
      }
      this.imsg.from = from;
      this.imsg.text = this.i18Msg(text);
      this.imsg.act = act;
      this.imsg.who = who;
      this.myMessage[++this.msgCount] = { ...this.imsg };
      //      this.msgCount++
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
    nextMessage() {
      this.currentMessage++;
      //      console.log(this.currentMessage);
    },
    async endMessage(ev) {
      this.clearMessage();
      switch (ev) {
        case "end_environment":
          // console.log("submit Environ");
          await this.submitEnvironment();
          break;
        case "startTime":
          this.drillRecord.content.control.countTime = true;
          this.showStaffBox = true;
          break;
        case 'celebrateCheck':
          if (this.drillRecord.content.celebrate){
            this.clearMessage()
            this.celebrate(this.drillRecord)
            this.drillRecord.content.celebrate = 0
          }
          break;
      }
    },
    celebrate(ev){
        // show ending message
        this.buildMessage(
          this.$t("DrillPlatform.notice"),
          this.$t("DrillPlatform.drillTargetMet") +
            "<br> " +
            this.teamStatus(ev) +
            "<br>" +
            this.teamValue(ev),
          null,
          -3
        );
        this.pic = require("../assets/success.jpg");
                this.currentMessage = 1;

        this.playSound(1);
    },
    clearMessage() {
      //      console.log("clear");
      this.msgCount = 0;
      this.currentMessage = 0;
      this.myMessage = [];
    },
    async readParam() {
      this.baseParam = await this.GetInfo(
        "",
        "",
        "POST",
        "/backend/basicinformation/",
        false
      );
      this.$store.commit("setParamdata", await this.baseParam);
      this.ready = true;
    },
    async initData() {
      this.ready = false;
      await this.GetParam();
      //      await this.readParam()
      // await setTimeout(this.readParam, 1000);
      this.ready = true;
      // console.log("ready", this.ready);
      this.drillStatus = "LISTING";
    },
    async drillReset(ev) {
      this.fetchbuffer.qdata = ev;
      this.drillStatus = "RESET";
      this.drillEndPage = false;
      this.paramData = false;
      this.drillResetPage = true;
      await this.GetInfo("RESET", "", "PUT", "/backend/drill/", false);
    },
    endTimer(eTime, dTime, callback) {
      if (eTime) {
        var countDownDate = new Date(eTime).getTime();
        var x = setInterval(function() {
          // Get today's date and time
          var now = new Date().getTime();
          var rt = "";

          // Find the distance between now and the count down date
          var distance = countDownDate - now - dTime;
          //          console.log("countdown", distance, countDownDate, now, dTime)

          // Time calculations for days, hours, minutes and seconds
          var days = Math.floor(distance / (1000 * 60 * 60 * 24));
          var hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((distance % (1000 * 60)) / 1000);
          hours = hours + days * 24;
          minutes = minutes + hours * 60;

          // Display the result in the element with id="demo"
          rt = minutes + ":" + ("00" + seconds).substr(-2);

          // If the count down is finished, write some text
          if (distance <= 0) {
            clearInterval(x);
            rt = "0:00";
          }
          callback(rt);
        }, 1000);
      } else {
        this.rTime = "";
      }
    },
    seteTime(ev) {
      //
      if (ev) {
        //        console.log('action', ev.action, 'ev.eTime', ev.eTime, 'ev.rTime', ev.rTime, 'control.eTime', ev.content.control.eTime);
        if (this.timer) {
          clearInterval(this.timer);
        }
        if (ev.content.control.eTime == "0:00") {
          this.rTime = "0:00";
        } else {
          if (ev.eTime) {
            ev.content.control.eTime = ev.eTime;
            this.rTime = ev.eTime;
            //          console.log("hey", ev.eTime)
            let my = this;
            this.timer = setInterval(function() {
              if (my.drillRecord.content.control.countTime) {
                let t = my.rTime.split(":");
                let m = t[0] * 1;
                let s = t[1] * 1 - 1;
                if (s < 0) {
                  s = 59;
                  m--;
                }
                if (m < 0) {
                  my.seteTimeOut();
                } else {
                  let ss = "0" + s;
                  my.rTime = m + ":" + ss.substring(ss.length - 2);
                  if (my.drillRecord.content.control) {
                    my.drillRecord.content.control.eTime = my.rTime;
                  }
                }
              }
            }, 1000);
          }
        }
      }
    },
    seteTimeOut() {
      this.drillRecord.content.control.eTime = "0:00";
      if (this.timer) {
        clearInterval(this.timer);
        this.timeOut();
      }
    },
    // setRTime(eTime, nTime) {
    //   if (
    //     this.drillRecord.action != "TIME_OUT" &&
    //     this.drillRecord.action != "COMPLETED" &&
    //     this.drillRecord.action != "FAILED"
    //   ) {
    //     var xt = this;
    //     if (!this.rTime || this.rTime == "0:00") {
    //       let now = new Date().getTime();
    //       let svrNow = new Date(nTime).getTime();
    //       let dTime = svrNow - now;
    //       this.endTimer(eTime, dTime, function(x) {
    //         xt.setT(x);
    //         if (x == "0:00") {
    //           xt.timeOut();
    //         }
    //       });
    //     }
    //   }
    // },
    // setT(x) {
    //   this.rTime = x;
    // },
    async timeOut() {
      // console.log("submit timeout", this.drillRecord);
      this.drillRecord.content = JSON.stringify(this.drillRecord.content);
      this.fetchbuffer.qdata = this.drillRecord;

      this.drillRecord = await this.GetInfo(
        "TIMEOUT",
        "",
        "PUT",
        "/backend/drill/",
        true
      );
      this.$store.commit("setDrilldata", await this.drillRecord);
      this.checkMessage(this.drillRecord);
    },
    flashMemberAdded() {
      if (
        (this.drillRecord.action == "SELECT_STYLE" ||
          this.drillRecord.action == "MORE_ACTIONS") &&
        this.profileChanged()
      ) {
        this.flashAdded = true;
        this.flashTime = setTimeout(this.clearMemberAdded, 3000);
      }
    },
    clearMemberAdded() {
      this.flashAdded = false;
      clearTimeout(this.flashTime);
    },
    profileChanged() {
      let v = 0;
      for (let c = 1; c <= this.drillRecord.content.control.maxMembers; c++) {
        if (
          this.drillRecord.content.members[c].addedAvg !== 0 ||
          this.drillRecord.content.members[c].touched
        ) {
          v++;
        }
      }
      return v;
    },
    playSound(v) {
      var c = "";
      switch (v) {
        case 1:
          c = require("../assets/success.wav");
          break;
        case 2:
          c = require("../assets/failure.wav");
          break;
        case 3:
          c = require("../assets/new-sales.mp3");
          break;
        case 4:
          c = require("../assets/warning.wav");
          break;
      }
      // console.log(v, c);
      if (c) {
        var audio = new Audio(c);
        audio.addEventListener("canplaythrough", () => {
          audio.play().catch((e) => {
            window.addEventListener(
              "click",
              () => {
                audio.play();
              },
              { once: true }
            );
          });
        });
      }
      //      console.log("playu sound");
    },
    teamStatus(ev) {
      return (
        this.$t("DrillPlatform.teamStatus") +
        this.$t("Staff.skillsProfile") +
        ":" +
        ev.content.current.teamAvg.skills +
        ", " +
        this.$t("Staff.moraleProfile") +
        ":" +
        ev.content.current.teamAvg.morale +
        ", " +
        this.$t("Staff.efficiencyProfile") +
        ":" +
        ev.content.current.teamAvg.efficiency
      );
    },
    teamValue(ev) {
      return (
        this.$t("DrillPlatform.teamValue") +
        (
          ev.content.orderValue * ev.content.orderStatus.ordersCompleted
        ).toFixed() +
        this.$t("DrillPlatform.valueDollar")
      );
    },
    async updateName(ev) {
      if (ev.userName) {
        this.fetchbuffer.qdata = ev;
        const NewData = await this.GetInfo(
          "UPDATENAME",
          "",
          "PUT",
          "/backend/drill/",
          false
        );
        ev.userName = NewData[0].userName;
        this.drillUserName = NewData[0].userName;
      } else {
        alert(this.$t("general.incomplete"));
      }
    },
  },
  async created() {
    await this.initData();
    this.w = screen.width;
    this.h = screen.height;
  },
  async mounted() {},
};
</script>

<style></style>
