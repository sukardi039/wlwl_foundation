<template>
  <v-container fluid class="pa-6" v-if="Ready">
      <v-dialog v-model="GetFile" width="90%">
          <FileUpload @Uploaded-File="uploadedFile($event)" @Abort-Clicked="toggleGetFile()" />
     </v-dialog>
      <StaffList 
        :BaseData="BaseData" 
        :param="paramData" 
        @Row-Clicked="toEdit($event)" 
        @AddClicked="AddClicked()" 
        v-if="!AmendData" 
        />
      <StaffInput
        :Data="EditData" 
        :param="paramData"
        :skillsList="skillsList" 
        :moraleList="moraleList" 
        :efficiencyList="efficiencyList"
        v-if="AmendData"
        @Get-Photo="toggleGetFile()"
        @Update-Info="toUpdate($event)"
        @Abort-Clicked="toAbort()"
        />
  </v-container>
</template>

<script>
import {mapState} from 'vuex'

import FileUpload from '../components/Base/FileUpload'
import StaffList from '../components/BaseInfo/StaffList'
import StaffInput from '../components/BaseInfo/StaffInput'
export default {
    name: 'Staff',
    components: {
        StaffList,
        StaffInput,
        FileUpload,
    },
    data() {
        return {
            fetchbuffer: {
                restkey: '',
                mod: "",
                limit: 0,
                qdata: {},
                method: 'POST',
            },
            limit: 0,
            EditData: {
                staffId: 0,
                staffName: '',
                staffPhoto: '',
                staffDescription: '',
                skillsExp: '',
                moraleExp: '',
                efficiencyExp: '',
                staffSelfIntroduction: '',
                staffInterview: '',
                yearsWorked: 0,
                experience: 0,
            },
            AmendData: '',
            BaseData: [],
            skillsList: [],
            moraleList: [],
            efficiencyList: [],
            skillsRef: [],
            moraleLRef: [],
            efficiencyRef: [],
            BaseClass: [],
            CurrentClass: '',
            HeadRef: [],
            paramData: [],
            CurrentEdit: -1,
            Ready: false,
            GotParam: false,
            GetFile: false,
        }
    },
    computed:{
        ...mapState({
        signedinuser: 'signedinuser'
        })
    },
    methods: {
      async GetInfo(mod, qry, verb, qstr) {
          let qryStr = qstr?qstr:"/backend/staff/"
          this.fetchbuffer.restkey = this.signedinuser.restkey
          this.fetchbuffer.classes = this.signedinuser.classes
          this.fetchbuffer.mod=mod
          this.fetchbuffer.limit=this.limit
          this.fetchbuffer.method=(verb)?verb:'POST'
          if (qry) {
              qryStr = qryStr+"?"+qry
          }
//          console.log(this.fetchbuffer)
          const res = await fetch(qryStr, {
              method: 'POST',
              cache: 'no-cache',
              headers: {
                  "content-type": "application/json",
              },
              body: JSON.stringify(this.fetchbuffer),
          })
          if (res.status === 200){
              const Data = await res.json()
              return await Data;
          }
      },
      async xGetStaff() {
          this.BaseData = await this.GetInfo("", "", "POST", "/backend/staff/")
          const bData = await this.GetInfo("profiles", "", "POST", "/backend/baseinfo/")
          const Data = await this.GetInfo("", "", "POST", "/backend/idx_profileclass/")
          this.skillsList = await Data.lst[bData[0].name]
          this.moraleList = await Data.lst[bData[1].name]
          this.efficiencyList = await Data.lst[bData[2].name]
          this.skillsRef = await Data.ref[bData[0].name]
          this.moraleRef = await Data.ref[bData[1].name]
          this.efficiencyRef = await Data.ref[bData[2].name]
          this.Ready=true
      },
      async GetStaff() {
          this.BaseData = await this.GetInfo("", "", "POST", "/backend/staff/")
      },
      async GetParam() {
//          const bData = await this.GetInfo("profiles", "", "POST", "/backend/baseinfo/")
          const Data = await this.GetInfo("", "", "POST", "/backend/basicinformation/")
          this.skillsList = await Data.profile_lst[Data.base_det.profiles[0].name]
          this.moraleList = await Data.profile_lst[Data.base_det.profiles[1].name]
          this.efficiencyList = await Data.profile_lst[Data.base_det.profiles[2].name]
          this.skillsRef = await Data.profile_ref[Data.base_det.profiles[0].name]
          this.moraleRef = await Data.profile_ref[Data.base_det.profiles[1].name]
          this.efficiencyRef = await Data.profile_ref[Data.base_det.profiles[2].name]
          this.BaseData = await Data.staff_rec.staff
          this.paramData = await Data.params_ref.params
          this.GotParam = true
      },
      async AddClicked() {
          if (!this.GotParam){
              await this.GetParam()
          }
          this.toAbort()
          this.AmendData = 'A'
      },
      async toUpdate(ev){
          if (ev.staffName && ev.staffDescription && ev.skillsExp && ev.moraleExp && ev.efficiencyExp){
                ev.skillsProfile = this.skillsRef[ev.skillsExp]
                ev.moraleProfile = this.moraleRef[ev.moraleExp]
                ev.efficiencyProfile = this.efficiencyRef[ev.efficiencyExp]
                ev.staffPhoto = ev.staffPhoto?ev.staffPhoto:this.paramData.defaultImage
                this.fetchbuffer.qdata = ev
                const NewData = await this.GetInfo("", "", "PUT", "/backend/staff/")
                if (this.AmendData === "A"){
                    if (this.BaseData){
                        this.BaseData = [...this.BaseData, NewData[0]]
                    } else {
                        this.BaseData = NewData
                    }
                }
                if (this.AmendData ==="E") {
                    this.BaseData = this.BaseData.map((inf)=>inf.staffId === ev.staffId ? NewData[0] : inf)
                }
                this.AmendData = ''
          } else {
                 alert(this.$t("general.incomplete"))             
          }
      },
      async toEdit(ev) {
//            console.log(this.GotParam)
            if (!this.GotParam) {
                await this.GetParam()
            }
          this.EditData.staffId = ev.staffId
          this.EditData.staffName = ev.staffName
          this.EditData.staffDescription = ev.staffDescription
          this.EditData.staffSelfIntroduction = ev.staffSelfIntroduction
          this.EditData.skillsExp = ev.skillsExp
          this.EditData.moraleExp = ev.moraleExp
          this.EditData.efficiencyExp = ev.efficiencyExp
          this.EditData.staffPhoto = ev.staffPhoto
          this.EditData.staffInterview = ev.staffInterview
          this.EditData.yearsWorked = ev.yearsWorked
          this.EditData.experience = ev.experience
          this.CurrentEdit = ev.staffId
          this.AmendData = 'E'
//          console.log(this.EditData)
      },
      toAbort() {
          this.EditData.staffId = -1
          this.EditData.staffName = ''
          this.EditData.staffDescription = ''
          this.EditData.staffSelfIntroduction = ''
          this.EditData.skillsExp = ''
          this.EditData.moraleExp = ''
          this.EditData.efficiencyExp = ''
          this.EditData.staffPhoto = this.paramData.defaultImage,
          this.EditData.staffInterview = '',
          this.EditData.experience = 0,
          this.EditData.yearsWorked = 0,
          this.CurrentEdit = -1
          this.AmendData = ''        
      },
      toggleGetFile() {
          this.GetFile = this.GetFile?false:true
      },
      uploadedFile(ev){
          this.EditData.staffPhoto = ev.fileName
          this.toggleGetFile()
      },
    },
    async created() {
//        await this.GetStaff()
        await this.GetParam()
        this.Ready=true
    },
}
</script>

<style>

</style>