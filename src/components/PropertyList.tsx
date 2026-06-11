import { Search } from "lucide-react";
import { levelClass } from "@/lib/riskScore";

type PropertyListProps = {
  properties: any[];
  selectedId: string;
  query: string;
  onQueryChange: (value: string) => void;
  onSelect: (propertyId: string) => void;
};

export function PropertyList({
  properties,
  selectedId,
  query,
  onQueryChange,
  onSelect,
}: PropertyListProps) {
  return (
    <div className="lg:col-span-2 rounded-2xl bg-white p-5 shadow-sm border border-slate-100">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">空き家一覧</h2>
        <span className="text-xs text-slate-500">リスク高い順</span>
      </div>

      <div className="mb-4 flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
        <Search className="h-4 w-4 text-slate-400" />
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="市町・ID・リスクで検索"
          className="w-full bg-transparent text-sm outline-none"
        />
      </div>

      <div className="space-y-3">
        {properties.map((p) => (
          <button
            key={p.propertyId}
            onClick={() => onSelect(p.propertyId)}
            className={`w-full rounded-2xl border p-4 text-left transition hover:shadow-sm ${
              selectedId === p.propertyId
                ? "border-slate-900 bg-slate-50"
                : "border-slate-100 bg-white"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-bold">
                  {p.propertyId} / {p.city}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {p.area}・{p.buildingType}
                </p>
              </div>

              <span
                className={`rounded-full border px-2 py-1 text-xs font-semibold ${levelClass(
                  p.riskLevel
                )}`}
              >
                {p.riskLevel}
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between text-sm">
              <span>
                スコア <b className="text-lg">{p.currentRiskScore}</b>
              </span>
              <span className="text-slate-500">
                最終点検 {p.lastInspectionAt}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}