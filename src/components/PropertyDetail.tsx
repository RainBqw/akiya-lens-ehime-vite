import { levelClass } from "@/lib/riskScore";

type PropertyDetailProps = {
  property: any;
};

export function PropertyDetail({ property }: PropertyDetailProps) {
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}