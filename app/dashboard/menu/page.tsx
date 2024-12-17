// app/pages/customers.tsx


"use client"; // 클라이언트 사이드 컴포넌트로 지정

import { useState } from "react";
import { fetchCoffeeData } from '@/app/lib/data';
import Table from '@/app/ui/customers/table';

// 임의 커피 데이터 생성 (최소 20개)
const coffeeData = [
  { id: 1, name: 'Iced Americano', description: 'Cold brew coffee with ice' },
  { id: 2, name: 'Cafe Latte', description: 'Espresso with steamed milk' },
  { id: 3, name: 'Cappuccino', description: 'Espresso, steamed milk, and foam' },
  { id: 4, name: 'Espresso', description: 'Strong and black coffee' },
  { id: 5, name: 'Flat White', description: 'Espresso with steamed milk, less foam' },
  { id: 6, name: 'Mocha', description: 'Espresso with chocolate syrup and milk' },
  { id: 7, name: 'Macchiato', description: 'Espresso with a small amount of foamed milk' },
  { id: 8, name: 'Affogato', description: 'Espresso poured over a scoop of vanilla ice cream' },
  { id: 9, name: 'Irish Coffee', description: 'Coffee with whiskey, sugar, and cream' },
  { id: 10, name: 'Cold Brew', description: 'Coffee brewed slowly in cold water' },
  { id: 11, name: 'Nitro Cold Brew', description: 'Cold brew infused with nitrogen' },
  { id: 12, name: 'Caramel Macchiato', description: 'Espresso with caramel syrup and steamed milk' },
  { id: 13, name: 'Turkish Coffee', description: 'Coffee brewed with finely ground coffee beans' },
  { id: 14, name: 'Café Mocha', description: 'Espresso with chocolate and steamed milk' },
  { id: 15, name: 'Iced Latte', description: 'Espresso with cold milk and ice' },
  { id: 16, name: 'Vanilla Latte', description: 'Espresso with vanilla syrup and steamed milk' },
  { id: 17, name: 'Honey Latte', description: 'Espresso with honey and steamed milk' },
  { id: 18, name: 'Pumpkin Spice Latte', description: 'Espresso with pumpkin spice and steamed milk' },
  { id: 19, name: 'Coconut Latte', description: 'Espresso with coconut milk and syrup' },
  { id: 20, name: 'Matcha Latte', description: 'Green tea with steamed milk' },
  { id: 21, name: 'Chai Latte', description: 'Spiced tea with steamed milk' },
  { id: 22, name: 'Peach Iced Tea', description: 'Iced tea with peach flavor' },
];

// 페이지네이션: 한 페이지에 표시할 커피 리스트 항목 수
const ITEMS_PER_PAGE = 5;


export default function Page() {

  const [currentPage, setCurrentPage] = useState(1);

  // 현재 페이지에 해당하는 커피 리스트 항목을 추출
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCoffees = coffeeData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(coffeeData.length / ITEMS_PER_PAGE);

  // 페이지 변경 함수
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
      <div className="p-6">
        {/* 커피 리스트 */}
        <h2 className="text-2xl mb-6">Coffee Menu</h2>
        <ul>
          {currentCoffees.map((coffee) => (
              <li key={coffee.id} className="border-b py-4">
                <h3 className="text-xl font-semibold">{coffee.name}</h3>
                <p className="text-gray-500">{coffee.description}</p>
              </li>
          ))}
        </ul>

        {/* 페이지네이션 */}
        <div className="mt-6 flex justify-center">
          <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-l-lg"
          >
            Prev
          </button>
          <span className="px-4 py-2 text-lg">
          Page {currentPage} of {totalPages}
        </span>
          <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-r-lg"
          >
            Next
          </button>
        </div>
      </div>
  );
}
