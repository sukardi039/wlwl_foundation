<template>
  <v-dialog persistent fullscreen fluid v-model="mCount">
    <v-card :img="pic" height="100%" width="100%">
    <v-row style="height: 100vh;" align="center">
      <v-col>
        <DrillMessageBox
          :avatar="getPhoto(myMessage[currentMessage].who)"
          :msg="myMessage[currentMessage].text"
          :pic="pic"
          :btnText="btnTxt()"
          @btn-click="btnClick()"
        />
      </v-col>
    </v-row></v-card>
  </v-dialog>
</template>

<script>
import { mapState } from "vuex";
import DrillMessageBox from "./DrillMessageBox";
export default {
  name: "DrillMessage",
  components: {
    DrillMessageBox,
  },
  data() {
    return {};
  },
  props: {
    myMessage: [],
    currentMessage: 0,
    mCount: 0,
    curMsg: 0,
    pic: "",
  },
  computed: {
    msgCount: function() {
      return this.mCount * 1;
    },
    ...mapState({
      paramdata: "paramdata",
    }),
  },
  methods: {
    nextMessage() {
      alert(this.currentMessage);
      this.currentMessage = this.currentMessages + 1;
      alert(this.currentMessage);
    },
    endMessage(ev) {
      //            console.log(this.myMessage, ev,this.myMessage[ev].act )
      this.$emit("End-Message", this.myMessage[ev].act);
    },
    getPhoto(staffId) {
      var p = "";
      if (staffId > 0) {
        p =
          this.paramdata.params_ref.params.fileURL +
          this.paramdata.staff_det.staff[staffId].staffPhoto;
      } else if (staffId == -1) {
        // notice
        p = this.paramdata.params_ref.params.fileURL + "notice.png";
      } else if (staffId == -2) {
        // environment
        p = this.paramdata.params_ref.params.fileURL + "enviro.png";
      } else if (staffId == -3) {
        // boss
        p = this.paramdata.params_ref.params.fileURL + "boss.jpg";
      } else if (staffId == -4) {
        // boss
        p = this.paramdata.params_ref.params.fileURL + "review.png";
      } else {
        p = this.paramdata.params_ref.params.fileURL + "default.png";
      }
      console.logstaffId, p;
      return p;
    },
    btnTxt() {
      var c = "";
      if (this.currentMessage < this.msgCount) {
        c = this.$t("DrillPlatform.next");
      } else {
        c = this.$t("DrillPlatform.noted");
      }
      return c;
    },
    btnClick() {
      if (this.currentMessage < this.msgCount) {
        this.$emit("Next-Message");
      } else {
        this.endMessage(this.currentMessage);
      }
    },
  },
  creted() {
    console.log(this.myMessage);
  },
};
</script>

<style></style>
