"use server";

export async function fetchMarketingSheetData(
  documentId: string,
  sheetName: string,
  cellStart: string,
  cellEnd: string
) {
  const reqUrl = `https://tourvis.com/api/marketing-sheet/${documentId}/values/${sheetName}!${cellStart}:${cellEnd}`;
  console.log(reqUrl);
  console.log(process.env.API_KEY);
  const response = await fetch(reqUrl, {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
      "Content-Type": "application/json",
    },
  });
  if (response) {
    if (response.ok) {
      const data = await response.json();
      return data.data as string[][];
    } else {
      const errorText = await response.text();
      throw new Error(`response status ${response.status}, text ${errorText}`);
    }
  } else {
    throw new Error("response is null");
  }
}
