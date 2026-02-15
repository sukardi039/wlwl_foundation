<template>
    <v-container>
        <v-row dense>
            <v-col>
                <v-text-field
                    :label="$t('Model.name')"
                    outlined
                    v-model="Data.modelName"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <iSelect
                    :items="Param.product_lst.product"
                    :label="$t('Product.name')"
                    outlined
                    v-model="Data.modelContent.productExp"
                    @input="productChanged($event)"
                    :i18n="false"
                />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-text-field
                    :label="$t('Model.ordersToComplete')"
                    outlined
                    v-model="Data.modelContent.ordersToComplete"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-text-field
                    :label="$t('Model.valueToComplete')"
                    outlined
                    v-model="Data.modelContent.valueToComplete"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row style="background: lightgrey">
            <v-col class="text-center"><h2>{{$t('Model.staff')}}</h2></v-col>
        </v-row>       
        <v-row v-for="staff in Data.modelContent.staffs" :key="staff.staffName">
            <v-col cols="3">
                <v-select
                    :items="Param.staff_lst.staff"
                    :label="$t('Staff.name')"
                    outlined
                    v-model="staff.staffExp"
                    @change="staff.staffName=Param.staff_ref.staff[staff.staffExp]; setStaff(staff, staff.staffExp)"
                ></v-select>
            </v-col>
            <v-col cols="3">
                <v-select
                    :items="TaskList"
                    :label="$t('Task.name')"
                    outlined
                    v-model="staff.taskExp"
                    @input="staff.task=TaskRef[staff.taskExp]"
                ></v-select>               
            </v-col>
            <v-col cols="2">
                <v-text-field
                    :label="$t('Model.skillsInit')"
                    outlined
                    v-model="staff.skillsInit"
                ></v-text-field>
            </v-col>
            <v-col cols="2">
                <v-text-field
                    :label="$t('Model.moraleInit')"
                    outlined
                    v-model="staff.moraleInit"
                ></v-text-field>
            </v-col>
            <v-col cols="2">
                <v-text-field
                    :label="$t('Model.efficiencyInit')"
                    outlined
                    v-model="staff.efficiencyInit"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row style="background: lightgrey">
            <v-col cols="8" class="text-center"><h2>{{$t('Model.environment')}}</h2></v-col>
            <v-col cols="4" class="text-center"><h2>{{$t('Model.happenOn')}}</h2></v-col>
        </v-row>       
        <v-row v-for="environment in Data.modelContent.environments" :key="environment.environmentName">
            <v-col cols="8">
                <iSelect
                    :items="Param.environment_lst.environment"
                    :label="$t('Environment.name')"
                    outlined
                    v-model="environment.environmentExp"
                    @input="environment.environmentName=Param.environment_ref.environment[environment.environmentExp]"
                    i18n="true"
                />
            </v-col>
            <v-col cols="4">
                <v-text-field
                    :label="$t('Model.happenOn')"
                    outlined
                    v-model="environment.happenOn"
                ></v-text-field>

            </v-col>
        </v-row>
        <v-row><v-col></v-col></v-row>
        <v-divider></v-divider>
        <v-row style="background: lightgrey">
            <v-col class="text-center"><h2>{{$t('Model.recruit')}}</h2></v-col>
        </v-row>       
        <v-row v-for="recruit in Data.modelContent.recruits" :key="recruit.staffName">
            <v-col>
                <v-select
                    :items="Param.staff_lst.staff"
                    :label="$t('Staff.name')"
                    outlined
                    v-model="recruit.staffExp"
                    @change="recruit.staffName=Param.staff_ref.staff[recruit.staffExp]; setStaff(recruit, recruit.staffExp)"
                ></v-select>
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
import iSelect from "../../components/Base/iSelect"
export default {
    name: 'ModelInput',
    components:{
        iSelect,
    },
    data() {
        return {
            TaskExp: [],
            TaskList: [],
            TaskRef: []
        }
    },
    props: {
        Data: [],
        Param: [],
    },
    methods:{
        productChanged(ev){
            this.Data.modelProduct=this.Param.product_ref.product[this.Data.modelContent.productExp]
            this.setTask(this.Data.modelProduct)
            for (var c = 0; c< this.Data.modelContent.staffs.length; c++){
                this.Data.modelContent.staffs[c].taskExp = this.TaskExp[this.Data.modelContent.staffs[c].task]
            }
        },
        setTask(ev){
            if (ev){
                this.TaskList = []
                this.TaskRef = []
                var tf = Object.values(this.Param.task_eff[ev])
                for (var c=0; c<tf.length; c++){
                    this.TaskList.push(tf[c].taskDisplayName)
                    this.TaskRef[tf[c].taskDisplayName] = tf[c].taskName
                    this.TaskExp[tf[c].taskName] = tf[c].taskDisplayName
                }
            }
        },
        setStaff(loc, stf){
            var cnt = 0
            for (var c=0; c<this.Data.modelContent.staffs.length; c++){
                if (this.Data.modelContent.staffs[c].staffExp==stf){
                    cnt++
                }
            }
            for (var c=0; c<this.Data.modelContent.recruits.length; c++){
                if (this.Data.modelContent.recruits[c].staffExp==stf){
                    cnt++
                }
            }
            if (cnt!=1){
                loc.staffExp = ''
                loc.staffExp = ''
                alert(this.$t("Model.duplicateStaff"))
            }
        }
    },
    created(){
        this.setTask(this.Data.modelProduct)
    }
}
</script>

<style>

</style>