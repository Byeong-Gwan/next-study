import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/members/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchFilteredMembers, fetchInvoicesPages, fetchMembersPages } from '@/app/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Member List',
};

export default async function Page({
                                     searchParams,
                                   }: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  // const totalPages = await fetchMembersPages(query,currentPage);

  const data = await
    fetchMembersPages();

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
        <Pagination totalPages={data.totalPages} />
      </div>
    </div>
  );
}
//
// import { useState, useEffect } from 'react';
// import Pagination from '@/app/ui/invoices/pagination';
// import Search from '@/app/ui/search';
// import Table from '@/app/ui/invoices/table';
// import { CreateInvoice } from '@/app/ui/invoices/buttons';
// import { lusitana } from '@/app/ui/fonts';
// import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
//
// export default function MembersPage() {
//   const [members, setMembers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [query, setQuery] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//
//   useEffect(() => {
//     setLoading(true);
//
//       .then((data) => {
//         setMembers(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching members:', error);
//         setLoading(false);
//       });
//   }, [query, currentPage]);
//
//   return (
//     <div className="w-full">
//       <div className="flex w-full items-center justify-between">
//         <h1 className={`${lusitana.className} text-2xl`}>Members List</h1>
//       </div>
//       <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
//         <Search placeholder="Search members..." onSearch={setQuery} />
//         <CreateInvoice />
//       </div>
//       {loading ? (
//         <InvoicesTableSkeleton />
//       ) : (
//         <Table data={members} />
//       )}
//       <div className="mt-5 flex w-full justify-center">
//         <Pagination currentPage={currentPage} onPageChange={setCurrentPage} />
//       </div>
//     </div>
//   );
// }
//
// async function fetchFilteredMembers(query: string, currentPage: number) {
//   try {
//     const response = await fetch(`http://localhost:4000/api/members?query=${query}&page=${currentPage}`);
//     if (!response.ok) {
//       throw new Error('Failed to fetch members');
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching members:', error);
//     throw new Error('Failed to fetch members');
//   }
// }
