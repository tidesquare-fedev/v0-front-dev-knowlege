"use client";

interface PromotionCardProps {
  name: string;
  price: string;
  imageUrl: string;
  discount?: string;
  originalPrice?: string;
}

export default function PromotionCard({
  name,
  price,
  imageUrl,
  discount,
  originalPrice,
}: PromotionCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-48 object-cover"          
        />
        {discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
            {discount}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {name}
        </h3>
        <div className="flex items-center gap-2">
          {originalPrice && (
            <span className="text-gray-500 line-through text-sm">
              {originalPrice}
            </span>
          )}
          <span className="text-xl font-bold text-blue-600">{price}원</span>
        </div>
      </div>
    </div>
  );
}
