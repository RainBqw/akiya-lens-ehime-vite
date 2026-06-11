
// @ts-nocheck
import { initialProperties } from "@/data/sampleProperties";
import { calculateRiskScore, levelClass } from "@/lib/riskScore";


import React, { useMemo, useState } from "react";
import { Home, AlertTriangle, ClipboardCheck, ArrowUpRight, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import { StatCard } from "@/components/StatCard";
import { PropertyList } from "@/components/PropertyList";
import { PropertyDetail } from "@/components/PropertyDetail";
import { InspectionForm } from "@/components/InspectionForm";
import { HighRiskList } from "@/components/HighRiskList";
import { ReportPreview } from "@/components/ReportPreview";



export default function App() {
  const [properties, setProperties] = useState(initialProperties);
  const [selectedId, setSelectedId] = useState("P002");
  const [query, setQuery] = useState("");
  const [form, setForm] = useState({
    roofDamage: false,
    wallDamage: false,
    overgrown: false,
    roadImpact: false,
    garbage: false,
    worseThanBefore: false,
    notInspectedLong: false,
    comment: "",
    imagePreview: "",
    imageName: ""
  });

  const sorted = useMemo(() => {
    return [...properties]
      .filter((p) => `${p.propertyId} ${p.city} ${p.area} ${p.riskLevel}`.includes(query))
      .sort((a, b) => b.currentRiskScore - a.currentRiskScore);
  }, [properties, query]);

  const selected = properties.find((p) => p.propertyId === selectedId) || properties[0];
  const emergencyCount = properties.filter((p) => p.riskLevel === "緊急確認").length;
  const actionCount = properties.filter((p) => p.riskLevel === "要対応").length;
  const avgScore = Math.round(properties.reduce((sum, p) => sum + p.currentRiskScore, 0) / properties.length);

  const preview = calculateRiskScore(form);

  const submitInspection = () => {
    const result = calculateRiskScore(form);
    const today = new Date().toISOString().slice(0, 10);
    setProperties((prev) =>
      prev.map((p) => {
        if (p.propertyId !== selected.propertyId) return p;
        return {
          ...p,
          currentRiskScore: result.score,
          riskLevel: result.level,
          lastInspectionAt: today,
          status: result.score >= 60 ? "未対応" : "経過観察",
          inspections: [
            ...p.inspections,
            {
              date: today,
              score: result.score,
              level: result.level,
              comment: form.comment || "点検フォームから登録された記録。",
              imagePreview: form.imagePreview,
              imageName: form.imageName

            }
          ]
        };
      })
    );
  setForm({
    roofDamage: false,
    wallDamage: false,
    overgrown: false,
    roadImpact: false,
    garbage: false,
    worseThanBefore: false,
    notInspectedLong: false,
    comment: "",
    imagePreview: "",
    imageName: ""
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-slate-900 p-2 text-white">
              <Home className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Akiya Lens Ehime</h1>
              <p className="text-xs text-slate-500">空き家リスク診断・巡回支援プロトタイプ</p>
            </div>
          </div>
          <button className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-700">
            デモ用管理者
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-6">
        <section className="grid gap-4 md:grid-cols-4">
          <StatCard icon={Home} label="登録空き家数" value={properties.length} tone="bg-blue-50 text-blue-600" />
          <StatCard icon={AlertTriangle} label="緊急確認" value={emergencyCount} tone="bg-red-50 text-red-600" />
          <StatCard icon={ClipboardCheck} label="要対応" value={actionCount} tone="bg-orange-50 text-orange-600" />
          <StatCard icon={BarChart3} label="平均リスク" value={avgScore} tone="bg-emerald-50 text-emerald-600" />
        </section>

        <HighRiskList
          properties={properties}
          onSelect={setSelectedId}
        />

        <section className="mt-6 grid gap-6 lg:grid-cols-5">
          <PropertyList
        properties={sorted}
        selectedId={selectedId}
        query={query}
        onQueryChange={setQuery}
        onSelect={setSelectedId}
        />

          <div className="lg:col-span-3 space-y-6">
            <PropertyDetail property={selected} />

            <InspectionForm
             form={form}
             preview={preview}
             onFormChange={setForm}
              onSubmit={submitInspection}
              />

              <ReportPreview property={selected} />

            <section className="rounded-2xl bg-slate-900 p-5 text-white shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold">U-22向けアピール</h2>
                  <p className="mt-1 text-sm text-slate-300">単発の通報ではなく、空き家ごとの点検履歴をカルテ化し、限られた人員で優先対応できる仕組みです。</p>
                </div>
                <ArrowUpRight className="h-8 w-8 text-slate-300" />
              </div>
            </section>
          </div>
        </section>
      </main>
    </div>
  );
}
