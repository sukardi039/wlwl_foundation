<template>
  <v-container class="pa-6">
    <br />
    <v-row>
      <v-col>
        <v-card :height="helpHeight()">
          <div id="helpElement">
            <cs1 v-if="helpIndex == 1" />
            <cs2 v-if="helpIndex == 2" />
            <cs3 v-if="helpIndex == 3" />
            <cs4 v-if="helpIndex == 4" />
            <cs5 v-if="helpIndex == 5" />
            <cs6 v-if="helpIndex == 6" />
            <cs7 v-if="helpIndex == 7" />
            <cs8 v-if="helpIndex == 8" />
            <cs9 v-if="helpIndex == 9" />
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row
      v-if="helpList[helpIndex][1] == helpIndex"
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
      <v-col cols="4"><span @click.stop="printStart()">{{
        $t("Helps.concept-" + helpList[helpIndex][2])
      }}</span></v-col>
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
import cs1 from "./concept/cs1";
import cs2 from "./concept/cs2";
import cs3 from "./concept/cs3";
import cs4 from "./concept/cs4";
import cs5 from "./concept/cs5";
import cs6 from "./concept/cs6";
import cs7 from "./concept/cs7";
import cs8 from "./concept/cs8";
import cs9 from "./concept/cs9";
export default {
  name: "UserAdminHelp",
  components: {
    cs1,
    cs2,
    cs3,
    cs4,
    cs5,
    cs6,
    cs7,
    cs8,
    cs9,
  },
  data() {
    return {
      helpList: [
        [0, 0, "", 0, 0, 0],
        [-1, 1, "concept", 2, 0, 0],
        [1, 2, "concept", 3, 0, 0],
        [2, 3, "concept", 4, 0, 0],
        [3, 4, "concept", 5, 0, 0],
        [4, 5, "concept", 6, 0, 0],
        [5, 6, "concept", 7, 0, 0],
        [6, 7, "concept", 8, 0, 0],
        [7, 8, "concept", 9, 0, 0],
        [8, 9, "concept", -1, 0, 0],
      ],
      helpIndex: 1,
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
