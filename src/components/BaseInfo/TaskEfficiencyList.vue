<template>
  <v-container>
      <v-row style="background: lightgrey">
          <v-col>{{$t('TaskEff.name')}}</v-col>
          <v-col class="text-end">{{$t('TaskEff.skillsWeight')}}</v-col>
          <v-col class="text-end">{{$t('TaskEff.moraleWeight')}}</v-col>
          <v-col class="text-end">{{$t('TaskEff.duration')}}</v-col>
          <v-col class="text-end">{{$t('TaskEff.passRate')}}</v-col>
          <v-col class="text-end">{{$t('TaskEff.targetRate')}}</v-col>
          <v-col cols="1"></v-col>
      </v-row>
      <v-row v-for="Data in ListData" :key="Data.TaskEfficiencyId">
          <v-col v-if="CurrentEdit===Data.taskEfficiencyId">
            <v-text-field
                :label="$t('TaskEff.name')"
                outlined
                v-model="Data.taskDisplayName"
            ></v-text-field>
          </v-col>
          <v-col v-else  @click="$emit('Row-Clicked', Data)">{{Data.taskDisplayName}}</v-col>
          <v-col v-if="CurrentEdit===Data.taskEfficiencyId">
            <v-text-field
                :label="$t('TaskEff.skillsWeight')"
                outlined
                v-model="Data.skillsWeight"
                type="number"
            ></v-text-field>
          </v-col>
          <v-col class="text-end" v-else  @click="$emit('Row-Clicked', Data)">{{Data.skillsWeight}}</v-col>
          <v-col v-if="CurrentEdit===Data.taskEfficiencyId">
            <v-text-field
                :label="$t('TaskEff.moraleWeight')"
                outlined
                v-model="Data.moraleWeight"
                type="number"
            ></v-text-field>
          </v-col>
          <v-col class="text-end" v-else @click="$emit('Row-Clicked', Data)">{{Data.moraleWeight}}</v-col>
          <v-col v-if="CurrentEdit===Data.taskEfficiencyId">
            <v-text-field
                :label="$t('TaskEff.duration')"
                outlined
                v-model="Data.duration"
                type="number"
            ></v-text-field>
          </v-col>
          <v-col class="text-end" v-else @click="$emit('Row-Clicked', Data)">{{Data.duration}}</v-col>
          <v-col v-if="CurrentEdit===Data.taskEfficiencyId">
            <v-text-field
                :label="$t('TaskEff.passingRate')"
                outlined
                v-model="Data.passingRate"
                type="number"
            ></v-text-field>
          </v-col>
          <v-col class="text-end" v-else @click="$emit('Row-Clicked', Data)">{{Data.passingRate}}</v-col>
          <v-col v-if="CurrentEdit===Data.taskEfficiencyId">
            <v-text-field
                :label="$t('TaskEff.target')"
                outlined
                v-model="Data.target"
                type="number"
            ></v-text-field>
          </v-col>
          <v-col class="text-end" v-else @click="$emit('Row-Clicked', Data)">{{Data.target}}</v-col>
          <v-col cols="1">
                <span class="mdi mdi-check" v-if="CurrentEdit===Data.taskEfficiencyId" @click="$emit('Update-Info', Data)"></span>
                <span class="mdi mdi-restore" v-if="CurrentEdit===Data.taskEfficiencyId" @click="$emit('Abort-Clicked')"></span>
          </v-col>
      </v-row>
  </v-container>
</template>

<script>
export default {
    name: 'TaskEfficiencyList',
    data() {
        return {
        }
    },
    props: {
        ListData: [],
        CurrentEdit: '',
    },
    methods:{
    }

}
</script>

<style>

</style>