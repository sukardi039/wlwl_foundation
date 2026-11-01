const styles = ["1-instruct", "2-coach", "3-partner", "4-deligate"];

function number(value) {
  if (typeof value !== "number" && typeof value !== "string") return null;
  if (typeof value === "string" && !value.trim()) return null;
  const result = Number(value);
  return Number.isFinite(result) ? result : null;
}

function score(value) {
  const result = number(value);
  return result !== null && result >= 0 && result <= 100 ? result : null;
}

function values(value) {
  return value && typeof value === "object" ? Object.values(value) : [];
}

function rate(value) {
  if (!value || typeof value !== "object") return null;
  const count = number(value.count);
  const positive = number(value.positive);
  if (count === null || positive === null || count < 0 ||
      !Number.isInteger(count) || positive < 0 || positive > count) return { invalid: true };
  if (count < 3) return null;
  return { count, positive, percent: positive / count * 100 };
}

export function type2Style(skills, morale) {
  if (score(skills) === null || score(morale) === null) return null;
  if (Number(skills) > 50) return Number(morale) > 50 ? styles[3] : styles[2];
  return Number(morale) > 50 ? styles[0] : styles[1];
}

export function personalisedReportEnabled(paramdata) {
  const ref = paramdata && paramdata.params_ref;
  const setting = ref && ref.params && ref.params.personalised_report;
  return ![false, 0, "0", "false"].includes(setting);
}

