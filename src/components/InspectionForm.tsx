import { useRef } from "react";
import { Camera, FileText, Plus } from "lucide-react";
import { levelClass } from "@/lib/riskScore";

type InspectionFormProps = {
  form: any;
  preview: {
    score: number;
    level: string;
  };
  onFormChange: (form: any) => void;
  onSubmit: () => void;
};

export function InspectionForm({
  form,
  preview,
  onFormChange,
  onSubmit,
}: InspectionFormProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const items = [
    ["roofDamage", "屋根破損あり +25"],
    ["wallDamage", "外壁破損あり +15"],
    ["overgrown", "雑草が多い +15"],
    ["roadImpact", "道路にはみ出し +10"],
    ["garbage", "ごみあり +10"],
    ["worseThanBefore", "前回より悪化 +10"],
    ["notInspectedLong", "60日以上未点検 +5"],
  ];

  const handleImageSelect = (file: File | undefined) => {
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    onFormChange({
      ...form,
      imagePreview: imageUrl,
      imageName: file.name,
    });
  };

  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold">点検登録デモ</h2>
          <p className="text-sm text-slate-500">
            写真とチェック項目からリスクスコアを自動計算します
          </p>
        </div>

        <div className="flex gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageSelect(e.target.files?.[0])}
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            <Camera className="mr-1 inline h-4 w-4" />
            写真
          </button>

          <button
            type="button"
            className="rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600"
          >
            <FileText className="mr-1 inline h-4 w-4" />
            レポート
          </button>
        </div>
      </div>

      {form.imagePreview && (
        <div className="mb-4 rounded-2xl border border-slate-200 bg-slate-50 p-3">
          <p className="mb-2 text-sm font-semibold text-slate-700">
            選択中の写真：{form.imageName}
          </p>
          <img
            src={form.imagePreview}
            alt="点検写真プレビュー"
            className="max-h-64 w-full rounded-xl object-cover"
          />
        </div>
      )}

      <div className="grid gap-3 md:grid-cols-2">
        {items.map(([key, label]) => (
          <label
            key={key}
            className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3 text-sm"
          >
            <input
              type="checkbox"
              checked={form[key]}
              onChange={(e) =>
                onFormChange({
                  ...form,
                  [key]: e.target.checked,
                })
              }
              className="h-4 w-4"
            />
            {label}
          </label>
        ))}
      </div>

      <textarea
        value={form.comment}
        onChange={(e) =>
          onFormChange({
            ...form,
            comment: e.target.value,
          })
        }
        placeholder="点検コメント例：道路側に枝が張り出している"
        className="mt-4 min-h-24 w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm outline-none focus:border-slate-900"
      />

      <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="rounded-2xl bg-slate-50 p-4">
          <span className="text-sm text-slate-500">計算結果</span>
          <span className="ml-3 text-2xl font-bold">{preview.score}</span>
          <span
            className={`ml-3 rounded-full border px-2 py-1 text-xs font-semibold ${levelClass(
              preview.level
            )}`}
          >
            {preview.level}
          </span>
        </div>

        <button
          onClick={onSubmit}
          className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-slate-700"
        >
          <Plus className="mr-2 inline h-4 w-4" />
          この点検を登録
        </button>
      </div>
    </section>
  );
}