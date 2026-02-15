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
                <h2>{{$t('DrillReport.disclaim-title')}}</h2>
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
                    <v-col><h3>{{$t('DrillReport.disclaim-explain')}}{{$t('companyLong')}}{{$t('DrillReport.disclaim-explain-0')}}{{$t('DrillReport.disclaim-explain-1')}}</h3></v-col>
                    <v-col cols="1"></v-col>
                </v-row>               
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="1"></v-col>
        </v-row>
        <v-row  class="report-result-spacer">
          <v-col>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="1"></v-col>
          <v-col>
            <v-card width="100%">
              <v-card-text>
                <h2>{{$t('DrillReport.about-title')}}{{$t('portalname')}}</h2>
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
                    <v-col><h3>{{$t('portalname')}}{{$t('DrillReport.about-explain')}}</h3></v-col>
                    <v-col cols="1"></v-col>
                </v-row>               
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="1"></v-col>
        </v-row>
        <v-row  class="report-result-spacer">
          <v-col>
          </v-col>
        </v-row>
        <v-row dense>
            <v-col cols="1"></v-col>
                <v-col>
                    <v-card width="100%">
                        <v-card-text>                            
                            <v-row dense>
                              <v-col><h2>{{$t('DrillReport.about-report')}}</h2></v-col>
                            </v-row>
                        </v-card-text></v-card>
                          </v-col>
                          <v-col cols="1"></v-col>
        </v-row>
        <v-row>
          <v-col cols="1"></v-col>
          <v-col>
                        <v-card>
                          <v-card-text>
                            <v-row dense>
                                <v-col cols="1"><span class="mdi mdi-star"></span></v-col>
                                <v-col><h3>{{$t('DrillReport.about-report-1')}}</h3></v-col>
                            </v-row>
                            <v-row dense>
                                <v-col cols="1"><span class="mdi mdi-star"></span></v-col>
                                <v-col><h3>{{$t('DrillReport.about-report-2')}}</h3></v-col>
                            </v-row>
                            <v-row dense>
                                <v-col cols="1"><span class="mdi mdi-star"></span></v-col>
                                <v-col><h3>{{$t('DrillReport.about-report-3')}}</h3></v-col>
                            </v-row>
                            <v-row dense>
                                <v-col cols="1"><span class="mdi mdi-star"></span></v-col>
                                <v-col><h3>{{$t('DrillReport.about-report-4')}}</h3></v-col>
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
    name: "ReportDisclai",
}
</script>

<style>

</style>