<template>
  <v-container class="help-content">
    <v-row dense>
      <v-col cols="7" class="help-img">
        <v-img src="images/drillpage21.png" />
      </v-col>
      <v-col>
        <v-row dense>
          <v-col cols="1"></v-col>
          <v-col>
            <v-row dense>
              <v-col>
                {{ $t("Helps.drill-feedback-intro") }}
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="1">
                1.
              </v-col>
              <v-col>
                {{ $t("Helps.drill-feedback-7") }}
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
