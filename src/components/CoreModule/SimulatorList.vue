<template>
    <v-container>
        <v-row v-for="Data in History" :key="Data.seqNumber" @click="$emit('Row-Clicked', Data)">
            <v-col>{{Data.seqNumber}}</v-col>
            <v-col>{{Data.staffName}}</v-col>
            <v-col>{{Data.productExp}}</v-col>
            <v-col>{{$t(Data.taskExp)}}</v-col>
            <v-col>{{$t(Data.actionExp)}}</v-col>
            <v-col>{{Data.skillsValue}}</v-col>
            <v-col>{{Data.moraleValue}}</v-col>
            <v-col>{{Data.efficiencyValue}}</v-col>
        </v-row>
        
    </v-container>  
</template>

<script>
export default {   
    name: 'SimulatorList',
    props: {
        History: [],
        List: [],
    }
}
</script>

<style>

</style>