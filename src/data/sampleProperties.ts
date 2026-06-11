export const initialProperties = [
  {
    propertyId: "P001",
    city: "新居浜市",
    area: "中心部",
    buildingType: "木造戸建て",
    ownerStatus: "所有者確認中",
    status: "経過観察",
    currentRiskScore: 68,
    riskLevel: "要対応",
    lastInspectionAt: "2026-06-01",
    inspections: [
      { date: "2026-04-01", score: 35, level: "要観察", comment: "雑草が増え始めている。" },
      { date: "2026-05-01", score: 52, level: "要観察", comment: "外壁の一部に劣化が見られる。" },
      { date: "2026-06-01", score: 68, level: "要対応", comment: "道路側への枝の張り出しあり。" }
    ]
  },
  {
    propertyId: "P002",
    city: "松山市",
    area: "郊外",
    buildingType: "木造戸建て",
    ownerStatus: "所有者不明",
    status: "未対応",
    currentRiskScore: 82,
    riskLevel: "緊急確認",
    lastInspectionAt: "2026-05-20",
    inspections: [
      { date: "2026-03-20", score: 59, level: "要観察", comment: "屋根に軽微な破損。" },
      { date: "2026-04-20", score: 71, level: "要対応", comment: "外壁と雨樋の破損が進行。" },
      { date: "2026-05-20", score: 82, level: "緊急確認", comment: "歩行者への影響が懸念される。" }
    ]
  },
  {
    propertyId: "P003",
    city: "八幡浜市",
    area: "沿岸部",
    buildingType: "平屋",
    ownerStatus: "所有者確認済み",
    status: "確認済み",
    currentRiskScore: 41,
    riskLevel: "要観察",
    lastInspectionAt: "2026-06-05",
    inspections: [
      { date: "2026-05-05", score: 36, level: "要観察", comment: "敷地内に雑草あり。" },
      { date: "2026-06-05", score: 41, level: "要観察", comment: "大きな悪化はないが継続確認が必要。" }
    ]
  },
  {
    propertyId: "P004",
    city: "宇和島市",
    area: "山間部",
    buildingType: "木造戸建て",
    ownerStatus: "所有者確認済み",
    status: "対応予定",
    currentRiskScore: 24,
    riskLevel: "低リスク",
    lastInspectionAt: "2026-06-03",
    inspections: [
      { date: "2026-06-03", score: 24, level: "低リスク", comment: "現時点で大きな問題なし。" }
    ]
  },
  {
    propertyId: "P005",
    city: "今治市",
    area: "島しょ部",
    buildingType: "木造戸建て",
    ownerStatus: "所有者確認中",
    status: "経過観察",
    currentRiskScore: 57,
    riskLevel: "要観察",
    lastInspectionAt: "2026-05-28",
    inspections: [
      { date: "2026-04-28", score: 44, level: "要観察", comment: "庭木が伸びている。" },
      { date: "2026-05-28", score: 57, level: "要観察", comment: "前回より雑草が増加。" }
    ]
  }
];