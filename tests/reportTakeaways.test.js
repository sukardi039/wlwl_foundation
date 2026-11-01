const assert = require("assert");
const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");
const compiler = require("vue-template-compiler");
const Vue = require("vue");
const Vuex = require("vuex");
const VueI18n = require("vue-i18n");

function loadScript(source, resolve = require) {
  const { code } = babel.transformSync(source, {
    babelrc: false, configFile: false,
    plugins: ["@babel/plugin-transform-modules-commonjs"],
  });
  const exports = {};
  new Function("exports", "require", code)(exports, resolve);
  return exports;
}

const root = path.resolve(__dirname, "..");
const read = file => fs.readFileSync(path.join(root, file), "utf8");
const engine = loadScript(read("src\\utils\\reportTakeaways.js"));
const { buildReportTakeaways, type2Style } = engine;
const keys = findings => findings.map(finding => finding.key);
const snapshot = (step, skills, morale, efficiency, extra = {}) => ({
  step, day: step, member: [{ staff: "Alex", skills, morale, efficiency, ...extra }],
});
const member = { staffName: 1, staffExp: "Alex", skillsValue: 40, moraleValue: 70 };
const fixture = {
  action: "COMPLETED",
  content: {
    members: { 1: member }, day: { 2: { week: 1, weekday: 2 } },
    summary: [
      snapshot(2, 35, 65, 45, { action: "_u.a_interview/_u.a_coach", skillsAdd: -5 }),
      snapshot(0, 50, 70, 50), snapshot(1, 40, 68, 48),
    ],
    analysis: {
      style: {
        desire_intent: { count: 8, positive: 4 },
        intent_actual: { count: 8, positive: 8 },
      },
      staff: { 1: { staffExp: "Alex", total: 8,
        coaching: { name: "coaching", count: 4, positive: 1 },
        feedback: { name: "feedback", count: 4, positive: 4 } } },
    },
  },
};

assert.strictEqual(type2Style(50, 50), "2-coach");
assert.strictEqual(type2Style(50, 51), "1-instruct");
assert.strictEqual(type2Style(51, 50), "3-partner");
assert.strictEqual(type2Style(51, 51), "4-deligate");
assert.strictEqual(type2Style("40", "70"), "1-instruct");
for (const invalid of [null, "", " ", false, -1, 101, Infinity, "invalid"]) {
  assert.strictEqual(type2Style(invalid, 70), null);
}
const before = JSON.stringify(fixture);
const result = buildReportTakeaways(fixture, "2");
assert.strictEqual(JSON.stringify(fixture), before, "analysis must not mutate drill data");
assert.deepStrictEqual(keys(result.priorities), [
  "decline-skills", "alignment-desire_intent", "review-action", "readiness-1-instruct",
]);
const decline = result.priorities[0].params;
assert.strictEqual(decline.change, 15);
assert.strictEqual(decline.startStep, 0);
assert.strictEqual(decline.endStep, 2);
assert.strictEqual(decline.step, 2);
assert.deepStrictEqual(decline.actions, ["_u.a_interview", "_u.a_coach"]);
assert(!result.principles.includes(4));
assert(result.principles.includes(1));
assert.strictEqual(result.priorities.find(finding => finding.key.startsWith("readiness-")).params.actionsCount, 8);
assert.strictEqual(result.strengths.length, 2);
assert(keys(result.strengths).includes("effective-action"));

const growth = { content: {
  members: { 1: { ...member, skillsValue: 80, moraleValue: 80 } },
  summary: [snapshot(2, 80, 80, 90), snapshot(0, 20, 40, 20)],
} };
const improved = buildReportTakeaways(growth, 2);
assert(keys(improved.strengths).includes("development"));
assert(keys(improved.strengths).includes("efficiency"));
assert.deepStrictEqual(keys(improved.priorities), ["transition"]);
assert.strictEqual(improved.priorities[0].params.style, "4-deligate");
assert.strictEqual(improved.priorities[0].params.fromStyle, "2-coach");
assert(!improved.principles.includes(7));
const departed = JSON.parse(JSON.stringify(growth));
departed.content.members = {};
assert(keys(buildReportTakeaways(departed, 2).strengths).includes("development"),
  "departed members' history must still contribute");
