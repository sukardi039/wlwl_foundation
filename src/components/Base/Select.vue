<template>
    <v-container fluid class="pa-0">
        <v-row @click="toSelect()">
            <v-col>
                <v-text-field
                    readonly
                    outlined
                    hide-details
                    :label="Label"
                    v-model="localSelected"
                    append-icon="mdi mdi-chevron-down"
                ></v-text-field>
            </v-col>
        </v-row>
            <v-card float shadow v-show="Selecting" class="pa-3">
                <v-row v-for="Option in Options" :key="Option" outlined>
                    <v-col v-if="i18n" v-show="Option!=Selected" @click="selected(Option)">{{$t(Option)}}</v-col>
                    <v-col v-if="!i18n" v-show="Option!=Selected" @click="selected(Option)">{{Option}}</v-col>
                </v-row>
            </v-card>
    </v-container>
</template>

<script>
export default {
    name: 'Select',
    data() {
        return{
            Selecting: false,
        }
    },
    props:{
        Label: '',
        Options: [],
        Selected: '',
        i18n: false,
    },
    computed:{
        localSelected: function(){
            var ls = this.Selected
            if (this.i18n){
                ls = this.$t(this.Selected)
            }
            return ls
        }
    },
    methods:{
        toSelect(){
            this.Selecting = !this.Selecting
        },
        selected(opt){
            this.$emit("selected", opt)
            this.Selected = opt
            this.Selecting = false
        },
    },

}
</script>

<style>

</style>