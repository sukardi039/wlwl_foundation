<template>
  <v-container flex class="pa-0 ma-0">
      <v-card dense class="pa-0 ma-0">
        <v-card-title class="pa-0 ma-0">
          <v-row dense v-if="Ready">
            <v-col> </v-col
            ><v-radio-group
              v-model="selectedDrill"
              row
              @change="radioClicked()"
            >
              <v-radio
                :label="$t('Package.runOne')"
                :value="1"
                name="selectedDrill"
                id="r1"
                v-if="currentPackage.runOne && currentPackage.activeOne == 1"
              ></v-radio>
              <v-radio
                :label="$t('Package.runTwo')"
                :value="2"
                name="selectedDrill"
                id="r2"
                v-if="currentPackage.runTwo && currentPackage.activeTwo == 1"
              ></v-radio>
              <v-radio
                :label="$t('Package.runThree')"
                :value="3"
                name="selectedDrill"
                id="r3"
                v-if="
                  currentPackage.runThree && currentPackage.activeThree == 1
                "
              ></v-radio>
            </v-radio-group>
            <v-col></v-col>
          </v-row>
        </v-card-title>
        <v-card-text class="pa-0 ma-0">
          <ConsoleUserList
            :BaseData="BaseData"
            :paramdata="paramdata"
            v-if="BaseData"
            @Drill-Reset="drillReset($event)"
          />
        </v-card-text>
      </v-card>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

import ConsoleUserList from "../components/CoreModule/ConsoleUserList";
export default {
  name: "DrillConsole",
  components: {
    ConsoleUserList,
  },
  data() {
    return {
      BaseData: [],
      fetchbuffer: {
        restkey: "",
        mod: "",
        limit: 0,
        qdata: {},
        method: "POST",
      },
      limit: 0,
      Ready: false,
      AmendCode: "",
      SelectedPackage: "",
      EditData: {},
      LevelList: [],
      YesNo: [],
      InfoData: [],
      sel: "",
      selectedDrill: 0,
      currentPackage: [],
      row: null,
    };
  },
  computed: {
    ...mapState({
      signedinuser: "signedinuser",
      paramdata: "paramdata",
    }),
  },
  methods: {
    async GetInfo(mod, qry, verb, qstr) {
      let qryStr = qstr ? qstr : "/backend/product/";
      this.fetchbuffer.restkey = this.signedinuser.restkey;
      this.fetchbuffer.classes = this.signedinuser.classes;
      this.fetchbuffer.mod = mod;
      this.fetchbuffer.limit = this.limit;
      this.fetchbuffer.method = verb ? verb : "POST";
      if (qry) {
        qryStr = qryStr + "?" + qry;
      }
      //          console.log(this.fetchbuffer)
      const res = await fetch(qryStr, {
        method: "POST",
        cache: "no-cache",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(this.fetchbuffer),
      });
      if (res.status === 200) {
        const Data = await res.json();
        return await Data;
      }
    },
    async GetUser(se, sd) {
      this.BaseData = false;
      this.AmendCode = "";
      this.fetchbuffer.package = se;
      this.BaseData = await this.GetInfo(
        sd,
        "",
        "POST",
        "/backend/consoleuser/"
      );
      // let c = 0;
      // while (c <= 0) {
      //   this.LevelList = [...this.LevelList, c.toString()]
      //   c++;
      // }
      // this.YesNo[0] = this.$t("YesNo.0");
      // this.YesNo[1] = this.$t("YesNo.1");
      // this.SelectedPackage = se
    },
    async GetParam() {
      this.InfoData = await this.GetInfo(
        "",
        "",
        "POST",
        "/backend/basicinformation/"
      );
      this.paramdata = await this.InfoData;
    },
    async drillReset(ev) {
      console.log("reset");
      await this.resetDrill(ev);
      await this.GetUser(
        this.paramdata.package_ref.package[this.sel],
        this.selectedDrill
      );
    },
    async resetDrill(ev) {
      console.log("resetting...");
      this.fetchbuffer.qdata = ev;
      this.drillStatus = "RESET";
      this.drillEndPage = false;
      this.paramData = false;
      await this.GetInfo("RESET", "", "PUT", "/backend/drill/");
    },
    currentDrill() {
      var s = 0;
      if (this.currentPackage.activeThree == 1) {
        s = 3;
        //        document.getElementById("r3").click()
      } else if (this.currentPackage.activeTwo == 1) {
        s = 2;
        //        document.getElementById("r2").click()
      } else if (this.currentPackage.activeOne == 1) {
        s = 1;
        //        document.getElementById("r1").click()
      }
      //      console.log('s', s)
      this.selectedDrill = s;
    },
    getCurrentPackage() {
      for (var c = 0; c < this.paramdata.package_det.package.length; c++) {
        if (
          this.paramdata.package_det.package[c].packageId ==
          this.signedinuser.companyName
        ) {
          return this.paramdata.package_det.package[c];
        }
      }
    },
    radioClicked() {
      //      console.log(this.selectedDrill)
      this.GetUser(this.signedinuser.companyName, this.selectedDrill);
    },
  },
  async created() {
    //    await this.GetUser();
    // await this.GetParam();
    // this.Ready = true;
    this.currentPackage = this.getCurrentPackage();
    //console.log('package', this.currentPackage)
    this.currentDrill();
    //    console.log('selected', this.selectedDrill)
    await this.GetUser(this.signedinuser.companyName, this.selectedDrill);
    this.Ready = true;
  },
  async mounted() {},
};
</script>

<style></style>
