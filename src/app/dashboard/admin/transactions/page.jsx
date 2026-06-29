import { getAdminAllTransactions } from "@/lib/api/adminTransactions";
import { Table } from "@heroui/react";
import { format } from "date-fns";

const AdminAllTransactionPage = async () => {
  const transactions = await getAdminAllTransactions();
  return (
    <Table className="bg-[#1a163a]/40 border border-white/5 rounded-2xl">
      <Table.ScrollContainer>
        <Table.Content aria-label="Transactions Table">
          <Table.Header className="bg-[#131129] border-b border-white/5">
            <Table.Column isRowHeader className="text-left">
              Transaction ID
            </Table.Column>
            <Table.Column className="text-left">Type</Table.Column>
            <Table.Column className="text-left">User Email</Table.Column>
            <Table.Column className="text-left">Date</Table.Column>
            <Table.Column className="text-right">Amount</Table.Column>
          </Table.Header>
          <Table.Body emptyContent={"No transactions found"}>
            {transactions.map((tx) => (
              <Table.Row
                key={tx?._id}
                className="border-b border-white/[0.02] hover:bg-white/[0.01] transition-colors"
              >
                <Table.Cell className="font-mono text-xs text-slate-400 uppercase tracking-wider">
                  {tx?._id}
                </Table.Cell>
                <Table.Cell>
                  <span
                    className={`px-2 py-0.5 rounded-md text-xs font-medium border ${
                      tx?.type === "subscription"
                        ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    }`}
                  >
                    {tx?.type}
                  </span>
                </Table.Cell>
                <Table.Cell className="text-slate-300">{tx?.email}</Table.Cell>
                <Table.Cell className="text-slate-500 text-sm">
                  {tx?.date ? format(new Date(tx.date), "MMM dd, yyyy") : "N/A"}

                  {/* {format(new Date(tx?.date), "MMM dd , yyyy")} */}
                  {/* {format(new Date(sale?.purchaseDate), "MMM dd , yyyy")} */}
                </Table.Cell>
                <Table.Cell className="text-right font-black text-white">
                  ${tx?.amount}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
      <Table.Footer />
    </Table>
  );
};

export default AdminAllTransactionPage;
