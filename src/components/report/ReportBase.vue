<template id="aReport">
    <v-container>
        <div class="reportDiv" id="hdr">
            <ReportHead 
                :data="data"
            />
        </div>
        <div class="reportDiv1">
            <ReportDisclaim
            />
        </div>
        <div class="reportDiv2">
    <ReportResult
        :data="data"
    />
        </div>
        <div class="reportDiv3">
    <ReportStyle 
        :data="data"
    />
        </div>
        <div class="reportDiv4">
    <ReportCompetencyRadar
        v-if="radarAvailable"
        :data="data"
    />
    <ReportUnavailable v-else title="DrillReport.competency-radar-title" />
        </div>
        <div class="reportDiv5">
    <ReportCompetency
        v-if="competencyAvailable"
        :data="data"
    />
    <ReportUnavailable v-else title="DrillReport.competency-title" />
        </div>
        <div class="reportDiv6">
    <ReportDistribute 
        :data="data"
    />
        </div>
        <div class="reportDiv7">
    <ReportEfficiency 
        :data="data"
    />
        </div>
    <ReportHistory v-if="personalisedTakeaways" ref="history" :data="data" />
        <div class="reportDiv8">
    <ReportPersonalTakeAways
        v-if="personalisedTakeaways"
        :data="data"
    />
    <ReportTakeAways
        v-else
    />
        </div>
    </v-container>
</template>

<script>
import { mapState } from "vuex";

import ReportHead from "./ReportHead.vue";
import ReportCompetencyRadar from "./ReportCompetencyRadar.vue";
import ReportCompetency from "./ReportCompetency.vue";
import ReportResult from "./ReportResult.vue";
import ReportAdaptability from "./ReportAdaptability.vue";
import ReportStyle from "./ReportStyle.vue";
import ReportDeviate from "./ReportDeviation.vue";
import ReportImpact from "./ReportImpact.vue";
import ReportImpact1 from "./ReportImpact1.vue";
import ReportImpact2 from "./ReportImpact2.vue";
import ReportDistribute from "./ReportDistribute.vue";
import ReportEfficiency from "./ReportEfficiency.vue";
import ReportFood4Thought from "./ReportFood4Thought.vue";
import ReportTakeAways from "./ReportTakeAways.vue";
import ReportPersonalTakeAways from "./ReportPersonalTakeAways.vue";
import ReportHistory from "./ReportHistory.vue";
import ReportUnavailable from "./ReportUnavailable.vue";
import ReportDisclaim from "./ReportDisclaim.vue";
import ReportAbout from "./ReportAbout.vue";
export default {
    Name: "ReportBase",
    components: {
        ReportHead,
        ReportCompetency,
        ReportCompetencyRadar,
        ReportResult,
        ReportAdaptability,
        ReportStyle,
        ReportDeviate,
        ReportImpact,
        ReportImpact1,
        ReportImpact2,
        ReportDistribute,
        ReportEfficiency,
        ReportFood4Thought,
        ReportTakeAways,
        ReportPersonalTakeAways,
        ReportHistory,
        ReportUnavailable,
        ReportDisclaim,
        ReportAbout,
    },
    data() {
        return {

        }
    },
    props: {
        data: {},
        personalisedTakeaways: { type: Boolean, default: true },
    },
    computed: {
        competencyAvailable() {
            const content = this.data && this.data.content;
            return this.validCompetency(content && content.competency);
        },
        radarAvailable() {
            const content = this.data && this.data.content;
            return this.competencyAvailable && this.validCompetency(content && content.avg_competency);
        },
        ...mapState({
            signedinuser: "signedinuser",
            paramdata: "paramdata",
        }),
    },
    methods: {
        validCompetency(value) {
            return !!value && typeof value === "object" &&
                ["skillsCompetency", "moraleCompetency", "efficiencyCompetency",
                    "leaderShipCompetency", "driveCompetency"].every(key => {
                    const score = value[key];
                    return (typeof score === "number" ||
                        (typeof score === "string" && score.trim())) &&
                        Number.isFinite(Number(score)) && Number(score) >= 0 && Number(score) <= 10;
                });
        },
    },
}
</script>

<style>

</style>