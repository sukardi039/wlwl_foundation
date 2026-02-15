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
                <h2>{{$t('DrillReport.food4thought-title')}}</h2>
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
                    <v-col><h3>{{$t('DrillReport.food4thought-explain')}}:</h3></v-col>
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
        <v-row dense>
            <v-col cols="1"></v-col>
                <v-col>
                    <v-card width="100%">
                        <v-card-text>
                            <v-row dense>
                                <v-col cols="1"></v-col>
                                <v-col><h3>{{$t('DrillReport.food4thought-q1')}}</h3></v-col>
                            </v-row>
                            <v-row dense>
                                <v-col cols="1"><span class="mdi mdi-star"></span></v-col>
                                <v-col><h3><span>{{$t('DrillReport.food4thought-q1-explain')}}</span></h3></v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
            <v-col cols="1"></v-col>
        </v-row>
        <v-row>
            <v-col></v-col>
        </v-row>
        <v-row dense>
            <v-col cols="1"></v-col>
                <v-col>
                    <v-card width="100%">
                        <v-card-text>
                            <v-row dense>
                                <v-col cols="1"></v-col>
                                <v-col><h3>{{$t('DrillReport.food4thought-q2')}}</h3></v-col>
                            </v-row>
                            <v-row dense>
                                <v-col cols="1"><span class="mdi mdi-star"></span></v-col>
                                <v-col><h3>{{$t('DrillReport.food4thought-q2-explain')}}</h3></v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
            <v-col cols="1"></v-col>
        </v-row>
        <v-row>
            <v-col></v-col>
        </v-row>
        <v-row dense>
            <v-col cols="1"></v-col>
                <v-col>
                    <v-card width="100%">
                        <v-card-text>
                            <v-row dense>
                                <v-col cols="1"></v-col>
                                <v-col><h3>{{$t('DrillReport.food4thought-q3')}}</h3></v-col>
                            </v-row>
                            <v-row dense>
                                <v-col cols="1"><span class="mdi mdi-star"></span></v-col>
                                <v-col><h3>{{$t('DrillReport.food4thought-q3-explain')}}</h3></v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
            <v-col cols="1"></v-col>
        </v-row>
        <v-row>
            <v-col></v-col>
        </v-row>
        <v-row dense>
            <v-col cols="1"></v-col>
                <v-col>
                    <v-card width="100%">
                        <v-card-text>
                            <v-row dense>
                                <v-col cols="1"></v-col>
                                <v-col><h3>{{$t('DrillReport.food4thought-q4')}}</h3></v-col>
                            </v-row>
                            <v-row dense>
                                <v-col cols="1"><span class="mdi mdi-star"></span></v-col>
                                <v-col><h3>{{$t('DrillReport.food4thought-q4-explain')}}</h3></v-col>
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
    name: "ReportFood4Thought",
}
</script>

<style>

</style>