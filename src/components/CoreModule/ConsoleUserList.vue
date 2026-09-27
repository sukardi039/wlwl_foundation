<template>
  <v-container>
    <v-row dense class="pa-0 ma-0" flat v-for="(Data, index) in BaseData" :key="index">
      <v-col
        ><DrillHeader
          :data="Data"
          :paramdata="paramdata"
          :eTime="Data.content.control.eTime"
          :instructor="true"
          @Drill-Reset="drillReset($event)"
      /></v-col>
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
  methods:{
    resetDrill(ev){
      console.log("reset")
      console.log(ev)
    },
    drillReset(ev){
      if (confirm(this.$t('DrillPlatform.reallyReset'))) {
        this.$emit('Drill-Reset', ev)
      }
    }
  }
};
</script>

<style></style>
