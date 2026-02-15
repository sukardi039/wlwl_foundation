<template>
  <v-container class="help-content">
    <v-row dense>
      <v-col cols="7">
        <v-img src="images/concept1.png" />
      </v-col>
      <v-col>
        <v-row dense>
            <v-col>{{$t("Helps.concept")}}</v-col>
        </v-row>
        <v-row dense>
          <v-col cols="1"></v-col>
            <v-col>
              <v-row dense>
                <v-col>
                  {{ $t("Helps.concept-introduction") }}
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
