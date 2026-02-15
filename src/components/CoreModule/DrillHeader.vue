<template>
  <div v-if="data.dayNumber > 0 || true">
    <DrillReport :data="data" v-if="showReport" @Close-Report="closeReport()" />
    <DrillHistory
      :data="data"
      :msg="paramdata.bossmessage_ref.msg"
      :step="historyStep"
      :paramdata="paramdata"
      :instructor="instructor"
      v-if="showHistory"
      @Close-History="closeHistory()"
      @Selected-Step="setHistoryStep($event)"
      @Profile-Progress="$emit('Profile-Progress', $event)"
    />
    <DrillFunnel
      :data="data.content.week"
      :stat="data.content.orderStatus"
      :week="data.content.day[data.dayNumber].week"
      :orderValue="data.content.orderValue"
      :funnelType="data.content.control.funnelType"
      v-if="showFunnel"
      @Close-Funnel="closeFunnel()"
    />
    <DrillRanking
      :data="data"
      :paramdata="paramdata"
      :selectedDrill="currentDrill"
      v-if="showRanking"
      @Close-Ranking="closeRanking()"
    />
    <!-- banner bar -->
    <v-row dense style="font-size: 0.75em;" class="text-center pa-0 ma-0">
      <v-col>
        <v-row
          dense
          fluid
          class="align-center"
          style="height: 4vh; background-color: #434b5e; color:#ddbd82;"
        >
          <v-col class="text-start ml-3"
            ><h3>
              {{ $t("portalname") }} -
              {{ $t("DrillPlatform." + data.action) }}
            </h3></v-col
          >
          <v-col auto class="text-end mr-3">
            <span>{{ data.content.analysis.reportUser }}</span>
            <v-tooltip v-if="signedinuser.level < 1">
              <template v-slot:activator="{ on, attrs }">
                <span
                  class="mdi mdi-information-outline"
                  v-bind="attrs"
                  v-on="on"
                ></span>
              </template>
              <span class="AltText"
                >{{ $t("About.version") }}: {{ $t("About.versionNumber")
                }}<br />{{ $t("About.resolution") }}: {{ w }}X{{ h }}</span
              >
            </v-tooltip>
            <span v-if="!instructor" style="font-size: 0.7em;"></span>
          </v-col>
        </v-row>
        <!-- Main bar -->
        <v-row dense class="align-center drill-header" style="height: 10vh;">
          <!-- Product name -->
          <v-col cols="2">
            <h3>
              {{ $t("BaseInfo.products") }}: {{ data.content.productExp }}
            </h3>
          </v-col>
          <!-- Team status -->
          <v-col cols="3">
            <v-row
              dense
              class="align-center text-center"
              v-if="show || data.dayNumber > 1"
            >
              <v-col>
                <DrillCircleProgress
                  :value="data.content.current.teamAvg.skills"
                  :ratio="data.content.current.teamAvg.skills"
                  :pName="$t(paramdata.base_lst.profiles[0])"
                />
              </v-col>
              <v-col>
                <DrillCircleProgress
                  :value="data.content.current.teamAvg.morale"
                  :ratio="data.content.current.teamAvg.morale"
                  :pName="$t(paramdata.base_lst.profiles[1])"
                />
              </v-col>
              <v-col>
                <DrillCircleProgress
                  :value="data.content.current.teamAvg.efficiency"
                  :ratio="data.content.current.teamAvg.efficiency"
                  :pName="$t(paramdata.base_lst.profiles[2])"
                />
              </v-col>
            </v-row>
          </v-col>
          <!-- buttons -->
          <v-col cols="6">
            <v-row dense>
              <v-col>
                <v-row dense align="center" style="font-weight: bold;">
                  <v-col cols="4" class="text-end"
                    >{{ $t("DrillPlatform.salesProgress") }} </v-col
                  ><v-col cols="8" class="text-start">
                    <v-progress-linear
                      rounded
                      background-color="grey lighten-2"
                      :value="
                        (
                          (data.content.orderValue *
                            data.content.orderStatus.ordersCompleted *
                            100) /
                          data.content.valueToComplete
                        ).toFixed()
                      "
                      :color="
                        progressColor(
                          (
                            (data.content.orderValue *
                              data.content.orderStatus.ordersCompleted *
                              100) /
                            data.content.valueToComplete
                          ).toFixed()
                        )
                      "
                      height="20"
                    >
                      {{
                        $t("DrillPlatform.dollarSign") +
                          data.content.orderValue *
                            data.content.orderStatus.ordersCompleted
                      }}
                      /
                      {{
                        $t("DrillPlatform.dollarSign") +
                          data.content.valueToComplete
                      }}</v-progress-linear
                    >
                  </v-col>
                </v-row>
              </v-col>
              <v-col>
                <v-row dense align="center" style="font-weight: bold;">
                  <v-col cols="4" class="text-end"
                    >{{ $t("DrillPlatform.minutesToGo") }}: </v-col
                  ><v-col cols="8" class="text-start">
                    <v-progress-linear
                      rounded
                      background-color="grey lighten-2"
                      :value="
                        (digiTime(eTime) * 100) / data.content.control.timeLimit
                      "
                      :color="
                        valueColor(
                          (digiTime(eTime) * 100) /
                            data.content.control.timeLimit
                        )
                      "
                      height="20"
                    >
                      {{ eTime }}</v-progress-linear
                    >
                  </v-col>
                </v-row>
              </v-col>
              <v-col>
                <v-row dense align="center" style="font-weight: bold;">
                  <v-col cols="4" class="text-end"
                    ><span v-if="data.dayNumber>0">
                      {{
                      $t("DrillPlatform.day") +
                        data.content["day"][data.dayNumber]["weekday"] +
                        $t("DrillPlatform.day1") +
                        "/" +
                        $t("DrillPlatform.week") +
                        data.content["day"][data.dayNumber]["week"] +
                        $t("DrillPlatform.week1")
                    }}</span>
                     </v-col
                  ><v-col cols="8" class="text-start">
                    <v-progress-linear
                      rounded
                      background-color="grey lighten-2"
                      :value="
                         (
                  ((data.content.control.numberOfDays - data.dayNumber) * 100) /
                  data.content.control.numberOfDays
                ).toFixed()
                      "
                      :color="
                        valueColor(
                           (
                  ((data.content.control.numberOfDays - data.dayNumber) * 100) /
                  data.content.control.numberOfDays
                ).toFixed()
                        )
                      "
                      height="20"
                    >
                      {{
                        $t("DrillPlatform.daysToGo") +
                          (
                            data.content.control.numberOfDays - data.dayNumber
                          ).toFixed() +
                          $t("DrillPlatform.days")
                      }}</v-progress-linear
                    >
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row dense class="text-end" v-if="data.dayNumber > 1">
              <v-col>
                <DrillHeaderBtn
                  icon="mdi mdi-magnify icon-highlight"
                  :text="$t('DrillHistory.title')"
                  gold="true"
                  @Btn-Clicked="showHistory = true"
                />
              </v-col>
              <v-col>
                <DrillHeaderBtn
                  icon="mdi mdi-target icon-highlight"
                  :text="$t('DrillFunnel.funnel')"
                  gold="true"
                  @Btn-Clicked="showFunnel = true"
                />
              </v-col>
              <v-col v-if="!instructor">
                <DrillHeaderBtn
                  icon="mdi mdi-human-queue icon-highlight"
                  :text="$t('DrillRanking.title')"
                  gold="true"
                  @Btn-Clicked="showRanking = true"
                />
              </v-col>
              <v-col
                v-if="
                  (data.content.control.status >= 600 &&
                    data.content.control.reporting > 0) ||
                    instructor
                "
              >
                <DrillHeaderBtn
                  icon="mdi mdi-text-box-outline icon-highlight"
                  :text="$t('DrillReport.title')"
                  gold="true"
                  @Btn-Clicked="showReport = true"
                />
              </v-col>
            </v-row>
          </v-col>
          <!-- day -->
          <v-col cols="1" class="text-end" v-if="false">
            <DrillCircleProgress
              v-if="false"
              :value="
                $t('DrillPlatform.daysToGo') +
                  (
                    data.content.control.numberOfDays - data.dayNumber
                  ).toFixed() +
                  $t('DrillPlatform.days')
              "
              :ratio="
                (
                  ((data.content.control.numberOfDays - data.dayNumber) * 100) /
                  data.content.control.numberOfDays
                ).toFixed()
              "
              :pName="
                $t('DrillPlatform.day') +
                  data.content['day'][data.dayNumber]['weekday'] +
                  $t('DrillPlatform.day1') +
                  '/' +
                  $t('DrillPlatform.week') +
                  data.content['day'][data.dayNumber]['week'] +
                  $t('DrillPlatform.week1')
              "
            />
          </v-col>
          <v-col cols="1" class="text-end">
            <DrillHeaderBtn
              icon="mdi mdi-exit-run icon-highlight"
              :text="$t('DrillPlatform.exit')"
              @Btn-Clicked="$emit('End-Drill')"
              v-if="!instructor"
            />
            <DrillHeaderBtn
              icon="mdi mdi-delete-empty-outline icon-highlight"
              :text="$t('Drill.reset')"
              @Btn-Clicked="$emit('Drill-Reset', data)"
              v-if="instructor"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";

