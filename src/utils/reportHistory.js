const metrics = ["skills", "morale", "efficiency"];

function numeric(value) {
  if (typeof value !== "number" && typeof value !== "string") return null;
  if (typeof value === "string" && !value.trim()) return null;
  const result = Number(value);
  return Number.isFinite(result) ? result : null;
}

function values(value) {
  return value && typeof value === "object" ? Object.values(value) : [];
}

export function readingColour(value) {
  if (value === null) return "";
  return value > 75 ? "value-hh" : value > 50 ? "value-mh"
    : value > 25 ? "value-ml" : "value-ll";
}

export function buildReportHistory(data, paramdata) {
  const result = { members: [], days: [], incomplete: false };
  const content = data && data.content;
  const definitions = values(paramdata && paramdata.action_det && paramdata.action_det.action);
  const parents = new Map();
  definitions.forEach(action => {
    if (!action || action.actionName === action.parentAction) return;
    const parent = definitions.find(entry => entry && entry.actionName === action.parentAction);
    if (parent && typeof parent.displayKey === "string" && typeof action.displayKey === "string") {
      parents.set(action.displayKey, parent.displayKey);
    }
  });
  const actionKeys = record => {
    const keys = record && typeof record.action === "string"
      ? record.action.split("/").map(key => key.trim()).filter(Boolean) : [];
    const representedParents = new Set(keys.map(key => parents.get(key)).filter(Boolean));
    return keys.filter(key => !representedParents.has(key));
  };
  const records = [];
  const snapshots = values(content && content.summary).filter(snapshot => {
    const valid = snapshot && Number.isInteger(numeric(snapshot.step)) && numeric(snapshot.step) >= 0 &&
      snapshot.member && typeof snapshot.member === "object";
    if (!valid) result.incomplete = true;
    return valid;
  }).sort((a, b) => Number(a.step) - Number(b.step));
  snapshots.forEach((snapshot, index) => {
    const step = Number(snapshot.step);
    const recordedDay = numeric(snapshot.day);
    const day = Number.isInteger(recordedDay) && recordedDay >= 0 ? recordedDay : null;
    if (day === null) result.incomplete = true;
    const group = { key: "step-" + step + "-" + index, day,
      members: Object.create(null), teamActions: [] };
    records.push(group);
    actionKeys(snapshot.team).forEach(action => {
      if (!group.teamActions.includes(action)) group.teamActions.push(action);
    });
    values(snapshot.member).forEach(member => {
      if (!member || typeof member.staff !== "string" || !member.staff.trim()) {
        result.incomplete = true;
        return;
      }
      const name = member.staff;
      if (!result.members.includes(name)) result.members.push(name);
      const actions = [];
      actionKeys(member).forEach(action => {
        if (!actions.includes(action)) actions.push(action);
      });
      const entry = { actions, changes: {} };
      metrics.forEach(metric => {
        const value = numeric(member[metric]);
        entry[metric] = value !== null && value >= 0 && value <= 100 ? value : null;
        if (entry[metric] === null) result.incomplete = true;
      });
      group.members[name] = entry;
    });
    if (Object.values(group.members).some(member => member.actions.length)) {
      group.teamActions = [];
    }
  });
  const previous = new Map();
  records.forEach(group => {
    if (!Object.keys(group.members).length) {
      result.incomplete = true;
      return;
    }
    Object.entries(group.members).forEach(([name, entry]) => {
      const before = previous.get(name);
      metrics.forEach(metric => {
        entry.changes[metric] = before &&
          before[metric] !== null && entry[metric] !== null
          ? entry[metric] - before[metric] : null;
      });
      previous.set(name, entry);
    });
    result.days.push(group);
  });
  return result;
}

export function paginateHistory(days, heights = {}, availableHeight = Infinity) {
  const pages = [];
  let page = [];
  let height = 0;
  let recordedDays = new Set();
  days.forEach(day => {
    const nextHeight = heights[day.key] || 0;
    const dayKey = day.day === null ? day.key : day.day;
    const isNewDay = day.day !== 0 && !recordedDays.has(dayKey);
    if (page.length && ((isNewDay && recordedDays.size >= 10) ||
        height + nextHeight > availableHeight)) {
      pages.push(page);
      page = [];
      height = 0;
      recordedDays = new Set();
    }
    page.push(day);
    height += nextHeight;
    if (day.day !== 0) recordedDays.add(dayKey);
  });
  if (page.length) pages.push(page);
  return pages;
}
