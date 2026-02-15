<template>
  <v-dialog persistent v-model="dialog" width="80%">
    <template v-slot:activator="{ on, attrs }">
        <span
            class="mdi mdi-help-circle-outline"
            text
            dense
            slot="activator"
            v-on="on"
            v-bind="attrs"
            @click.stop="start_help"
        ></span>
        <span v-if="showSubject" @click.stop="start_help"> {{ $t("Helps." + helpSubject + "-header") }}</span>
    </template>
    <v-card v-if="subject">
      <v-toolbar dense>
        {{ $t("Helps." + subject + "-header") }}
        <v-spacer></v-spacer>
        <span
          class="mdi mdi-close align-center justify-end"
          @click="end_help"
        ></span>
      </v-toolbar>
      <v-container v-if="subject='signin'">
        <Signin_help />        
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import Signin_help from "./Singin_help";
export default {
  name: "HelpStub",
  components: {
    Signin_help,
  },
  data() {
    return {
      subject: "",
      dialog: false,
    };
  },
  props: {
    helpSubject: "",
    showSubject:false
  },
  methods:{
    start_help(){
        this.subject=this.helpSubject
        this.dialog=true
//        console.log(this.dialog, this.helpSubject, this.subject)
    },
    end_help(){
        this.dialog=false
        this.subject=''
//        console.log(this.dialog, this.helpSubject, this.subject)
    }
  }
};
</script>

<style></style>
