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
            <ReportAbout
            />
        </div>
        <div class="reportDiv3">
    <ReportCompetencyOld
    v-if="(typeof data.content.competency==='undefined')"
        :data="data"
    />
    <ReportCompetency
    v-if="(typeof data.content.competency!=='undefined')"
        :data="data"
    />
        </div>
        <div class="reportDiv4">
    <ReportResult
        :data="data"
    />
        </div>
        <div class="reportDiv5">
    <ReportAdaptability 
        :data="data"
    />
        </div>
        <div class="reportDiv6">
    <ReportStyle 
        :data="data"
    />
        </div>
        <div class="reportDiv7">
    <ReportDeviate 
        :data="data"
    />
        </div>
        <div class="reportDiv8">
    <ReportImpact 
        :data="data"
    />
        </div>
        <div class="reportDiv9">
    <ReportImpact1 
        :data="data"
    />
        </div>
        <div class="reportDiv10">
    <ReportImpact2 
        :data="data"
    />
        </div>
        <div class="reportDiv11">
    <ReportDistribute 
        :data="data"
    />
        </div>
        <div class="reportDiv12">
    <ReportEfficiency 
        :data="data"
    />
        </div>
        <div class="reportDiv13">
    <ReportFood4Thought 
    />
        </div>
        <div class="reportDiv14">
    <ReportTakeAways 
    />
        </div>
    </v-container>
</template>

<script>
import { mapState } from "vuex";

import ReportHead from "./ReportHead.vue";
import ReportCompetency from "./ReportCompetency.vue";
import ReportCompetencyOld from "./ReportCompetency_old.vue";
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
import ReportDisclaim from "./ReportDisclaim.vue";
import ReportAbout from "./ReportAbout.vue";
export default {
    Name: "ReportBase",
    components: {
        ReportHead,
        ReportCompetency,
        ReportCompetencyOld,
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
        ReportDisclaim,
        ReportAbout,
    },
    data() {
        return {

        }
    },
    props: {
        data: {},
    },
    computed: {
        ...mapState({
            signedinuser: "signedinuser",
            paramdata: "paramdata",
        }),
    },
    methods: {

    },
}
</script>

<style>

</style>