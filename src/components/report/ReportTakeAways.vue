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
                <h2>{{$t('DrillReport.takeaways-title')}}</h2>
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
                    <v-col><h3>{{$t('DrillReport.takeaways-explain')}}:</h3></v-col>
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
                                <v-col cols="1"><span class="mdi mdi-star"></span></v-col>
                                <v-col><h3>{{$t('DrillReport.takeaways-1')}}</h3></v-col>
                            </v-row>
                            <v-row dense>
                                <v-col cols="1"><span class="mdi mdi-star"></span></v-col>
                                <v-col><h3>{{$t('DrillReport.takeaways-2')}}</h3></v-col>
                            </v-row>
                            <v-row dense>
                                <v-col cols="1"><span class="mdi mdi-star"></span></v-col>
                                <v-col><h3>{{$t('DrillReport.takeaways-3')}}</h3></v-col>
                            </v-row>
                            <v-row dense>
                                <v-col cols="1"><span class="mdi mdi-star"></span></v-col>
                                <v-col><h3>{{$t('DrillReport.takeaways-4')}}</h3></v-col>
                            </v-row>
                            <v-row dense>
                                <v-col cols="1"><span class="mdi mdi-star"></span></v-col>
                                <v-col><h3>{{$t('DrillReport.takeaways-5')}}</h3></v-col>
                            </v-row>
                            <v-row dense>
                                <v-col cols="1"><span class="mdi mdi-star"></span></v-col>
                                <v-col><h3>{{$t('DrillReport.takeaways-6')}}</h3></v-col>
                            </v-row>
                            <v-row dense>
                                <v-col cols="1"><span class="mdi mdi-star"></span></v-col>
                                <v-col><h3>{{$t('DrillReport.takeaways-7')}}</h3></v-col>
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
    name: "ReportTakeAways",
}
</script>

<style>

</style>