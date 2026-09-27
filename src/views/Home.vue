<template>
  <v-container class="pa-1" v-if="signedinuser.level > 0">
    <v-card
    :img="require('../assets/skyline.png')"
    :height="sHeight(1)">
    <v-card-text>
    <v-row style="height: 78vh" align="center">
      <v-col class="text-center"><h1>{{ $t("homeheading") }}</h1></v-col>
    </v-row>
          <v-row dense class="pa-0" style="height: 15vh">
            <v-col cols="1"></v-col>
            <v-col cols="10">
              <v-row class="login-text text-end" align="center">
                <v-col cols="4"
                  ><span>{{ $t("portalname") }}</span></v-col
                >
                <v-divider vertical thickness="3" color="#ddbd82"> </v-divider>
                                <v-col cols="8" class="login-title text-start"
                  >                <span style="line-height: 1.4">
                  {{ $t("homemessage1") }}<br v-if="$t('homemessage2')" />
                  {{ $t("homemessage2") }}<br v-if="$t('homemessage3')" />
                  {{ $t("homemessage3") }}
                </span>
</v-col
                >

              </v-row>
            </v-col>
            <v-col cols="1"></v-col>
          </v-row></v-card-text>
    </v-card>
    <!-- below are the old codes -->
    <!-- <h1>{{ $t("homeheading") }}</h1>
    <br />
    <img src="../assets/leadership.png" width="100%" />
    <br /><br />
    <h2>{{ $t("homemessage") }}</h2> -->
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      fetchbuffer: {
        restkey: "",
        mod: "",
        limit: 0,
        qdata: {},
        method: "POST",
      },
      ready: false,
    };
  },
  computed: {
    ...mapState({
      signedinuser: "signedinuser",
    }),
  },
  methods: {
    sHeight(v) {
      return (screen.height - 190)*v.toFixed() + "px";
    },
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
    async readParam() {
      this.baseParam = await this.GetInfo(
        "",
        "",
        "POST",
        "/backend/basicinformation/"
      );
      this.$store.commit("setParamdata", this.baseParam);
      this.ready = true;
    },
  },
  async created() {
    await this.readParam();
    if (this.signedinuser.level == 0) {
      // setTimeout(() => {
      //   document.getElementById("drillPage").click();
      // }, 1000);
      document.getElementById("drillPage").click();
    }
  },
};
</script>

<style></style>
