<template>
    <v-container>
        <v-dialog
            persistent
            v-model="data"
        >
            <v-card
                style="font-size: 0.8em;"            
            >
                <v-card-title>
                    <h4>{{$t('DrillOrderStat.title')}} ({{task.taskDisplayName}})</h4>
                    <v-spacer></v-spacer>
                    <h5 v-if="taskEff.instructor>0">
                        {{$t('DrillOrderStat.workPerOrder')}}:{{taskEff.duration}}{{$t('general.day')}}, 
                        {{$t('DrillOrderStat.skillsWeight')}}:{{taskEff.skillsWeight}}, 
                        {{$t('DrillOrderStat.moraleWeight')}}:{{taskEff.moraleWeight}}
                    </h5>
                    <v-spacer></v-spacer>
                                  <v-btn
                outlined
                rounded
                height="25px"
                @click.stop="$emit('Close-OrderStat')"
              >
                <span class="mdi mdi-close" style="font-size: 0.8em;">{{
                  $t("DrillPlatform.cancel")
                }}</span>
              </v-btn>
                </v-card-title>
                <v-card-text>
                   <v-row dense>
                        <v-col cols="12" md="7" lg="7" xl="7">
                            <v-row dense>
                                <v-col class="text-center font-weight-bold"><h3>{{$t('DrillOrderStat.processing')}}</h3></v-col>
                            </v-row>
                            <v-row dense class="font-weight-bold">
                                <v-col class="text-center" cols="4"><h4>{{$t('DrillOrderStat.orderNumber')}}</h4></v-col>
                                <v-col class="text-center" cols="8"><h4>{{$t('DrillOrderStat.assignedTo')}}</h4></v-col>
                                <v-col class="text-center" cols="4" v-if="false"><h4>{{$t('DrillOrderStat.workNeeded')}}</h4></v-col>
                            </v-row>
                            <v-divider></v-divider>
                            <v-row dense :class="index % 2?'row0':'row1'" v-for="(order, index) in processing" :key="order.ordernumber">
                                <v-col class="text-center" cols="4">{{order.orderNumber}}</v-col>
                                <v-col class="text-center" cols="8">{{order.staffExp}}</v-col>
                                <v-col class="text-center" cols="4" v-if="false">{{order.workNeeded}}{{$t('general.day')}}</v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12" md="1" lg="1" xl="1"></v-col>
                        <v-col cols="12" md="4" lg="4" xl="4">
                            <v-row dense>
                                <v-col class="text-center font-weight-bold"><h3>{{$t('DrillOrderStat.waiting')}}</h3></v-col>
                            </v-row>
                            <v-row dense class="font-weight-bold">
                                <v-col class="text-center" cols="4"><h4>{{$t('DrillOrderStat.orderNumber')}}</h4></v-col>
                                <v-col class="text-center" cols="8"><h4>{{$t('DrillOrderStat.waitSince')}}</h4></v-col>
                            </v-row>
                            <v-divider></v-divider>
                            <v-row dense :class="index % 2?'row0':'row1'" v-for="(order, index) in waiting" :key="order.ordernumber">
                                        <v-col class="text-center" cols="4">{{order.orderNumber}}</v-col>
                                        <v-col class="text-center" cols="8">{{$t('general.day1')}}{{order.day}}{{$t('general.day2')}}</v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
export default {
    name: 'DrillOrderStat',
    props:{
        paramdata: [],
        data: [],
        task: {},
        taskEff: {},
        waiting: [],
        processing: [],
    }
}
</script>

<style>

</style>