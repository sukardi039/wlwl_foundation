<template>
    <v-dialog fullscreen fluid v-model="mCount" persistent>
    <v-row style="height: 100vh" align="center" class="white">
      <v-col>
                  <DrillMessageBox
                    :avatar="getPhoto(myMessage[1].who)"
                    :msg="packMsg()"
                    :btnText="$t('DrillPlatform.noted')"
                    @btn-click="$emit('End-Message', myMessage[currentMessage].act)"
                  />
      </v-col>
    </v-row>
        <!-- <v-card>
          <v-card-title>
            {{ myMessage[1].from }}
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="4">
                <v-img :src="getPhoto(whereis(myMessage[1].from))" alt="" />
              </v-col>
              <v-col auto class="text-start"><h4>
                <span v-html="packMsg()"></span></h4>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-row>
              <v-col class="text-end">
                <v-btn
                  v-if="data.action != 'INTRODUCTION'"
                  rounded
                  dense
                  style="font-weight: bold"
                  @click.stop="
                    $emit('End-Message', myMessage[currentMessage].act)
                  "
                  >{{ $t("DrillPlatform.noted") }}</v-btn
                >
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card> -->
    </v-dialog>
</template>

<script>
import DrillMessageBox from "./DrillMessageBox";
export default {
  name: "DrillStaffMessage",
  components:{
    DrillMessageBox,
  },
  props: {
    myMessage: [],
    currentMessage: 0,
    mCount: 0,
    curMsg: 0,
    blocking: false,
    oldStyle: false,
    data: [],
    drillStaff: false,
    paramdata: [],
  },
  computed: {
    msgCount: function() {
      return this.mCount * 1;
    },
  },
  methods: {
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
      } else if (staffId == -4){
        // boss
        p = this.paramdata.params_ref.params.fileURL + "review.png";
      }else {
        p = this.paramdata.params_ref.params.fileURL + "default.png";
      }
        console.logstaffId, (p)
      return p
    },
    xgetPhoto(staffId) {
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
    whereis(t) {
      var s = 0;
      for (let c = 0; c < this.data.content.control.maxMembers; c++) {
        if (this.data.content.staffs[c].staffExp == t) {
          s = this.data.content.staffs[c].staffName;
          break;
        }
      }
      return s;
    },
    packMsg() {
      var t = "<table>";
      for (let c = 1; c <= this.msgCount; c++) {
        t = t + '<tr><td width="20%">' + c + " / " + this.msgCount + ':</td><td width="80%">' + this.myMessage[c].text + "</td></tr>";
      }
      t = t + '</table>'
//      console.log(t)
      return t;
    },
  },
  created() {
        console.log("start", this.myMessage);
  },
};
</script>

<style></style>
