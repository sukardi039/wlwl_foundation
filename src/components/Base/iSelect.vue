<template>
    <v-container fluid class="pa-0">
        <v-row @click="toSelect()">
            <v-col>
                <v-text-field
                    readonly
                    outlined
                    hide-details
                    v-model="currentExp"
                    :label="label"
                    append-icon="mdi mdi-chevron-down"
                ></v-text-field>
            </v-col>
        </v-row>
            <v-card float shadow v-show="Selecting" class="pa-3">
                <v-row v-for="Option in items" :key="Option" outlined>
                    <v-col v-if="i18n" v-show="Option!=currentSelected" @click="selected(Option)">{{$t(Option)}}</v-col>
                    <v-col v-if="!i18n" v-show="Option!=currentSelected" @click="selected(Option)">{{Option}}</v-col>
                </v-row>
            </v-card>
    </v-container>
</template>

<script>
export default {
    name: 'iSelect',
    data() {
        return{
            Selecting: false,
            currentSelected: '',
            currentExp: '',
        }
    },
    props:
        ['value', 'items', 'i18n', 'label'],
     computed:{
    //     localSelected() {
    //         console.log('v', this.value)
    //         var ls = this.value
    //         if (this.i18n){
    //             ls = this.$t(this.value)
    //         }
    //         this.currentSelect = ls
    //         return ls
    //     }
            changeCurrentSelect() {
                return created()
            },
     },
    methods:{
        toSelect(){
            this.Selecting = !this.Selecting
        },
        selected(opt){
//            console.log('localS1',this.localSelected)
            // this.currentSelect=this.currentSel(opt)
            this.$emit('input', opt)
            this.currentSelected = opt
            this.currentExp = this.currentSel()
            this.Selecting = false
//            console.log(this.label,this.currentExp, this.currentSel())
        },
        currentSel(){
            let ev = this.currentSelected
            // console.log('ev', ev)
            var ls = ev
            if (this.i18n){
                ls = this.$t(ev)
            }
            return ls
        }
    },
    created() {
        // console.log('created', this.value)
        this.currentSelected = this.value
        this.currentExp = this.currentSel(this.currentSelected)
//        console.log(this.label,this.currentExp, this.currentSel())
    }
}
</script>

<style>

</style>