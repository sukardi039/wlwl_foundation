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
                      :value="data.content.competency.skillsCompetency*10"
                      :size="120"
                      :width="25"
                      :color="valueColor(data.content.competency.skillsCompetency)"
                    >
                    <template>
                      <strong><h2>{{data.content.competency.skillsCompetency}}</h2></strong>
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
                          :color="valueColor(data.content.competency.skillsCompetency)"
                          height="25"
                        >
                        <template>
                          <strong><h4>{{$t('DrillReport.competency-indicator-'+data.content.competency.skillsCompetency)}}</h4></strong>
                        </template>
                        </v-progress-linear>                        
                      </v-col>
                    </v-row>
                    <v-row dense>
                      <v-col>{{$t('DrillReport.competency-skills-explain')}}</v-col>
                    </v-row>
                    <v-row>
                      <v-col>{{$t('DrillReport.competency-skills-'+data.content.competency.skillsCompetency)}}</v-col>
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
                      :value="data.content.competency.moraleCompetency*10"
                      :size="120"
                      :width="25"
                      :color="valueColor(data.content.competency.moraleCompetency)"
                    >
                    <template>
                      <strong><h2>{{data.content.competency.moraleCompetency}}</h2></strong>
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
                          :color="valueColor(data.content.competency.moraleCompetency)"
                          height="25"
                        >
                        <template>
                          <strong><h4>{{$t('DrillReport.competency-indicator-'+data.content.competency.moraleCompetency)}}</h4></strong>
                        </template>
                        </v-progress-linear>                        
                      </v-col>
                    </v-row>
                    <v-row dense>
                      <v-col>{{$t('DrillReport.competency-morale-explain')}}</v-col>
                    </v-row>
                    <v-row>
                      <v-col>{{$t('DrillReport.competency-morale-'+data.content.competency.moraleCompetency)}}</v-col>
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
                      :value="data.content.competency.efficiencyCompetency*10"
                      :size="120"
                      :width="25"
                      :color="valueColor(data.content.competency.efficiencyCompetency)"
                    >
                    <template>
                      <strong><h2>{{data.content.competency.efficiencyCompetency}}</h2></strong>
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
                          :color="valueColor(data.content.competency.efficiencyCompetency)"
                          height="25"
                        >
                        <template>
                          <strong><h4>{{$t('DrillReport.competency-indicator-'+data.content.competency.efficiencyCompetency)}}</h4></strong>
                        </template>
                        </v-progress-linear>                        
                      </v-col>
                    </v-row>
                    <v-row dense>
                      <v-col>{{$t('DrillReport.competency-efficiency-explain')}}</v-col>
                    </v-row>
                    <v-row>
                      <v-col>{{$t('DrillReport.competency-efficiency-'+data.content.competency.efficiencyCompetency)}}</v-col>
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
                      :value="data.content.competency.leaderShipCompetency*10"
                      :size="120"
                      :width="25"
                      :color="valueColor(data.content.competency.leaderShipCompetency)"
                    >
                    <template>
                      <strong><h2>{{data.content.competency.leaderShipCompetency}}</h2></strong>
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
                          :color="valueColor(data.content.competency.leaderShipCompetency)"
                          height="25"
                        >
                        <template>
                          <strong><h4>{{$t('DrillReport.competency-indicator-'+data.content.competency.leaderShipCompetency)}}</h4></strong>
                        </template>
                        </v-progress-linear>                        
                      </v-col>
                    </v-row>
                    <v-row dense>
                      <v-col>{{$t('DrillReport.competency-leadership-explain')}}</v-col>
                    </v-row>
                    <v-row>
                      <v-col>{{$t('DrillReport.competency-leadership-'+data.content.competency.leaderShipCompetency)}}</v-col>
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
                      :value="data.content.competency.driveCompetency*10"
                      :size="120"
                      :width="25"
                      :color="valueColor(data.content.competency.driveCompetency)"
                    >
                    <template>
                      <strong><h2>{{data.content.competency.driveCompetency}}</h2></strong>
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
                          :color="valueColor(data.content.competency.driveCompetency)"
                          height="25"
                        >
                        <template>
                          <strong><h4>{{$t('DrillReport.competency-indicator-'+data.content.competency.driveCompetency)}}</h4></strong>
                        </template>
                        </v-progress-linear>                        
                      </v-col>
                    </v-row>
                    <v-row dense>
                      <v-col>{{$t('DrillReport.competency-drive-explain')}}</v-col>
                    </v-row>
                    <v-row>
                      <v-col>{{$t('DrillReport.competency-drive-'+data.content.competency.driveCompetency)}}</v-col>
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
                <v-row dense class="text-h4 font-weight-bold">
                  <v-col cols="2"></v-col>
                  <v-col cols="7">
                    <p class="text-left d-flex justify-items-center">{{$t('DrillReport.competency-total')}}</p>
                  </v-col>
                  <v-col cols="3">
                    <p class="text-center">{{data.content.competency.totalCompetency}}/50</p> 
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