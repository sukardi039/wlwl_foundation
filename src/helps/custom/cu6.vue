<template>
  <v-container class="help-content">
    <v-row dense>
      <v-col cols="7">
        <v-img src="images/custom6.png" />
      </v-col>
      <v-col>
        <v-row dense>
        <v-col>
            {{ $t("Helps.custom-plate-introduction") }}
        </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="1"></v-col>
          <v-col>
            <v-row dense>
              <v-col>
                {{ $t("Helps.custom-1-1") }}'{{$t('Nav.Template')}}'{{ $t("Helps.custom-1-2") }}
              </v-col>
            </v-row>
            <v-row dense>
                <v-col cols="1">
                    1.
                </v-col>
                <v-col>
                    {{ $t("Helps.custom-plate-1") }}
                </v-col>
            </v-row>
            <v-row dense>
                <v-col cols="1">
                    2.
                </v-col>
                <v-col>
                    {{ $t("Helps.custom-plate-2") }}
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
