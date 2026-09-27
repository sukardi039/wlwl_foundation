<template>
    <v-container class="pa-6">
        <div class="text-center">
        <v-dialog
        v-model="showDetails"
        width="90%"
        >
            <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                {{$t('Simulator.details')}}
                </v-card-title>
                <v-card-text style="color: black">
                    <SimulatorDetails
                    :Data="Details"
                    :bData="bData.base_lst.profiles"
                    v-if="showDetails"
                    @Go-Row="goRow($event)"
                    />
                 </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="transparent"
                    @click="showDetails = false"
                >
                    <span class="mdi mdi-close"></span>
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        </div>
        <v-container v-if="showSelect && !startSimulate">
            <v-row>
                <v-col>
                    <v-select
                        :items="StaffList"
                        :label="$t('Staff.name')"
                        outlined
                        v-model="simulateData.staffName"
                        @change="staffChanged()"
                    ></v-select>
                </v-col>
                <v-col>
                    <v-select
                        :items="ProductList"
                        :label="$t('Product.name')"
                        outlined
                        v-model="simulateData.productExp"
                        @input="productChanged()"
                    />
                </v-col>
                <v-col>
                    <v-select
                        :items="TaskList"
                        :label="$t('Task.name')"
                        outlined
                        v-model="simulateData.taskExp"
                        @input="taskChanged()"
                        :i18n="false"
                    />
                </v-col>
                <v-col cols="1">
                    <span class="mdi mdi-steering" @click="goSimulation()"></span>
                    <span class="mdi mdi-restart" @click="initSimulator()" v-if="simulateData.skillsValue!==-1"></span>
                </v-col>
            </v-row>
        </v-container>
        <SimulatorShow
        :Data="simulateData"
        :List="bData"
        v-if="startSimulate"
        />
        <v-container v-if="startSimulate">
            <v-row>
                <v-col>
                    <iSelect :label="$t('Impact.type')" :items="bData.act_lst.impact" v-model="CurrentClass" :i18n="true" @input="SelectClass()" />
                </v-col>
                <v-col v-if="CurrentClass">
                    <iSelect :label="$t('Impact.action')" :items="Actions" v-model="CurrentImpact" :i18n="true" @input="SelectImpact()" />
                </v-col>
                <v-col cols="1"><span class="mdi mdi-check" @click="doAction()"></span><span class="mdi mdi-close" @click="haltSim()"></span></v-col>
            </v-row>
        </v-container>
        <SimulatorList 
        :History="simulateHistory"
        :List="bData"
        v-if="startSimulate"
        @Row-Clicked="toShowDetails($event)"
        />
   </v-container>
</template>

<script>
import {mapState} from 'vuex'

