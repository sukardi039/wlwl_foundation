<template>
  <div class="pa-0 ma-0">
    <v-row dense>
      <v-col :cols="$i18n.locale=='cn'?6:12" v-for="act in actions" :key="act.sctionExp" :class="$i18n.locale=='cn'?'mt-2':''">
        <v-btn
        v-if="$i18n.locale=='cn'"
          outlined
          rounded
          :class="buttonClass(act)"
          @click.stop="$emit('actionSelected', act.displayKey)"
        >
          <span style="font-size: 0.8em; font-weight: bold;">{{
            $t(act.displayKey)
          }}</span>
        </v-btn>
        <v-btn
        v-else
          outlined
          rounded
          small
          height="20px"
          :class="buttonClass(act)"
          @click.stop="$emit('actionSelected', act.displayKey)"
        >
          <span style="font-size: 0.8em; font-weight: bold;">{{
            $t(act.displayKey)
          }}</span>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "DrillActionMenu",
  props: {
    actions: [],
    head: "",
    data:[],
  },
  methods: {
    whereStaff(v){
      let z = 0;
      for (let c = 1; c<=this.data.content.control.maxMembers; c++){
        if (this.data.content.members[c].staffName == v){
          z = c;
          break;
        }
      }
        return z
    },
    buttonClass(act){
        let z = ''
        if (act.useLimit>this.data.content.used.actions[act.actionName]||!this.data.content.used.actions[act.actionName]){
            z = 'header-btn'
            if (act.focusedStaff>0 && this.whereStaff(act.focusedStaff) == 0){
                z = ''
            }
        }
        return z
    }
  },
};
</script>

<style></style>
