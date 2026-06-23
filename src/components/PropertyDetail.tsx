import { useEffect, useState } from "react";
import { levelClass } from "@/lib/riskScore";
import { getRiskReasons, getScoreDiff } from "@/lib/riskReasons";

type PropertyDetailProps = {
  property: any;
  onUpdateVacancyStatus?: (propertyId: string, vacancyStatus: string) => void;
};

export function PropertyDetail({
  property,
  onUpdateVacancyStatus,
}: PropertyDetailProps) {
  const [selectedVacancyStatus, setSelectedVacancyStatus] = useState(
    property.vacancyStatus || "空き家候補"
  );

  useEffect(() => {
    setSelectedVacancyStatus(property.vacancyStatus || "空き家候補");
  }, [property.propertyId, property.vacancyStatus]);
  const latestInspection =
  property.inspections?.[property.inspections.length - 1];

  const riskReasons = getRiskReasons(latestInspection?.checkedItems);

  const scoreDiff = getScoreDiff(property.inspections);
  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            {property.propertyId} {property.city} {property.area}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {property.buildingType} / {property.ownerStatus} / {property.status}
          </p>

          <div className="mt-3 grid gap-2 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
              <p className="text-xs font-semibold text-slate-400">
                空き家判定ステータス
              </p>
              <p className="mt-1 text-sm font-bold text-slate-700">
                {property.vacancyStatus || "未設定"}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
              <p className="text-xs font-semibold text-slate-400">
                発見経路
              </p>
              <p className="mt-1 text-sm font-bold text-slate-700">
                {property.discoverySource || "未設定"}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3 md:col-span-2">
              <p className="text-xs font-semibold text-slate-400">
                空き家候補理由
              </p>
              <p className="mt-1 text-sm text-slate-700">
                {property.vacancyReason || "未登録"}
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-slate-100 bg-white p-4">
            <p className="text-xs font-semibold text-slate-400">
              判定ステータスを更新
            </p>

            <div className="mt-3 flex flex-col gap-3 md:flex-row">
              <select
                value={selectedVacancyStatus}
                onChange={(e) => setSelectedVacancyStatus(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm outline-none focus:border-slate-900"
              >
                <option>空き家候補</option>
                <option>現地確認中</option>
                <option>所有者確認中</option>
                <option>空き家確認済み</option>
                <option>空き家ではない</option>
                <option>管理対象外</option>
              </select>

              <button
                type="button"
                onClick={() =>
                  onUpdateVacancyStatus?.(
                    property.propertyId,
                    selectedVacancyStatus
                  )
                }
                className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-slate-700"
              >
                更新する
              </button>
            </div>

            {property.isVacantConfirmed && (
              <div className="mt-3 rounded-2xl bg-emerald-50 p-3 text-sm text-emerald-700">
                この物件は空き家確認済みです。
                {property.confirmedAt && (
                  <span className="ml-2">
                    確認日時: {property.confirmedAt.slice(0, 10)}
                  </span>
                )}
              </div>
            )}
          </div>
          <div className="mt-4 rounded-2xl border border-slate-100 bg-white p-4">
          <p className="text-xs font-semibold text-slate-400">
          最新リスクの理由
          </p>

          {riskReasons.length > 0 ? (
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
          {riskReasons.map((reason) => (
          <li key={reason} className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-slate-900" />
          {reason}
          </li>
          ))}
          </ul>
           ) : (
            <p className="mt-2 text-sm text-slate-500">
             最新点検ではリスク要因のチェックはありません。
            </p>
         )}

          {scoreDiff && (
          <div className="mt-4 rounded-2xl bg-slate-50 p-3 text-sm">
         <p className="font-semibold text-slate-700">
        前回との差分
       </p>

      <p className="mt-1 text-slate-600">
        前回 {scoreDiff.previousScore}点 → 今回 {scoreDiff.latestScore}点
        <span
          className={
            scoreDiff.diff > 0
              ? "ml-2 font-bold text-red-600"
              : scoreDiff.diff < 0
              ? "ml-2 font-bold text-emerald-600"
              : "ml-2 font-bold text-slate-600"
          }
        >
          {scoreDiff.diff > 0 ? `+${scoreDiff.diff}点` : `${scoreDiff.diff}点`}
          ・{scoreDiff.trend}
        </span>
      </p>
    </div>
  )}
</div>
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

      <div className="mt-6">
        <h3 className="mb-3 font-bold">点検タイムライン</h3>

        <div className="space-y-3">
          {property.inspections.map((item: any, idx: number) => (
            <div
              key={`${item.date}-${idx}`}
              className="flex gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4"
            >
              <div className="mt-1 h-3 w-3 rounded-full bg-slate-900" />

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold">{item.date}</span>

                  <span
                    className={`rounded-full border px-2 py-1 text-xs font-semibold ${levelClass(
                      item.level
                    )}`}
                  >
                    {item.level}
                  </span>

                  <span className="text-sm text-slate-500">
                    スコア {item.score}
                  </span>
                </div>

                <p className="mt-1 text-sm text-slate-600">{item.comment}</p>

                {item.imagePreview && (
                  <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-2">
                    <p className="mb-2 text-xs text-slate-500">
                      点検写真：{item.imageName}
                    </p>
                    <img
                      src={item.imagePreview}
                      alt="点検写真"
                      className="max-h-56 w-full rounded-xl object-cover"
                    />
                  </div>
                )}

                {!item.imagePreview && item.imageName && (
                  <p className="mt-2 text-xs text-slate-500">
                    登録写真ファイル名：{item.imageName}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
