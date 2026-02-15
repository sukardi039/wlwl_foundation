<template>
  <v-container class="help-content">
    <v-row dense>
      <v-col cols="7" class="help-img">
        <v-img src="images/drillpage16.png" width="170px" />
      </v-col>
      <v-col>
        <v-row dense>
          <v-col cols="1"></v-col>
          <v-col>
            <v-row dense>
              <v-col>
                {{ $t("Helps.drill-style-intro") }}
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="1">
                1.
              </v-col>
              <v-col>
                {{ $t("Helps.drill-style-7") }}
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="1">
                2.
              </v-col>
              <v-col>
                {{ $t("Helps.drill-style-8") }}
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
