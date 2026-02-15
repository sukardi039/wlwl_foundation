<template>
  <v-card
    :img="require('../../assets/signinbackground.png')"
    class="signin-background"
  >
    <v-card-text>
      <v-row>
        <v-col cols="6"></v-col>
        <v-col cols="6">
          <v-row>
            <v-col cols="1"></v-col>
            <v-col cols="10">
              <v-text-field
                background-color="white"
                outlined
                hide-details
                class="pa-3"
                v-model="signininfo.username"
                :label="$t('login.username')"
              ></v-text-field>
              <v-text-field
                background-color="white"
                outlined
                hide-details
                class="pa-3"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                @click:append="show1 = !show1"
                v-model="signininfo.password"
                :label="$t('login.password')"
                clearable
              ></v-text-field>
              <v-row class="text-center login-help" v-if="false">
                <v-col>
                  <helpStub helpSubject="signin" :showSubject="true" />
                </v-col>
              </v-row>
              <v-row class="pa-6"
                ><v-col>
                  <v-btn
                    color="#ddbd82"
                    block
                    text-primary
                    @click.prevent="$emit('sign-in', $event)"
                    v-if="!register"
                  >
                    {{ $t("login.signin") }}
                  </v-btn>
                  <v-btn
                    color="#ddbd82"
                    block
                    text-primary
                    @click.prevent="$emit('register-demo', $event)"
                    v-if="register"
                  >
                    {{ $t("registerDemo") }}
                  </v-btn></v-col
                >
              </v-row></v-col
            >
            <v-col cols="1"></v-col> </v-row
        ></v-col> </v-row
    ></v-card-text>
  </v-card>
</template>

<script>
import HelpStub from "../../helps/HelpStub.vue";
export default {
  components: { HelpStub },
  name: "SignIn",
  props: {
    signininfo: {
      username: "",
      password: "",
    },
    register: false,
  },
  component: {},
  data() {
    return {
      show1: false,
    };
  },
  created() {
    console.log(this.register);
  },
};
</script>

<style></style>