assert(!keys(buildReportTakeaways(growth, 1).priorities).includes("transition"));
assert(buildReportTakeaways(growth).notices.includes("theory-unavailable"));

const sparse = { content: { analysis: { style: {
  desire_intent: { count: 2, positive: 0 },
  intent_actual: { count: 4, positive: 5 },
} } } };
assert.strictEqual(buildReportTakeaways(sparse, 2).priorities.length, 0);
assert(buildReportTakeaways(sparse, 2).notices.includes("incomplete-analysis"));
assert(buildReportTakeaways(sparse, 2).notices.includes("missing-history"));
assert(buildReportTakeaways(null, 2).notices.includes("missing-data"));
const partial = { ...fixture, action: "MORE_ACTIONS", content: {
  ...fixture.content, summary: [...fixture.content.summary, { step: "bad", member: [] },
    snapshot(3, "bad", 70, 50), snapshot(2, 35, 65, 45)],
} };
assert(buildReportTakeaways(partial, 2).notices.includes("incomplete-history"));
assert(buildReportTakeaways(partial, 2).notices.includes("in-progress"));
assert.strictEqual(buildReportTakeaways(partial, 2).priorities[0].params.change, 15);
const efficiencyDrop = { content: {
  summary: [snapshot(0, 80, 80, 90), snapshot(1, 80, 80, 40)],
} };
assert(keys(buildReportTakeaways(efficiencyDrop, 2).priorities).includes("decline-efficiency"));
const repeated = { content: { members: { 1: member, 2: { ...member, staffName: 2, staffExp: "Sam" } } } };
assert.strictEqual(buildReportTakeaways(repeated, 2).priorities.length, 1);

Vue.use(Vuex);
Vue.use(VueI18n);
const messages = {
  en: JSON.parse(read("src\\locales\\en.json")),
  cn: JSON.parse(read("src\\locales\\cn.json")),
};
const translations = locale => messages[locale].DrillReport["personal-takeaways"];
assert.deepStrictEqual(Object.keys(translations("en")).sort(), Object.keys(translations("cn")).sort());
for (const key of Object.keys(translations("en"))) {
  const placeholders = text => (text.match(/\{[^}]+\}/g) || []).sort();
  assert.deepStrictEqual(placeholders(translations("en")[key]), placeholders(translations("cn")[key]), key);
}
const sfc = compiler.parseComponent(read("src\\components\\report\\ReportPersonalTakeAways.vue"));
assert.deepStrictEqual(compiler.compile(sfc.template.content).errors, []);
const component = loadScript(sfc.script.content, request =>
  request === "../../utils/reportTakeaways" ? engine : require(request)
).default;
const store = new Vuex.Store({ state: { paramdata: { params_ref: { params: { theory_type: 2 } } } } });
const i18n = new VueI18n({ locale: "en", fallbackLocale: "cn", messages });
const vm = new Vue({ ...component, ...compiler.compileToFunctions(sfc.template.content), store, i18n,
  propsData: { data: fixture } });
const text = node => (node.text || "") + (node.children || []).map(text).join(" ");
for (const locale of ["en", "cn"]) {
  i18n.locale = locale;
  const rendered = text(vm._render());
  assert(rendered.includes(translations(locale).title));
  assert(rendered.includes("Alex"));
  assert(!rendered.includes("DrillReport."), "all rendered report keys must resolve");
  assert(!rendered.includes("_u."), "historical actions must be translated");
  assert(rendered.includes(locale === "en" ? "week 1, day 2" : "第1周第2天"));
}
const unlabelled = JSON.parse(JSON.stringify(fixture));
unlabelled.content.summary[0].member[0].action = "_u.unavailable_custom_action";
vm.data = unlabelled;
assert(vm.findings.notices.includes("missing-action-label"));
assert(text(vm._render()).includes(translations("cn")["unavailable-action"]));
vm.data = fixture;
for (const input of [growth, departed, sparse, partial, efficiencyDrop, repeated, { content: {} }]) {
  const findings = buildReportTakeaways(input, 2);
  for (const locale of ["en", "cn"]) {
    for (const section of ["strengths", "priorities"]) {
      findings[section].forEach(finding => {
        assert(translations(locale)["heading-" + finding.key], finding.key);
        assert(translations(locale)[section + "-" + finding.key], finding.key);
      });
    }
  }
}
const base = read("src\\components\\report\\ReportBase.vue");
const baseSfc = compiler.parseComponent(base);
const baseComponent = loadScript(baseSfc.script.content, request => request === "vuex"
  ? require(request) : { name: path.basename(request, ".vue"), render: h => h("div") }).default;
