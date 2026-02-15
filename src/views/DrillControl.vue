<template>
  <v-container class="pa-3">
    <v-row v-if="Ready">
      <v-col>
        <v-select
          :items="InfoData.livepackage_lst.package"
          :label="$t('BackendUser.company')"
          outlined
          v-model="sel"
          @change="GetUser(InfoData.livepackage_ref.package[sel])"
        >
        </v-select>
      </v-col>
    </v-row>
    <ControlDrillList
      :BaseData="BaseData"
      :paramdata="paramdata"
      v-if="BaseData.packageId"
      @Activate="ControlAction(0, $event)"
      @UnlockOne="ControlAction(1, $event)"
      @UnlockTwo="ControlAction(2, $event)"
      @UnlockThree="ControlAction(3, $event)"
    />
  </v-container>
</template>

<script>
import { mapState } from "vuex";

import ControlDrillList from "../components/CoreModule/ControlDrillList";
export default {
  name: "BackendUser",
  components: {
    ControlDrillList,
  },
  data() {
    return {
      BaseData: [],
      paramdata: [],
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
    };
  },
  computed: {
    ...mapState({
      signedinuser: "signedinuser",
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
    async GetUser(se) {
      this.BaseData = false;
      this.AmendCode = "";
      this.fetchbuffer.package = se;
      this.BaseData = await this.GetInfo(
        0,
        "ssee",
        "POST",
        "/backend/controldrill/"
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
    async ControlAction(act, ev){
      await this.Action(act, ev)
//      await this.GetUser(this.InfoData.package_ref.package[this.sel])
    },
    async Action(act, ev){
      console.log("resetting...")
      this.fetchbuffer.qdata = ev;
      this.fetchbuffer.package = ev.packageId;
      this.paramData = false;
      this.BaseData = await this.GetInfo(act, "ssee", "PUT", "/backend/controldrill/");
    }
  },
  async created() {
    //    await this.GetUser();
    // await this.GetParam();
    // this.Ready = true;
    this.GetUser(this.signedinuser.companyName)
  },
};
</script>

<style></style>
