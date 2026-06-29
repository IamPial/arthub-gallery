"use client";

import { deleteTransactions } from "@/lib/actions/transactions";
import { AlertDialog, Button } from "@heroui/react";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "sonner";
const AdminArtworksDeleteModal = ({ artWork }) => {
  console.log(artWork)
  const handleDelete = async () => {
    await deleteTransactions(artWork?._id);
    toast.success("Artworks deleted successfully!");
  };
  return (
    <AlertDialog>
      <Button
        size="sm"
        className="bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 rounded-lg"
      >
        <FiTrash2 size={14} />{" "}
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                Delete artworks permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>{artWork?.title}</strong>{" "}
                and all of its data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button onClick={handleDelete} slot="close" variant="danger">
                Remove Artworks
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default AdminArtworksDeleteModal;
