<template>
  <v-container>
      <v-card>
          <v-card-title>
              <v-row dense>
                  <v-col>
                    {{$t('DrillReport.impact-'+impactType)}}
                  </v-col>
              </v-row>
          </v-card-title>
          <v-card-text>
              <v-row dense>
                <v-col cols="1"></v-col>
                <v-col cols="7">
                  {{$t('DrillReport.impact-'+impactType+'-explain')}}
                </v-col>
                <v-col colsd="3"></v-col>
                <v-col cols="1"></v-col>
              </v-row>
              <v-row dense>
                <v-col cols="1"></v-col>
                <v-col cols="7">
                  <strong>{{$t('DrillReport.impact-'+impactType+'-explain-'+impactAccurate(impactType))}}</strong>
                </v-col>
                <v-col cols="4">
                  <v-row dense class="text-center">
                    <v-col cols="7">{{$t('DrillReport.impact-impact')}}</v-col>
                    <v-col cols="5">{{$t('DrillReport.impact-freq')}}</v-col>
                  </v-row>
                  <v-row dense class="text-center align-center">
                    <v-col cols="7"><v-btn width="100%" :color="accurateColor(impactAccurate(impactType))">{{$t('DrillReport.impact-'+impactAccurate(impactType))}}</v-btn></v-col>
                    <v-col cols="5"><strong>{{impactFreq(impactType)}}</strong></v-col>
                  </v-row>
                </v-col>
              </v-row>
          </v-card-text>
      </v-card>          
  </v-container>
</template>

<script>
export default {
    name: "ReportStyleDetail",
    data() {
      return{
      } 
    },
    props: {
      data: {},
      impactType: "",
    },
    methods: {
      accurateColor(v) {
        let c = "";
        if (v == 'VH') {
          c = "#27AE60";
        } else if (v == 'MH') {
          c = "#2ECC71";
        } else if (v == 'ML') {
          c = "#F1C40F";
        } else if (v == 'VL') {
          c = "#F39C12";
        } else if (v == 'B') {
          c = "#E74C3C";
        } else {
          c = "#FFFFFF";
        }
        return c;
      },
      impactFreq(t){
          return this.data.content.analysis.action[t].count
      },
      impactAccurate(t){
          let v = 0
          let c = 'N'
          let s = this.data.content.analysis.action[t].count
          let e = this.data.content.analysis.action[t].positive
          if (s>0 && e>0){
              v = e/s*100
              if (v>75) {
                c = 'VH'
              } else if (v > 50) {
                c = 'MH'
              } else if (v > 25) {
                c = 'ML'
              } else if (v > 0) {
                c = 'VL'
              } else {
                c = 'B'
              }
          }
          return c
      },
    } 
}
</script>

<style>

</style>