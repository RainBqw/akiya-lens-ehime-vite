import { AlertTriangle, ArrowUpRight } from "lucide-react";
import { levelClass } from "@/lib/riskScore";

type HighRiskListProps = {
  properties: any[];
  onSelect: (propertyId: string) => void;
};

export function HighRiskList({ properties, onSelect }: HighRiskListProps) {
  const top3 = [...properties]
    .sort((a, b) => b.currentRiskScore - a.currentRiskScore)
    .slice(0, 3);

  return (
    <section className="mt-6 rounded-2xl bg-white p-5 shadow-sm border border-slate-100">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold">高リスク空き家トップ3</h2>
          <p className="text-sm text-slate-500">
            限られた巡回人員で優先確認すべき物件を表示します
          </p>
        </div>

        <div className="rounded-2xl bg-red-50 p-3 text-red-600">
          <AlertTriangle className="h-5 w-5" />
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {top3.map((property, index) => (
          <button
            key={property.propertyId}
            onClick={() => onSelect(property.propertyId)}
            className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-left transition hover:border-slate-300 hover:bg-white hover:shadow-sm"
          >
            <div className="mb-3 flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400">
                  PRIORITY {index + 1}
                </p>
                <p className="mt-1 font-bold text-slate-900">
                  {property.propertyId} / {property.city}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {property.area}・{property.buildingType}
                </p>
              </div>

              <ArrowUpRight className="h-4 w-4 text-slate-400" />
            </div>

            <div className="flex items-center justify-between">
              <span
                className={`rounded-full border px-2 py-1 text-xs font-semibold ${levelClass(
                  property.riskLevel
                )}`}
              >
                {property.riskLevel}
              </span>

              <span className="text-2xl font-bold text-slate-900">
                {property.currentRiskScore}
              </span>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              最終点検：{property.lastInspectionAt}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}