const baseVm = new Vue({ ...baseComponent, ...compiler.compileToFunctions(baseSfc.template.content),
  store, propsData: { data: fixture, personalisedTakeaways: true } });
const componentNames = node => [
  ...(node.componentOptions ? [node.componentOptions.Ctor.options.name] : []),
  ...(node.children || []).flatMap(componentNames),
];
assert(componentNames(baseVm._render()).includes("ReportPersonalTakeAways"));
assert(!componentNames(baseVm._render()).includes("ReportTakeAways"));
baseVm.personalisedTakeaways = false;
assert(componentNames(baseVm._render()).includes("ReportTakeAways"));
assert(!componentNames(baseVm._render()).includes("ReportPersonalTakeAways"));
baseVm.$destroy();
vm.$destroy();

async function testPdf() {
  const report = compiler.parseComponent(read("src\\components\\CoreModule\\DrillReport.vue"));
  const documents = [];
  class Pdf {
    constructor() {
      this.pages = 1;
      this.images = [];
      this.internal = { pageSize: { getWidth: () => 100, getHeight: () => 150 } };
      documents.push(this);
    }
    addPage() { this.pages++; }
    addImage(...args) { this.images.push(args); }
    save(name) { this.filename = name; }
  }
  const reportComponent = loadScript(report.script.content, request => {
    if (request === "jspdf") return Pdf;
    if (request === "html2canvas") return async section => {
      assert(section, "all requested report sections must exist");
      return { width: 100, height: section.height,
        toDataURL: () => "data:image/jpeg;base64,fixture" };
    };
    return {};
  }).default;
  for (const personalisedTakeaways of [true, false]) {
    const selectors = [];
    const context = {
      ...reportComponent.data(), genPDF: 1, personalisedTakeaways,
      data: { content: { analysis: { reportUser: "Fixture", reportDate: "2026-11-01" } } },
      $nextTick: async () => {},
      $t: key => i18n.t(key),
      $refs: { report: { querySelector: selector => {
        selectors.push(selector);
        return selector === "#hdr" ? { scrollWidth: 100, scrollHeight: 150 }
          : { height: selector === ".reportDiv8" && personalisedTakeaways ? 450 : 150 };
      } } },
    };
    await reportComponent.methods.doPDF.call(context);
    const doc = documents[documents.length - 1];
    assert(selectors.includes(".reportDiv8"));
    assert.strictEqual(context.len, 9);
    assert.strictEqual(context.x, 9);
    assert.strictEqual(doc.pages, personalisedTakeaways ? 11 : 9);
    assert.strictEqual(doc.images.length, doc.pages);
    assert.strictEqual(doc.filename, "Fixture-2026-11-01.pdf");
    assert.strictEqual(context.genPDF, 0);
    assert.strictEqual(context.exportError, "");
    assert.strictEqual(doc.images[8][5], personalisedTakeaways ? 450 : 150,
      "long sections must retain their aspect ratio");
  }
  const failed = { ...reportComponent.data(), genPDF: 1,
    $nextTick: async () => {}, $refs: { report: null }, $t: key => i18n.t(key) };
  const originalError = console.error;
  let logged = false;
  console.error = () => { logged = true; };
  try {
    await reportComponent.methods.doPDF.call(failed);
  } finally {
    console.error = originalError;
  }
  assert(logged && failed.exportError);
  assert.strictEqual(failed.genPDF, 0);
}
testPdf().then(() => {
  console.log("PASS: Type 2 boundaries, history ordering/changes, departed members, sparse/invalid evidence, ranking, immutability, bilingual rendering, legacy toggle and PDF pagination/errors.");
}).catch(error => {
  console.error(error);
  process.exitCode = 1;
});
