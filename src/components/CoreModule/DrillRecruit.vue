<template>
    <v-dialog
        persistent
        width="80%"
        v-model="recruiting"
    >
        <v-card>
        <v-card-title class="text-h5 grey lighten-2">
            {{$t('DrillRecruit.title')}}
        </v-card-title>
        <v-card dense class="pa-0" height="70px" v-if="false">
          <!-- message bar -->
          <DrillMessageBar
            :myMessage="myMessage"
            :blocking="blocking"
            :currentMessage="currentMessage"
            :mCount="msgCount"
            @End-Message="endMessage($event)"
            @Next-Message="nextMessage()"
          />
        </v-card>
        <v-divider></v-divider>
        <v-card-text class="text-h6">
            <v-row dense>
            <v-col
                cols="12"
                md="6"
                lg="3"
                xl="3"
                v-for="(member, index) in data.content.recruits"
                :key="index"
                class="pa-0"
            >
                <!-- member card -->
                <v-hover v-slot="{ hover }">
                    <v-card
                        class="pa-0 ma-1"
                        v-if="member.staffName"
                        :height="cardHeight()"
                        :elevation="hover?8:2"
                        @click="introduce(member)"
                    >
                    <v-card-text>
                        <v-row dense>
                            <!-- member namse -->
                            <v-col cols="5" class="font-weight-bold text-center"><h4 v-if="member.staffName">{{ member.staffExp }}</h4></v-col>
                            <v-col cols="7"></v-col>
                        </v-row>
                        <v-row dense>
                            <!-- member photo -->
                            <v-col cols="5" class="text-center">
                                <v-avatar size="70" class="grey lighten-2">
                                    <v-img
                                    :src="getPhoto(member.staffName)"
                                    alt=""
                                    height="80px"
                                    contain
                                    />
                                </v-avatar>
                            </v-col>
                            <v-col
                                cols="7"
                                style="font-size: 0.8em;"
                                class="align-top"
                            >
                                <v-row dense align="center">
                                    <v-col cols="7"
                                    >{{ $t(paramdata.base_lst.profiles[0]) }}
                                    <span v-if="false">{{
                                        getProfile(member.staffName, 0)
                                    }}</span> *</v-col
                                    >
                                    <v-col cols="5">
                                    <v-progress-linear
                                        background-color="transparent"
                                        :value="getProfile(member.staffName, 0)"
                                        :color="valueColor(getProfile(member.staffName, 0))"                                        
                                    ></v-progress-linear>
                                    </v-col>
                                </v-row>
                                <v-row dense align="center">
                                    <v-col cols="7"
                                    >{{ $t(paramdata.base_lst.profiles[1]) }}
                                    <span v-if="false">{{
                                        getProfile(member.staffName, 1)
                                    }}</span> *</v-col
                                    >
                                    <v-col cols="5">
                                    <v-progress-linear
                                        background-color="transparent"
                                        :value="getProfile(member.staffName, 1)"
                                        :color="valueColor(getProfile(member.staffName, 1))"                                        
                                    ></v-progress-linear>
                                    </v-col>
                                </v-row>
                                 <v-row dense align="center">
                                    <v-col cols="7"
                                    >{{ $t(paramdata.base_lst.profiles[2]) }}
                                    <span v-if="false">{{
                                        getProfile(member.staffName, 2)
                                    }}</span> *</v-col
                                    >
                                    <v-col cols="5">
                                    <v-progress-linear
                                        background-color="transparent"
                                        :value="getProfile(member.staffName, 2)"
                                        :color="valueColor(getProfile(member.staffName, 2))"                                        
                                    ></v-progress-linear>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <v-row>
                            <v-col class="text-end">* {{$t('DrillRecruit.indicative')}}</v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="5" class="text-center">
                                <v-btn rounded style="font-weight: bold" @click="$emit('Submit-Recruit', member)">{{$t('DrillRecruit.employ')}}</v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    </v-card>
                </v-hover>
              </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>
            <v-btn rounded style="font-weight: bold" v-if="myAction" @click="$emit('Submit-SubAction', myAction)">{{$t('DrillPlatform.continue')}}</v-btn>
            <v-spacer></v-spacer>
            <v-btn rounded style="font-weight: bold" @click="$emit('Close-Recruit')">{{$t('DrillPlatform.cancel')}}</v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import DrillMessageBar from "./DrillMessageBar";

export default {
    name: 'DrillRecruit',
    components: {
        DrillMessageBar,
    },
    data() {
        return {
            blocking: false,
            myMessage: [],
            msgCount: 0,
            currentMessage: 0,
            imsg: {},
            myAction: '',
        }
    },
    props: {
        recruiting: false,
        data: [],
        paramdata: []
    },
    methods:{
        cardHeight() {
        //      return (screen.height / 3.8).toFixed() + "px"
        return "250px";
        },
        buildMessage(from, text, act) {
            this.imsg.from = from;
            this.imsg.text = text;
            this.imsg.act = act;
            this.myMessage[++this.msgCount] = { ...this.imsg };
            //      this.msgCount++
        },
        nextMessage() {
            this.currentMessage++;
        },
        clearMessage() {
            this.msgCount = 0;
            this.currentMessage = 0;
            this.myMessage = [];
        },
        endMessage(ev) {
            this.clearMessage();
        },
        getPhoto(staffId) {
            return (
            this.paramdata.params_ref.params.fileURL +
            this.paramdata.staff_det.staff[staffId].staffPhoto
            );        
        },
        getProfile(staffId, prof) {
            let pf = ['skillsProfile', 'moraleProfile','efficiencyProfile']
            let p = pf[prof]
            let s = this.paramdata.staff_det.staff[staffId][p]
            return Math.round((this.paramdata.profile_det[s].profileClassMin * 1 + this.paramdata.profile_det[s].profileClassMax *1)/2)
        },
        valueColor(v) {
        let c = "";
        if (v > 80) {
            c = "#27AE60";
        } else if (v > 60) {
            c = "#2ECC71";
        } else if (v > 40) {
            c = "#F1C40F";
        } else if (v > 20) {
            c = "#F39C12";
        } else {
            c = "#E74C3C";
        }
        return c;
        },
        introduce(m) {
            console.log(m, m.staffExp)
            this.myMessage = [];
            this.msgCount = 0;
            this.buildMessage(
                m.staffExp,
                this.paramdata.staff_det.staff[m.staffName].staffInterview);
            this.currentMessage = 1;
            this.msgCount = 1;
        },

    }
}
</script>

<style>

</style>