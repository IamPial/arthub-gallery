import DeleteArtworksModal from "@/components/dashboard/artist/DeleteArtworksModal";
import { getTransactions } from "@/lib/api/transactions";
import { Table, Button } from "@heroui/react";
import { FiTrash2 } from "react-icons/fi";

const AdminManageAllArtworksPage = async () => {
  const artworks = await getTransactions("admin");

  return (
    <Table className=" text-slate-400 font-bold text-slate-300  bg-[#1a163a]/40 border border-white/5 rounded-2xl">
      <Table.ScrollContainer>
        <Table.Content aria-label="Manage Artworks Table">
          <Table.Header
            className={"uppercase bg-[#131129] border-b border-white/5"}
          >
            <Table.Column isRowHeader className="text-left">
              Artwork Title
            </Table.Column>
            <Table.Column className="text-left">Artist Name</Table.Column>
            <Table.Column className="text-left">Price</Table.Column>
            <Table.Column className="text-right">Actions</Table.Column>
          </Table.Header>
          <Table.Body>
            {artworks.map((art) => (
              <Table.Row
                key={art?._id}
                className="border-b border-white/[0.02] hover:bg-white/[0.01] transition-colors"
              >
                <Table.Cell className="font-semibold text-white">
                  {art?.title}
                </Table.Cell>
                <Table.Cell className="text-slate-400">
                  {art?.artistName}
                </Table.Cell>
                <Table.Cell className="font-bold text-emerald-400">
                  ${art?.price}
                </Table.Cell>
                <Table.Cell className="text-right">
                  <DeleteArtworksModal artWork={art} />
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

export default AdminManageAllArtworksPage;
