<template>
  <v-container class="pa-6">
    <BackendUserList
      :BaseData="BaseData"
      :MaxLevel="signedinuser.level"
      :AmendCode="AmendCode"
      v-if="!AmendCode"
      @AddClicked="toAdd()"
      @Row-Clicked="toEdit($event)"
    />
    <BackendUserInput
      :Data="EditData"
      :LevelList="LevelList"
      :AmendCode="AmendCode"
      :YesNo="YesNo"
      v-if="AmendCode"
      @Abort-Clicked="toAbort()"
      @Update-Info="toUpdate($event)"
    />
  </v-container>
</template>

<script>
import { mapState } from "vuex";

import BackendUserList from "../components/BaseInfo/BackendUserList";
import BackendUserInput from "../components/BaseInfo/BackendUserInput";
export default {
  name: "BackendUser",
  components: {
    BackendUserList,
    BackendUserInput,
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
        backend: 1,
        classes: "",
      },
      limit: 0,
      Ready: false,
      AmendCode: "",
      EditData: {},
      LevelList: [],
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
    async GetUser() {
      this.BaseData = await this.GetInfo(
        this.signedinuser.level,
        "",
        "POST",
        "/backend/backenduser/"
      );
      let c = 1;
      while (c <= this.signedinuser.level) {
        this.LevelList = [...this.LevelList, c.toString()];
        c++;
      }
      this.YesNo[0] = this.$t("YesNo.0");
      this.YesNo[1] = this.$t("YesNo.1");
    },
    toAdd() {
      this.toAbort();
      this.AmendCode = "A";
    },
    toAbort() {
      this.EditData.userName = "";
      this.EditData.loginName = "";
      this.EditData.loginPassword = "";
      this.EditData.level = -1;
      this.EditData.active = 0;
      this.EditData.instructor = 0;
      this.AmendCode = "";
    },
    toEdit(ev) {
      this.EditData = { ...ev };
      this.EditData.bactive = this.YesNo[ev.active];
      this.AmendCode = "E";
    },
    async toUpdate(ev) {
      if (ev.userName && ev.loginName && ev.loginPassword) {
        ev.active = ev.bactive === this.$t("YesNo.1") ? 1 : 0;
        ev.companyName=''
        ev.instructor=0
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
  },
  async created() {
    await this.GetUser();
    this.Ready = true;
  },
};
</script>

<style></style>
