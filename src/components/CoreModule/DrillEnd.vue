<template>
    <v-container>
    <v-card :img="require('../../assets/leadershipinsea.png')">
      <v-row class="pa-3">
        <v-col cols="6" class="white--text"
          ><h2>{{$t('Drill.ended')}}</h2></v-col
        >
      </v-row>
    </v-card>
        <br>
      <v-row class="text-center">
        <v-col>
          <v-btn @click="resetting()">{{$t('Drill.refresh')}}</v-btn>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'DrillEnd',
    props:{
        rTime: '',
    },
    methods: {
      resetting(){
        document.getElementById('entryPage').click();
      }
    }
}
</script>

<style>

</style>