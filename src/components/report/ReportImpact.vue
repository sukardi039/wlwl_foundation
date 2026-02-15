<template>
  <v-container>
      <v-container class="report-frame">
        <v-row  class="report-result-spacer">
          <v-col>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="1"></v-col>
          <v-col>
            <v-card width="100%">
              <v-card-text>
                <h2>{{$t('DrillReport.impact-title')}}</h2>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="1"></v-col>
        </v-row>
        <v-row>
          <v-col cols="1"></v-col>
          <v-col>
            <v-card width="100%">
              <v-card-text>
                <v-row class="align-center">
                    <v-col cols="1"></v-col>
                    <v-col><h3>{{$t('DrillReport.impact-explain')}}:</h3></v-col>
                    <v-col cols="1"></v-col>
                </v-row>
                <v-row>
                    <v-col cols="1"></v-col>
                    <v-col cols="2"><h3>{{$t('DrillReport.impact-impact')}}:</h3></v-col>
                    <v-col>{{$t('DrillReport.impact-impact-explain')}}</v-col>
                    <v-col cols="1"></v-col>
                </v-row>
                <v-row>
                    <v-col cols="1"></v-col>
                    <v-col cols="2"><h3>{{$t('DrillReport.impact-freq')}}:</h3></v-col>
                    <v-col>{{$t('DrillReport.impact-freq-explain')}}</v-col>
                    <v-col cols="1"></v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="1"></v-col>
        </v-row>
        <v-row>
            <v-col></v-col>
        </v-row>
        <v-row>
            <v-col cols="1"></v-col>
            <v-col>
                <v-card>
                    <v-card-text>
                        <v-row>
                            <v-col cols="1"></v-col>
                            <v-col>
                                <Report-impact-detail
                                    :data="data"
                                    impactType="meeting"
                                />
                            </v-col>
                            <v-col cols="1"></v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="1"></v-col>
                            <v-col>
                                <Report-impact-detail
                                    :data="data"
                                    impactType="team-encouragement"
                                />
                            </v-col>
                            <v-col cols="1"></v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="1"></v-col>
                            <v-col>
                                <Report-impact-detail
                                    :data="data"
                                    impactType="send-email"
                                />
                            </v-col>
                            <v-col cols="1"></v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="1"></v-col>
        </v-row>
      </v-container>
  </v-container>
</template>

<script>
import ReportImpactDetail from "./ReportImpactDetail.vue";
export default {
    name: "ReportStyle",
    components:{
      ReportImpactDetail,
    },
    data() {
      return{
      } 
    },
    props: {
      data: {},
    },
    methods: {
      valueColor(v) {
        let c = "";
        if (v > 80) {
          c = "#27AE60";
        } else if (v > 60) {
          c = "#2ECC71";
        } else if (v > 40) {
          c = "#F1C40F";
        } else if (v > 20) {
          c = "#F39C12";
        } else {
          c = "#E74C3C";
        }
        return c;
      },
      deviate(z, t) {
        let c = 'NA'
        if (t > 0){
            let v = z/t*100
            if (v >= 75) {
                c = 'VH'
            } else if (v >= 50){
                c = 'MH'
            } else if (v >= 25) {
                c = 'ML'
            } else if (v > 0){
                c = "VL"
            } else {
                c = 'EX'
            }
        }
        return c
      },
    } 
}
</script>

<style>

</style>