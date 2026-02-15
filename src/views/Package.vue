<template>
  <v-container fluid class="pa-6" v-if="Ready">
    <PackageList
      :BaseData="BaseData"
      :modelExp="modelExp"
      v-if="!AmendData"
      @Row-Clicked="toEdit($event)"
      @AddClicked="AddClicked()"
      @License-Clicked="LicenseClicked($event)"
    />
    <PackageInput
      :Data="EditData"
      :modelList="modelList"
      :modelRef="modelRef"
      :agentList="agentList"
      :agentRef="agentRef"
      :languages="languages"
      :companyType="companyType"
      :YesNo="YesNo"
      v-if="AmendData"
      @Update-Info="toUpdate($event)"
      @Abort-Clicked="toAbort()"
    />
    <License
      :lData="LicenseData"
      :showLic="showLic"
      @Close-License="showLic = false"
    />
  </v-container>
</template>

<script>
import { mapState } from "vuex";

import PackageList from "../components/BaseInfo/PackageList";
import PackageInput from "../components/BaseInfo/PackageInput";
import License from "../components/BaseInfo/License";
export default {
  name: "Package",
  components: {
    PackageList,
    PackageInput,
    License,
  },
  data() {
    return {
      fetchbuffer: {
        restkey: "",
        mod: "",
        limit: 0,
        qdata: {},
        method: "POST",
      },
      limit: 0,
      EditData: {},
      AmendData: "",
      BaseData: [],
      modelList: [],
      modelRef: [],
      modelExp: [],
      agentList:[],
      agentRef: [],
      agentExp: [],
      BaseClass: [],
      CurrentClass: "",
      HeadRef: [],
      CurrentEdit: -1,
      YesNo: [],
      Ready: false,
      GotParam: false,
      showLic: false,
      LicenseData: [],
      languages:[],
    };
  },
  computed: {
    ...mapState({
      signedinuser: "signedinuser",
    }),
  },
  methods: {
    async GetInfo(mod, qry, verb, qstr) {
      let qryStr = qstr ? qstr : "/backend/staff/";
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
    async XPackage() {
      const xData = await this.GetInfo(
        "",
        "",
        "POST",
        "/backend/packageremove/"
      );
    },
    async GetParam() {
      //          const bData = await this.GetInfo("profiles", "", "POST", "/backend/baseinfo/")
      const Data = await this.GetInfo(
        "",
        "",
        "POST",
        "/backend/basicinformation/"
      );
      this.BaseData = await Data.package_det.package;
      this.modelList = await Data.model_lst.model;
      this.modelRef = await Data.model_ref.model;
      this.modelExp = await Data.model_exp.model;
      this.agentList= await Data.agent_lst.agent;
      this.agentRef = await  Data.agent_ref.agent;
      this.agentExp = await Data.agent_exp.agent;
      this.languages= await Data.language_lst.language;
      this.companyType= await Data.companyType_lst.companyType;
      this.YesNo[0] = this.$t("YesNo.0");
      this.YesNo[1] = this.$t("YesNo.1");
      //          this.BaseData = await Data.staff_rec.staff
      this.GotParam = true;
      console.log(this.agentRef)
    },
    async AddClicked() {
      if (!this.GotParam) {
        await this.GetParam();
      }
      this.toAbort();
      this.AmendData = "A";
    },
    async toUpdate(ev) {
      console.log(ev.agentId)
      if (ev.companyName && ev.runOne && ev.commonPW && ev.agentId) {
        if (!ev.lang){
          ev.lang = 'cn'
        }
        ev.active = ev.bactive === this.$t("YesNo.1") ? 1 : 0;
        //    ev.runOne = this.modelExp[ev.runOne]
        //    ev.runTwo = this.modelExp[ev.runTwo]
        //    ev.runThree = this.modelExp[ev.runThree]
        console.log(ev);
        this.fetchbuffer.qdata = ev;
        const NewData = await this.GetInfo("", "", "PUT", "/backend/package/");
        if (this.AmendData === "A") {
          if (this.BaseData) {
            this.BaseData = [...this.BaseData, NewData[0]];
          } else {
            this.BaseData = NewData;
          }
        }
        if (this.AmendData === "E") {
          this.BaseData = this.BaseData.map((inf) =>
            inf.packageId === ev.packageId ? NewData[0] : inf
          );
        }
        this.AmendData = "";
      } else {
        alert(this.$t("general.incomplete"));
      }
    },
    async toEdit(ev) {
      //            console.log(this.GotParam)
      if (!this.GotParam) {
        await this.GetParam();
      }
      this.EditData = { ...ev };
      this.EditData.bactive = this.YesNo[ev.active];
      this.EditData.runOneExp = this.modelExp[ev.runOne];
      this.EditData.runTwoExp = this.modelExp[ev.runTwo];
      this.EditData.runThreeExp = this.modelExp[ev.runThree];
      this.EditData.agentName = this.agentExp[ev.agentId]
      this.CurrentEdit = ev.packageId;
      this.AmendData = "E";
      //          console.log(this.EditData)
    },
    toAbort() {
      this.EditData.packageId = ""
      this.EditData.companyName = ""
      this.EditData.agentId = ""
      this.EditData.active = 1
      this.EditData.runOne = ""
      this.EditData.runTwo = ""
      this.EditData.runThree = ""
      this.EditData.runOneExp = ""
      this.EditData.runTwoExp = ""
      this.EditData.runThreeExp = ""
      this.CurrentEdit = ""
      this.AmendData = ""
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
    //        await this.GetStaff()
    await this.XPackage()
    await this.GetParam()
    this.Ready = true
  },
};
</script>

<style></style>
