<template>
  <v-container class="pa-6">
    <br />
    <v-row>
      <v-col>
        <v-card :height="helpHeight()">
          <div id="helpElement">
            <ua1 v-if="helpIndex == 1" />
            <ua2 v-if="helpIndex == 2" />
            <ua3 v-if="helpIndex == 3" />
            <ua4 v-if="helpIndex == 4" />
            <ua5 v-if="helpIndex == 5" />
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
        $t("Helps.useradmin-" + helpList[helpIndex][2])
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
import ua1 from "./useradmin/ua1";
import ua2 from "./useradmin/ua2";
import ua3 from "./useradmin/ua3";
import ua4 from "./useradmin/ua4";
import ua5 from "./useradmin/ua5";
export default {
  name: "UserAdminHelp",
  components: {
    ua1,
    ua2,
    ua3,
    ua4,
    ua5,
  },
  data() {
    return {
      helpList: [
        [0, 0, "", 0, 0, 0],
        [-1, 1, "package", 2, 0, 3],
        [1, 2, "package", 3, 1, 3],
        [2, 3, "user", 4, 1, 0],
        [3, 4, "user", 5, 3, 0],
        [4, 5, "user", -1, 3, 0],
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
