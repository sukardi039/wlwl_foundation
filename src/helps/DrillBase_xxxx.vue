<template>
  <v-container>
    <v-dialog persistent v-model="helpSubject">
        <v-card>
            <Drill_help v-if="helpSubject='drill'" />
        </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Drill_help from './Drill_help'
export default {
    name:'HelpBase',
    component: {
        Drill_help
    },
    props:{
        helpSubject
    }

}
</script>

<style>

</style>