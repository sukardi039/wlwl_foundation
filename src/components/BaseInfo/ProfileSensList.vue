<template>
    <v-container>
        <v-row dense>
            <v-col cols="6" class="text-center">{{$t("BaseInfo.profiles")}}</v-col>
            <v-spacer></v-spacer>
            <v-col cols="6" class="text-center">{{$t("BaseKey.sensitive")}}</v-col>
        </v-row>
        <v-row style="background-color: lightgrey;" dense>
            <v-col cols="2">{{$t(HeadData[0])}}</v-col>
            <v-col cols="2">{{$t(HeadData[1])}}</v-col>
            <v-col cols="2">{{$t(HeadData[2])}}</v-col>
            <v-col class="text-end">{{$t(HeadData[0])}}</v-col>
            <v-col class="text-end">{{$t(HeadData[1])}}</v-col>
            <v-col class="text-end">{{$t(HeadData[2])}}</v-col>
            <v-col cols="1"></v-col>
        </v-row>
        <v-row v-for="Data in InfoData" :key="Data.profileSensitivityKey">
            <v-col cols="2">{{$t(Data.skillsExp)}}</v-col>
            <v-col cols="2">{{$t(Data.moraleExp)}}</v-col>
            <v-col cols="2">{{$t(Data.efficiencyExp)}}</v-col>
            <v-col class="text-end" v-if="Data.profileSensitivityKey!==CurrentEdit" @click="$emit('Row-Clicked', Data)">{{Data.skillsSensitivity}}</v-col>
            <v-col class="text-end" v-if="Data.profileSensitivityKey===CurrentEdit">
                <v-text-field
                    outlined
                    v-model="EditData.skillsSensitivity"
                    type="number"
                >
                </v-text-field>
            </v-col>
            <v-col class="text-end" v-if="Data.profileSensitivityKey!==CurrentEdit" @click="$emit('Row-Clicked', Data)">{{Data.moraleSensitivity}}</v-col>
            <v-col class="text-end" v-if="Data.profileSensitivityKey===CurrentEdit">
                <v-text-field
                    outlined
                    v-model="EditData.moraleSensitivity"
                    type="number"
                >
                </v-text-field>
            </v-col>
            <v-col class="text-end" v-if="Data.profileSensitivityKey!==CurrentEdit" @click="$emit('Row-Clicked', Data)">{{Data.efficiencySensitivity}}</v-col>
            <v-col class="text-end" v-if="Data.profileSensitivityKey===CurrentEdit">
                <v-text-field
                    outlined
                    v-model="EditData.efficiencySensitivity"
                    type="number"
                >
                </v-text-field>
            </v-col>
            <v-col cols="1">                
                <span class="mdi mdi-check" v-if="Data.profileSensitivityKey===CurrentEdit" @click="$emit('Update-Info', EditData)"></span>
                <span class="mdi mdi-restore" v-if="Data.profileSensitivityKey===CurrentEdit" @click="$emit('Abort-Info')"></span>
</v-col>
        </v-row>
    </v-container>  
</template>

<script>
export default {
    name: 'ProfileSensList',
    data() {
        return {
        }
    },
    props: {
        InfoData: [],
        HeadData: [],
        CurrentEdit: '',
        EditData: {},
    },

}
</script>

<style>

</style>