import iSelect from '../components/Base/iSelect'
import Select from '../components/Base/Select'
import SimulatorShow from '../components/CoreModule/SimulatorShow'
import SimulatorList from '../components/CoreModule/SimulatorList'
import SimulatorDetails from '..//components/CoreModule/SimulatorDetails'
export default {
    name: 'Simulator',
    components: {
        SimulatorShow,
        SimulatorList,
        SimulatorDetails,
        iSelect,
        Select
    },
    data() {
        return{
            simulateData: {
                sessionId: '',
                seqNumber: 0,
                productName: '',
                productExp: '',
                taskName: '',
                taskExp: '',
                staffId: '',
                staffName: '',
                skillsWeight: 0,
                moraleWeight: 0,
                skillsValue: 0,
                skillsAddedValue: 0,
                moraleValue: 0,
                moraleAddedValue: 0,
                efficiencyValue: 0,
                efficiencyAddedValue: 0,
                lastAction: '',
                actionExp: '',
                skillsImpact: 0,
                moraleImpact: 0,
                efficiencyImpact: 0,
                modValue: 0,
            },
            simulateHistory: [],
            impacts: [],
            fetchbuffer: {
                restkey: '',
                mod: "",
                limit: 0,
                qdata: {},
                method: 'POST',
            },
            limit: 0,
            bData: [],
            cData: [],
            ProductList: [],
            TaskList: [],
            StaffList: [],
            ProductRef: [],
            TaskRef: [],
            StaffRef: [],
            CurrentClass: '',
            CurrentImpact: '',
            Actions: [],
            ActionRef: [],
            Class: '',
            Impact: '',
            Details: {},
            showSelect: false,
            startSimulate: false,
            showDetails: false,
            TaskEff: {},
        }
    },
    computed:{
        ...mapState({
        signedinuser: 'signedinuser'
        })
    },
    methods: {
        async GetInfo(mod, qry, verb, qstr) {
            try {
            let qryStr = qstr?qstr:"/backend/simulator/"
            this.fetchbuffer.restkey = this.signedinuser.restkey
            this.fetchbuffer.classes = this.signedinuser.classes
            this.fetchbuffer.mod=mod
            this.fetchbuffer.limit=this.limit
            this.fetchbuffer.method=(verb)?verb:'POST'
            if (qry) {
                qryStr = qryStr+"?"+qry
            }
            const res = await fetch(qryStr, {
                method: 'POST',
                cache: 'no-cache',
                connection: 'close',
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(this.fetchbuffer),
            })
            if (res.status === 200){
                const baseData = await res.json()
                return await baseData;
            }
            } catch (error) {
                console.log(error)
            }
        },
        async GetSimulator(){
            const Data = await this.GetInfo(this.signedinuser.sessionid, "", "POST", "/backend/simulator/")
            if (Data){
                this.simulateHistory = await Array.from(Data)
                this.simulateData = await {...Data[0]}
                this.startSimulate = true
            } else {
                this.initSimulator()
                this.seqNumber = 0
                this.simulateHistory = ''
            }
            this.showSelect = true;
       },
       initSimulator() {
            this.simulateData.sessionId = this.signedinuser.sessionid
            this.simulateData.skillsValue = -1
            this.simulateData.moraleValue = -1
            this.simulateData.staffName = ''
            this.simulateData.productExp = ''
            this.simulateData.taskExp = ''
            this.simulateData.staffId = -1;
            this.simulateData.productName = ''
            this.simulateData.taskName = ''
            this.simulateData.lastAction = ''
            this.startSimulate = false

       },
        async xGetParam(){
            this.bData = await this.GetInfo("", "", "POST", "/backend/idx_baseinfo/")
            this.ProductList = await this.bData.lst.products
            this.ProductRef = await this.bData.ref.products
            this.TaskList = await this.bData.lst.tasks
            this.TaskRef = await this.bData.ref.tasks
            this.cData = await this.GetInfo("", "", "POST", "/backend/idx_baseclass/")
            const sData = await this.GetInfo("", "", "POST", "/backend/idx_staff/")
            this.StaffList = await sData.lst.staff
            this.StaffRef = await sData.ref.staff
            await this.GetSimulator()
        },
        async GetParam(){
            this.bData = await this.GetInfo("", "", "POST", "/backend/basicinformation/")
            this.ProductList = await this.bData.product_lst.product
            this.ProductRef = await this.bData.product_ref.product
//            this.TaskList = await this.bData.base_lst.tasks
//            this.TaskRef = await this.bData.base_ref.tasks
            this.StaffList = await this.bData.staff_lst.staff
            this.StaffRef = await this.bData.staff_ref.staff
            this.TaskEff = await this.bData.task_eff
            // this.cData = await this.GetInfo("", "", "POST", "/backend/idx_baseclass/")
            // const sData = await this.GetInfo("", "", "POST", "/backend/idx_staff/")
            await this.GetSimulator()
        },
        productChanged(ev){
            // this.simulateData.productName = this.ProductRef[ev]
            // this.simulateData.productExp = ev
            this.simulateData.productName = this.ProductRef[ this.simulateData.productExp]
            this.simulateData.lastAction = ''
            this.CurrentImpact = ''
            this.changeTask(this.simulateData.productName)
            this.simulateData.taskExp = ''
        },
        changeTask(ev){
            if (ev){
                var tf = Object.values(this.TaskEff[ev])
//                console.log(tf)
//                console.log(ev, this.tf[ev])
                this.TaskList = []
                this.TaskRef = []
                for (var c=0; c<tf.length; c++){
                    this.TaskList.push(tf[c].taskDisplayName)
                    this.TaskRef[tf[c].taskDisplayName] = tf[c].taskName
                }
            }
        },
        taskChanged(ev) {
            // this.simulateData.taskName = this.TaskRef[ev]
            // this.simulateData.taskExp = ev
            this.simulateData.lastAction = ''
            this.CurrentImpact = ''
            this.simulateData.taskName = this.TaskRef[this.simulateData.taskExp]
//            console.log(this.simulateData.taskName)
        },
        staffChanged(ev){
            // this.simulateData.staffId = this.StaffRef[ev]
            // this.simulateData.staffName = ev
            this.simulateData.staffId = this.StaffRef[this.simulateData.staffName]
            this.simulateData.lastAction = ''
            this.simulateData.skillsValue = -1
            this.simulateData.moraleValue = -1

        },
        async goSimulation(){
            if (this.simulateData.staffId && this.simulateData.productName && this.simulateData.taskName){
                this.fetchbuffer.qdata = this.simulateData
                const Data = await this.GetInfo(this.signedinuser.sessionid, "", "PUT", "/backend/simulator/")
                this.simulateHistory = [Data[0], ...this.simulateHistory]
                this.simulateData = {...Data[0]}
                this.startSimulate = true
            } else {
                alert(this.$t("general.incomplete"))
            }
        },
        SelectClass(ev){
//            this.CurrentClass = ev
            this.Class = this.CurrentClass.substr(this.CurrentClass.indexOf('.')+1)
            this.Actions = this.bData.base_lst[this.Class]
            this.ActionRef = this.bData.base_ref[this.Class]
            this.CurrentImpact=''
        },
        SelectImpact(ev){
//            this.CurrentImpact=ev
            this.Impact = this.ActionRef[this.CurrentImpact]
//            console.log(this.CurrentImpact, this.Impact)
        },
        async doAction() {
            if (this.Impact){
                this.simulateData.lastAction=this.Impact
                this.simulateData.actionExp = this.CurrentImpact
                this.fetchbuffer.qdata = this.simulateData
                const Data = await this.GetInfo(this.signedinuser.sessionid, "", "PUT", "/backend/simulator/")
                const simData = Data[0]
                this.simulateHistory = [simData, ...this.simulateHistory]
                this.simulateData = {...simData}

            } else {
                alert(this.$t("general.incomplete"))
            }
        },
        toShowDetails(ev) {
            this.Details = ev
            this.showDetails = true
        },
        goRow(ev){
            if ((ev <= this.simulateHistory.length) && (ev > 0)){
                this.Details = this.simulateHistory.at(this.simulateHistory.length-ev)
            }
        },
        haltSim(){
            this.startSimulate=!this.startSimulate
            this.CurrentImpact=''
            this.lastAction = ''
            this.changeTask(this.simulateData.productName)
        }
    },
    async created() {
        await this.GetParam()
    },
}
</script>