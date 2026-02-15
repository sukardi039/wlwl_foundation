<template>
  <v-container class="pa-6">
    <br />
    <v-row>
      <v-col>
        <v-card :height="helpHeight()">
          <div id="helpElement">
            <cu1 v-if="helpIndex == 1" />
            <cu2 v-if="helpIndex == 2" />
            <cu3 v-if="helpIndex == 3" />
            <cu4 v-if="helpIndex == 4" />
            <cu5 v-if="helpIndex == 5" />
            <cu6 v-if="helpIndex == 6" />
            <cu7 v-if="helpIndex == 7" />
            <cu8 v-if="helpIndex == 8" />
            <cu9 v-if="helpIndex == 9" />
            <cu10 v-if="helpIndex == 10" />
            <cu11 v-if="helpIndex == 11" />
            <cu12 v-if="helpIndex == 12" />
            <cu13 v-if="helpIndex == 13" />
            <cu14 v-if="helpIndex == 14" />
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
      <v-col cols="4"
        ><span @click.stop="printStart()">{{
          $t("Helps.custom-" + helpList[helpIndex][2])
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
import { mapState } from "vuex";
import html2pdf from "html2pdf.js";
import cu1 from "./custom/cu1";
import cu2 from "./custom/cu2";
import cu3 from "./custom/cu3";
import cu4 from "./custom/cu4";
import cu5 from "./custom/cu5";
import cu6 from "./custom/cu6";
import cu7 from "./custom/cu7";
import cu8 from "./custom/cu8";
import cu9 from "./custom/cu9";
import cu10 from "./custom/cu10";
import cu11 from "./custom/cu11";
import cu12 from "./custom/cu12";
import cu13 from "./custom/cu13";
import cu14 from "./custom/cu14";
export default {
  name: "UserAdminHelp",
  components: {
    cu1,
    cu2,
    cu3,
    cu4,
    cu5,
    cu6,
    cu7,
    cu8,
    cu9,
    cu10,
    cu11,
    cu12,
    cu13,
    cu14,
  },
  data() {
    return {
      helpList: [
        [0, 0, "", 0, 0, 0],
        [-1, 1, "product", 2, 0, 3],
        [1, 2, "product", 3, 1, 3],
        [2, 3, "task", 4, 1, 6],
        [3, 4, "task", 5, 3, 6],
        [4, 5, "task", 6, 3, 6],
        [5, 6, "plate", 7, 3, 8],
        [6, 7, "plate", 8, 6, 8],
        [7, 8, "staff", 9, 6, 10],
        [8, 9, "staff", 10, 8, 10],
        [9, 10, "model", 11, 8, 0],
        [10, 11, "model", 12, 10, 0],
        [11, 12, "model", 13, 10, 0],
        [12, 13, "model", 14, 10, 0],
        [13, 14, "model", -1, 10, 0],
      ],
      helpIndex: 1,
    };
  },
  computed: {
    ...mapState({
      signedinuser: "signedinuser",
    }),
  },
  methods: {
    helpHeight() {
      // return (screen.height - 25).toFixed() + "px";
      return "500px";
    },
    printStart() {
      if (this.signedinuser.level >= 7) {
        html2pdf(document.getElementById("helpElement"), {
          margin: 1,
          quality: 1,
          filename: "CustomHelp_" + this.helpIndex + ".pdf",
          pagebreak: { mode: "avoid-all" },
        });
      }
    },
  },
};
</script>

<style></style>
