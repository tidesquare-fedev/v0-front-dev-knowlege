import PromotionSection from "./components/PromotionSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            특별한 여행 프로모션
          </h1>
          <p className="text-xl mb-8">
            구글 시트에서 실시간으로 업데이트되는 최신 할인 정보를 확인하세요
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              프로모션 보기
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              자세히 보기
            </button>
          </div>
        </div>
      </section>

      {/* 인기 상품 섹션 */}
      <PromotionSection
        title="🔥 인기 상품"
        documentId="11lBKcy33QkCyfNXo73gga8yDq9uVHw8_u2MBkojS4DI"
        sheetName="인기상품"
        cellStart="A"
        cellEnd="E"
        className="bg-white"
      />

      {/* 신규 상품 섹션 */}
      <PromotionSection
        title="✨ 신규 상품"
        documentId="11lBKcy33QkCyfNXo73gga8yDq9uVHw8_u2MBkojS4DI"
        sheetName="신규상품"
        cellStart="A"
        cellEnd="E"
        className="bg-gray-50"
      />

      {/* 할인 상품 섹션 */}
      <PromotionSection
        title="💰 할인 상품"
        documentId="11lBKcy33QkCyfNXo73gga8yDq9uVHw8_u2MBkojS4DI"
        sheetName="할인상품"
        cellStart="A"
        cellEnd="E"
        className="bg-white"
      />

      {/* 시즌 상품 섹션 */}
      <PromotionSection
        title="🌺 시즌 상품"
        documentId="11lBKcy33QkCyfNXo73gga8yDq9uVHw8_u2MBkojS4DI"
        sheetName="시즌상품"
        cellStart="A"
        cellEnd="E"
        className="bg-gray-50"
      />

      {/* 푸터 */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 타이드스퀘어. 모든 권리 보유.
          </p>
          <p className="text-gray-400 mt-2">
            구글 시트 API를 활용한 실시간 프로모션 페이지
          </p>
        </div>
      </footer>
    </main>
  );
}
