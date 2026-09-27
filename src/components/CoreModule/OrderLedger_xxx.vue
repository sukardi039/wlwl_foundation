<template>
    <v-container class="pa-2" style="font-size: 0.85em;" v-if="drillRecord.content">
        <h2 class="text-center">
            {{$t('Ledger.header')}}
        </h2>
        <br>
        <v-row class="font-weight-bold text-center" dense>
            <v-col>{{$t('Ledger.numberOfDays')}}</v-col>
            <v-col>{{$t('Ledger.currentDay')}}</v-col>
        </v-row>
        <v-row class="text-center" dense>
            <v-col>{{drillRecord.content.control.numberOfDays}}</v-col>
            <v-col>{{drillRecord.dayNumber}}</v-col>
        </v-row>
        <v-divider></v-divider>
        <br>
        <v-row class="font-weight-bold text-center" dense>
            <v-col>{{$t('Ledger.orderNeeded')}}</v-col>
            <v-col>{{$t('Ledger.orderCompleted')}}</v-col>
        </v-row>
        <v-row class="text-center" dense>
            <v-col>{{drillRecord.content.ordersToComplete}}</v-col>
            <v-col>{{drillRecord.content.orderStatus.ordersCompleted}}</v-col>
        </v-row>
        <br>
        <v-container v-if="drillRecord.content.control.remainingMinutes">
            <v-row class="font-weight-bold text-center" dense>
                <v-col>{{$t('DrillPlatform.minutesToGo')}}</v-col>
            </v-row>
            <v-row class="text-center" dense>
                <v-col>{{drillRecord.content.control.remainingMinutes}}</v-col>
            </v-row>
            <br>
        </v-container>
        <v-divider></v-divider>
        <br>
        <v-row class="font-weight-bold text-center" dense>
            <v-col>{{$t('Ledger.task')}}</v-col>
            <v-col>{{$t('Ledger.waitAssignment')}}</v-col>
            <v-col>{{$t('Ledger.inProgress')}}</v-col>
        </v-row>
        <v-row class="text-center" dense v-for="stage in drillRecord.content.orderStatus" :key="stage.state">
                <v-col>{{paramdata.task_lst.task[stage.state-1]}}</v-col>
                <v-col>{{stage.waitAssignment}}</v-col>
                <v-col>{{stage.inProgress}}</v-col>
        </v-row>
    </v-container> 
</template>

<script>
import { mapState } from "vuex";

export default {
    name: 'OrderLedger',
    props: {
    },
    computed: {
        ...mapState({
            signedinuser: "signedinuser",
            paramdata: "paramdata",
            drillRecord: 'drilldata',
        }),
    },
}
</script>

<style>

</style>