<template>
    <v-container>
        <v-row>
            <v-col class="font-weight-bold">{{$t(Data.displayKey)}}</v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-textarea
                    readonly
                    :label="$t('Style.description')"
                    outlined
                    v-model="disp"
                ></v-textarea>
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
    name: 'StyleInput',
    props: {
        Data: [],
    },
    computed:{
        disp() {
            return this.$t(this.Data.displayKey+'_e')
        }
    },
}
</script>

<style>

</style>