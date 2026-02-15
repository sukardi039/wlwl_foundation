<template>
  <v-container>
      <v-card>
          <v-card-title>
              <v-row dense>
                  <v-col>
                    {{$t('DrillReport.style-'+styleType)}}
                  </v-col>
                  <v-col>
                     <span style="font-size:0.8em;">({{$t('DrillReport.style-propotion')}}: <strong>{{stylePropotion(styleType)}}%</strong>)</span>
                  </v-col>
              </v-row>
          </v-card-title>
          <v-card-text>
            <v-row dense style="height:110px;">
                <v-col><span>{{$t('DrillReport.style-'+styleType+'-explain')}}</span></v-col>
            </v-row>
            <v-row dense class="align-center">
                <v-col cols="3">
                    <span style="font-size:0.9em;"><strong>{{$t('DrillReport.style-accuracy')}}</strong></span>
                </v-col>
                <v-col cols="6">
                    <v-progress-linear
                        background-color="grey lighten-2"
                        :value="styleAccurate(styleType)"
                        :color="valueColor(styleAccurate(styleType)/10)"
                        height="5"
                    >
                    </v-progress-linear>                        
                </v-col>
                <v-col cols="3"><strong>{{styleAccurate(styleType)}}%</strong></v-col>
            </v-row>
            <v-row dense style="height:150px;">
                <v-col><strong>{{$t('DrillReport.style-'+styleType+'-'+styleSet(styleType))}}</strong></v-col>
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
      styleType: "",
    },
    methods: {
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
      stylePropotion(t){
          let c = 0
          let s = this.data.content.analysis.style.total+this.data.content.analysis.action_style.total
          let e = this.data.content.analysis.style[t].count+this.data.content.analysis.action_style[t].count
          if (s>0 && e>0){
              c = e/s*100
          }
          return c.toFixed(2)
      },
      styleAccurate(t){
          let c = 0
          let s = this.data.content.analysis.style[t].count+this.data.content.analysis.action_style[t].count
          let e = this.data.content.analysis.style[t].positive+this.data.content.analysis.action_style[t].positive
          if (s>0 && e>0){
              c = e/s*100
          }
          return Math.round(c)
      },
      styleSet(t){
        let p = 'pn'
        let a = ''
        if (this.stylePropotion(t)>0){
            if (this.stylePropotion(t)>=25){
                p = 'ph'
            } else {
                p = 'pl'
            }
            if (this.styleAccurate(t)>=50){
                a = 'ah'
            } else {
                a = 'al'
            }
        }
        return p+a
      }
    } 
}
</script>

<style>

</style>