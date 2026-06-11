import { FileText } from "lucide-react";
import { levelClass } from "@/lib/riskScore";

type ReportPreviewProps = {
  property: any;
};

function getRecommendation(level: string) {
  if (level === "緊急確認") {
    return "歩行者や周辺環境への影響が懸念されるため、早急な現地確認と所有者への連絡を推奨します。";
  }

  if (level === "要対応") {
    return "建物や敷地管理状態に悪化が見られるため、次回巡回を待たずに対応方針の確認を推奨します。";
  }

  if (level === "要観察") {
    return "現時点で緊急性は高くありませんが、状態変化を継続的に確認することを推奨します。";
  }

  return "現時点で大きなリスクは確認されていません。通常の巡回頻度で継続確認してください。";
}

export function ReportPreview({ property }: ReportPreviewProps) {
  const latestInspection =
    property.inspections[property.inspections.length - 1];

  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold">所有者向け点検レポート</h2>
          <p className="text-sm text-slate-500">
            点検結果を説明しやすい文章に整理します
          </p>
        </div>

        <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
          <FileText className="h-5 w-5" />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400">
              PROPERTY REPORT
            </p>
            <h3 className="mt-1 text-xl font-bold text-slate-900">
              {property.propertyId} / {property.city} {property.area}
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              建物種別：{property.buildingType}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              所有者確認状況：{property.ownerStatus}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`rounded-full border px-3 py-1 text-sm font-semibold ${levelClass(
                property.riskLevel
              )}`}
            >
              {property.riskLevel}
            </span>
            <span className="rounded-2xl bg-slate-900 px-4 py-2 text-white font-bold">
              {property.currentRiskScore}
            </span>
          </div>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-4 border border-slate-100">
            <p className="text-xs font-semibold text-slate-400">
              最新点検日
            </p>
            <p className="mt-1 font-bold text-slate-900">
              {latestInspection.date}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-4 border border-slate-100">
            <p className="text-xs font-semibold text-slate-400">
              最新スコア
            </p>
            <p className="mt-1 font-bold text-slate-900">
              {latestInspection.score}点 / {latestInspection.level}
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-white p-4 border border-slate-100">
          <p className="text-xs font-semibold text-slate-400">
            点検コメント
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            {latestInspection.comment}
          </p>
        </div>

        <div className="mt-4 rounded-2xl bg-white p-4 border border-slate-100">
          <p className="text-xs font-semibold text-slate-400">
            推奨対応
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            {getRecommendation(property.riskLevel)}
          </p>
        </div>

        {latestInspection.imagePreview && (
          <div className="mt-4 rounded-2xl bg-white p-4 border border-slate-100">
            <p className="mb-2 text-xs font-semibold text-slate-400">
              添付写真：{latestInspection.imageName}
            </p>
            <img
              src={latestInspection.imagePreview}
              alt="点検写真"
              className="max-h-64 w-full rounded-xl object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}