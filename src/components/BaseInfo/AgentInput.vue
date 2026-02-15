<template>
    <v-container>
        <v-row>
            <v-col>
                <v-text-field
                    :label="$t('Agent.name')"
                    outlined
                    v-model="Data.agentName"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-select
                    :label="$t('Agent.active')"
                    :items="YesNo"
                    outlined
                    v-model="Data.bactive"
                ></v-select>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-date-picker
                    v-model="Data.availableTill"
                    v-if="showTill"
                    @change="showTill=false"
                ></v-date-picker>
                <v-text-field
                    :label="$t('Agent.till')"
                    readonly
                    outlined
                    v-model="tillDisp"
                    @click.stop="showTill=true"
               >
                </v-text-field>
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
    name: 'AgentInput',
    data() {
        return {
            showFrom: false,
            showTill: false
        }
    },
    props: {
        Data: [],
        modelList: [],
        modelRef: [],
        YesNo: [],
    },
    computed:{
        fromDisp() {
            return this.Data.availableFrom
        },
        tillDisp() {
            return this.Data.availableTill
        }
    }
}
</script>

<style>

</style>