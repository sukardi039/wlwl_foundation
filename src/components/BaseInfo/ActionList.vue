<template>
  <v-container>
        <v-row style="background-color: lightgrey">
            <v-col>
                <v-row dense>
                    <v-col cols="2">{{$t('Action.name')}}</v-col>
                    <v-col cols="4">{{$t('Action.description')}}</v-col>
                    <v-col cols="3">{{$t('Action.parentAction')}}</v-col>
                    <v-col cols="3">{{$t('Action.affectCriteria')}}</v-col>
                </v-row>
                <v-row dense>
                    <v-col cols="4"></v-col>
                    <v-col cols="2" class="text-center">{{$t('Action.minMember')}}</v-col>
                    <v-col cols="2" class="text-center">{{$t('Action.actionType')}}</v-col>
                    <v-col cols="2" class="text-center">{{$t('Action.withTask')}}</v-col>
                    <v-col cols="2" class="text-center">{{$t('Action.swapTask')}}</v-col>
                </v-row>
                <v-row dense>
                    <v-col cols="2"></v-col>
                    <v-col cols="2" class="text-center">{{$t('Action.away')}}</v-col>
                    <v-col cols="2" class="text-center">{{$t('Action.duration')}}</v-col>
                    <v-col cols="2" class="text-center">{{$t('Action.applyAll')}}</v-col>
                    <v-col cols="2" class="text-center">{{$t('Action.minStaff')}}</v-col>
                    <v-col cols="2" class="text-center">{{$t('Action.maxStaff')}}</v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-row flat v-for="Data in BaseData" :key="Data.displayKey" @click="$emit('Row-Clicked', Data)">
            <v-col>
                <v-row dense>
                    <v-col cols="2" class="font-weight-bold">{{$t(Data.displayKey)}}</v-col>
                    <v-col cols="4">{{$t(Data.displayKey+'_e')}}</v-col>
                    <v-col cols="3">{{$t(parentAct(Data.parentAction))}}</v-col>
                    <v-col cols="3">{{$t(Data.affectText)}}, {{$t(Data.affectCode)}}</v-col>
                </v-row>
                <v-row dense>
                    <v-col cols="4"></v-col>
                    <v-col cols="2" class="text-center">{{Data.minMemberSize}}</v-col>
                    <v-col cols="2" class="text-center">{{$t('Action.'+Data.typeExp)}}</v-col>
                    <v-col cols="2" class="text-center">{{$t('YesNo.'+Data.withTask)}}</v-col>
                    <v-col cols="2" class="text-center">{{$t('YesNo.'+Data.swapTask)}}</v-col>
                </v-row>
                <v-row dense>
                    <v-col cols="2"></v-col>
                    <v-col cols="2" class="text-center">{{Data.away}}</v-col>
                    <v-col cols="2" class="text-center">{{Data.duration}}</v-col>
                    <v-col cols="2" class="text-center">{{$t('YesNo.'+Data.applyAll)}}</v-col>
                    <v-col cols="2" class="text-center">{{Data.minStaff}}</v-col>
                    <v-col cols="2" class="text-center">{{Data.maxStaff}}</v-col>
                </v-row>
            </v-col>
        </v-row>
  </v-container>
</template>

<script>
export default {
    name: 'ActionList',
    props: {
        BaseData: [],
        BaseInfo: [],
    },
    methods:{
        parentAct(ch){
            if (ch){
                return this.BaseData.find(c=>c.actionName==ch).displayKey
            } else {
                return ''
            }
        },
    }
}
</script>

<style>

</style>