<template>
  <v-container class="pa-0">
    <v-dialog width="70%" v-model="data" persistent scrollable>
      <v-card style="font-size: 0.85em;">
        <v-card-title class="detail-head">
          <v-row dense height="10px" class="text-start align-center"
            ><v-col cols="1">
              <span class="mdi mdi-human-queue icon-highlight"></span
            ></v-col>
            <v-col>{{ $t("DrillRanking.title") }}</v-col>
            <v-col class="text-end">
                            <v-btn
                outlined
                rounded
                height="25px"
                @click.stop="$emit('Close-Ranking')"
              >
                <span class="mdi mdi-close" style="font-size: 0.8em;">{{
                  $t("DrillPlatform.cancel")
                }}</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text class="text-center">
          <!-- <v-data-table
            :headers="tbh"
            :items="tbt"
            :items-per-page="15"
            class="elevation-1"
          ></v-data-table> -->
          <v-row>
            <v-col
              ><h4 >{{ tbh.rank }}</h4></v-col
            >
            <v-col
              ><h4>{{ tbh.userName }}</h4></v-col
            >
            <v-col
              ><h4>{{ tbh.convert }}</h4></v-col
            >
            <v-col
              ><h4>{{ tbh.sales }}</h4></v-col
            >
            <v-col
              ><h4>{{ tbh.teamSkill }}</h4></v-col
            >
            <v-col
              ><h4>{{ tbh.teamMorale }}</h4></v-col
            >
            <v-col
              ><h4>{{ tbh.teamEff }}</h4></v-col
            >
            <v-col
              ><h4>{{ tbh.status }}</h4></v-col
            >
          </v-row>
          <v-divider></v-divider>
          <v-row
            dense
            v-for="(tl, index) in tbt"
            :key="tl.userName"
            :class="index % 2 ? 'row0' : 'row1'"
          >
            <v-col
              ><h5 :class="rankColor(tl.rank)">{{ tl.rank }}</h5></v-col
            >
            <v-col
              ><h5>{{ tl.userName }}</h5></v-col
            >
            <v-col
              ><h5>{{ tl.convert }}</h5></v-col
            >
            <v-col
              ><h5>{{ tl.sales }}</h5></v-col
            >
            <v-col
              ><h5>{{ tl.teamSkill }}</h5></v-col
            >
            <v-col
              ><h5>{{ tl.teamMorale }}</h5></v-col
            >
            <v-col
              ><h5>{{ tl.teamEff }}</h5></v-col
            >
            <v-col
              ><h5>{{ tl.status }}</h5></v-col
            >
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "DrillRanking",
  components: {},
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
      currentPackage: [],
      row: null,
      tbh: [],
      tbt: [],
    };
  },
  props: {
    data: {},
    selectedDrill: 0,
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
        "/backend/drilloverview/"
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
    // async drillReset(ev){
    //   console.log("reset")
    //   await this.resetDrill(ev)
    //   await this.GetUser(this.InfoData.package_ref.package[this.sel], this.selectedDrill)
    // },
    // async resetDrill(ev){
    //   console.log("resetting...")
    //   this.fetchbuffer.qdata = ev;
    //   this.drillStatus = "RESET";
    //   this.drillEndPage = false;
    //   this.paramData = false;
    //   await this.GetInfo("RESET", "", "PUT", "/backend/drill/");
    // },
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
    async radioClicked() {
      //      console.log(this.selectedDrill)
      await this.GetUser(this.signedinuser.companyName, this.selectedDrill);
      this.buildTable();
    },
    buildTable() {
      var b = this.BaseData;
      var hr = [];
      var dt = [];
      if (b) {
        if (b.header) {
          b.header.forEach((h) => {
            // hr = [
            //   ...hr,
            //   {
            //     text: this.$t("Ranking." + h),
            //     value: h,
            //   },
            // ];
            hr[h] = this.$t("Ranking." + h);
          });
        }
        if (b.detail) {
          dt = b.detail;
          b.detail.forEach((d) => {
            d.status = this.$t("Ranking.status" + d.status);
          });
        }
      }
      this.tbh = hr;
      this.tbt = dt;
      console.log(this.tbh, this.tbt);
    },
    rankColor(v){
      var c=''
      switch (v) {
        case 1:
          c='rank-first'
          break;
        case 2:
          c='rank-second'
          break;
        case 3:
          c='rank-third'
          break;
      }
return c
    },
  },
  async created() {
    console.log(this.selectedDrill);
    await this.GetUser(this.signedinuser.companyName, this.selectedDrill);
    this.Ready = true;
    this.buildTable();
  },
};
</script>

<style></style>
