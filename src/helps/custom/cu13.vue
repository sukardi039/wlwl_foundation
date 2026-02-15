<template>
  <v-container class="help-content">
    <v-row dense>
      <v-col cols="7">
        <v-img src="images/custom13.png" />
      </v-col>
      <v-col>
        <v-row dense>
          <v-col cols="1"></v-col>
          <v-col>
            <v-row dense>
                <v-col cols="1">
                </v-col>
                <v-col cols="3">
                    {{ $t("Helps.custom-model-10-1") }}
                </v-col>
                <v-col>{{ $t("Helps.custom-model-10-2") }}</v-col>
            </v-row>
            <v-row dense>
                <v-col cols="1">
                </v-col>
                <v-col cols="3">
                    {{ $t("Helps.custom-model-11-1") }}
                </v-col>
                <v-col>{{ $t("Helps.custom-model-11-2") }}</v-col>
            </v-row>
            <v-row>
                <v-col cols="1"></v-col>
                <v-col>{{$t("Helps.custom-model-12")}}</v-col>
            </v-row>
            <v-row>
                <v-col>{{ $t("Helps.custom-model-tbc") }}</v-col>
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
