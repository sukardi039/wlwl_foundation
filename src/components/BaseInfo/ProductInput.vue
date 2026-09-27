<template>
    <v-container>
        <v-row dense>
            <v-col>
                <v-text-field
                    :label="$t('Product.name')"
                    outlined
                    v-model="Data.productShortName"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row dense>
            <v-col>
                <v-textarea
                    :label="$t('Product.description')"
                    outlined
                    v-model="Data.productDescription"
                ></v-textarea>
            </v-col>
        </v-row>
        <v-row dense>
            <v-col>
                <v-text-field
                    :label="$t('Product.ordersPerDay')"
                    outlined
                    v-model="Data.ordersPerDay"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row dense>
            <v-col>
                <v-text-field
                    :label="$t('Product.minValue')"
                    outlined
                    v-model="Data.minOrderValue"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row dense>
            <v-col>
                <v-text-field
                    :label="$t('Product.maxValue')"
                    outlined
                    v-model="Data.maxOrderValue"
                ></v-text-field>
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
    name: 'ProductInput',
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