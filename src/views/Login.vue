<template>
  <div>
    <v-card :height="sHeight()" :img="require('../assets/loginbackground.png')">
      <v-card-text>
        <v-row
          ><v-col><br /><br /></v-col
        ></v-row>
        <v-row>
          <v-col cols="1"></v-col>
          <v-col cols="8">
            <v-row class="login-text text-end" align="center">
              <v-col cols="4"
                ><span>{{ $t("portalname") }}</span></v-col
              >
              <v-divider vertical thickness="3" color="#ddbd82"> </v-divider>
              <v-col cols="8" class="login-title text-start">
                <p style="line-height: 1.4">
                  {{ $t("homemessage1") }}<br v-if="$t('homemessage2')" />
                  {{ $t("homemessage2") }}<br v-if="$t('homemessage3')" />
                  {{ $t("homemessage3") }}
                </p>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="3"></v-col>
        </v-row>
        <v-row
          ><v-col><br /></v-col
        ></v-row>

        <v-layout row wrap align-center>
          <v-flex>
            <v-row>
              <v-col cols="3"></v-col>
              <v-col cols="6">
                <SignIn
                  v-if="needSignIn"
                  :signininfo="signininfo"
                  :register="register"
                  @sign-in="SigningIn($event)"
                  @register-demo="RegisterDemo($event)"
                  @Help="subject = 'signin'"
                />
              </v-col>
              <v-col cols="3"></v-col>
            </v-row>
            <v-row class="text-center" v-if="false">
              <v-col
                ><span
                  style="color: #ddbd82"
                  @click.stop="register = true"
                  v-if="!register"
                  >{{ $t("registerDemo") }}</span
                ><span
                  style="color: #ddbd82"
                  @click.stop="register = false"
                  v-if="register"
                  >{{ $t("dontRegister") }}</span
                ></v-col
              >
            </v-row>
          </v-flex>
        </v-layout>
        <v-row class="footer pa-1">
          <v-col class="text-center" style="font-size: 0.8em; color: white;">{{ida.company}} {{ida.reg}}<a v-bind:href="ida.url">{{ida.ida}}</a> <img :src="ida.polreg" width="10" /> <a v-bind:href="ida.polurl">{{ida.pol}}</a></v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
      </v-card-actions>
    </v-card>
  </div>
</template>
<style scoped>
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  color: white;
  text-align: center;
}
</style>
<script>
import SignIn from "../components/Login/SignIn";

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export default {
  name: "Login",
  data() {
    return {
      signininfo: {
        username: "",
        password: "",
      },
      userinfo: {},
      needSignIn: false,
      subject: "",
      register: false,
      ida:{},
    };
  },
  components: {
    SignIn,
  },
  methods: {
    sHeight() {
      return (screen.height - 100).toFixed() + "px";
    },
    // async SigningIn(ev) {
    //   if (this.signininfo.username && this.signininfo.password) {
    //      const ret = await fetch("backend/staffsignin/", {
    //       method: "POST",
    //       cache: "no-cache",
    //       headers: {
    //         "content-type": "application/json",
    //       },
    //       body: JSON.stringify(this.signininfo),
    //     })
    //       .then((response) =>
    //         response.json()
    //       )
    //       .then((data) => {
    //         if (data.loginName == this.signininfo.username) {
    //           this.userinfo = data;
    //           //              console.log("userinfo", this.userinfo);
    //           this.$emit("signed-in", this.userinfo);
    //         }
    //       })
    //       .catch((error) => {
    //         console,log('ret', ret)
    //         console.error("error", error);
    //         var err = ret.status
    //         alert(this.$t("login.error_" + err) + " (" + err + ")");
    //       });
    //       console.log(ret)
    //   } else {
    //     alert(this.$t("login.incomplete"));
    //   }
    // },
    async SigningIn(ev) {
      if (this.signininfo.username && this.signininfo.password) {
        const res = await fetch("backend/staffsignin/", {
          method: "POST",
          cache: "no-cache",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(this.signininfo),
        });
        if (res.status === 200) {
          this.userinfo = await res.json();
          this.$emit("signed-in", this.userinfo);
          const lang = this.userinfo.lang;
          if (lang) {
            this.$i18n.locale = lang;
          }
        } else if (res.status === 201) {
          alert(this.$t("login.need_verification"));
        } else {
          alert(this.$t("login.error_" + res.status) + " (" + res.status + ")");
        }
      } else {
        alert(this.$t("login.incomplete"));
      }
    },
    async RegsiterDemo(ev) {
      if (this.signininfo.username && this.signininfo.password) {
        const res = await fetch("backend/registerdemo/", {
          method: "PUT",
          cache: "no-cache",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(this.signininfo),
        });
        if (res.status === 200) {
          this.userinfo = await res.json();
          this.$emit("signed-in", this.userinfo);
        } else if (res.status === 201) {
          alert(this.$t("login.need_verification"));
        } else {
          alert(this.$t("login.error_" + res.status) + " (" + res.status + ")");
        }
      } else {
        alert(this.$t("login.incomplete"));
      }
    },
    async AutoSignIn(sessid) {
      await fetch("backend/staffsignin/?" + sessid, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.loginName) {
            this.userinfo = data;
            this.$emit("signed-in", this.userinfo);
            //            const lang = getCookie("language");
            const lang = this.userinfo.lang;
            if (lang) {
              this.$i18n.locale = lang;
            }
          }
        })
        .catch((error) => {
          console.error(error);
          this.needSignIn = true;
        });
    },
    // async AutoSignIn(sessid){
    //     const res = await fetch("backend/staffsignin/?"+sessid, {
    //       method: "GET",
    //       headers: {
    //         "content-type": "application/json",
    //       },
    //     });
    //     if (res.status === 200) {
    //       this.userinfo = await res.json()
    //       this.$emit('signed-in', this.userinfo)
    //       const lang = getCookie("language")
    //       if (lang){
    //         this.$i18n.locale = lang
    //       }
    //     } else {
    //       this.needSignIn = true
    //     }

    // }
    async getReg(){
              const res = await fetch("backend/registration.json", {
          method: "GET",
          cache: "no-cache",
          headers: {
            "content-type": "application/text",
          },
        });
        if (res.status === 200) {
this.displayAll(await res.json())        }
    },
    displayAll(data){
      // alert(data);
      // console.log(data)
      this.ida = data
    document.title = this.ida.company;
    }
  },
  async created() {
    await this.getReg()
    const sessid = getCookie("session");
    if (sessid) {
      this.AutoSignIn(sessid);
    } else {
      this.needSignIn = true;
    }
  },
};
</script>
