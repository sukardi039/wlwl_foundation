<template>
  <v-container class="pa-6">
    <v-row v-if="Ready">
      <v-col cols="10">
        <v-select
          :items="InfoData.package_lst.package"
          :label="$t('BackendUser.company')"
          outlined
          v-model="sel"
          @change="GetUser(InfoData.package_ref.package[sel])"
        >
        </v-select>
      </v-col>
      <v-col cols="2">
        <v-spacer></v-spacer>
        <v-btn
          v-if="sel"
          outlined
          rounded
          height="25px"
          @click.stop="
            AddNew = false;
            LicenseClicked(InfoData.package_ref.package[sel]);
          "
        >
          <span class="mdi mdi-ticket" style="font-size: 0.8em;">{{
            $t("Agent.license")
          }}</span>
        </v-btn>
      </v-col>
    </v-row>
    <License
      :lData="LicenseData"
      :showLic="showLic"
      @Close-License="showLic = false"
    />
    <FrontendUserList
      :BaseData="BaseData"
      :AmendCode="AmendCode"
      v-if="!AmendCode && SelectedPackage"
      @AddClicked="toAdd()"
      @Row-Clicked="toEdit($event)"
    />
    <FrontendUserInput
      :Data="EditData"
      :me="signedinuser"
      :LevelList="LevelList"
      :AmendCode="AmendCode"
      :packageList="InfoData.package_lst.package"
      :packageRef="InfoData.package_ref.package"
      :YesNo="YesNo"
      v-if="AmendCode"
      @Abort-Clicked="toAbort()"
      @Update-Info="toUpdate($event)"
    />
  </v-container>
</template>

<script>
import { mapState } from "vuex";

import FrontendUserList from "../components/BaseInfo/FrontendUserList";
import FrontendUserInput from "../components/BaseInfo/FrontendUserInput";
import License from "../components/BaseInfo/License";
export default {
  name: "BackendUser",
  components: {
    FrontendUserList,
    FrontendUserInput,
    License,
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
      sel: '',
      showLic: false,
      LicenseData:[],
    }
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
      } else {
        alert(this.$t('BackendUser.error_'+res.status))
      }
    },
    async GetUser(se) {
      this.BaseData = false
      this.AmendCode=''
      this.fetchbuffer.package = se
      this.BaseData = await this.GetInfo(
        0,
        "",
        "POST",
        "/backend/backenduser/"
      );
      let c = 0;
      while (c <= 0) {
        this.LevelList = [...this.LevelList, c.toString()]
        c++;
      }
      this.YesNo[0] = this.$t("YesNo.0");
      this.YesNo[1] = this.$t("YesNo.1");
      this.SelectedPackage = se
    },
    async GetParam() {
        this.InfoData = await this.GetInfo("", "", "POST", "/backend/basicinformation/")
    },
    toAdd() {
      this.toAbort();
      this.EditData.loginPassword = this.findPackage(this.InfoData.package_ref.package[this.sel]).commonPW
      this.AmendCode = "A";
    },
    toAbort() {
      this.EditData.userId = ""
      this.EditData.userName = ""
      this.EditData.loginName = ""
      this.EditData.loginPassword = ""
      this.EditData.companyName = ''
      this.EditData.companyExp = ''
      this.EditData.level = 0
      this.EditData.active = 0
      this.EditData.instructor = 0
      this.AmendCode = "";
    },
    toEdit(ev) {
      this.EditData = { ...ev };
      this.EditData.bactive = this.YesNo[ev.active]
      this.EditData.binstructor = this.YesNo[ev.instructor]
      this.EditData.companyExp = this.InfoData.package_exp.package[ev.companyName]
      this.AmendCode = "E";
    },
    async toUpdate(ev) {
      if (ev.userName && ev.loginName && ev.loginPassword) {
        ev.active = ev.bactive === this.$t("YesNo.1") ? 1 : 0
        ev.instructor = ev.binstructor === this.$t("YesNo.1") ? 1 : 0
        ev.companyName = this.SelectedPackage
        ev.level = 0
        this.fetchbuffer.qdata = ev;
        const NewData = await this.GetInfo(
          "",
          "",
          "PUT",
          "/backend/backenduser/"
        );
        if (this.AmendCode === "A") {
          if (this.BaseData) {
            this.BaseData = [...this.BaseData, NewData[0]];
          } else {
            this.BaseData = NewData;
          }
        }
        if (this.AmendCode === "E") {
          this.BaseData = this.BaseData.map((inf) =>
            inf.userId === ev.userId ? NewData[0] : inf
          );
        }
        this.AmendCode = "";
      } else {
        alert(this.$t("general.incomplete"));
      }
    },
    findPackage(s){
      for (var c=0; c<this.InfoData.package_det.package.length; c++){
        if (this.InfoData.package_det.package[c].packageId == s) {
          return this.InfoData.package_det.package[c]
        }
      }
    },
    async LicenseClicked(v){
                  const Data = await this.GetInfo(
        v,
        "",
        "POST",
        "/backend/license/"
      );
      this.LicenseData = await Data;
      this.showLic = true;

    }
  },
  async created() {
//    await this.GetUser();
    await this.GetParam();
    this.Ready = true;
  },
};
</script>

<style></style>
