<template
  ><div>
    <v-dialog persistent v-model="mod" fullscreen>
      <v-card :img="require('../../assets/skyline.png')" class="pa-0">
        <v-card-text>
          <v-row style="height: 87vh">
            <v-col>
              <v-row
                ><v-col><br /><br /></v-col
              ></v-row>
                  <DrillMessageBox
                    :avatar="require('../../assets/boss.jpg')"
                    :msg="$t('DrillPlatform.welcomeMessage')+'<br><br>'+$t('DrillPlatform.generalTarget')+'<br>'"
                    :btnText="$t('Drill.understand')"
                    @btn-click="$emit('meetTeam')"
                  />
              <v-row>
                <v-col><br /></v-col
              ></v-row>
            </v-col>
          </v-row>
          <v-row class="pa-0" style="height: 13vh">
            <v-col cols="1"></v-col>
            <v-col cols="8" align="center">
              <v-row class="login-text" align="center">
                <v-col cols="5" class="text-end"
                  ><span>{{ $t("portalname") }}</span></v-col
                >
                <v-divider vertical thickness="3" color="#ddbd82"> </v-divider>
                <v-col cols="7" class="login-title text-start"
                  >                <p style="line-height: 1.4">
                {{ $t("homemessage1") }}<br />
                {{ $t("homemessage2") }}<br />
                {{ $t("homemessage3") }}
                </p>
</v-col
                >
              </v-row>
            </v-col>
            <v-col cols="3"></v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import DrillMessageBox from "./DrillMessageBox";
export default {
  name: 'DrillMeetBoss_2',
  components:{
    DrillMessageBox,
  },
  data() {
    return {
      mod: "OK",
    };
  },
  props:{
    company:'',
  },
  methods: {
    sHeight(v) {
      return (screen.height - 190) * v.toFixed() + "px";
    },
  },
};
</script>

<style></style>
