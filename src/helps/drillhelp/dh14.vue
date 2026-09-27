<template>
  <v-container class="help-content">
    <v-row dense>
      <v-col cols="7" class="help-img">
            <v-img src="images/drillpage14.png" width="300px" />
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
                    {{ $t("Helps.drill-style-1") }}
                </v-col>
                </v-row>
                <v-row dense>
                <v-col cols="1">
                    2.
                </v-col>
                <v-col>
                    {{ $t("Helps.drill-style-2") }}
                </v-col>
                </v-row>
                <v-row>
                    <v-col cols="1"></v-col>
                    <v-col>{{$t('Helps.drill-style-default')}}</v-col>
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
