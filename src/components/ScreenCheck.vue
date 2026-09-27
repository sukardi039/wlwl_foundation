<template>
    <v-dialog
        persistent
        v-model="screenNotOK"
        width="480px"
    >
    <v-card :img="require('../assets/screen.png')" class="text-center" width="480px" height="403px" flat>
        <v-card-title class="text-center">
        </v-card-title>
        <v-card-text>
            <h2 text-white>{{$t('ScreenCheck.notRight')}}</h2>
            <br>
            <br>
            <h4>{{$t('ScreenCheck.minimum')}} {{w}}X{{h}}</h4>
            <br>
            {{$t('ScreenCheck.setAndReset')}}
            <br>
            <br>
            <v-btn
            round
            @click.stop="$emit('checked')">{{$t('ScreenCheck.useIt')}}</v-btn>
        </v-card-text>
    </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'ScreenCheck',
    props: {
        mod: '',
        },
    data(){
        return{
            screenNotOK: false,
            h:0,
            w:0,
        }
    },
    created(){
        this.w=screen.width
        this.h=screen.height
        if (this.w<1280 || this.h< 800){
            this.screenNotOK = true
        }
    }
}
</script>

<style>

</style>