import DrillReport from "./DrillReport";
import DrillHistory from "./DrillHistory";
import DrillFunnel from "./DrillFunnel";
import DrillRanking from "./DrillRanking";
import DrillCircleProgress from "./DrillCircleProgress";
import DrillTriangleProgress from "./DrillTriangleProgress";
import DrillHeaderBtn from "./DrillHeaderBtn";
export default {
  name: "DrillHeader",
  components: {
    DrillReport,
    DrillHistory,
    DrillFunnel,
    DrillRanking,
    DrillCircleProgress,
    DrillTriangleProgress,
    DrillHeaderBtn,
  },
  data() {
    return {
      showReport: false,
      showHistory: false,
      showFunnel: false,
      showRanking: false,
      historyStep: -1,
      w: 0,
      h: 0,
      app_bar_color: "#434b5e",
      app_bar_font_color: "#ddbd82",
    };
  },
  props: {
    data: [],
    eTime: "",
    instructor: false,
    paramdata: [],
    oldStyle: false,
    currentDrill: 0,
    show: false,
  },
  computed: {
    ...mapState({
      signedinuser: "signedinuser",
    }),
  },
  methods: {
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
    progressColor(v) {
      return v > 99 ? "#27AE60" : "#F39C12";
    },
    digiTime(t) {
      const ta = t.split(":");
      return ta[0];
    },
    setHistoryStep(ev) {
      this.historyStep = this.historyStep == ev ? -1 : ev;
    },
    closeHistory() {
      this.showHistory = false;
    },
    closeReport() {
      this.showReport = false;
    },
    closeFunnel() {
      this.showFunnel = false;
    },
    closeRanking() {
      this.showRanking = false;
    },
  },
  created() {
    this.w = screen.width;
    this.h = screen.height;
  },
};
</script>

<style></style>
