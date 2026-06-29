import { Table, Button } from "@heroui/react";

import { FiEye, FiFolderMinus } from "react-icons/fi";

import AddArtworksModal from "@/components/dashboard/artist/AddArtworksModal";
import { getArtworks } from "@/lib/api/artworks";
import DeleteArtworksModal from "@/components/dashboard/artist/DeleteArtworksModal";
import EditArtworksModal from "@/components/dashboard/artist/EditArtworksModal";
import Link from "next/link";

export const metadata = {
  title: "ArtHub- Artist",
  description:
    "ArtHub is a digital platform that connects art lovers, collectors, and buyers with talented artists.",
};


const ManageArtworksPage = async () => {
  const artworks = await getArtworks();

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

      {artworks.length == 0 ? (
        <div className="flex flex-col items-center justify-center text-center p-12 bg-[#1a163a]/20 border border-dashed border-white/10 rounded-2xl min-h-[350px]">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[#6f4ff2]/10 border border-[#6f4ff2]/20 text-[#a78bfa] mb-4 shadow-lg shadow-[#6f4ff2]/5">
            <FiFolderMinus size={28} />
          </div>
          <h3 className="text-lg font-bold text-white tracking-wide">
            No Artworks Found
          </h3>
          <p className="text-sm text-slate-400 max-w-sm mt-1.5 mb-6">
            Your creative blueprint gallery is empty. Start adding your
            masterpieces to fill up the matrix.
          </p>

          <AddArtworksModal />
        </div>
      ) : (
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
                        <Link href={`/artworks/${art._id}`}>
                          <Button
                            size="sm"
                            className="bg-[#6f4ff2]/10 border border-[#6f4ff2]/20 text-[#a78bfa] hover:bg-[#6f4ff2]/20 rounded-lg transition-colors"
                          >
                            <FiEye size={14} />
                          </Button>
                        </Link>

                        <EditArtworksModal artWork={art} />
                        <DeleteArtworksModal artWork={art} />
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      )}
    </div>
  );
};
export default ManageArtworksPage;
