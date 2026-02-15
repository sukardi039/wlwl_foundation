<template>
  <v-container class="pa-6">
    <br />
    <v-row>
      <v-col>
        <v-card :height="helpHeight()">
          <div id="helpElement">
            <dh1 v-if="helpIndex == 1" />
            <dh2 v-if="helpIndex == 2" />
            <dh3 v-if="helpIndex == 3" />
            <dh4 v-if="helpIndex == 4" />
            <dh5 v-if="helpIndex == 5" />
            <dh6 v-if="helpIndex == 6" />
            <dh7 v-if="helpIndex == 7" />
            <dh8 v-if="helpIndex == 8" />
            <dh9 v-if="helpIndex == 9" />
            <dh10 v-if="helpIndex == 10" />
            <dh11 v-if="helpIndex == 11" />
            <dh12 v-if="helpIndex == 12" />
            <dh13 v-if="helpIndex == 13" />
            <dh14 v-if="helpIndex == 14" />
            <dh15 v-if="helpIndex == 15" />
            <dh16 v-if="helpIndex == 16" />
            <dh17 v-if="helpIndex == 17" />
            <dh18 v-if="helpIndex == 18" />
            <dh19 v-if="helpIndex == 19" />
            <dh20 v-if="helpIndex == 20" />
            <dh21 v-if="helpIndex == 21" />
            <dh22 v-if="helpIndex == 22" />
            <dh23 v-if="helpIndex == 23" />
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row
      v-if="helpList[helpIndex][1] == helpIndex && !printing"
      class="text-center grey-lighten3 help-bar"
    >
      <v-col
        ><span
          class="mdi mdi-transfer-left"
          v-if="helpList[helpIndex][4] > 0"
          @click="helpIndex = helpList[helpIndex][4]"
        ></span
      ></v-col>
      <v-col
        ><span
          class="mdi mdi-arrow-left-bold"
          v-if="helpList[helpIndex][0] > 0"
          @click="helpIndex--"
        ></span
      ></v-col>
      <v-col cols="4"
        ><span @click.stop="printStart()">{{
          $t("Helps.drill-" + helpList[helpIndex][2])
        }}</span></v-col
      >
      <v-col
        ><span
          class="mdi mdi-arrow-right-bold"
          v-if="helpList[helpIndex][3] > 0"
          @click="helpIndex++"
        ></span
      ></v-col>
      <v-col
        ><span
          class="mdi mdi-transfer-right"
          v-if="helpList[helpIndex][5] > 0"
          @click="helpIndex = helpList[helpIndex][5]"
        ></span
      ></v-col>
    </v-row>
  </v-container>
</template>
<script>
import {mapState} from 'vuex'
import html2pdf from "html2pdf.js";
import dh1 from "./drillhelp/dh1";
import dh2 from "./drillhelp/dh2";
import dh3 from "./drillhelp/dh3";
import dh4 from "./drillhelp/dh4";
import dh5 from "./drillhelp/dh5";
import dh6 from "./drillhelp/dh6";
import dh7 from "./drillhelp/dh7";
import dh8 from "./drillhelp/dh8";
import dh9 from "./drillhelp/dh9";
import dh10 from "./drillhelp/dh10";
import dh11 from "./drillhelp/dh11";
import dh12 from "./drillhelp/dh12";
import dh13 from "./drillhelp/dh13";
import dh14 from "./drillhelp/dh14";
import dh15 from "./drillhelp/dh15";
import dh16 from "./drillhelp/dh16";
import dh17 from "./drillhelp/dh17";
import dh18 from "./drillhelp/dh18";
import dh19 from "./drillhelp/dh19";
import dh20 from "./drillhelp/dh20";
import dh21 from "./drillhelp/dh21";
import dh22 from "./drillhelp/dh22";
import dh23 from "./drillhelp/dh23";
export default {
  name: "DrillHelp",
  components: {
    dh1,
    dh2,
    dh3,
    dh4,
    dh5,
    dh6,
    dh7,
    dh8,
    dh9,
    dh10,
    dh11,
    dh12,
    dh13,
    dh14,
    dh15,
    dh16,
    dh17,
    dh18,
    dh19,
    dh20,
    dh21,
    dh22,
    dh23,
  },
  data() {
    return {
      helpList: [
        [0, 0, "", 0, 0, 0],
        [-1, 1, "format", 2, 0, 6],
        [1, 2, "format", 3, 1, 6],
        [2, 3, "format", 4, 1, 6],
        [3, 4, "format", 5, 1, 6],
        [4, 5, "format", 6, 1, 6],
        [5, 6, "action", 7, 1, 14],
        [6, 7, "action", 8, 6, 14],
        [7, 8, "action", 9, 6, 14],
        [8, 9, "action", 10, 6, 14],
        [9, 10, "action", 11, 6, 14],
        [10, 11, "action", 12, 6, 14],
        [11, 12, "action", 13, 6, 14],
        [12, 13, "action", 14, 6, 14],
        [13, 14, "style", 15, 6, 17],
        [14, 15, "style", 16, 14, 17],
        [15, 16, "style", 17, 14, 17],
        [16, 17, "lead", 18, 14, 20],
        [17, 18, "lead", 19, 17, 20],
        [18, 19, "lead", 20, 17, 20],
        [19, 20, "feedback", 21, 17, 22],
        [20, 21, "feedback", 22, 20, 22],
        [21, 22, "event", 23, 20, 23],
        [22, 23, "end", -1, 22, -1],
      ],
      helpIndex: 1,
      printing: false,
    };
  },
  computed:{
      ...mapState({
      signedinuser: 'signedinuser'
      })
  },
  methods: {
    helpHeight() {
      // return (screen.height - 25).toFixed() + "px";
      return "500px";
    },
    printStart(){
      if (this.signedinuser.level>=7){
        html2pdf(document.getElementById("helpElement"), {
          margin: 1,
          quality: 1,
          filename: "DrillHelp_" + this.helpIndex + ".pdf",
          pagebreak: {mode: 'avoid-all'},
        });
      }
    },
  },
};
</script>

<style></style>