export function buildReportTakeaways(data, theoryType) {
  const result = { strengths: [], priorities: [], principles: [1, 2, 3, 4, 5, 6, 7], notices: [] };
  const content = data && data.content;
  if (!content || typeof content !== "object") {
    result.notices.push("missing-data");
    return result;
  }
  const analysis = content.analysis || {};
  if (["INTRODUCTION", "SELECT_STYLE", "MORE_ACTIONS"].includes(data.action)) {
    result.notices.push("in-progress");
  }
  const isType2 = Number(theoryType) === 2;
  if (!isType2) result.notices.push("theory-unavailable");
  const candidates = [];
  const covered = new Set();
  const add = (section, key, params, rank, principles = []) => {
    const finding = { key, params, rank, principles };
    if (section === "strengths") result.strengths.push(finding);
    else candidates.push(finding);
  };

  let invalidHistory = false;
  const history = values(content.summary).filter(snapshot => {
    const valid = snapshot && number(snapshot.step) !== null && snapshot.member &&
      typeof snapshot.member === "object";
    if (!valid) invalidHistory = true;
    return valid;
  }).sort((a, b) => Number(a.step) - Number(b.step));
  const timelines = new Map();
  history.forEach(snapshot => {
    values(snapshot.member).forEach(member => {
      if (!member || typeof member.staff !== "string" || !member.staff.trim() ||
          score(member.skills) === null || score(member.morale) === null) {
        invalidHistory = true;
        return;
      }
      const timeline = timelines.get(member.staff) || [];
      // A repeated step is not a second independent observation.
      if (!timeline.some(entry => Number(entry.step) === Number(snapshot.step))) {
        timeline.push({ ...member, step: snapshot.step, day: snapshot.day });
      }
      timelines.set(member.staff, timeline);
    });
  });
  if (!timelines.size) result.notices.push("missing-history");
  if (invalidHistory) result.notices.push("incomplete-history");

  const members = values(content.members).filter(member =>
    member && number(member.staffName) > 0 && typeof member.staffExp === "string"
  );
  members.forEach(member => {
    const skills = score(member.skillsValue);
    const morale = score(member.moraleValue);
    if ((skills === null || morale === null) && !result.notices.includes("incomplete-members")) {
      result.notices.push("incomplete-members");
    }
    const params = { member: member.staffExp, skills, morale };
    const staff = analysis.staff && analysis.staff[member.staffName];
    const actionCount = staff && number(staff.total);
    if (actionCount !== null && actionCount !== undefined &&
        Number.isInteger(actionCount) && actionCount >= 0) {
      params.actionsCount = actionCount;
    }
    if (isType2 && skills !== null && morale !== null) {
      const recommended = type2Style(skills, morale);
      if (skills <= 50 || morale <= 50) {
        add("priorities", "readiness-" + recommended,
          { ...params, style: recommended }, 70 + (100 - Math.min(skills, morale)) / 10,
          skills <= 50 ? [4, 7] : [5, 7]);
      }
    }
  });
  timelines.forEach((timeline, memberName) => {
    if (timeline.length < 2) return;
    const first = timeline[0];
    const last = timeline[timeline.length - 1];
    const skillsChange = Number(last.skills) - Number(first.skills);
    const moraleChange = Number(last.morale) - Number(first.morale);
    if (skillsChange > 0 && moraleChange > 0) {
      add("strengths", "development",
        { member: memberName, skillsChange, moraleChange,
          startDay: first.day, endDay: last.day },
        skillsChange + moraleChange);
    }
    const efficiencyChange = score(first.efficiency) !== null && score(last.efficiency) !== null
      ? Number(last.efficiency) - Number(first.efficiency) : null;
    if (efficiencyChange > 0) {
      add("strengths", "efficiency", { member: memberName, change: efficiencyChange,
        startDay: first.day, endDay: last.day }, efficiencyChange);
    }
    const changes = { skills: skillsChange, morale: moraleChange };
    if (efficiencyChange !== null) changes.efficiency = efficiencyChange;
    const metric = Object.keys(changes).sort((a, b) => changes[a] - changes[b])[0];
    if (changes[metric] < 0) {
      const decline = timeline.slice(1).filter(entry =>
        typeof entry.action === "string" && entry.action.trim() &&
        number(entry[metric + "Add"]) !== null && Number(entry[metric + "Add"]) < 0
      ).sort((a, b) => Number(a[metric + "Add"]) - Number(b[metric + "Add"]))[0];
      const evidence = { member: memberName, change: Math.abs(changes[metric]),
        startDay: first.day, endDay: last.day };
      if (decline) {
        evidence.actions = decline.action.split("/").filter(Boolean);
        evidence.day = decline.day;
        evidence.delta = Math.abs(Number(decline[metric + "Add"]));
      }
      add("priorities", "decline-" + metric, evidence, 90 + evidence.change / 10,
        metric === "skills" ? [4] : metric === "morale" ? [5] : []);
    }
    if (isType2) {
      const previous = timeline.slice(0, -1).reverse().find(entry =>
        type2Style(entry.skills, entry.morale) !== type2Style(last.skills, last.morale)
      );
      if (previous) {
        add("priorities", "transition",
          { member: memberName, fromStyle: type2Style(previous.skills, previous.morale),
            style: type2Style(last.skills, last.morale), startDay: previous.day, endDay: last.day },
          65, [7]);
      }
    }
  });

  ["desire_intent", "intent_actual", "desire_actual"].forEach(kind => {
    const observation = rate(analysis.style && analysis.style[kind]);
    if (!observation) return;
    if (observation.invalid) {
      if (!result.notices.includes("incomplete-analysis")) result.notices.push("incomplete-analysis");
      return;
    }
    const params = { count: observation.count, positive: observation.positive,
      mismatches: observation.count - observation.positive, percent: observation.percent };
    if (observation.percent < 75 && params.mismatches >= 2) {
      add("priorities", "alignment-" + kind, params,
        kind === "desire_intent" ? 85 : kind === "intent_actual" ? 84 : 83,
        kind === "desire_intent" ? [3] : []);
    } else if (observation.percent >= 75) {
      add("strengths", "alignment-" + kind, params, observation.percent);
    }
  });

  Object.entries(analysis.staff || {}).forEach(([id, staff]) => {
    if (number(id) <= 0 || !staff || typeof staff.staffExp !== "string") return;
    Object.values(staff).forEach(action => {
      const observation = rate(action);
      if (!observation || !action.name) return;
      if (observation.invalid) {
        if (!result.notices.includes("incomplete-analysis")) result.notices.push("incomplete-analysis");
        return;
      }
      const params = { member: staff.staffExp, action: action.name,
        count: observation.count, positive: observation.positive, percent: observation.percent };
      if (observation.percent >= 75) {
        add("strengths", "effective-action", params, observation.percent + observation.count / 100);
      } else if (observation.percent < 50) {
        add("priorities", "review-action", params,
          80 + (50 - observation.percent) / 10);
      }
    });
  });

  // Keep the report concise without filling it with several examples of the same rule.
  const select = (findings, limit) => {
    const seen = new Set();
    return findings.sort((a, b) => b.rank - a.rank).filter(finding => {
      const family = finding.key.startsWith("readiness-") ? "readiness" : finding.key;
      if (seen.has(family)) return false;
      seen.add(family);
      return true;
    }).slice(0, limit);
  };
  result.strengths = select(result.strengths, 2);
  result.priorities = select(candidates, 4);
  result.priorities.forEach(finding => finding.principles.forEach(id => covered.add(id)));
  result.principles = result.principles.filter(id => !covered.has(id));
  return result;
}
