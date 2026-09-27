<template>
  <v-row>
    <v-col cols="1"></v-col>
    <v-col cols="10" align="center">
      <v-card
        :img="require('../../assets/messagebase.gif')"
        class="pa-0 ma-0 msg-frame"
        height="300px"
        width="900px"
        flat
        align="start"
      >
        <v-row dense class="pa-0 ma-0">
          <v-col cols="4">
            <v-avatar size="300px" class="main-color pa-0 ma-0">
              <v-img :src="avatar" alt="" height="299px" contain />
            </v-avatar>
          </v-col>
          <v-col cols="8" class="msg-text">
            <v-row style="height: 245px" align="center" class="ma-1"
              ><v-col
                ><span v-html="msg" class="msg-text" id="word"> </span></v-col
            ></v-row>
            <v-row style="height: 5px" align="center">
              <v-col cols="1"></v-col>
              <v-col cols="9">
                <v-progress-linear
                :value="(timeout - time)/timeout * 100"
                v-if="signedinuser.instructor<1"
                >
                </v-progress-linear></v-col
              >
              <v-col cols="2"></v-col>
            </v-row>
            <v-row style="height: 50px" class="text-end"
              ><v-col
                ><v-btn
                  rounded
                  color="#ddbd82"
                  @click.stop="btnClicked()"
                  ><span class="msg-text">{{ btnText }}</span></v-btn
                ></v-col
              ></v-row
            >
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-col cols="1"></v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "DrillMessageBox",
  data(){
    return {
        mod: true,
        timeout: 20,
        time: 0,
        timeClock:0,
    }
  },
  props: {
    avatar: "",
    msg: "",
    btnText: "",
  },
  computed: {
    ...mapState({
      signedinuser: "signedinuser",
      paramdata: "paramdata",
    }),
  },
  methods:{
    countDown(){
        this.time=0
        this.timeClock = setInterval(this.checkTime, 1000)
    },
    checkTime(){
      this.time++
      console.log(this.timeout, this.time)
      if (this.time>=this.timeout){
        this.$emit('btn-click')
        if (this.btnText==this.$t("DrillPlatform.noted")){
          clearInterval(this.timeClock)
        } else {
          this.time = 0
        }
      }
    },
    btnClicked(){
      this.time=this.timeout
      this.checkTime()
    }
  },
  created(){
    if (this.signedinuser.instructor<1){
      this.countDown()
    }
  }
};
</script>
<style></style>
