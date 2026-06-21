const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "");
if (!API_BASE_URL) {
  console.warn("VITE_API_BASE_URL が設定されていません");
}

export async function fetchProperties() {
  const response = await fetch(`${API_BASE_URL}/properties`);

  if (!response.ok) {
    throw new Error("空き家一覧の取得に失敗しました");
  }

  return response.json();
}

export async function createProperty(property: any) {
  const response = await fetch(`${API_BASE_URL}/properties`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(property),
  });

  if (!response.ok) {
    throw new Error("空き家登録に失敗しました");
  }

  return response.json();
}

export async function createInspection(propertyId: string, inspection: any) {
  const response = await fetch(
    `${API_BASE_URL}/properties/${propertyId}/inspections`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inspection),
    }
  );

  if (!response.ok) {
    throw new Error("点検登録に失敗しました");
  }

  return response.json();
}