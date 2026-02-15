<template>
    <v-container style="font-size: 1em">
        <v-row>
            <v-col cols="1">
                <span class="mdi mdi-chevron-left" @click="$emit('Go-Row', Data.seqNumber*1-1)"></span>

            </v-col>
            <v-col auto>
                <v-row>
                    <v-col cols="3">{{$t('Simulator.seq')}}</v-col>
                    <v-col>{{Data.seqNumber}}</v-col>
                </v-row>
                <v-row>
                    <v-col cols="3">{{$t('Staff.name')}}</v-col>
                    <v-col>{{Data.staffName}}</v-col>
                </v-row>
                <v-row>
                    <v-col cols="3">{{$t('Product.name')}}</v-col>
                    <v-col>{{Data.productExp}}</v-col>
                </v-row>
                <v-row>
                    <v-col cols="3">{{$t('Task.name')}}</v-col>
                    <v-col>{{$t(Data.taskExp)}}</v-col>
                </v-row>
                <v-row v-if="Data.lastAction">
                    <v-col cols="3">{{$t('Impact.action')}}</v-col>
                    <v-col>{{$t(Data.actionExp)}}</v-col>
                    </v-row>
                <v-row>
                    <v-col cols="3">{{$t('Simulator.result')}}</v-col>
                    <v-col dense>
                                <v-row>
                                    <v-col class="text-center">{{$t(bData[0])}}</v-col>
                                    <v-col class="text-center">{{$t(bData[1])}}</v-col>
                                    <v-col class="text-center">{{$t(bData[2])}}</v-col>
                                </v-row>
                                <v-row>
                                    <v-col class="text-center">{{Data.skillsValue}}</v-col>
                                    <v-col class="text-center">{{Data.moraleValue}}</v-col>
                                    <v-col class="text-center">{{Data.efficiencyValue}}</v-col>
                                </v-row>
                    </v-col>
                </v-row>
                <v-container v-if="Data.lastAction">
                    <v-divider></v-divider>
                    <v-row>
                        <v-col>
                            <v-row>
                                <v-col class="text-center">{{$t('Simulator.lastValue')}}</v-col>
                            </v-row>
                            <v-row>
                                <v-col class="text-end">{{$t(bData[0])}}</v-col>
                                <v-col class="text-end">{{$t(bData[1])}}</v-col>
                                <v-col class="text-end">{{$t(bData[2])}}</v-col>
                            </v-row>
                            <v-row>
                                <v-col class="text-end">{{Data.lastSkillsValue}}</v-col>
                                <v-col class="text-end">{{Data.lastMoraleValue}}</v-col>
                                <v-col class="text-end">{{Data.lastEfficiencyValue}}</v-col>
                            </v-row>
                        </v-col>
                        <v-col>
                            <v-row>
                                <v-col class="text-center">{{$t('Simulator.sensitivity')}}</v-col>
                            </v-row>
                            <v-row>
                                <v-col class="text-end">{{$t(bData[0])}}</v-col>
                                <v-col class="text-end">{{$t(bData[1])}}</v-col>
                                <v-col class="text-end">{{$t(bData[2])}}</v-col>
                            </v-row>
                            <v-row>
                                <v-col class="text-end">{{Data.skillsSensitivity}}</v-col>
                                <v-col class="text-end">{{Data.moraleSensitivity}}</v-col>
                                <v-col class="text-end">{{Data.efficiencySensitivity}}</v-col>

                            </v-row>
                        </v-col>
                        <v-col>
                            <v-row>
                                <v-col class="text-center">{{$t('Simulator.impact')}}</v-col>
                            </v-row>
                            <v-row>
                                <v-col class="text-end">{{$t(bData[0])}}</v-col>
                                <v-col class="text-end">{{$t(bData[1])}}</v-col>
                                <v-col class="text-end">{{$t(bData[2])}}</v-col>
                            </v-row>
                            <v-row>
                                <v-col class="text-end">{{Data.skillsImpact}}</v-col>
                                <v-col class="text-end">{{Data.moraleImpact}}</v-col>
                                <v-col class="text-end">{{Data.efficiencyImpact}}</v-col>

                            </v-row>
                        </v-col>
                        <v-col>
                            <v-row>
                                <v-col class="text-center">{{$t('Simulator.change')}}</v-col>
                            </v-row>
                            <v-row>
                                <v-col class="text-end">{{$t(bData[0])}}</v-col>
                                <v-col class="text-end">{{$t(bData[1])}}</v-col>
                                <v-col class="text-end">{{$t(bData[2])}}</v-col>
                            </v-row>
                            <v-row>
                                <v-col class="text-end">{{Data.skillsAddedValue}}</v-col>
                                <v-col class="text-end">{{Data.moraleAddedValue}}</v-col>
                                <v-col class="text-end">{{Data.efficiencyAddedValue}}</v-col>
                            </v-row>
                        </v-col>
                        <v-col>
                            <v-row>
                                <v-col class="text-center">{{$t('Simulator.weight')}}</v-col>
                            </v-row>
                            <v-row>
                                <v-col class="text-end">{{$t(bData[0])}}</v-col>
                                <v-col class="text-end">{{$t(bData[1])}}</v-col>
                            </v-row>
                            <v-row>
                                <v-col class="text-end">{{Data.skillsWeight}}</v-col>
                                <v-col class="text-end">{{Data.moraleWeight}}</v-col>

                            </v-row>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>{{$t(bData[0])}} {{$t('Simulator.newValue')}} ({{Data.skillsValue}}) = {{$t(bData[0])}} {{$t('Simulator.lastValue')}} ({{Data.lastSkillsValue}}) + {{$t(bData[0])}} {{$t('Simulator.sensitivity')}} ({{Data.skillsSensitivity}}) * {{$t(bData[0])}} {{$t('Simulator.impact')}} ({{Data.skillsImpact}})</v-col>
                    </v-row>
                    <v-row>
                        <v-col>{{$t(bData[1])}} {{$t('Simulator.newValue')}} ({{Data.moraleValue}}) = {{$t(bData[1])}} {{$t('Simulator.lastValue')}} ({{Data.lastMoraleValue}}) + {{$t(bData[1])}} {{$t('Simulator.sensitivity')}} ({{Data.moraleSensitivity}}) * {{$t(bData[1])}} {{$t('Simulator.impact')}} ({{Data.moraleImpact}})</v-col>
                    </v-row>
                    <v-row>
                        <v-col>{{$t(bData[2])}} {{$t('Simulator.newValue')}} ({{Data.efficiencyValue}}) = ({{$t(bData[0])}} {{$t('Simulator.newValue')}} ({{Data.skillsValue}}) * {{$t(bData[0])}} {{$t('Simulator.weight')}} ({{Data.skillsWeight}}) + {{$t(bData[1])}} {{$t('Simulator.newValue')}} ({{Data.moraleValue}}) * {{$t(bData[1])}} {{$t('Simulator.weight')}} ({{Data.moraleWeight}})) * {{$t(bData[2])}} {{$t('Simulator.sensitivity')}} ({{Data.efficiencySensitivity}}) + {{$t(bData[2])}} {{$t('Simulator.impact')}} ({{Data.efficiencyImpact}})</v-col>
                    </v-row>
                </v-container>
            </v-col>
            <v-col cols="1" class="text-align: center">
                <span class="mdi mdi-chevron-right" @click="$emit('Go-Row', Data.seqNumber*1+1)"></span>
            </v-col>
        </v-row>
    </v-container>  
</template>

<script>
export default {
    name: 'SimulatorDetails',
    props:{
        Data: {},
        bData: [],
    }
}
</script>

<style>

</style>

