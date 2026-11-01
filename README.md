# parentportal

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Evaluation report takeaways

Reports default to personalised takeaways. Turn off **Personalised takeaways**
in the report toolbar to use the original seven-pointer section unchanged.
The selected version is also included in the PDF download.

Personalisation uses `content.summary` member histories (ordered by `step`),
current member competence/morale, recorded style alignment and per-member action
impact and attention counts. It shows up to two strengths and four distinct improvement priorities,
then keeps universal principles not already covered by those priorities.
Historical findings include members who have left the current team.

Type 2 readiness suggestions require `params_ref.params.theory_type = 2`.
The competence/morale boundary follows the history display's high band: values
above 50 are high, and 50 or below are low. Low/low suggests coaching; low/high
instruction; high/low partnering; high/high delegation. Historical profile
changes prompt reassessment, not retrospective claims about style mistakes.
Score changes are observed associations, not causal claims. Action/alignment
patterns require at least three comparisons; strengths use at least 75% positive
impact/matches, action-review priorities use below 50%, and alignment priorities
require below 75% with at least two mismatches. Missing or incomplete history
and unconfirmed theory are disclosed in the report. Invalid current scores or
analysis counts are also disclosed and excluded from their respective rules.

Findings contain translation keys and evidence rather than generated prose.
English and Chinese templates render the same findings in the selected language,
including translated action/style names. Missing action labels are explicitly
identified in the selected language. Longer report sections are paginated
in PDF exports without stretching their aspect ratio.
PDF pagination normalises canvas rounding within one source pixel of a page
boundary to avoid effectively blank overflow pages.

Run focused recommendation and bilingual-render checks:
```
node tests\reportTakeaways.test.js
```
