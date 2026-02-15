<template>
    <v-container>
        <v-row v-for="ClassInfo in ClassInfos" :key="ClassInfo.profileClassCode" @click="$emit('Row-Clicked',ClassInfo)">
            <v-col cols="2">{{ClassInfo.profileClassCode}}</v-col>
            <v-col cols="2">{{$t(ClassInfo.profileDisplayName)}}</v-col>
            <v-col cols="3">{{$t(ClassInfo.profileClassDisplayName)}}</v-col>
            <v-col cols="2" class="text-end">{{ClassInfo.profileClassMin}}</v-col>
            <v-col cols="2" class="text-end">{{ClassInfo.profileClassMax}}</v-col>
            <v-col cols="1"></v-col>
        </v-row>
    </v-container>  
</template>

<script>
export default {
    name: 'ProfileClassList',
    props: {
        ClassInfos: [],
    }
}
</script>

<style>

</style>