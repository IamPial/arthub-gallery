import { getTransactions } from "@/lib/api/transactions";
import { Table } from "@heroui/react";
import { format } from "date-fns";

const PurchaseHistoryPage = async () => {

  const purchaseData = await getTransactions("buyer");

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold tracking-wide text-white">
        Purchase History
      </h2>

      <Table className="bg-[#161233]/80 backdrop-blur-md rounded-2xl border border-white/[0.04]">
        <Table.ScrollContainer>
          <Table.Content aria-label="Purchase history table">
            <Table.Header>
              <Table.Column
                isRowHeader
                className="bg-[#110d2c] text-slate-400 font-semibold py-4 border-b border-white/[0.04]"
              >
                ITEM LIST
              </Table.Column>
              <Table.Column className="bg-[#110d2c] text-slate-400 font-semibold py-4 border-b border-white/[0.04]">
                ARTIST
              </Table.Column>
              <Table.Column className="bg-[#110d2c] text-slate-400 font-semibold py-4 border-b border-white/[0.04]">
                PRICE
              </Table.Column>
              <Table.Column className="bg-[#110d2c] text-slate-400 font-semibold py-4 border-b border-white/[0.04]">
                PURCHASE DATE
              </Table.Column>
            </Table.Header>

            <Table.Body>
              {purchaseData.map((items) => {
                return (
                  <Table.Row
                    key={items?._id}
                    className="border-b border-white/[0.02]  hover:bg-white/[0.02] transition-colors"
                  >
                    <Table.Cell className="font-semibold bg-[#1d1932]  text-white  py-4">
                      {items?.title}
                    </Table.Cell>
                    <Table.Cell className="text-slate-400 bg-[#1d1932] py-4">
                      {items?.artistName}
                    </Table.Cell>
                    <Table.Cell className="text-[#8b5cf6]  bg-[#1d1932] font-bold py-4">
                      ${items?.price}
                    </Table.Cell>
                    <Table.Cell className="text-slate-400  bg-[#1d1932] py-4">
                      {format(new Date(items?.purchaseDate), "MMM dd , yyyy")}
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
};

export default PurchaseHistoryPage;
