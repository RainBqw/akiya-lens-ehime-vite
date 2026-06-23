const reasonLabels: Record<string, string> = {
  roofDamage: "屋根破損あり",
  wallDamage: "外壁破損あり",
  overgrown: "雑草が多い",
  roadImpact: "道路にはみ出し",
  garbage: "ごみあり",
  worseThanBefore: "前回より悪化",
  notInspectedLong: "60日以上未点検",
};

export function getRiskReasons(checkedItems: any) {
  if (!checkedItems) return [];

  return Object.entries(checkedItems)
    .filter(([, value]) => value === true)
    .map(([key]) => reasonLabels[key])
    .filter(Boolean);
}

export function getScoreDiff(inspections: any[]) {
  if (!Array.isArray(inspections) || inspections.length < 2) {
    return null;
  }

  const previous = inspections[inspections.length - 2];
  const latest = inspections[inspections.length - 1];

  const diff = latest.score - previous.score;

  return {
    previousScore: previous.score,
    latestScore: latest.score,
    diff,
    trend:
      diff > 0
        ? "悪化"
        : diff < 0
        ? "改善"
        : "変化なし",
  };
}