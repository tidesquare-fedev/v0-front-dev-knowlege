"use client";

import { useEffect, useState } from "react";
import { fetchMarketingSheetData } from "../actions";
import PromotionCard from "./PromotionCard";

interface SheetDataType {
  name: string;
  price: string;
  imageUrl: string;
  discount?: string;
  originalPrice?: string;
}

const fetchSheetData = async (
  documentId: string,
  sheetName: string,
  cellStart: string,
  cellEnd: string
): Promise<SheetDataType[]> => {
  try {
    const data = await fetchMarketingSheetData(
      documentId,
      sheetName,
      cellStart,
      cellEnd
    );
    // 첫 번째 행은 컬럼명이므로 제외하고 객체로 매핑
    return data.slice(1).map((row: string[]) => ({
      name: row[0] || "",
      price: row[1] || "",
      imageUrl: row[2] || "",
      discount: row[3] || undefined,
      originalPrice: row[4] || undefined,
    }));
  } catch (error) {
    console.error("데이터 로드 실패:", error);
    return [];
  }
};

interface PromotionSectionProps {
  title: string;
  documentId: string;
  sheetName: string;
  cellStart?: string;
  cellEnd?: string;
  className?: string;
}

export default function PromotionSection({
  title,
  documentId,
  sheetName,
  cellStart = "A",
  cellEnd = "E",
  className = "",
}: PromotionSectionProps) {
  const [sheetData, setSheetData] = useState<SheetDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const data = await fetchSheetData(documentId, sheetName, cellStart, cellEnd);
      setSheetData(data);
      setIsLoading(false);
    };

    loadData();
  }, [documentId, sheetName, cellStart, cellEnd]);

  if (isLoading) {
    return (
      <section className={`py-8 ${className}`}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-black text-center mb-8 text-gray-900 drop-shadow-sm">{title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-200 rounded-lg h-80 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (sheetData.length === 0) {
    return (
      <section className={`py-8 ${className}`}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-black text-center mb-8 text-gray-900 drop-shadow-sm">{title}</h2>
          <div className="text-center text-gray-500">
            데이터를 불러올 수 없습니다.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-8 ${className}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-black text-center mb-8 text-gray-900 drop-shadow-sm">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sheetData.map((item, index) => (
            <PromotionCard
              key={index}
              name={item.name}
              price={item.price}
              imageUrl={item.imageUrl}
              discount={item.discount}
              originalPrice={item.originalPrice}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
