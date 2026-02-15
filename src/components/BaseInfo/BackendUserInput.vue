<template>
    <v-container>
        <v-row>
            <v-col>
                <v-text-field
                    :label="$t('BackendUser.name')"
                    outlined
                    v-model="Data.userName"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-text-field
                    :label="$t('BackendUser.loginName')"
                    outlined
                    v-model="Data.loginName"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row v-if="AmendCode==='A'">
            <v-col>
                <v-text-field
                    :label="$t('BackendUser.password')"
                    outlined
                    v-model="Data.loginPassword"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-select
                    :label="$t('BackendUser.level')"
                    :items="LevelList"
                    outlined
                    v-model="Data.level"
                ></v-select>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-select
                    :label="$t('BackendUser.active')"
                    :items="YesNo"
                    outlined
                    v-model="Data.bactive"
                ></v-select>
            </v-col>
        </v-row>
        <v-row class="center">
            <v-col auto></v-col>
            <v-col cols="1">
                <span class="mdi mdi-check" @click="$emit('Update-Info', Data)"></span>
            </v-col>
            <v-col cols="1">
                <span class="mdi mdi-restore" @click="$emit('Abort-Clicked')"></span>
            </v-col>
        </v-row>            
    </v-container>
</template>

<script>
export default {
    name: 'BackendUserInput',
    props: {
        Data: {},
        MaxLevel: 0,
        LevelList: [],
        YesNo: [],
        AmendCode: '',
    }
}
</script>

<style>

</style>