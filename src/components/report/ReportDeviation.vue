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
                <h2>{{$t('DrillReport.deviate-title')}}</h2>
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
                    <v-col><h3>{{$t('DrillReport.deviate-explain')}}:</h3></v-col>
                    <v-col cols="1"></v-col>
                </v-row> 
                <v-row >
                    <v-col cols="1"></v-col>
                    <v-col cols="2"><h3>{{$t('DrillReport.deviate-desired')}}:</h3></v-col>
                    <v-col><h4>{{$t('DrillReport.deviate-desired-explain')}}</h4></v-col>
                    <v-col cols="1"></v-col>
                </v-row>              
                <v-row>
                    <v-col cols="1"></v-col>
                    <v-col cols="2"><h3>{{$t('DrillReport.deviate-intended')}}:</h3></v-col>
                    <v-col><h4>{{$t('DrillReport.deviate-intended-explain')}}</h4></v-col>
                    <v-col cols="1"></v-col>
                </v-row>              
                <v-row>
                    <v-col cols="1"></v-col>
                    <v-col cols="2"><h3>{{$t('DrillReport.deviate-actual')}}:</h3></v-col>
                    <v-col><h4>{{$t('DrillReport.deviate-actual-explain')}}</h4></v-col>
                    <v-col cols="1"></v-col>
                </v-row>              
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
                        <v-row dense>
                            <v-col cols="1"></v-col>
                            <v-col>
                                <v-row>
                                    <v-col>
                                        <h3>{{$t('DrillReport.deviate-dva-title')}}</h3>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="1"></v-col>
                        </v-row>
                        <v-row dense>
                            <v-col cols="1"></v-col>
                            <v-col>
                                <v-row dense class="text-center">
                                    <v-col>
                                        <span  style="font-weight:bold;">{{$t('DrillReport.deviate')}}</span>
                                    </v-col>
                                </v-row>
                                <v-row dense class="text-center">
                                    <v-col cols="2"><span style="font-weight:bold;">{{$t('DrillReport.deviate-desired')}}</span></v-col>
                                    <v-col>
                                    <v-progress-linear
                                        background-color="grey lighten-2"
                                        :value="100"
                                        :color="valueColor((data.content.analysis.style.desire_actual.positive/data.content.analysis.style.desire_actual.count)*100)"
                                        height="30"
                                    >
                                    <template>
                                        <strong class="report-result-initial">{{((data.content.analysis.style.desire_actual.negative/data.content.analysis.style.desire_actual.count)*100).toFixed(2)}}%</strong>
                                    </template>
                                    </v-progress-linear>                        
                                    </v-col>
                                    <v-col cols="2"><span style="font-weight:bold;">{{$t('DrillReport.deviate-actual')}}</span></v-col>
                                </v-row>
                                <v-row dense>
                                    <v-col>{{$t('DrillReport.deviate-dva-explain')}}
                                    </v-col>
                                    <v-col><span style="font-weight:bold;">{{$t('DrillReport.deviate-dva-'+deviate(data.content.analysis.style.desire_actual.negative, data.content.analysis.style.desire_actual.count))}}</span></v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="1"></v-col>
                        </v-row>
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
                        <v-row dense>
                            <v-col cols="1"></v-col>
                            <v-col>
                                <v-row>
                                    <v-col>
                                        <h3>{{$t('DrillReport.deviate-iva-title')}}</h3>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="1"></v-col>
                        </v-row>
                        <v-row dense>
                            <v-col cols="1"></v-col>
                            <v-col>
                                <v-row dense class="text-center">
                                    <v-col>
                                        <span  style="font-weight:bold;">{{$t('DrillReport.deviate')}}</span>
                                    </v-col>
                                </v-row>
                                <v-row dense class="text-center">
                                    <v-col cols="2"><span style="font-weight:bold;">{{$t('DrillReport.deviate-intended')}}</span></v-col>
                                    <v-col>
                                    <v-progress-linear
                                        background-color="grey lighten-2"
                                        :value="100"
                                        :color="valueColor((data.content.analysis.style.intent_actual.positive/data.content.analysis.style.intent_actual.count)*100)"
                                        height="30"
                                    >
                                    <template>
                                        <strong class="report-result-initial">{{((data.content.analysis.style.intent_actual.negative/data.content.analysis.style.intent_actual.count)*100).toFixed(2)}}%</strong>
                                    </template>
                                    </v-progress-linear>                        
                                    </v-col>
                                    <v-col cols="2"><span style="font-weight:bold;">{{$t('DrillReport.deviate-actual')}}</span></v-col>
                                </v-row>
                                <v-row dense>
                                    <v-col>{{$t('DrillReport.deviate-iva-explain')}}
                                    </v-col>
                                    <v-col><span style="font-weight:bold;">{{$t('DrillReport.deviate-iva-'+intent_deviate(data.content.analysis.style.intent_actual.negative, data.content.analysis.style.intent_actual.count, data.content.analysis.style.desire_actual.negative, data.content.analysis.style.desire_actual.count))}}</span></v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="1"></v-col>
                        </v-row>
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
                        <v-row dense>
                            <v-col cols="1"></v-col>
                            <v-col>
                                <v-row>
                                    <v-col>
                                        <h3>{{$t('DrillReport.deviate-dvi-title')}}</h3>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="1"></v-col>
                        </v-row>
                        <v-row dense>
                            <v-col cols="1"></v-col>
                            <v-col>
                                <v-row dense class="text-center">
                                    <v-col>
                                        <span  style="font-weight:bold;">{{$t('DrillReport.deviate')}}</span>
                                    </v-col>
                                </v-row>
                                <v-row dense class="text-center">
                                    <v-col cols="2"><span style="font-weight:bold;">{{$t('DrillReport.deviate-desired')}}</span></v-col>
                                    <v-col>
                                    <v-progress-linear
                                        background-color="grey lighten-2"
                                        :value="100"
                                        :color="valueColor((data.content.analysis.style.desire_intent.positive/data.content.analysis.style.desire_intent.count)*100)"
                                        height="30"
                                    >
                                    <template>
                                        <strong class="report-result-initial">{{((data.content.analysis.style.desire_intent.negative/data.content.analysis.style.desire_intent.count)*100).toFixed(2)}}%</strong>
                                    </template>
                                    </v-progress-linear>                        
                                    </v-col>
                                    <v-col cols="2"><span style="font-weight:bold;">{{$t('DrillReport.deviate-intended')}}</span></v-col>
                                </v-row>
                                <v-row dense>
                                    <v-col>{{$t('DrillReport.deviate-dvi-explain')}}
                                    </v-col>
                                    <v-col><span style="font-weight:bold;">{{$t('DrillReport.deviate-dvi-'+deviate(data.content.analysis.style.desire_intent.negative, data.content.analysis.style.desire_intent.count))}}</span></v-col>
                                </v-row>
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
import ReportStyleDetail from "./ReportStyleDetail.vue";
export default {
    name: "ReportStyle",
    components:{
      ReportStyleDetail,
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
      intent_deviate(z, t, y, s) {
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
            if (v>=50) {
              if ((y/s*100) < 15) {
                c = c + 'P'
              }
            }
        }
        return c
      }
    } 
}
</script>

<style>

</style>