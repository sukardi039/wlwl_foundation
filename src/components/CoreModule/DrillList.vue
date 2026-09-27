<template>
  <v-container class="pa-0 ma-0">
    <v-card dense color="#f5f6f7" class="mt-3 mb-3 pt-0 pb-0">
      <v-card-text>
        {{ $t("Drill.welcome") }}{{ $t("Drill.drill1") }}{{ $t("Drill.commer")
        }}{{ $t("Drill.drill2") }}{{ $t("Drill.commer") }}{{ $t("Drill.drill3")
        }}{{ $t("Drill.welcome1") }}
      </v-card-text>
    </v-card>
    <v-card dense color="#f5f6f7">
      <v-card-text>
        <v-row dense>
          <v-col>
            <v-row dense>
              <v-col
                ><h2>{{ $t("Nav.Drill") }}</h2></v-col
              >
            </v-row>
            <v-row dense align="center">
              <v-col>
                <v-btn
                  elevation="0"
                  v-if="!editName"
                  @click.stop="
                    editName = true;
                    oldName = data.user.userName;
                  "
                  ><span class="mdi mdi-account"></span
                  ><span>{{ data.user.userName }}</span></v-btn
                >
                <v-row dense v-if="editName"
                  ><v-col cols="10"
                    ><v-text-field
                      small
                      prepend-inner-icon="mdi mdi-account"
                      outlined
                      v-model="data.user.userName"
                    >
                    </v-text-field></v-col
                  ><v-col cols="2"
                    ><span
                      class="mdi mdi-check"
                      @click="
                        $emit('Update-Name', data.user);
                        editName = false;
                      "
                    ></span
                    ><span
                      class="mdi mdi-restore"
                      @click="
                        editName = false;
                        data.user.userName = oldName;
                        oldName = '';
                      "
                    ></span>
                  </v-col>
                </v-row>
              </v-col>
              <v-col>
                <v-btn elevation="0"
                  ><span class="mdi mdi-domain"></span
                  ><span>{{ data.user.companyName }}</span></v-btn
                >
              </v-col>
            </v-row>
          </v-col>
          <v-col class="text-end">
            <v-btn
              rounded
              style="font-weight: bold; background: black;"
              v-if="data.user.runOne && data.user.instructor == 1"
              @click="$emit('Drill-Reset', ctl)"
              ><span class="msg-btn">{{ $t("Drill.reset") }}</span></v-btn
            >
          </v-col>
        </v-row>
        <br />
        <v-divider></v-divider>
        <br />
        <div v-if="data.user.runOne">
          <v-row>
            <v-col v-for="run in data.runs" :key="run.seq" class="align-center">
              <v-card
                height="300px"
                width="300px"
                style="overflow: display;"
                :img="
                  require(run.seq - ctl.completedDrill <= 1
                    ? '../../assets/list-back-1.gif'
                    : '../../assets/list-back-2.gif')
                "
                @click.stop="drillClicked(run)"
              >
                <v-card-text>
                  <div
                    style="position: absolute; top:50px; left: 150px; font-size: 1.2em; font-weight: bold;"
                  >
                    <v-btn
                      block
                      elevation="8"
                      outlined
                      rounded
                      class="progress-btn"
                      v-if="run.seq <= ctl.completedDrill * 1 + 1"
                    >
                      <span
                        style="font-weight: bold;"
                        v-if="
                          run.seq - ctl.completedDrill === 1 &&
                            data.runs[run.seq - 1].drillStatus < 200
                        "
                        >{{ $t("Drill.start") }}</span
                      >
                      <span
                        style="font-weight: bold;"
                        v-if="
                          run.seq - ctl.completedDrill === 1 &&
                            data.runs[run.seq - 1].drillStatus > 100
                        "
                        >{{ $t("Drill.continue") }}</span
                      >
                      <span
                        style="font-weight: bold;"
                        v-if="run.seq <= ctl.completedDrill"
                        >{{ $t("Drill.complete") }}</span
                      >
                    </v-btn>
                  </div>
                  <div style="position: absolute; top:150px; left: 25px;">
                    <span style="font-size: 3em; font-weight: bold;"
                      >0{{ run.seq }}</span
                    >
                  </div>
                  <div style="position: absolute; top:135px; left: 115px;">
                    <span style="font-size: 1.3em; font-weight: bold;">{{
                      $t("Drill.drill" + run.seq)
                    }}</span>
                  </div>
                  <div style="position: absolute; top:250px; left: 140px;">
                    <span style="font-size: 1em; font-weight: bold;"
                      >{{ $t("Drill.drillDuration") }}: {{ run.duration }}</span
                    >
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </div>
        <div v-else>
          <v-row><v-col></v-col></v-row>
          <v-row class="text-center"
            ><v-col
              ><h3>{{ $t("Drill.noRun") }}</h3></v-col
            ></v-row
          >
        </div>
        <v-card dense color="#f5f6f7">
          <v-card-text>{{ $t("Drill.note") }}</v-card-text>
        </v-card>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "DrillList",
  data() {
    return {
      editName: false,
      oldName: "",
    };
  },
  props: {
    data: [],
    ctl: {},
    user: {},
  },
  methods: {
    runUnlocked(s) {
      switch (s) {
        case "1":
          return this.user.activeOne;
        case "2":
          return this.user.activeTwo;
        case "3":
          return this.user.activeThree;
        default:
          return 0;
      }
    },
    drillClicked(v) {
      if (
        this.runUnlocked(v.seq) > 0 &&
        v.seq <= this.ctl.completedDrill * 1 + 1
      ) {
        this.$emit("Drill-Clicked", v);
      }
    },
  },
  created() {
    // console.log(this.ctl);
    // console.log(this.data);
  },
};
</script>

<style></style>
