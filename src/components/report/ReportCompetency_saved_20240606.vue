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
                <h2>{{$t('portalname')}}{{$t('DrillReport.competency-title')}}</h2>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="1"></v-col>
        </v-row>
        <v-row>
          <v-col cols="1"></v-col>
          <v-col>
            <v-card width="100%">
              <v-card-title>
                {{$t('DrillReport.competency-explain')}}
              </v-card-title>
              <v-card-text>
                <v-row dense class="text-center">
                  <v-col cols="1"></v-col>
                  <v-col cols="2"><h4>{{$t('DrillReport.competency-indicator-1')}}</h4></v-col>
                  <v-col cols="2"><h4>{{$t('DrillReport.competency-indicator-3')}}</h4></v-col>
                  <v-col cols="2"><h4>{{$t('DrillReport.competency-indicator-5')}}</h4></v-col>
                  <v-col cols="2"><h4>{{$t('DrillReport.competency-indicator-7')}}</h4></v-col>
                  <v-col cols="2"><h4>{{$t('DrillReport.competency-indicator-9')}}</h4></v-col>
                  <v-col cols="1"></v-col>
                </v-row>
                <v-row dense class="text-center">
                  <v-col cols="1"></v-col>
                  <v-col cols="2">
                    <v-progress-linear
                      background-color="grey lighten-2"
                      :value="100"
                      :color="valueColor(1)"
                      height="10"
                    >
                    </v-progress-linear>                        
                  </v-col>
                  <v-col cols="2">
                    <v-progress-linear
                      background-color="grey lighten-2"
                      :value="100"
                      :color="valueColor(3)"
                      height="10"
                    >
                    </v-progress-linear>                        
                  </v-col>
                  <v-col cols="2">
                    <v-progress-linear
                      background-color="grey lighten-2"
                      :value="100"
                      :color="valueColor(5)"
                      height="10"
                    >
                    </v-progress-linear>                        
                  </v-col>
                  <v-col cols="2">
                    <v-progress-linear
                      background-color="grey lighten-2"
                      :value="100"
                      :color="valueColor(7)"
                      height="10"
                    >
                    </v-progress-linear>                        
                  </v-col>
                  <v-col cols="2">
                    <v-progress-linear
                      background-color="grey lighten-2"
                      :value="100"
                      :color="valueColor(9)"
                      height="10"
                    >
                    </v-progress-linear>                        
                  </v-col>
                  <v-col cols="1"></v-col>
                </v-row>
               <v-row dense class="text-center">
                  <v-col cols="1"></v-col>
                  <v-col cols="2"><h4>(1, 2)</h4></v-col>
                  <v-col cols="2"><h4>(3, 4)</h4></v-col>
                  <v-col cols="2"><h4>(5, 6)</h4></v-col>
                  <v-col cols="2"><h4>(7, 8)</h4></v-col>
                  <v-col cols="2"><h4>(9, 10)</h4></v-col>
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
                  <v-col cols="2" class="align-center">
                    <v-progress-circular
                      background-color="grey lighten-2"
                      :value="competentSkills(data.content.summary[0].teamAvg.skills, data.content.current.teamAvg.skills)*10"
                      :size="120"
                      :width="25"
                      :color="valueColor(competentSkills(data.content.summary[0].teamAvg.skills, data.content.current.teamAvg.skills))"
                    >
                    <template>
                      <strong><h2>{{competentSkills(data.content.summary[0].teamAvg.skills, data.content.current.teamAvg.skills)}}</h2></strong>
                    </template>
                    </v-progress-circular>                        
                  </v-col>
                  <v-col>
                    <v-row dense>
                      <v-col cols="8"><h3>{{$t('DrillReport.competency-skills-title')}}</h3></v-col>
                      <v-col>
                        <v-progress-linear
                          background-color="grey lighten-2"
                          :value="100"
                          :color="valueColor(competentSkills(data.content.summary[0].teamAvg.skills, data.content.current.teamAvg.skills))"
                          height="25"
                        >
                        <template>
                          <strong><h4>{{$t('DrillReport.competency-indicator-'+competentSkills(data.content.summary[0].teamAvg.skills, data.content.current.teamAvg.skills))}}</h4></strong>
                        </template>
                        </v-progress-linear>                        
                      </v-col>
                    </v-row>
                    <v-row dense>
                      <v-col>{{$t('DrillReport.competency-skills-explain')}}</v-col>
                    </v-row>
                    <v-row>
                      <v-col>{{$t('DrillReport.competency-skills-'+competentSkills(data.content.summary[0].teamAvg.skills, data.content.current.teamAvg.skills))}}</v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col><v-divider></v-divider></v-col>
                </v-row>
                <v-row dense>
                  <v-col cols="2" class="align-center">
                    <v-progress-circular
                      background-color="grey lighten-2"
                      :value="competentMorale(data.content.summary[0].teamAvg.morale, data.content.current.teamAvg.morale)*10"
                      :size="120"
                      :width="25"
                      :color="valueColor(competentMorale(data.content.summary[0].teamAvg.morale, data.content.current.teamAvg.morale))"
                    >
                    <template>
                      <strong><h2>{{competentMorale(data.content.summary[0].teamAvg.morale, data.content.current.teamAvg.morale)}}</h2></strong>
                    </template>
                    </v-progress-circular>                        
                  </v-col>
                  <v-col>
                    <v-row dense>
                      <v-col cols="8"><h3>{{$t('DrillReport.competency-morale-title')}}</h3></v-col>
                      <v-col>
                        <v-progress-linear
                          background-color="grey lighten-2"
                          :value="100"
                          :color="valueColor(competentMorale(data.content.summary[0].teamAvg.morale, data.content.current.teamAvg.morale))"
                          height="25"
                        >
                        <template>
                          <strong><h4>{{$t('DrillReport.competency-indicator-'+competentMorale(data.content.summary[0].teamAvg.morale, data.content.current.teamAvg.morale))}}</h4></strong>
                        </template>
                        </v-progress-linear>                        
                      </v-col>
                    </v-row>
                    <v-row dense>
                      <v-col>{{$t('DrillReport.competency-morale-explain')}}</v-col>
                    </v-row>
                    <v-row>
                      <v-col>{{$t('DrillReport.competency-morale-'+competentMorale(data.content.summary[0].teamAvg.morale, data.content.current.teamAvg.morale))}}</v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col><v-divider></v-divider></v-col>
                </v-row>
                <v-row dense>
                  <v-col cols="2" class="align-center">
                    <v-progress-circular
                      background-color="grey lighten-2"
                      :value="competentEfficiency(data.content.summary[0].teamAvg.efficiency, data.content.current.teamAvg.efficiency)*10"
                      :size="120"
                      :width="25"
                      :color="valueColor(competentEfficiency(data.content.summary[0].teamAvg.efficiency, data.content.current.teamAvg.efficiency))"
                    >
                    <template>
                      <strong><h2>{{competentEfficiency(data.content.summary[0].teamAvg.efficiency, data.content.current.teamAvg.efficiency)}}</h2></strong>
                    </template>
                    </v-progress-circular>                        
                  </v-col>
                  <v-col>
                    <v-row dense>
                      <v-col cols="8"><h3>{{$t('DrillReport.competency-efficiency-title')}}</h3></v-col>
                      <v-col>
                        <v-progress-linear
                          background-color="grey lighten-2"
                          :value="100"
                          :color="valueColor(competentEfficiency(data.content.summary[0].teamAvg.efficiency, data.content.current.teamAvg.efficiency))"
                          height="25"
                        >
                        <template>
                          <strong><h4>{{$t('DrillReport.competency-indicator-'+competentEfficiency(data.content.summary[0].teamAvg.efficiency, data.content.current.teamAvg.efficiency))}}</h4></strong>
                        </template>
                        </v-progress-linear>                        
                      </v-col>
                    </v-row>
                    <v-row dense>
                      <v-col>{{$t('DrillReport.competency-efficiency-explain')}}</v-col>
                    </v-row>
                    <v-row>
                      <v-col>{{$t('DrillReport.competency-efficiency-'+competentEfficiency(data.content.summary[0].teamAvg.efficiency, data.content.current.teamAvg.efficiency))}}</v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col><v-divider></v-divider></v-col>
                </v-row>
                <v-row dense>
                  <v-col cols="2" class="align-center">
                    <v-progress-circular
                      background-color="grey lighten-2"
                      :value="competentLeadership(data.content.analysis.style.desire_intent.count+data.content.analysis.style.desire_actual.count, data.content.analysis.style.desire_intent.positive+data.content.analysis.style.desire_actual.positive)*10"
                      :size="120"
                      :width="25"
                      :color="valueColor(competentLeadership(data.content.analysis.style.desire_intent.count+data.content.analysis.style.desire_actual.count, data.content.analysis.style.desire_intent.positive+data.content.analysis.style.desire_actual.positive))"
                    >
                    <template>
                      <strong><h2>{{competentLeadership(data.content.analysis.style.desire_intent.count+data.content.analysis.style.desire_actual.count, data.content.analysis.style.desire_intent.positive+data.content.analysis.style.desire_actual.positive)}}</h2></strong>
                    </template>
                    </v-progress-circular>                        
                  </v-col>
                  <v-col>
                    <v-row dense>
                      <v-col cols="8"><h3>{{$t('DrillReport.competency-leadership-title')}}</h3></v-col>
                      <v-col>
                        <v-progress-linear
                          background-color="grey lighten-2"
                          :value="100"
                          :color="valueColor(competentLeadership(data.content.analysis.style.desire_intent.count+data.content.analysis.style.desire_actual.count, data.content.analysis.style.desire_intent.positive+data.content.analysis.style.desire_actual.positive))"
                          height="25"
                        >
                        <template>
                          <strong><h4>{{$t('DrillReport.competency-indicator-'+competentLeadership(data.content.analysis.style.desire_intent.count+data.content.analysis.style.desire_actual.count, data.content.analysis.style.desire_intent.positive+data.content.analysis.style.desire_actual.positive))}}</h4></strong>
                        </template>
                        </v-progress-linear>                        
                      </v-col>
                    </v-row>
                    <v-row dense>
                      <v-col>{{$t('DrillReport.competency-leadership-explain')}}</v-col>
                    </v-row>
                    <v-row>
                      <v-col>{{$t('DrillReport.competency-leadership-'+competentLeadership(data.content.analysis.style.desire_intent.count+data.content.analysis.style.desire_actual.count, data.content.analysis.style.desire_intent.positive+data.content.analysis.style.desire_actual.positive))}}</v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col><v-divider></v-divider></v-col>
                </v-row>
                <v-row dense>
                  <v-col cols="2" class="align-center">
                    <v-progress-circular
                      background-color="grey lighten-2"
                      :value="competentDrive(data.content.valueToComplete, data.content.orderStatus.ordersCompleted*data.content.orderValue)*10"
                      :size="120"
                      :width="25"
                      :color="valueColor(competentDrive(data.content.valueToComplete, data.content.orderStatus.ordersCompleted*data.content.orderValue))"
                    >
                    <template>
                      <strong><h2>{{competentDrive(data.content.valueToComplete, data.content.orderStatus.ordersCompleted*data.content.orderValue)}}</h2></strong>
                    </template>
                    </v-progress-circular>                        
                  </v-col>
                  <v-col>
                    <v-row dense>
                      <v-col cols="8"><h3>{{$t('DrillReport.competency-drive-title')}}</h3></v-col>
                      <v-col>
                        <v-progress-linear
                          background-color="grey lighten-2"
                          :value="100"
                          :color="valueColor(competentDrive(data.content.valueToComplete, data.content.orderStatus.ordersCompleted*data.content.orderValue))"
                          height="25"
                        >
                        <template>
                          <strong><h4>{{$t('DrillReport.competency-indicator-'+competentDrive(data.content.valueToComplete, data.content.orderStatus.ordersCompleted*data.content.orderValue))}}</h4></strong>
                        </template>
                        </v-progress-linear>                        
                      </v-col>
                    </v-row>
                    <v-row dense>
                      <v-col>{{$t('DrillReport.competency-drive-explain')}}</v-col>
                    </v-row>
                    <v-row>
                      <v-col>{{$t('DrillReport.competency-drive-'+competentDrive(data.content.valueToComplete, data.content.orderStatus.ordersCompleted*data.content.orderValue))}}</v-col>
                    </v-row>
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
                {{$t('DrillReport.competency-key')}}
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
    name: "ReportCompetency",
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
      competentSkills(s, e){
        let c = 1
        let p = 0
        if (s>=e){
          p = (s-e)/s
          if (p<0.15){
            c = 4
          } else if (p<0.2){
             c = 3
          } else if (p<0.25){
             c = 2
          }
        } else {
          p = (e-s)/s
          if (p>0.5) {
            c = 10
          } else if (p>0.4) {
            c = 9
          } else if (p>0.3) {
            c = 8
          } else if (p>0.2){
            c = 7
          } else if (p>0.1) {
            c = 6
          } else {
            c = 5
          }
        }
        return c
      },
      competentMorale(s, e){
        let c = 1
        let p = 0
        let z = 0
        if (s>=e){
          z = s
          p = (s-e)/s
          if (p<0.15){
            c = 4
          } else if (p<0.2){
             c = 3
          } else if (p<0.25){
             c = 2
          }
        } else {
          z = 100 - s
          if (z == 0){
            c = 6
          } else {
            p = (e-s)/z
            if (p>0.9) {
              c = 10
            } else if (p>0.8) {
              c = 9
            } else if (p>0.6) {
              c = 8
            } else if (p>0.4){
              c = 7
            } else if (p>0.2) {
              c = 6
            } else {
              c = 5
            }
          }
        }
        return c
      },
      competentEfficiency(s, e){
        let c = 1
        let p = 0
        let z = 0
        if (s>=e){
          z = s
          p = (s-e)/s
          if (p<0.15){
            c = 4
          } else if (p<0.2){
             c = 3
          } else if (p<0.25){
             c = 2
          }
        } else {
          z = 100 - s
          if (z == 0){
            c = 6
          } else {
            p = (e-s)/z
            if (p>0.9) {
              c = 10
            } else if (p>0.8) {
              c = 9
            } else if (p>0.6) {
              c = 8
            } else if (p>0.4){
              c = 7
            } else if (p>0.2) {
              c = 6
            } else {
              c = 5
            }
          }
        }
        return c
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
      competentDrive(s, e){
        let c = 1
        let p = 0
        if (e>s) {
          c = 10
        } else {
          if (e>0 && s>0){
            if (e>s) {
              c = 10
            } else {
              p = e/s
              c = Math.round(p*10)
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