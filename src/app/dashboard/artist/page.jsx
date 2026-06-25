import { Table, Button } from "@heroui/react";

import { FiEye } from "react-icons/fi";

import AddArtworksModal from "@/components/dashboard/artist/AddArtworksModal";
import { getArtworks } from "@/lib/api/artworks";
import DeleteArtworksModal from "@/components/dashboard/artist/DeleteArtwoksModal";
import EditArtworksModal from "@/components/dashboard/artist/EditArtworksModal";

const ManageArtworksPage = async () => {
  const artworks = await getArtworks();

  console.log(artworks);

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wide">
            Manage Artworks
          </h1>
          <p className="text-sm text-slate-400">
            View, edit, or remove your showcase blueprints
          </p>
        </div>
        <AddArtworksModal />
      </div>

      <Table className="bg-[#1a163a]/40 border border-white/5 rounded-2xl">
        <Table.ScrollContainer className="rounded-2xl">
          <Table.Content aria-label="Artist artworks table">
            <Table.Header className="bg-[#131129] border-b border-white/5">
              <Table.Column
                isRowHeader
                className="text-slate-400 font-semibold text-xs uppercase tracking-wider py-3 px-4 w-20"
              >
                # No.
              </Table.Column>
              <Table.Column className="text-slate-400 font-semibold text-xs uppercase tracking-wider py-3 px-4">
                TITLE
              </Table.Column>
              <Table.Column className="text-slate-400 font-semibold text-xs uppercase tracking-wider py-3 px-4">
                PRICE
              </Table.Column>

              <Table.Column className="text-slate-400 font-semibold text-xs uppercase tracking-wider py-3 px-4 text-center">
                ACTIONS
              </Table.Column>
            </Table.Header>
            <Table.Body>
              {artworks.map((art, index) => (
                <Table.Row
                  key={art._id}
                  className="border-b border-white/[0.04] 
                  hover:bg-white/[0.02]  transition-colors"
                >
                  <Table.Cell className="py-4 px-4">
                    <span className="text-gray-400 font-bold text-sm w-20">
                      # {index + 1}
                    </span>
                  </Table.Cell>
                  <Table.Cell className="py-4 px-4">
                    <span className="text-white font-semibold text-sm">
                      {art.title}
                    </span>
                  </Table.Cell>

                  <Table.Cell className="py-4 px-4">
                    <span className="text-[#6f4ff2] font-bold text-sm">
                      ${art.price}
                    </span>
                  </Table.Cell>

                  <Table.Cell className="py-4 px-4">
                    <div className="flex items-center justify-center gap-3">
                      <Button
                        size="sm"
                        className="bg-[#6f4ff2]/10 border border-[#6f4ff2]/20 text-[#a78bfa] hover:bg-[#6f4ff2]/20 rounded-lg transition-colors"
                      >
                        <FiEye size={14} />
                      </Button>

                      <EditArtworksModal artWork={art} />
                      <DeleteArtworksModal />
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
};
export default ManageArtworksPage;
