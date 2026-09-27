<template>
  <v-container class="help-content">
    <v-row dense>
      <v-col cols="7" class="center-text">
        <v-img src="images/drillpage4.png" />
      </v-col>
      <v-col>
        <v-row dense>
            <v-col cols="1"></v-col>
            <v-col>
                <v-row dense>
                    <v-col>
                        {{ $t("Helps.drill-staff-introduction") }}
                    </v-col>
                </v-row>
                <v-row dense>
                <v-col cols="1">
                    1.
                </v-col>
                <v-col>
                    {{ $t("Helps.drill-staff-1") }}
                </v-col>
                </v-row>
                <v-row dense>
                <v-col cols="1">
                    2.
                </v-col>
                <v-col>
                    {{ $t("Helps.drill-staff-2") }}
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
