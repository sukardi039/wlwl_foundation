<template>
  <v-container class="help-content">
    <v-row dense>
      <v-col cols="7" class="help-img">
        <v-img src="images/drillpage17.png" width="170px" />
      </v-col>
      <v-col>
        <v-row dense>
          <v-col cols="1"></v-col>
          <v-col>
            <v-row dense>
              <v-col>
                {{ $t("Helps.drill-lead-intro") }}
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="1">
                1.
              </v-col>
              <v-col>
                {{ $t("Helps.drill-lead-1") }}
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="1">
              </v-col>
              <v-col>
                <v-row dense>
                    <v-col cols="3">{{ $t("Helps.drill-lead-2") }}</v-col>
                    <v-col>{{ $t("Helps.drill-lead-2-1") }}</v-col>
                </v-row>                
                <v-row dense>
                    <v-col cols="3">{{ $t("Helps.drill-lead-3") }}</v-col>
                    <v-col>{{ $t("Helps.drill-lead-3-1") }}</v-col>
                </v-row>                
                <v-row dense>
                    <v-col cols="3">{{ $t("Helps.drill-lead-4") }}</v-col>
                    <v-col>{{ $t("Helps.drill-lead-4-1") }}</v-col>
                </v-row>                
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="1">
                2.
              </v-col>
              <v-col>
                {{ $t("Helps.drill-lead-5") }}
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="1">
                3.
              </v-col>
              <v-col>
                {{ $t("Helps.drill-lead-6") }}
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="1">
                4.
              </v-col>
              <v-col>
                {{ $t("Helps.drill-lead-7") }}
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="1"></v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style></style>
