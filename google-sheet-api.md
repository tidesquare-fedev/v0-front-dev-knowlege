# 타이드스퀘어 구글 시트 API 사용 코드 작성 가이드

- 구글 시트 데이터에 접근할 때는 구글 클라우드의 구글 시트 API를 직접 사용하지 않고 투어비스의 다음 API를 통해서 접근해야 합니다.
  > - https://tourvis.com/api/marketing-sheet/{documentId}/values/{sheetName}!{cellStart}:{cellEnd}
- API 접근을 위해서는 JWT(Json Web Token)가 필요합니다.
- Authorization 헤더에 `Bearer {JWT}` 를 포함시켜야 합니다.
- Authorization 헤더는 브라우저에 노출되면 안됩니다. 서버에서 API fetch를 해야 합니다.
- Next.js에서는 Server Action을 사용하면 간단하게 서버에서 API fetch를 할 수 있습니다.

- 투어비스 및 프리비아의 프로모션 또는 크로스셀 페이지를 v0를 이용하여 개발할 때 아래의 예제 코드를 참고해서 작성합니다.

> `actions.ts`

```typescript
"use server";

export async function fetchMarketingSheetData(
  documentId: string,
  sheetName: string,
  cellStart: string,
  cellEnd: string
) {
  const response = await fetch(
    `https://tourvis.com/api/marketing-sheet/${documentId}/values/${sheetName}!${cellStart}:${cellEnd}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );
  const data = (await response.json()) as { data: string[][] };
  return data.data;
}
```

> `component-using-sheet.tsx`

```tsx
"use client";

import { useEffect, useState } from "react";
import { fetchMarketingSheetData } from "./actions";

interface SheetDataType1 {
  name: string;
  price: string;
  imageUrl: string;
}
interface SheetDataType2 {
  name: string;
  price: string;
  imageUrl: string;
}
interface SheetDataType3 {
  name: string;
  price: string;
  imageUrl: string;
}
interface SheetDataType4 {
  name: string;
  price: string;
  imageUrl: string;
}

const fetchSheetData1 = async (): Promise<SheetDataType1[]> => {
  try {
    const data = await fetchMarketingSheetData(
      "documentId1",
      "sheetName1",
      "A",
      "C"
    );
    // 첫 번째 행은 컬럼명이므로 제외하고 객체로 매핑
    return data.slice(1).map((row: string[]) => ({
      name: row[0] || "",
      price: row[1] || "",
      imageUrl: row[2] || "",
    }));
  } catch (error) {
    console.error('데이터 로드 실패:', error);
    return [];
  }
};

const fetchSheetData2 = async (): Promise<SheetDataType2[]> => {
  try {
    const data = await fetchMarketingSheetData(
      "documentId1",
      "sheetName2",
      "A",
      "C"
    );
    // 첫번째 row는 컬럼명이므로 제외하고 객체로 매핑한다.
    return data.slice(1).map((row: string[]) => ({
      name: row[0] || "",
      price: row[1] || "",
      imageUrl: row[2] || "",
    }));
  } catch (error) {
    console.error('데이터 로드 실패:', error);
    return [];
  }
};

const fetchSheetData3 = async (): Promise<SheetDataType3[]> => {
  try {
    const data = await fetchMarketingSheetData(
      "documentId1",
      "sheetName3",
      "A",
      "C"
    );
    // 첫번째 row는 컬럼명이므로 제외하고 객체로 매핑한다.
    return data.slice(1).map((row: string[]) => ({
      name: row[0] || "",
      price: row[1] || "",
      imageUrl: row[2] || "",
    }));
  } catch (error) {
    console.error('데이터 로드 실패:', error);
    return [];
  }
};

const fetchSheetData4 = async (): Promise<SheetDataType4[]> => {
  try {
    const data = await fetchMarketingSheetData(
      "documentId1",
      "sheetName4",
      "A",
      "C"
    );
    // 첫번째 row는 컬럼명이므로 제외하고 객체로 매핑한다.
    return data.slice(1).map((row: string[]) => ({
      name: row[0] || "",
      price: row[1] || "",
      imageUrl: row[2] || "",
    }));
  } catch (error) {
    console.error('데이터 로드 실패:', error);
    return [];
  }
};

export default function ComponentUsingSheet() {
  const [sheetData1, setSheetData1] = useState<SheetDataType1[]>([]);
  const [sheetData2, setSheetData2] = useState<SheetDataType2[]>([]);
  const [sheetData3, setSheetData3] = useState<SheetDataType3[]>([]);
  const [sheetData4, setSheetData4] = useState<SheetDataType4[]>([]);
  const [isFirstDataLoadComplete, setIsFirstDataLoadComplete] = useState(false);

  // 화면에 가장 먼저 노출되는 부분 데이터 로드
  useEffect(() => {
    const loadFirst = async () => {
      const [data1, data2] = await Promise.all([
        fetchSheetData1(),
        fetchSheetData2(),
      ]);
      setIsFirstDataLoadComplete(true);
      setSheetData1(data1);
      setSheetData2(data2);
    };

    loadFirst();
  }, []);

  // 화면 스크롤 후에 노출되는 부분 데이터 로드
  useEffect(() => {
    // 먼저 로드할 데이터의 로딩이 완료되지 않으면 실행하지 않음.
    if (!isFirstDataLoadComplete) return;

    const loadLazy = async () => {
      const [data1, data2] = await Promise.all([
        fetchSheetData3(),
        fetchSheetData4(),
      ]);
      setSheetData3(data1);
      setSheetData4(data2);
    };

    loadLazy();
  }, [isFirstDataLoadComplete]);

  return (
    <div>
      <div>
        {sheetData1.map((item, index) => (
          <div key={index}>
            <div>{item.name}</div>
            <div>{item.price}</div>
            <img src={item.imageUrl} />
          </div>
        ))}
      </div>
      <div>
        {sheetData2.map((item, index) => (
          <div key={index}>
            <div>{item.name}</div>
            <div>{item.price}</div>
            <img src={item.imageUrl} />
          </div>
        ))}
      </div>
      <div>
        {sheetData3.map((item, index) => (
          <div key={index}>
            <div>{item.name}</div>
            <div>{item.price}</div>
            <img src={item.imageUrl} />
          </div>
        ))}
      </div>
      <div>
        {sheetData4.map((item, index) => (
          <div key={index}>
            <div>{item.name}</div>
            <div>{item.price}</div>
            <img src={item.imageUrl} />
          </div>
        ))}
      </div>
    </div>
  );
}
