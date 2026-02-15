<template>
    <v-container>
        <v-row style="background: lightgrey">
            <v-col>{{$t('Staff.name')}}</v-col>
            <v-col>{{$t('Product.name')}}</v-col>
            <v-col>{{$t('Task.name')}}</v-col>
        </v-row>
        <v-row class="font-weight-bold">
            <v-col>{{Data.staffName}}</v-col>
            <v-col>{{Data.productExp}}</v-col>
            <v-col>{{$t(Data.taskExp)}}</v-col>
        </v-row>
        <v-row style="background: lightgrey">
            <v-col>{{$t(List.base_lst.profiles[0])}}</v-col>
            <v-col>{{$t(List.base_lst.profiles[1])}}</v-col>
            <v-col>{{$t(List.base_lst.profiles[2])}}</v-col>
        </v-row>
        <v-row class="font-weight-bold">
            <v-col>{{Data.skillsValue}}</v-col>
            <v-col>{{Data.moraleValue}}</v-col>
            <v-col>{{Data.efficiencyValue}}</v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'SimulatorShow',
    props: {
        Data: {},
        List: [],
    }
}
</script>

<style>

</style>