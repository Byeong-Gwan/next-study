/**
 * @file app.dashboard.members.page.tsx
 * @author 김병관
 * @since 2024.08.01
 * @desc next js (tea time members 조회)
 */
import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/members/table';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchFilteredMembers, fetchInvoicesPages, fetchMembersPages } from '@/app/lib/data';

export default async function Page({ searchParams }: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchFilteredMembers(query, currentPage);

  const data = await fetchMembersPages();

  return (
    <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Member List</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search members..." />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table data = {data} query={query}   currentPage={currentPage}/>
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages.totalPages} />
      </div>
    </div>
  );
}