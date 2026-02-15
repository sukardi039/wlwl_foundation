<template>
  <v-container class="help-content">
    <v-row dense>
      <v-col cols="7">
        <v-img src="images/drillpage1.png" />
      </v-col>
      <v-col>
        <v-row dense>
          <v-col cols="1"></v-col>
            <v-col>
              <v-row dense>
                <v-col>
                  {{ $t("Helps.drill-introduction") }}
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="1">
                  1.
                </v-col>
                <v-col>
                  {{ $t("Helps.drill-panel-1") }}
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="1">
                  2.
                </v-col>
                <v-col>
                  {{ $t("Helps.drill-panel-2") }}
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="1">
                  3.
                </v-col>
                <v-col>
                  {{ $t("Helps.drill-panel-3") }}
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
