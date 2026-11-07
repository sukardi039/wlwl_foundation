<template>
  <v-container>
    <v-container class="report-frame">
      <v-row class="report-result-spacer"><v-col /></v-row>
      <v-row>
        <v-col cols="1" />
        <v-col>
          <v-card>
            <v-card-text>
              <h2>{{ $t(title) }}</h2>
              <v-alert type="info" text class="mt-3">
                {{ $t("DrillReport.competency-unavailable") }}
              </v-alert>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="1" />
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: "ReportUnavailable",
  props: { title: { type: String, required: true } },
};
</script>
