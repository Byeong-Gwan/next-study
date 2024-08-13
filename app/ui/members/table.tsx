import Image from 'next/image';
import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';
import InvoiceStatus from '@/app/ui/invoices/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredInvoices, fetchFilteredMembers, fetchMembersPages } from '@/app/lib/data';

// app/ui/invoices/table.tsx
interface Members {
  employee_id: string;
  name: string;
  team: string;
  position: string;
  position_nm: string;
}

interface Props {
  data: Members[];
}

export default async function Table({  query, currentPage
                              }: {
  query: string;
  currentPage: number;
})  {

  const data = await fetchFilteredMembers(query, currentPage);
  if (!data.data?.length) return <div>No members found</div>;

  return (
  <div className="mt-6 flow-root">
    <div className="inline-block min-w-full align-middle">
      <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
        <div className="md:hidden">
          {data.data?.map((member) => (
            <div
              key={member.employee_id}
              className="mb-2 w-full rounded-md bg-white p-4"
            >
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <div className="mb-2 flex items-center">

                    <p>{member.name}</p>
                  </div>
                  <p className="text-sm text-gray-500">{member.team}</p>
                </div>
                <p className="text-sm text-gray-500">{member.position}</p>
              </div>
              <div className="flex w-full items-center justify-between pt-4">
                <div>
                  <p className="text-xl font-medium">
                    {member.position}
                  </p>
                  <p>Employee ID: {member.employee_id}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <table className="hidden min-w-full text-gray-900 md:table">
          <thead className="rounded-lg text-left text-sm font-normal">
          <tr>
            <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
              Name
            </th>
            <th scope="col" className="px-3 py-5 font-medium">
              Team
            </th>
            <th scope="col" className="px-3 py-5 font-medium">
              Position
            </th>
            <th scope="col" className="px-3 py-5 font-medium">
              Employee ID
            </th>
            <th scope="col" className="relative py-3 pl-6 pr-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
          </thead>
          <tbody className="bg-white">
            {data.data?.map((member) => (
              <tr
                key={member.employee_id}
                className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
              >
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  <div className="flex items-center gap-3">

                    <p>{member.name}</p>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  {member.team}
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  {member.position}
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  {member.employee_id}
                </td>
                <td className="flex justify-end gap-2 whitespace-nowrap px-6 py-4 text-sm">
                  <UpdateInvoice id={member.employee_id}/>
                  <DeleteInvoice id={member.employee_id}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  );
}
