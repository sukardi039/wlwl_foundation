<template>
    <!-- <v-dialog
        persistent
        width="80%"
        v-model="subAction"
    > -->
        <v-card>
        <v-card-title>
          <v-row dense class="subAction" v-if="actMsg">
            <v-col
              ><h3>{{actMsg.title}}</h3>
              </v-col
            >
          </v-row>
        </v-card-title>
        <v-card-actions v-if="oldStyle">
            <v-row dense class="align-middle">
                <v-col cols="2">
                    <v-btn rounded style="font-weight: bold" v-if="myAction" @click="$emit('Submit-SubAction', myAction)">{{$t('DrillPlatform.continue')}}</v-btn>
                </v-col>
                <v-col v-if="myAction">{{$t('DrillPlatform.duration')}}{{paramdata.action_det.action.find((a)=>a.displayKey==myAction).duration}}{{$t('DrillPlatform.days')}}</v-col>
                <v-col auto class="text-end">
                    <v-btn rounded style="font-weight: bold" @click="$emit('Close-SubAction')">{{$t('DrillPlatform.cancel')}}</v-btn>
                </v-col>
            </v-row>
        </v-card-actions>
        </v-card>
    <!-- </v-dialog> -->
</template>

<script>
export default {
    name: 'DrillSubAction',
    data() {
        return {
        }
    },
    props: {
        subAction: [],
        paramdata: [],
        mainAction: '',
        actMsg:[],
        oldStyle:false,
        myAction:'',
    }
}
</script>

<style>

</style>