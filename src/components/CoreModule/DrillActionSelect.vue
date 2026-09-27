<template>
  <div>
    <v-card
      flat
      dense
      :img="require('../../assets/list-head.gif')"
      height="25px"
      class="pa-0 ma-0"
    >
      <v-card-text class="pa-0 ma-0"
        ><v-row dense class="pa-0 ma-0" height="25px"
          ><v-col cols="2"></v-col
          ><v-col
            ><h3>
              {{head}}
            </h3></v-col
          ></v-row
        ></v-card-text
      ></v-card
    >
    <v-card
      flat
      dense
      :img="
        require(index == actions.length - 1
          ? '../../assets/list-end.gif'
          : '../../assets/list-mid.gif')
      "
      height="25px"
      class="pa-0 ma-0"
      v-for="(act, index) in actions"
      :key="act.actionExp"
    >
      <v-card-text class="pa-0 ma-0">
        <v-row dense height="25px" class="pa-0 ma-0">
          <v-col cols="2"></v-col>
          <v-hover v-slot="{ hover }">
            <v-col
              :class="{ 'action-hover': hover }"
              @click.stop="$emit('actionSelected', act.displayKey)"
              ><h4>{{ $t(act.displayKey) }}</h4></v-col
            >
          </v-hover>
        </v-row>
      </v-card-text></v-card
    >
  </div>
</template>

<script>
export default {
  name: "DrillActionSelect",
  props:{
    actions: [],
    head: '',
  }
};
</script>

<style></style>
