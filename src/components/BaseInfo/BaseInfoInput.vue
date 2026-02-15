<template>
    <v-container>
        <v-row>
            <v-col>
                <v-text-field
                    outlined
                    v-model="BaseInfo.name"
                >
                </v-text-field>
            </v-col>
            <v-col>
                <v-text-field
                    outlined
                    v-model="BaseInfo.displayKey"
                >
                </v-text-field>
            </v-col>
            <v-col auto>
                <span class="mdi mdi-check" @click="$emit('Update-Info', BaseInfo)"></span>
                <span class="mdi mdi-restore" @click="$emit('Abort-Info')"></span>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'BaseInfoInput',
    props:{
        BaseInfo: {},
    }

}
</script>

<style>

</style>