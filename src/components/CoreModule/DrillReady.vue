<template>
  <v-container v-if="false">
    <v-card :img="require('../../assets/leadershipinsea.png')">
      <v-row class="pa-3">
        <v-col cols="6" class="white--text"
          ><h2>{{ $t("Drill.getReady") }}</h2></v-col
        >
      </v-row>
    </v-card>
    <v-card class="pa-3">
      <v-row>
          <v-col cols="2"><h3>{{$t('Drill.drillName')}}:</h3></v-col>
          <v-col cols="6"><h3>{{data.modelName}}</h3></v-col>
          <v-col cols="2"><h3>{{$t('Drill.drillDuration')}}: </h3></v-col>
          <v-col cols="2"><h3>{{data.duration}}</h3></v-col>
      </v-row>
    </v-card>
      <br>
      <v-row>
          <v-col class="text-center" style="font-color: red"><h3>{{$t('Drill.note')}}</h3></v-col>
      </v-row>
      <br>
          <v-row class="text-center">
              <v-col><v-btn rounded style="font-weight: bold" @click="$emit('Not-Ready')">{{$t('Drill.notReady')}}</v-btn></v-col>
              <v-col><v-btn rounded style="font-weight: bold" @click="$emit('Proceed-Drill', data)">{{$t('Drill.proceed')}}</v-btn></v-col>
      </v-row>
  </v-container>
</template>

<script>
export default {
    name: 'DrillReady',
    props: {
        data: {},
    },
    created(){
      this.$emit('Proceed-Drill', this.data)
    }

}
</script>

<style>

</style>