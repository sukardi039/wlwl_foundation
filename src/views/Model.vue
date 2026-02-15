<template>
  <v-container fluid class="pa-6" v-if="Ready">
    <v-row>
      <v-col>
        <iSelect
          :items="paramData.template_lst.template"
          :label="$t('Template.name')"
          outlined
          v-model="SelectedTemplate"
          @input="ShowModel()"
          i18n="true"
        />
      </v-col>
      <v-col cols="1" v-if="CurrentTemplate && !AmendData"
        ><span class="mdi mdi-plus" @click="toAdd()"></span
      ></v-col>
    </v-row>
    <ModelList
      :BaseData="BaseData"
      :TampData="TemplateData"
      :Param="paramData"
      :CurrentEdit="CurrentEdit"
      v-if="BaseData && !AmendData"
      @Row-Clicked="toEdit($event)"
    />
    <ModelInput
      :Data="ModelData"
      :TempData="TemplateData"
      :AmendData="AmendData"
      :Param="paramData"
      v-if="AmendData"
      @Update-Info="toUpdate($event)"
      @Abort-Clicked="toAbort()"
    />
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import iSelect from "../components/Base/iSelect";

import ModelList from "../components/CoreModule/ModelList";
import ModelInput from "../components/CoreModule/ModelInput";
export default {
  name: "Model",
  components: {
    ModelList,
    ModelInput,
    iSelect,
  },
  data() {
    return {
      paramData: [],
      TemplateList: [],
      TemplateRef: [],
      fetchbuffer: {
        restkey: "",
        mod: "",
        limit: 0,
        qdata: {},
        method: "POST",
      },
      limit: 0,
      SelectedTemplate: "",
      CurrentTemplate: "",
      BaseData: [],
      CurrentEdit: "",
      Ready: false,
      AmendData: "",
      ModelData: {
        modelId: "",
        modelName: "",
        modelTemplate: "",
        modelProduct: "",
        modelContent: {
          product: "",
          ordersToComplete: 0,
          valueToComplete: 0,
          staffs: [],
          environments: [],
          recruits: [],
        },
      },
      TemplateData: {},
      TaskEff: {},
    };
  },
  computed: {
    ...mapState({
      signedinuser: "signedinuser",
    }),
  },
  methods: {
    async GetInfo(mod, qry, verb, qstr) {
      let qryStr = qstr ? qstr : "/backend/baseinfo/";
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
    async GetBase() {
      //          const Data = await this.GetInfo("", "", "POST", "/backend/idx_baseinfo/")
      this.paramData = await this.GetInfo(
        "",
        "",
        "POST",
        "/backend/basicinformation/"
      );
      this.TemplatetList = await this.paramData.template_lst.template;
      this.TemplateRef = await this.paramData.template_ref.template;
      this.TaskEff = await this.paramData.task_eff;
      this.Ready = true;
    },
    async ShowModel() {
      this.BaseData = false;
      this.CurrentTemplate = this.TemplateRef[this.SelectedTemplate];
      this.TemplateData = this.paramData.template_det.template.find(
        (ev) => ev.templateName === this.CurrentTemplate
      );
      this.AmendData = "";
      this.BaseData = await this.GetInfo(
        this.CurrentTemplate,
        "",
        "POST",
        "/backend/model/"
      );
    },
    toEdit(ev) {
      this.ModelData = { ...ev };
      this.CurrentEdit = ev.modelId;
      this.AmendData = "E";
    },
    async toAdd() {
      await this.toAbort();
      this.AmendData = "A";
    },
    async toAbort() {
      this.CurrentEdit = "";
      this.AmendData = "";
      this.ModelData.modelId = "";
      this.ModelData.modelName = "";
      this.ModelData.modelTemplate = this.CurrentTemplate;
      this.ModelData.modelProduct = "";
      const content = await this.GetInfo(
        this.CurrentTemplate,
        "",
        "GET",
        "/backend/model/"
      );
      this.ModelData.modelContent = { ...content };
    },
    async toUpdate(ev) {
      if (ev.modelName && ev.modelContent.ordersToComplete > 0) {
        ev.modelContent = JSON.stringify(ev.modelContent); // modelContent itself is in json format
        this.fetchbuffer.qdata = ev;
        const NewData = await this.GetInfo("", "", "PUT", "/backend/model/");
        if (this.AmendData === "A") {
          if (this.BaseData) {
            this.BaseData = [...this.BaseData, NewData[0]];
          } else {
            this.BaseData = NewData;
          }
        }
        if (this.AmendData === "E") {
          //                    console.log(this.BaseData)
          this.BaseData = this.BaseData.map((inf) =>
            inf.modelId === ev.modelId ? NewData[0] : inf
          );
          //                    console.log(this.BaseData)
        }
        this.AmendData = "";
      } else {
        alert(this.$t("general.incomplete"));
      }
    },
  },
  async created() {
    this.BaseData = false;
    await this.GetBase();
  },
};
</script>

<style></style>
