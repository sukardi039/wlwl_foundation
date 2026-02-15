<template>
    <v-container>
        <v-dialog
            persistent
            v-model="done"
        >
            <v-card
                style="font-size: 0.8em;"            
            >
                <v-card-title class="detail-head">
                    <h4>{{$t('DrillOrderDone.title')}}</h4>
                    <v-spacer></v-spacer>
                                  <v-btn
                outlined
                rounded
                height="25px"
                @click.stop="$emit('Close-OrderDone')"
              >
                <span class="mdi mdi-close" style="font-size: 0.8em;">{{
                  $t("DrillPlatform.cancel")
                }}</span>
              </v-btn>
                </v-card-title>
                <v-card-text class="detail-box">
                    <v-row dense class="font-weight-bold">
                        <v-col cols="2" class="text-center">{{$t('DrillOrderDone.orderNumber')}}</v-col>
                        <v-col cols="10">
                            <v-row>
                                <v-col class="text-center">{{$t('DrillOrderDone.task')}}</v-col>
                                <v-col class="text-center">{{$t('DrillOrderDone.duration')}}</v-col>
                                <v-col class="text-center">{{$t('DrillOrderDone.assignedTo')}}</v-col>
                                <v-col class="text-center">{{$t('DrillOrderDone.assignedDay')}}</v-col>
                                <v-col class="text-center">{{$t('DrillOrderDone.completedDay')}}</v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-divider></v-divider>
                    <v-row dense v-for="ord in done" :key="ord.orderNumber">
                        <v-col cols="2" class="text-center font-weight-bold">{{ord.orderNumber}}</v-col>
                        <v-col cols="10">
                            <v-row dense v-for="(d, index) in ord.log" :key="index">
                                <v-col class="text-center">{{taskExp(index)}}</v-col>
                                <v-col class="text-center">{{d.workDuration}} {{$t('general.day')}}</v-col>
                                <v-col class="text-center">{{staffExp(d.assignedTo)}}</v-col>
                                <v-col class="text-center">{{$t('general.day1')}}{{d.assignedDay}}{{$t('general.day2')}}</v-col>
                                <v-col class="text-center">{{$t('general.day1')}}{{d.completedDay}}{{$t('general.day2')}}</v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12"></v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
export default {
    name: 'DrillOrderDone',
    props:{
        paramdata: [],
        data: [],
        done: [],
        task: [],
        staff: [],
    },
    methods:{
        staffExp(ev){
            console.log(ev)
            return this.staff.find(s=>s.staffName==ev).staffExp
        },
        taskExp(ev){
            return this.task.find(s=>s.stage==ev).taskDisplayName
        },
    },
    created(){
        console.log(this.done)
    }
}
</script>

<style>

</style>