<template>
  <v-app id="inspire">
    <v-navigation-drawer v-if="signedin == true" v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            {{ $t("menuname") }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ signedinuser.userName }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <Authentication
        v-if="!authenticated"
        :authenticated.sync="authenticated"
        :user-id="signedinuser.userId"
        @signed-off="signedOff()"
      />
      <Navigation
        v-if="(drilldata.testInProgress !== 1 || true)&&authenticated"
        @signed-off="signedOff()"
        @Menu-Clicked="changeHeading($event)"
      />
    </v-navigation-drawer>

    <v-app-bar
      height="30px"
      v-if="signedin == true"
      :color="app_bar_color"
      :class="app_bar_font_color"
      app
    >
      <v-app-bar-nav-icon
        :color="app_bar_icon_color"
        v-if="signedin && (signedinuser.level > 0 || signedinuser.instructor > 0)"
        @click="signedin ? (drawer = !drawer) : (drawer = false)"
      ></v-app-bar-nav-icon>

      <v-toolbar-title
        :color="app_bar_font_color"
        v-if="!signedin || (signedinuser.level > 0 && false)"
        >{{ $t(heading) }}</v-toolbar-title
      >

      <v-spacer></v-spacer>
      <LanguageSwitcher
        class="pl-3 pr-4"
        :fontColor="app_bar_font_color"
      />
      <span class="app-color" @click.stop="signedOff()">{{
        $t("Nav.Logout")
      }}</span>
      <v-img
        v-if="false"
        contain
        src="./assets/logo.gif"
        max-height="30"
        max-width="70"
        class="pl-0"
      ></v-img>
    </v-app-bar>

    <v-main>
      <Login v-if="!signedin" @signed-in="signedIn($event)" />
      <router-view v-if="signedin" @signed-off="console.log('Signedoff')" />
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";

import LanguageSwitcher from "./components/LanguageSwitcher";
import Authentication from "./components/Login/authentication";
import Navigation from "./components/Navigation";
import SalesFunal from "./components/SalesFunal";
import Login from "./views/Login";

export default {
  data: () => ({
    drawer: false,
    signedin: false,
    datetoday: "",
    right: null,
    app_bar_color: "#434b5e",
    app_bar_font_color: "#ddbd82",
    app_bar_icon_color: "#ddbd82",
    heading: "portalname",
    authenticated: false,
  }),
  components: {
    LanguageSwitcher,
    Authentication,
    Login,
    Navigation,
    SalesFunal,
  },
  computed: {
    ...mapState({
      signedinuser: "signedinuser",
      drilldata: "drilldata",
    }),
  },
  meta:{
    title:"xxx",
  },
  methods: {
    datestoday() {
      this.datetoday = new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, "-");
    },
    signedIn(ev) {
      this.$store.commit("setSignedinuser", ev);
      document.cookie = "session=" + ev.sessionid;
      document.cookie = "language = " + this.$i18n.locale;
      this.signedin = true;
      if (ev.level==0) {
        this.authenticated = true;
      }
      this.drawer = !this.authenticated;
      // console.log(document, document.getElementById('entryPage'))
      // document.getElementById("entryPage").click();
    },
    async signedOff() {
      const res = await fetch("backend/staffsignin/", {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(this.signedinuser),
      });
      //      if (res.status === 200){
      document.cookie =
        "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      this.$store.commit("setSignedinuser", {});
      this.drawer = false;
      this.signedin = false;
      this.authenticated = false;
      //      }
      this.changeHeading();
    },
    changeHeading(ev) {
      this.heading = ev ? ev : "portalname";
    },
  },
  mounted() {
    this.datestoday();
  },
  created() {
    this.drawer = false;
  },
};
</script>
<style lang="sass">
@import '../node_modules/@fontsource/roboto/index.css'
</style>
