<template>
  <v-container>
    <v-row dense>
      <v-col cols="4">{{$t('Package.name')}}</v-col>
      <v-col cols="2">{{$t('Package.from')}}</v-col>
      <v-col cols="2">{{$t('Package.till')}}</v-col>
      <v-col cols="2">{{$t('Package.active')}}</v-col>
      <v-col cols="2"></v-col>
    </v-row>
    <v-row dense class="align-center">
      <v-col cols="4">{{BaseData.companyName}}</v-col>
      <v-col cols="2">{{BaseData.availableFrom}}</v-col>
      <v-col cols="2">{{BaseData.availableTill}}</v-col>
      <v-col cols="2">{{$t("YesNo."+BaseData.active)}}</v-col>
      <v-col cols="2"><v-btn rounded v-if="BaseData.active==0" @click.stop="$emit('Activate', BaseData)">{{$t('Package.activate')}}</v-btn></v-col>
    </v-row>
    <v-row>
        <v-col></v-col>
    </v-row>
    <v-row dense>
        <v-col cols="3"></v-col>
        <v-col cols="5">{{$t('Model.name')}}</v-col>
        <v-col cols="2">{{$t('Package.unlocked')}}</v-col>
        <v-col cols="2"></v-col>
    </v-row>
    <v-row dense class="align-center" v-if="BaseData.runOne">
        <v-col cols="3">{{$t('Package.runOne')}}</v-col>
        <v-col cols="5">{{BaseData.runOneName}}</v-col>
        <v-col cols="2">{{$t('YesNo.'+BaseData.activeOne)}}</v-col>
        <v-col cols="2"><v-btn rounded v-if="BaseData.active==1 && BaseData.activeOne==0" @click.stop="$emit('UnlockOne', BaseData)">{{$t('Package.unlock')}}</v-btn></v-col>
    </v-row>
    <v-row dense v-else>
        <v-col>{{$t("Package.empty")}}</v-col>
    </v-row>
    <v-row dense class="align-center" v-if="BaseData.runTwo">
        <v-col cols="3">{{$t('Package.runTwo')}}</v-col>
        <v-col cols="5">{{BaseData.runTwoName}}</v-col>
        <v-col cols="2">{{$t('YesNo.'+BaseData.activeTwo)}}</v-col>
        <v-col cols="2"><v-btn rounded v-if="BaseData.active==1 && BaseData.activeOne==1 && BaseData.activeTwo==0" @click.stop="$emit('UnlockTwo', BaseData)">{{$t('Package.unlock')}}</v-btn></v-col>
    </v-row>
    <v-row dense class="align-center" v-if="BaseData.runThree">
        <v-col cols="3">{{$t('Package.runThree')}}</v-col>
        <v-col cols="5">{{BaseData.runThreeName}}</v-col>
        <v-col cols="2">{{$t('YesNo.'+BaseData.activeThree)}}</v-col>
        <v-col cols="2"><v-btn rounded v-if="BaseData.active==1 && BaseData.activeTwo==1 && BaseData.activeThree==0" @click.stop="$emit('UnlockThree', BaseData)">{{$t('Package.unlock')}}</v-btn></v-col>
    </v-row>
  </v-container>
</template>

<script>
import DrillHeader from "../CoreModule/DrillHeader";
export default {
  name: "FrontendUserList",
  components: {
    DrillHeader,
  },
  data() {
    return {};
  },
  props: {
    BaseData: [],
    MaxLevel: 0,
    AmendCode: "",
    YesNo: [],
    paramdata: [],
  },
  methods: {
    resetDrill(ev) {
      console.log("reset");
      console.log(ev);
    },
  },
};
</script>

<style></style>
