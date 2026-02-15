<template>
  <v-container>
    <v-dialog persistent v-model="hasSubject">
        <v-card>
            <Drill_help v-if="helpSubject=='drill'" />
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
    data(){
        return {
            hasSubject: false
        }
    },
    props:{
        helpSubject:''
    },
    conmputed: {
        gotSubject(){
            if (this.helpSubject){
                this.hasSubject = true
            } else {
                this.hasSubject = false
            }
        }
    }

}
</script>

<style>

</style>