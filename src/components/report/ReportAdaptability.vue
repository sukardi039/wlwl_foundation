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
                <h2>{{$t('DrillReport.adaptability-title')}}</h2>
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
                    <v-col cols="6"><h3>{{$t('DrillReport.adaptability-explain')}}</h3></v-col>
                    <v-col cols="1"></v-col>
                    <v-col>
                    <v-progress-circular
                      background-color="grey lighten-2"
                      :value="competentLeadership(data.content.analysis.style.desire_intent.count+data.content.analysis.style.desire_actual.count+data.content.analysis.style.intent_actual.count, data.content.analysis.style.desire_intent.positive+data.content.analysis.style.desire_actual.positive+data.content.analysis.style.intent_actual.positive)*10"
                      :size="200"
                      :width="35"
                      :color="valueColor(competentLeadership(data.content.analysis.style.desire_intent.count+data.content.analysis.style.desire_actual.count+data.content.analysis.style.intent_actual.count, data.content.analysis.style.desire_intent.positive+data.content.analysis.style.desire_actual.positive+data.content.analysis.style.intent_actual.positive))"
                    >
                    <template>
                      <strong><h2>{{competentLeadershipPct(data.content.analysis.style.desire_intent.count+data.content.analysis.style.desire_actual.count+data.content.analysis.style.intent_actual.count, data.content.analysis.style.desire_intent.positive+data.content.analysis.style.desire_actual.positive+data.content.analysis.style.intent_actual.positive)}}%</h2></strong>
                    </template>
                    </v-progress-circular>                        
                    </v-col>
                </v-row>               
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="1"></v-col>
        </v-row>
        <v-row>
            <v-col cols="1"></v-col>
            <v-col>
                <v-card>
                    <v-card-text>
                        <v-row class="align-center">
                            <v-col cols="1"></v-col>
                            <v-col><h3>{{$t('DrillReport.adaptability-level-'+competentLeadership(data.content.analysis.style.desire_intent.count+data.content.analysis.style.desire_actual.count+data.content.analysis.style.intent_actual.count, data.content.analysis.style.desire_intent.positive+data.content.analysis.style.desire_actual.positive+data.content.analysis.style.intent_actual.positive))}}</h3></v-col>
                            <v-col cols="1"></v-col>
                        </v-row>
                        <v-row class="align-center">
                            <v-col cols="1"></v-col>
                            <v-col><h3>{{$t('DrillReport.adaptability-describe-'+competentLeadership(data.content.analysis.style.desire_intent.count+data.content.analysis.style.desire_actual.count+data.content.analysis.style.intent_actual.count, data.content.analysis.style.desire_intent.positive+data.content.analysis.style.desire_actual.positive+data.content.analysis.style.intent_actual.positive))}}</h3></v-col>
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
export default {
    name: "ReportAdaptability",
    data() {
      return{
      } 
    },
    props: {
      data: {},
    },
    methods: {
      resultSummary() {
        let result = 'in-progress'
        if (this.data.action!='INTRODUCTION' && this.data.action != 'SELECT_STYLE' && this.data.action != 'MORE_ACTIONS'){

        }
        return result
      },
      targetPercent(){
        let p=100
        if ((this.data.content.orderValue*this.data.content.orderStatus.ordersCompleted)>this.data.content.valueToComplete){
          p = this.data.content.valueToComplete*100/this.data.content.orderValue*this.data.content.orderStatus.ordersCompleted
        }
        return p
      },
      valuePercent(){
        let p=100
        if ((this.data.content.orderValue*this.data.content.orderStatus.ordersCompleted)<this.data.content.valueToComplete){
          p = this.data.content.orderValue*this.data.content.orderStatus.ordersCompleted*100/this.data.content.valueToComplete
        }
        return p
      },
      valueColor(v) {
        let c = "";
        if (v > 8) {
          c = "#27AE60";
        } else if (v > 6) {
          c = "#2ECC71";
        } else if (v > 4) {
          c = "#F1C40F";
        } else if (v > 2) {
          c = "#F39C12";
        } else {
          c = "#E74C3C";
        }
        return c;
      },
      competentLeadership(s, e){
        let c = 1
        let p = 0
        if (e>0 && s>0){
          p = e/s
          p = (p>=1)?1:p
          c = Math.round(p*10)
        }
        return c
      },
      competentLeadershipPct(s, e){
          let c = 10
          if (e>0 && s>0){
              c = ((e/s)*100).toFixed(2)
              if (c>100) {
                  c=100.00
              }
          }
          return c
      }
    } 
}
</script>

<style>

</style>