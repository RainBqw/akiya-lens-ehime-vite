import { Plus, X } from "lucide-react";
import { useState } from "react";

type AddPropertyFormProps = {
  onAdd: (property: any) => void;
};

export function AddPropertyForm({ onAdd }: AddPropertyFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [buildingType, setBuildingType] = useState("木造戸建て");
  const [ownerStatus, setOwnerStatus] = useState("所有者確認中");
  const [status, setStatus] = useState("経過観察");

  const handleSubmit = () => {
    if (!city.trim() || !area.trim()) {
      alert("市町名とエリアを入力してください");
      return;
    }

    const now = new Date().toISOString().slice(0, 10);

    const newProperty = {
      propertyId: `P${Date.now().toString().slice(-4)}`,
      city,
      area,
      buildingType,
      ownerStatus,
      status,
      currentRiskScore: 0,
      riskLevel: "低リスク",
      lastInspectionAt: now,
      inspections: [
        {
          date: now,
          score: 0,
          level: "低リスク",
          comment: "新規登録された空き家です。初回点検は未実施です。",
        },
      ],
    };

    onAdd(newProperty);

    setCity("");
    setArea("");
    setBuildingType("木造戸建て");
    setOwnerStatus("所有者確認中");
    setStatus("経過観察");
    setIsOpen(false);
  };

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold">空き家の新規登録</h2>
          <p className="text-sm text-slate-500">
            管理対象の空き家を追加します
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-slate-700"
        >
          {isOpen ? (
            <>
              <X className="mr-1 inline h-4 w-4" />
              閉じる
            </>
          ) : (
            <>
              <Plus className="mr-1 inline h-4 w-4" />
              空き家を追加
            </>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-slate-700">
              市町名
            </label>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="例：松山市"
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm outline-none focus:border-slate-900"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              エリア
            </label>
            <input
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="例：郊外"
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm outline-none focus:border-slate-900"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              建物種別
            </label>
            <select
              value={buildingType}
              onChange={(e) => setBuildingType(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm outline-none focus:border-slate-900"
            >
              <option>木造戸建て</option>
              <option>平屋</option>
              <option>長屋</option>
              <option>店舗兼住宅</option>
              <option>その他</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              所有者確認状況
            </label>
            <select
              value={ownerStatus}
              onChange={(e) => setOwnerStatus(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm outline-none focus:border-slate-900"
            >
              <option>所有者確認中</option>
              <option>所有者確認済み</option>
              <option>所有者不明</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              対応ステータス
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm outline-none focus:border-slate-900"
            >
              <option>経過観察</option>
              <option>未対応</option>
              <option>対応予定</option>
              <option>確認済み</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-slate-700"
            >
              登録する
            </button>
          </div>
        </div>
      )}
    </div>
  );
}