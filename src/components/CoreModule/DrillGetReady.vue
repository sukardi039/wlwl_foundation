<template>
    <v-container>
    <v-card :img="require('../../assets/leadershipinsea.png')">
      <v-row class="pa-3">
        <v-col cols="6" class="white--text"
          ><h2>{{$t('Drill.gettingReady')}}</h2></v-col
        >
      </v-row>
    </v-card>
        <br>
        <br>
        <v-btn
            depressed
            elevation="2"
            fab
            loading
            outlined
            small
            :style="{left: '50%', transform:'translateX(-50%)'}"
        ></v-btn>

    </v-container>
</template>

<script>
export default {
    name: 'DrillEnd',
}
</script>

<style>

</style>