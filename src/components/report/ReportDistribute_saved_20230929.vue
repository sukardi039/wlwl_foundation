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
                <h2>{{$t('DrillReport.dist-title')}}</h2>
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
                    <v-col><h3>{{$t('DrillReport.dist-explain')}}:</h3></v-col>
                    <v-col cols="1"></v-col>
                </v-row>
                <v-row dense>
                    <v-col cols="1"></v-col>
                    <v-col cols="2"><h3>{{$t('DrillReport.dist-number')}}:</h3></v-col>
                    <v-col>{{$t('DrillReport.dist-number-explain')}}</v-col>
                    <v-col cols="1"></v-col>
                </v-row>
                <v-row dense>
                    <v-col cols="1"></v-col>
                    <v-col cols="2"><h3>{{$t('DrillReport.dist-order')}}:</h3></v-col>
                    <v-col>{{$t('DrillReport.dist-order-explain')}}</v-col>
                    <v-col cols="1"></v-col>
                </v-row>
                <v-row dense>
                    <v-col cols="1"></v-col>
                    <v-col cols="2"><h3>{{$t('DrillReport.dist-gradient')}}:</h3></v-col>
                    <v-col>{{$t('DrillReport.dist-gradient-explain')}}</v-col>
                    <v-col cols="1"></v-col>
                </v-row>
                <v-row dense>
                  <v-col cols="1"></v-col>
                  <v-col>
                    <v-row class="align-center">
                      <v-col cols="3">
                        <v-btn
                          fab
                          small
                          :color="valueColor(10)"
                        ></v-btn>
                      </v-col>
                      <v-col><h4>{{$t('DrillReport.dist-VL')}}{{$t('DrillReport.dist-impact')}}</h4></v-col>
                    </v-row>
                  </v-col>
                  <v-col>
                    <v-row class="align-center">
                      <v-col cols="3">
                        <v-btn
                          fab
                          small
                          :color="valueColor(30)"
                        ></v-btn>
                      </v-col>
                      <v-col><h4>{{$t('DrillReport.dist-ML')}}{{$t('DrillReport.dist-impact')}}</h4></v-col>
                    </v-row>
                  </v-col>
                  <v-col>
                    <v-row class="align-center">
                      <v-col cols="3">
                        <v-btn
                          fab
                          small
                          :color="valueColor(60)"
                        ></v-btn>
                      </v-col>
                      <v-col><h4>{{$t('DrillReport.dist-MH')}}{{$t('DrillReport.dist-impact')}}</h4></v-col>
                    </v-row>
                  </v-col>
                  <v-col>
                    <v-row class="align-center">
                      <v-col cols="3">
                        <v-btn
                          fab
                          small
                          :color="valueColor(80)"
                        ></v-btn>
                      </v-col>
                      <v-col><h4>{{$t('DrillReport.dist-VH')}}{{$t('DrillReport.dist-impact')}}</h4></v-col>
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
                <v-card>
                    <v-card-text>
                        <v-row dense class="align-center flex-nowrap pa-0 ma-0" v-for="s in sortStaff(data.content.analysis.staff)" :key="s.staffName">
                          <v-col cols="2" class="flex-shrink-1 justify-end"><span class="report-distribute">{{s.staffExp}}</span></v-col>
                          <v-col v-for="a in getActions(s)" :key="a.name"> 
                            <v-btn
                                fab
                                small
                                :color="valueColor(impact(a.positive, a.count))"
                              >{{a.count}}</v-btn>
                          </v-col>
                          <v-col>
                            <v-btn
                                fab
                                small
                                :color="valueColor(impact(s.positive, s.total))"
                              >{{s.total}}</v-btn>
                          </v-col>
                        </v-row>
                        <v-row dense class="align-center flex-nowrap pa-0 ma-0">
                          <v-col cols="2" class="flex-shrink-1 justify-end"><span class="report-distribute">{{$t('DrillReport.dist-everyone')}}</span></v-col>
                          <v-col v-for="a in actionNotTotal(data.content.analysis.action)" :key="a.name">
                            <v-btn
                              fab
                              small
                              :color="valueColor(impact(a.positive, a.count))"
                            >{{a.count}}</v-btn>
                          </v-col>
                          <v-col>
                            <v-btn
                              fab
                              small
                              color="accent"
                            >{{data.content.analysis.action.total}}</v-btn>
                          </v-col>
                        </v-row>
                        <v-row dense class="align-center">
                          <v-col cols="2"></v-col>
                          <v-col v-for="a in actionDisplay(data.content.analysis.action, 2)" :key="a.name">
                            <v-btn
                                fab
                                small
                                text
                              ><span class="report-distribute" v-if="a.key==0">{{$t('DrillReport.impact-'+a.name)}}</span></v-btn>
                          </v-col>
                          <v-col></v-col>
                        </v-row>
                        <v-row dense class="align-center">
                          <v-col cols="2"></v-col>
                          <v-col v-for="a in actionDisplay(data.content.analysis.action, 2)" :key="a.name">
                            <v-btn
                                fab
                                small
                                text
                              ><span class="report-distribute" v-if="a.key==1">{{$t('DrillReport.impact-'+a.name)}}</span></v-btn>
                          </v-col>
                          <v-col>                            <v-btn
                                fab
                                small
                                text
                              ><span class="report-distribute">{{$t('DrillReport.impact-total')}}</span></v-btn></v-col>
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
        if (v > 75) {
          c = "#27AE60";
        } else if (v > 50) {
          c = "#2ECC71";
        } else if (v > 25) {
          c = "#F1C40F";
        } else if (v != 0) {
          c = "#F39C12";
        } else {
          c = "#ffffff";
        }
        return c;
      },
      impact(z, t) {
        let c = 0
        if (t > 0){
          if (z>0){
            c = Math.round(z/t*100)
          } else {
            c = 1
          }
        }
        return c
      },
      getActions(s){
        let z = Object.entries(s)
        let a = []
        z.forEach(function(x){
          if (x[1].count>=0){
            a.push(x[1])
          }
        })
        return a
      },
      actionDisplay(p, y){
        let w = 0
        let a = []
        let z = Object.entries(p)
        z.forEach(function(s){
          if (s[0]!='total'){
            s[1].key=w++
            a.push(s[1])
            if (w>=y){
              w=0
            }
          }
        })
        return a
      },
      actionNotTotal(s){
        let z = Object.entries(s)
        let a = []
        z.forEach(function(s){
          if (s[0]!='total'){
            a.push(s[1])
          }
        })
        return (a)
      },
      sortStaff(s){
        let a = []
        let b = []
        let z = Object.entries(s)
        z.forEach(function(x){
          if (x[1].positive && x[1].total){
            x[2]=x[1].positive/x[1].total
          } else {
            x[2]=0
          }
          b.push(x)
        })
        b.sort(function(c, d){return d[2] - c[2]})
        b.forEach(function(x){
          a.push(x[1])
        })
        return a
      }
    } 
}
</script>

<style>

</style>