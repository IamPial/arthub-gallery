import { getTransactions } from "@/lib/api/transactions";
import { Table } from "@heroui/react";
import { format } from "date-fns";
import { FiTrendingDown } from "react-icons/fi";

export const metadata = {
  title: "Dashboard - Sales History",
  description:
    "ArtHub is a digital platform that connects art lovers, collectors, and buyers with talented artists.",
};


const SalesHistoryPage = async () => {
  const sales = await getTransactions("artist");

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-wide">
          Sales History
        </h1>
        <p className="text-sm text-slate-400">
          Track and view all your sold artworks and earnings
        </p>
      </div>

      <Table className="bg-[#1a163a]/40 border border-white/5 rounded-2xl">
        <Table.ScrollContainer className="rounded-2xl">
          <Table.Content aria-label="Artist sales history table">
            <Table.Header className="bg-[#131129] border-b border-white/5">
              <Table.Column
                isRowHeader
                className="text-slate-400 font-semibold text-xs uppercase tracking-wider py-3 px-4"
              >
                ARTWORK TITLE
              </Table.Column>
              <Table.Column className="text-slate-400 font-semibold text-xs uppercase tracking-wider py-3 px-4">
                BUYER NAME
              </Table.Column>
              <Table.Column className="text-slate-400 font-semibold text-xs uppercase tracking-wider py-3 px-4">
                PURCHASE DATE
              </Table.Column>
              <Table.Column className="text-slate-400 font-semibold text-xs uppercase tracking-wider py-3 px-4 text-right">
                AMOUNT
              </Table.Column>
            </Table.Header>
            <Table.Body>
              {sales.length === 0 ? (
                <Table.Row className="hover:bg-transparent data-[hover=true]:bg-transparent">
                  <Table.Cell colSpan={4} className="py-24 text-center">
                    <div className="flex flex-col items-center justify-center gap-4 max-w-sm mx-auto">
                      <div className="w-16 h-16 bg-[#6f4ff2]/5 border border-[#6f4ff2]/10 rounded-2xl flex items-center justify-center text-[#6f4ff2] shadow-lg shadow-[#6f4ff2]/5 animate-pulse">
                        <FiTrendingDown size={28} />
                      </div>

                      <div className="flex flex-col gap-1">
                        <h3 className="text-base font-semibold text-white tracking-wide">
                          No Sales Recorded Yet
                        </h3>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          You haven&apos;t sold any artworks yet. Once a buyer
                          purchases your artworks, the transaction breakdown
                          will appear here!
                        </p>
                      </div>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ) : (
                sales.map((sale) => (
                  <Table.Row
                    key={sale?._id}
                    className="hover:bg-white/[0.02] border-b border-white/[0.04] last:border-b-0 transition-colors"
                  >
                    <Table.Cell className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <span className="text-white font-medium text-sm">
                          {sale?.title}
                        </span>
                      </div>
                    </Table.Cell>
                    <Table.Cell className="py-4 px-4">
                      <span className="text-slate-300 text-sm">
                        {sale?.buyerName.split(" ")[0]}
                      </span>
                    </Table.Cell>
                    <Table.Cell className="py-4 px-4">
                      <span className="text-slate-400 text-sm">
                        {format(new Date(sale?.purchaseDate), "MMM dd , yyyy")}{" "}
                        at {format(new Date(sale?.purchaseDate), "hh:mm a")}
                      </span>
                    </Table.Cell>
                    <Table.Cell className="py-4 px-4 text-right">
                      <span className="text-[#6f4ff2] font-bold text-sm">
                        ${sale?.price}
                      </span>
                    </Table.Cell>
                  </Table.Row>
                ))
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
};
export default SalesHistoryPage;
