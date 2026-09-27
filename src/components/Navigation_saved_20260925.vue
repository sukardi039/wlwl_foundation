<template>
  <v-container>
    <HelpBase :helpSubject="subject" />  
      <v-list dense nav>
        <router-link
          :to="`/${$i18n.locale}/`"
          style="text-decoration: none"
        >
          <v-list-item>
            <v-list-item-icon>
              <span class="mdi mdi-view-dashboard"></span>
            </v-list-item-icon>
            <v-list-item-content id="entryPage" @click="$emit('Menu-Clicked', '')">
              <v-list-item-title>{{$t('Nav.Dashboard')}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link
          :to="`/${$i18n.locale}/Drill`"
          style="text-decoration: none"
        >
          <v-list-item v-if="signedinuser.level==0">
            <v-list-item-icon>
              <span class="mdi mdi-account"></span>
            </v-list-item-icon>
            <v-list-item-content id="drillPage" @click.stop="$emit('Menu-Clicked', 'Nav.Drill')">
              <v-list-item-title>{{$t('Nav.Drill')}}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link
          :to="`/${$i18n.locale}/DrillConsole`"
          style="text-decoration: none"
        >
          <v-list-item v-if="signedinuser.instructor>0">
            <v-list-item-icon>
              <span class="mdi mdi-monitor-multiple"></span>
            </v-list-item-icon>
            <v-list-item-content @click="$emit('Menu-Clicked', 'Nav.DrillConsole')">
              <v-list-item-title>{{$t('Nav.DrillConsole')}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link
          :to="`/${$i18n.locale}/DrillControl`"
          style="text-decoration: none"
        >
          <v-list-item v-if="signedinuser.instructor>0">
            <v-list-item-icon>
              <span class="mdi mdi-monitor-multiple"></span>
            </v-list-item-icon>
            <v-list-item-content @click="$emit('Menu-Clicked', 'Nav.DrillControl')">
              <v-list-item-title>{{$t('Nav.DrillControl')}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link
          :to="`/${$i18n.locale}/DrillOverview`"
          style="text-decoration: none"
        >
          <v-list-item v-if="signedinuser.instructor>0">
            <v-list-item-icon>
              <span class="mdi mdi-monitor-multiple"></span>
            </v-list-item-icon>
            <v-list-item-content @click="$emit('Menu-Clicked', 'Nav.DrillOverview')">
              <v-list-item-title>{{$t('Nav.DrillOverview')}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link
          :to="`/${$i18n.locale}/DrillCapable`"
          style="text-decoration: none"
        >
          <v-list-item v-if="signedinuser.instructor>0">
            <v-list-item-icon>
              <span class="mdi mdi-monitor-multiple"></span>
            </v-list-item-icon>
            <v-list-item-content @click="$emit('Menu-Clicked', 'Nav.DrillCapable')">
              <v-list-item-title>{{$t('Nav.DrillCapable')}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link
          :to="`/${$i18n.locale}/DrillEffective`"
          style="text-decoration: none"
        >
          <v-list-item v-if="signedinuser.instructor>0">
            <v-list-item-icon>
              <span class="mdi mdi-monitor-multiple"></span>
            </v-list-item-icon>
            <v-list-item-content @click="$emit('Menu-Clicked', 'Nav.DrillEffective')">
              <v-list-item-title>{{$t('Nav.DrillEffective')}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link
          :to="`/${$i18n.locale}/DrillCompare`"
          style="text-decoration: none"
        >
          <v-list-item v-if="signedinuser.instructor>0">
            <v-list-item-icon>
              <span class="mdi mdi-monitor-multiple"></span>
            </v-list-item-icon>
            <v-list-item-content @click="$emit('Menu-Clicked', 'Nav.DrillCompare')">
              <v-list-item-title>{{$t('Nav.DrillCompare')}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link
          :to="`/${$i18n.locale}/Agent`"
          style="text-decoration: none"
        >
          <v-list-item v-if="signedinuser.level>6">
            <v-list-item-icon>
              <span class="mdi mdi-handshake-outline"></span>
            </v-list-item-icon>
            <v-list-item-content @click="$emit('Menu-Clicked', 'Nav.Agent')">
              <v-list-item-title>{{$t('Nav.Agent')}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link
          :to="`/${$i18n.locale}/BaseInfo`"
          style="text-decoration: none"
        >
          <v-list-item v-if="signedinuser.level>=9">
            <v-list-item-icon>
              <span class="mdi mdi-wrench-outline"></span>
            </v-list-item-icon>
            <v-list-item-content @click="$emit('Menu-Clicked', 'Nav.BaseInfo')">
              <v-list-item-title>{{$t('Nav.BaseInfo')}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link
          :to="`/${$i18n.locale}/BackendUser`"
          style="text-decoration: none"
        >
          <v-list-item v-if="signedinuser.level>=8">
            <v-list-item-icon>
              <span class="mdi mdi-wrench-outline"></span>
            </v-list-item-icon>
            <v-list-item-content @click="$emit('Menu-Clicked', 'Nav.BackendUser')">
              <v-list-item-title>{{$t('Nav.BackendUser')}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link
          :to="`/${$i18n.locale}/ProfileClass`"
          style="text-decoration: none"
        >
          <v-list-item v-if="signedinuser.level>=7">
            <v-list-item-icon>
              <span class="mdi mdi-crane"></span>
            </v-list-item-icon>
            <v-list-item-content @click="$emit('Menu-Clicked', 'Nav.ProfileClass')">
              <v-list-item-title>{{$t('Nav.ProfileClass')}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link
          :to="`/${$i18n.locale}/ProfileSensitive`"
          style="text-decoration: none"
        >
          <v-list-item v-if="signedinuser.level>=7">
            <v-list-item-icon>
              <span class="mdi mdi-crane"></span>
            </v-list-item-icon>
            <v-list-item-content @click="$emit('Menu-Clicked', 'Nav.ProfileSensitive')">
              <v-list-item-title>{{$t('Nav.ProfileSensitive')}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link
          :to="`/${$i18n.locale}/ProfileImpact`"
          style="text-decoration: none"
        >
          <v-list-item v-if="signedinuser.level>=7">
            <v-list-item-icon>
              <span class="mdi mdi-crane"></span>
            </v-list-item-icon>
            <v-list-item-content @click="$emit('Menu-Clicked', 'Nav.ProfileImpact')">
              <v-list-item-title>{{$t('Nav.ProfileImpact')}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link
          :to="`/${$i18n.locale}/ProfileAffect`"
          style="text-decoration: none"
        >
          <v-list-item v-if="signedinuser.level>=7">
            <v-list-item-icon>
              <span class="mdi mdi-crane"></span>
            </v-list-item-icon>
            <v-list-item-content @click="$emit('Menu-Clicked', 'Nav.ProfileAffect')">
              <v-list-item-title>{{$t('Nav.ProfileAffect')}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link
          :to="`/${$i18n.locale}/Action`"
          style="text-decoration: none"
        >
          <v-list-item v-if="signedinuser.level>=7">
            <v-list-item-icon>
              <span class="mdi mdi-crane"></span>
            </v-list-item-icon>
            <v-list-item-content @click="$emit('Menu-Clicked', 'Nav.Action')">
              <v-list-item-title>{{$t('Nav.Action')}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link
          :to="`/${$i18n.locale}/Template`"
          style="text-decoration: none"
        >
          <v-list-item v-if="signedinuser.level>=7">
            <v-list-item-icon>
              <span class="mdi mdi-crane"></span>
            </v-list-item-icon>
            <v-list-item-content @click="$emit('Menu-Clicked', 'Nav.Template')">
              <v-list-item-title>{{$t('Nav.Template')}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link
          :to="`/${$i18n.locale}/Staff`"
          style="text-decoration: none"
        >
          <v-list-item v-if="signedinuser.level>=5">
            <v-list-item-icon>
              <span class="mdi mdi-cog-outline"></span>
            </v-list-item-icon>
            <v-list-item-content @click="$emit('Menu-Clicked', 'Nav.Staff')">
              <v-list-item-title>{{$t('Nav.Staff')}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link
          :to="`/${$i18n.locale}/Product`"
          style="text-decoration: none"
        >
          <v-list-item v-if="signedinuser.level>=5">
            <v-list-item-icon>
              <span class="mdi mdi-cog-outline"></span>
            </v-list-item-icon>
            <v-list-item-content @click="$emit('Menu-Clicked', 'Nav.Product')">
              <v-list-item-title>{{$t('Nav.Product')}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link
          :to="`/${$i18n.locale}/Style`"
          style="text-decoration: none"
        >
          <v-list-item v-if="signedinuser.level>5">
            <v-list-item-icon>
              <span class="mdi mdi-cog-outline"></span>
            </v-list-item-icon>
            <v-list-item-content @click="$emit('Menu-Clicked', 'Nav.Style')">
              <v-list-item-title>{{$t('Nav.Style')}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link
          :to="`/${$i18n.locale}/Task`"
          style="text-decoration: none"
        >
          <v-list-item v-if="signedinuser.level>5">
            <v-list-item-icon>
              <span class="mdi mdi-cog-outline"></span>
            </v-list-item-icon>
            <v-list-item-content @click="$emit('Menu-Clicked', 'Nav.Task')">
              <v-list-item-title>{{$t('Nav.Task')}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link
          :to="`/${$i18n.locale}/Environment`"
          style="text-decoration: none"
        >
          <v-list-item v-if="signedinuser.level>5">
            <v-list-item-icon>
              <span class="mdi mdi-cog-outline"></span>
            </v-list-item-icon>
            <v-list-item-content @click="$emit('Menu-Clicked', 'Nav.Environment')">
              <v-list-item-title>{{$t('Nav.Environment')}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link
          :to="`/${$i18n.locale}/TaskEfficiency`"
          style="text-decoration: none"
        >
          <v-list-item v-if="signedinuser.level>=5">
            <v-list-item-icon>
              <span class="mdi mdi-cog-outline"></span>
            </v-list-item-icon>
            <v-list-item-content @click="$emit('Menu-Clicked', 'Nav.TaskEfficiency')">
              <v-list-item-title>{{$t('Nav.TaskEfficiency')}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link
          :to="`/${$i18n.locale}/Model`"
          style="text-decoration: none"
        >
          <v-list-item v-if="signedinuser.level>=5">
            <v-list-item-icon>
              <span class="mdi mdi-cog-outline"></span>
            </v-list-item-icon>
            <v-list-item-content @click="$emit('Menu-Clicked', 'Nav.Model')">
              <v-list-item-title>{{$t('Nav.Model')}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link
          :to="`/${$i18n.locale}/Package`"
          style="text-decoration: none"
        >
          <v-list-item v-if="signedinuser.level>=1">
            <v-list-item-icon>
              <span class="mdi mdi-movie-star-outline"></span>
            </v-list-item-icon>
            <v-list-item-content @click="$emit('Menu-Clicked', 'Nav.Package')">
              <v-list-item-title>{{$t('Nav.Package')}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link
          :to="`/${$i18n.locale}/Simulator`"
          style="text-decoration: none"
        >
          <v-list-item v-if="signedinuser.level>7">
            <v-list-item-icon>
              <span class="mdi mdi-movie-star-outline"></span>
            </v-list-item-icon>
            <v-list-item-content @click="$emit('Menu-Clicked', 'Nav.Simulator')">
              <v-list-item-title>{{$t('Nav.Simulator')}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link
          :to="`/${$i18n.locale}/FrontendUser`"
          style="text-decoration: none"
        >
          <v-list-item v-if="signedinuser.level==1 || signedinuser.level>=7">
            <v-list-item-icon>
              <span class="mdi mdi-account"></span>
            </v-list-item-icon>
            <v-list-item-content @click="$emit('Menu-Clicked', 'Nav.FrontendUser')">
              <v-list-item-title>{{$t('Nav.FrontendUser')}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link
          :to="`/${$i18n.locale}/DrillHelp`"
          style="text-decoration: none"
        >
          <v-list-item v-if="false && (signedinuser.level==0 || signedinuser.level==9)" >
              <v-list-item-icon>
              <span class="mdi mdi-help-circle-outline"></span>
            </v-list-item-icon>
            <v-list-item-content @click="$emit('Menu-Clicked', 'Nav.DrillHelp')">
              <v-list-item-title>{{$t('Nav.DrillHelp')}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link
          :to="`/${$i18n.locale}/InstructorHelp`"
          style="text-decoration: none"
        >
          <v-list-item v-if="(signedinuser.level==9 || signedinuser.instructor>0) && false">
              <v-list-item-icon>
              <span class="mdi mdi-help-circle-outline"></span>
            </v-list-item-icon>
            <v-list-item-content @click="$emit('Menu-Clicked', 'Nav.InstructorHelp')">
              <v-list-item-title>{{$t('Nav.InstructorHelp')}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link
          :to="`/${$i18n.locale}/CustomHelp`"
          style="text-decoration: none"
        >
          <v-list-item v-if="(signedinuser.level>1 || signedinuser.instructor>0) && false">
              <v-list-item-icon>
              <span class="mdi mdi-help-circle-outline"></span>
            </v-list-item-icon>
            <v-list-item-content @click="$emit('Menu-Clicked', 'Nav.CustomHelp')">
              <v-list-item-title>{{$t('Nav.CustomHelp')}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link
          :to="`/${$i18n.locale}/ConceptHelp`"
          style="text-decoration: none"
        >
          <v-list-item v-if="signedinuser.level==9 && false">
              <v-list-item-icon>
              <span class="mdi mdi-help-circle-outline"></span>
            </v-list-item-icon>
            <v-list-item-content @click="$emit('Menu-Clicked', 'Nav.ConceptHelp')">
              <v-list-item-title>{{$t('Nav.ConceptHelp')}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link
          :to="`/${$i18n.locale}/UserAdminHelp`"
          style="text-decoration: none"
        >
          <v-list-item v-if="(signedinuser.level==1 || signedinuser.level>=7 || signedinuser.instructor>0) && false">
              <v-list-item-icon>
              <span class="mdi mdi-help-circle-outline"></span>
            </v-list-item-icon>
            <v-list-item-content @click="$emit('Menu-Clicked', 'Nav.UserAdminHelp')">
              <v-list-item-title>{{$t('Nav.UserAdminHelp')}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <v-list-item v-if="false" id="signingoff" @click="$emit('signed-off')">
            <v-list-item-icon>
            <span class="mdi mdi-logout"></span>
        </v-list-item-icon>
        <v-list-item-content>
            <v-list-item-title>{{$t('Nav.Logout')}}</v-list-item-title>
        </v-list-item-content>
        </v-list-item>
      </v-list>
  </v-container>
</template>

<script>
import {mapState} from 'vuex'
import HelpBase from '../helps/HelpBase'

export default {
    name: 'Navigation',
    components: {
      HelpBase
    },
    data(){
      return {
        subject:''
      }
    },
    computed:{
        ...mapState({
        signedinuser: 'signedinuser'
        })
    },
    methods:{
      end_help(){
        this.subject=''
      }
    },
    mounted(){
      document.getElementById('entryPage').click()
    }
}
</script>

<style>

</style>