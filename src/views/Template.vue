<template>
  <v-container fluid class="pa-6" v-if="Ready">
    <TemplateList
      :BaseData="BaseData"
      @Row-Clicked="toEdit($event)"
      @AddClicked="AddClicked()"
      v-if="!AmendData"
    />
    <TemplateInput
      :Data="EditData"
      :YesNo="YesNo"
      v-if="AmendData"
      @Update-Info="toUpdate($event)"
      @Abort-Clicked="toAbort()"
    />
  </v-container>
</template>

<script>
import { mapState } from "vuex";

import TemplateList from "../components/BaseInfo/TemplateList";
import TemplateInput from "../components/BaseInfo/TemplateInput";
export default {
  name: "Template",
  components: {
    TemplateList,
    TemplateInput,
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
      EditData: {
        templateId: "",
        templateName: "",
        templateDescription: "",
        numberOfStaff: 10,
        numberOfDays: 20,
        duration: 20,
        environmentEvents: 0,
        recruits: 2,
        report: 0,
      },
      AmendData: "",
      BaseData: [],
      BaseClass: [],
      CurrentClass: "",
      HeadRef: [],
      CurrentEdit: -1,
      Ready: false,
      YesNo: [],
    };
  },
  computed: {
    ...mapState({
      signedinuser: "signedinuser",
    }),
  },
  methods: {
    async GetInfo(mod, qry, verb, qstr) {
      let qryStr = qstr ? qstr : "/backend/template/";
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
    async GetTemplate() {
      this.BaseData = await this.GetInfo("", "", "POST", "/backend/template/");
      this.YesNo[0] = this.$t("YesNo.0");
      this.YesNo[1] = this.$t("YesNo.1");
      this.Ready = true;
    },
    AddClicked() {
      this.toAbort();
      this.AmendData = "A";
    },
    async toUpdate(ev) {
      if (
        ev.templateDescription &&
        ev.duration &&
        ev.numberOfStaff &&
        ev.numberOfDays &&
        ev.environmentEvents
      ) {
        ev.report = (ev.report === this.$t('YesNo.1'))?1:0;
        this.fetchbuffer.qdata = ev;
        const NewData = await this.GetInfo("", "", "PUT", "/backend/template/");
        if (this.AmendData === "A") {
          if (this.BaseData) {
            this.BaseData = [...this.BaseData, NewData[0]];
          } else {
            this.BaseData = NewData;
          }
        }
        if (this.AmendData === "E") {
          this.BaseData = this.BaseData.map((inf) =>
            inf.name === ev.name ? NewData[0] : inf
          );
        }
        this.AmendData = "";
      } else {
        alert(this.$t("general.incomplete"));
      }
    },
    toEdit(ev) {
      this.EditData = { ...ev };
      this.CurrentEdit = ev.templateName;
      this.EditData.report = this.YesNo[ev.report]
      this.AmendData = "E";
      //          console.log(this.EditData)
    },
    toAbort() {
      this.EditData.templateName = "";
      this.EditData.templateDescription = "";
      this.EditData.duration = 1;
      this.EditData.name = "";
      this.EditData.numberOfStaff = 10;
      this.EditData.numberOfDays = 20;
      this.EditData.environmentEvents = 0;
      this.EditData.recruits = 2;
      this.EditData.report = 0;
      this.CurrentEdit = "";
      this.AmendData = "";
    },
  },
  async created() {
    await this.GetTemplate();
  },
};
</script>

<style></style>
