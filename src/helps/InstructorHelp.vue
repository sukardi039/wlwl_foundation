<template>
  <v-container class="pa-6">
    <br />
    <v-row>
      <v-col>
        <v-card :height="helpHeight()">
          <div id="helpElement">
            <ic1 v-if="helpIndex == 1" />
            <ic2 v-if="helpIndex == 2" />
            <ic3 v-if="helpIndex == 3" />
            <ic4 v-if="helpIndex == 4" />
            <ic5 v-if="helpIndex == 5" />
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
        $t("Helps.instruct-" + helpList[helpIndex][2])
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
import ic1 from "./instruct/ic1";
import ic2 from "./instruct/ic2";
import ic3 from "./instruct/ic3";
import ic4 from "./instruct/ic4";
import ic5 from "./instruct/ic5";
export default {
  name: "UserAdminHelp",
  components: {
    ic1,
    ic2,
    ic3,
    ic4,
    ic5,
  },
  data() {
    return {
      helpList: [
        [0, 0, "", 0, 0, 0],
        [-1, 1, "instruct", 2, 0, 0],
        [1, 2, "instruct", 3, 0, 0],
        [2, 3, "instruct", 4, 0, 0],
        [3, 4, "instruct", 5, 0, 0],
        [4, 5, "instruct", -1, 0, 0],
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
