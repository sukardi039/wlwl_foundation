<template>
  <v-container>
      <v-container class="report-frame">
        <v-row  class="report-head-spacer">
          <v-col>
          </v-col>
        </v-row>
        <v-row class="text-center report-head-title">
            <v-col>
               <span>{{$t('DrillReport.reportName')}}</span>
            </v-col>
        </v-row>
        <v-row class="text-center report-head-name" align="end">
          <v-col>
            <span>{{data.content.analysis.reportUser}}</span>
          </v-col>
        </v-row>
          <v-row class="text-center report-head-date" align="center">
            <v-col>
              <span>{{data.content.analysis.reportDate}}</span>
            </v-col>
          </v-row>
      </v-container>
  </v-container>
</template>

<script>
export default {
    name: "ReportHead",
    data() {
      return{
      } 
    },
    props: {
      data: {},
    },    
}
</script>

<style>

</style>