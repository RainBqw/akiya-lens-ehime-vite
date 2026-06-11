export type RiskInput = {
  roofDamage: boolean;
  wallDamage: boolean;
  overgrown: boolean;
  roadImpact: boolean;
  garbage: boolean;
  worseThanBefore: boolean;
  notInspectedLong: boolean;
};

export type RiskResult = {
  score: number;
  level: string;
};

export function calculateRiskScore(input: RiskInput): RiskResult {
  let score = 0;

  if (input.roofDamage) score += 25;
  if (input.wallDamage) score += 15;
  if (input.overgrown) score += 15;
  if (input.roadImpact) score += 10;
  if (input.garbage) score += 10;
  if (input.worseThanBefore) score += 10;
  if (input.notInspectedLong) score += 5;

  score = Math.min(score, 100);

  if (score >= 80) return { score, level: "緊急確認" };
  if (score >= 60) return { score, level: "要対応" };
  if (score >= 30) return { score, level: "要観察" };

  return { score, level: "低リスク" };
}

export function levelClass(level: string): string {
  if (level === "緊急確認") return "bg-red-100 text-red-700 border-red-200";
  if (level === "要対応") return "bg-orange-100 text-orange-700 border-orange-200";
  if (level === "要観察") return "bg-yellow-100 text-yellow-700 border-yellow-200";

  return "bg-blue-100 text-blue-700 border-blue-200";
}