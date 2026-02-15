<template>
  <v-container class="help-content">
    <v-row dense>
      <v-col cols="7" class="help-img">
            <v-img src="images/drillpage12.png" />
      </v-col>
      <v-col>
        <v-row dense>
            <v-col cols="1"></v-col>
            <v-col>
                <v-row dense>
                    <v-col>
                        {{ $t("Helps.drill-staff-intro") }}
                    </v-col>
                </v-row>
                <v-row dense>
                <v-col cols="1">
                    1.
                </v-col>
                <v-col>
                    {{ $t("Helps.drill-action-7") }}
                </v-col>
                </v-row>
                <v-row dense>
                <v-col cols="1">
                    2.
                </v-col>
                <v-col>
                    {{ $t("Helps.drill-action-8") }}
                </v-col>
                </v-row>
                <v-row dense>
                <v-col cols="1">
                    3.
                </v-col>
                <v-col>
                    {{ $t("Helps.drill-action-9") }}
                </v-col>
                </v-row>
                <v-row dense>
                <v-col cols="1">
                    4.
                </v-col>
                <v-col>
                    {{ $t("Helps.drill-action-10") }}
                </v-col>
                </v-row>
                <v-row>
                    <v-col cols="1"></v-col>
                    <v-col>{{$t('Helps.drill-click-close')}}</v-col>
                </v-row>
                <v-row>
                    <v-col cols="1"></v-col>
                    <v-col>{{$t('Helps.drill-staff-intro-end')}}</v-col>
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
