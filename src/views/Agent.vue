<template>
  <v-container fluid class="pa-6" v-if="Ready">
    <AgentList
      :BaseData="BaseData"
      :modelExp="modelExp"
      :YesNo="YesNo"
      v-if="!AmendData"
      @Row-Clicked="toEdit($event)"
      @AddClicked="AddClicked()"
      @License-Clicked="showLicense($event)"
    />
    <AgentInput
      :Data="EditData"
      :modelList="modelList"
      :modelRef="modelRef"
      :YesNo="YesNo"
      v-if="AmendData"
      @Update-Info="toUpdate($event)"
      @Abort-Clicked="toAbort()"
    />
    <LicenseBatch
      :data="BatchList"
      :ShowBatch="ShowBatch"
      :agentName="CurrentAgent"
      :agentId="CurrentAgentId"
      @Close-Batch="ShowBatch = false"
      @Add-Batch="AddBatch($event)"
      @Batch-Clicked="BatchClicked($event)"
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

import AgentList from "../components/BaseInfo/AgentList";
import AgentInput from "../components/BaseInfo/AgentInput";
import LicenseBatch from "../components/BaseInfo/LicenseBatch";
import License from "../components/BaseInfo/License";
export default {
  name: "Agent",
  components: {
    AgentList,
    AgentInput,
    LicenseBatch,
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
      BaseClass: [],
      CurrentClass: "",
      HeadRef: [],
      CurrentEdit: -1,
      YesNo: [],
      Ready: false,
      GotParam: false,
      BatchList: [],
      ShowBatch: false,
      CurrentAgent: "",
      CurrentAgentId: "",
      showLic: false,
      LicenseData: [],
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
    async GetParam() {
      //          const bData = await this.GetInfo("profiles", "", "POST", "/backend/baseinfo/")
      const Data = await this.GetInfo(
        "",
        "",
        "POST",
        "/backend/basicinformation/"
      );
      this.BaseData = await Data.agent_det.agent;
      //   this.modelList = await Data.model_lst.model;
      //   this.modelRef = await Data.model_ref.model;
      //   this.modelExp = await Data.model_exp.model;
      this.YesNo[0] = this.$t("YesNo.0");
      this.YesNo[1] = this.$t("YesNo.1");
      //          this.BaseData = await Data.staff_rec.staff
      this.GotParam = true;
    },
    async AddClicked() {
      if (!this.GotParam) {
        await this.GetParam();
      }
      this.toAbort();
      this.AmendData = "A";
    },
    async toUpdate(ev) {
      if (ev.agentName && ev.availableTill) {
        ev.active = ev.bactive === this.$t("YesNo.1") ? 1 : 0;
        //    ev.runOne = this.modelExp[ev.runOne]
        //    ev.runTwo = this.modelExp[ev.runTwo]
        //    ev.runThree = this.modelExp[ev.runThree]
        console.log(ev);
        this.fetchbuffer.qdata = ev;
        const NewData = await this.GetInfo("", "", "PUT", "/backend/agent/");
        if (this.AmendData === "A") {
          if (this.BaseData) {
            this.BaseData = [...this.BaseData, NewData[0]];
          } else {
            this.BaseData = NewData;
          }
        }
        if (this.AmendData === "E") {
          this.BaseData = this.BaseData.map((inf) =>
            inf.agentId === ev.agentId ? NewData[0] : inf
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
      this.CurrentEdit = ev.agentId;
      this.AmendData = "E";
      //          console.log(this.EditData)
    },
    toAbort() {
      this.EditData.agentId = "";
      this.EditData.agentName = "";
      this.EditData.active = 1;
      this.EditData.availableTill = "";
      this.CurrentEdit = "";
      this.AmendData = "";
    },
    async showLicense(v) {
      const Data = await this.GetInfo(
        v.agentId,
        "",
        "POST",
        "/backend/licensebatch/"
      );
      this.BatchList = await Data;
      this.ShowBatch = true;
      this.CurrentAgent = v.agentName;
      this.CurrentAgentId = v.agentId;
    },
    async AddBatch(b) {
      this.fetchbuffer.qdata = b;
      const Data = await this.GetInfo(
        b.agentId,
        "",
        "PUT",
        "/backend/licensebatch/"
      );
      this.BatchList = Data;
      await this.GetParam();
    },
    async BatchClicked(v) {
      const Data = await this.GetInfo(
        v.batchId,
        "",
        "POST",
        "/backend/license/"
      );
      this.LicenseData = await Data;
      this.showLic = true;
    },
  },
  async created() {
    //        await this.GetStaff()
    await this.GetParam();
    this.Ready = true;
  },
};
</script>

<style></style>
