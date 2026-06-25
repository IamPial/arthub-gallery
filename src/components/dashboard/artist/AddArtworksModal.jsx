"use client";

import {
  Modal,
  Button,
  Form,
  Label,
  Input,
  TextField,
  Select,
  ListBox,
  TextArea,
} from "@heroui/react";
import { FiPlus } from "react-icons/fi";
import { addArtWorks } from "@/lib/actions/artworks";
import { authClient } from "@/lib/auth-client";
import { imgUpload } from "@/lib/imgUpload";
import { toast } from "sonner";

export default function AddArtworksModal() {
  const { data } = authClient.useSession();
  const user = data?.user;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const addData = Object.fromEntries(formData.entries());
    const image = await imgUpload(addData.image);
    await addArtWorks({
      ...addData,
      image: image?.url,
      userId: user?.id,
      userName: user?.name,
      createdAt: new Date(),
    });
    toast("Artworks created successfully!", {
      style: {
        color: "#00c950",
      },
    });
  };

  const inputClass =
    "bg-[#131129] border border-white/10 rounded-xl h-11 text-white placeholder:text-slate-500 text-sm data-[hover=true]:border-[#6f4ff2]/50 data-[focus=true]:border-[#6f4ff2]";

  const labelClass =
    "text-xs font-semibold text-slate-400 uppercase tracking-wider";

  return (
    <Modal>
      <Button
        slot="trigger"
        startContent={<FiPlus />}
        className="bg-[#6f4ff2] hover:bg-[#5b3ed4] text-white font-semibold rounded-xl px-5 py-6 shadow-md shadow-[#6f4ff2]/20"
      >
        Add New Artwork
      </Button>

      <Modal.Backdrop variant="blur" className="bg-[#0f0d1f]/70">
        <Modal.Container placement="center" size="lg">
          <Modal.Dialog className="bg-[#1a163a] border border-white/5 rounded-2xl shadow-2xl overflow-hidden focus:outline-none">
            <Modal.CloseTrigger className="absolute top-4 right-4 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-lg transition-colors" />

            <Modal.Header className="p-6 border-b border-white/5 bg-[#131129]/50">
              <Modal.Heading className="text-xl font-bold text-white tracking-wide">
                Add New Artwork
              </Modal.Heading>
              <p className="text-xs text-slate-400 mt-1">
                Deploy your creative blueprint to the showcase matrix.
              </p>
            </Modal.Header>

            <Form onSubmit={handleSubmit}>
              <Modal.Body className="p-6 flex flex-col gap-4 max-h-[60vh] overflow-y-auto">
                {/* Title */}
                <TextField
                  name="title"
                  isRequired
                  className="flex flex-col gap-1.5"
                >
                  <Label className={labelClass}>Title</Label>
                  <Input
                    placeholder="e.g. Cosmic Blueprint"
                    className={inputClass}
                  />
                </TextField>

                {/* Category & Price */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select
                    name="category"
                    defaultValue="painting"
                    className="flex flex-col gap-1.5"
                  >
                    <Label className={labelClass}>Category</Label>
                    <Select.Trigger className="bg-[#131129] border border-white/10 rounded-xl h-11 px-4 text-sm text-white data-[hovered=true]:border-[#6f4ff2]/50 data-[focus-visible=true]:border-[#6f4ff2]">
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover className="bg-[#1a163a] border border-white/10 rounded-xl shadow-xl">
                      <ListBox className="p-1">
                        <ListBox.Item
                          id="painting"
                          className="text-sm text-slate-200 px-3 py-2 rounded-lg hover:bg-[#6f4ff2]/20 cursor-pointer"
                        >
                          Painting
                        </ListBox.Item>
                        <ListBox.Item
                          id="digital"
                          className="text-sm text-slate-200 px-3 py-2 rounded-lg hover:bg-[#6f4ff2]/20 cursor-pointer"
                        >
                          Digital
                        </ListBox.Item>
                        <ListBox.Item
                          id="sculpture"
                          className="text-sm text-slate-200 px-3 py-2 rounded-lg hover:bg-[#6f4ff2]/20 cursor-pointer"
                        >
                          Sculpture
                        </ListBox.Item>
                        <ListBox.Item
                          id="abstract"
                          className="text-sm text-slate-200 px-3 py-2 rounded-lg hover:bg-[#6f4ff2]/20 cursor-pointer"
                        >
                          Abstract
                        </ListBox.Item>
                      </ListBox>
                    </Select.Popover>
                  </Select>

                  <TextField
                    name="price"
                    isRequired
                    className="flex flex-col gap-1.5"
                  >
                    <Label className={labelClass}>Price ($)</Label>
                    <Input placeholder="$0" className={inputClass} />
                  </TextField>
                </div>

                {/* Description */}
                <TextField
                  name="description"
                  isRequired
                  className="flex flex-col gap-1.5"
                >
                  <Label className={labelClass}>Description</Label>
                  <TextArea
                    id="description"
                    rows={3}
                    placeholder="Describe the depth and core thought behind this artwork..."
                    className="bg-[#131129] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#6f4ff2] transition-colors resize-none"
                  />
                </TextField>

                {/* Image Upload */}
                <TextField
                  isRequired
                  type="file"
                  className="flex flex-col gap-1.5"
                >
                  <Label className={labelClass}>Artwork File</Label>
                  <div className="group flex flex-col items-center justify-center border-2 border-dashed border-white/10 hover:border-[#6f4ff2]/40 rounded-xl p-6 bg-[#131129]/50 transition-colors cursor-pointer">
                    <input type="file" name="image" />
                  </div>
                </TextField>

                <Modal.Footer>
                  <Button
                    slot="close"
                    className="bg-transparent border border-white/10 text-slate-400 hover:text-white rounded-xl px-4 py-5 font-medium transition-colors"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[#6f4ff2] hover:bg-[#5b3ed4] text-white font-semibold rounded-xl px-5 py-5 shadow-md shadow-[#6f4ff2]/10 transition-colors"
                  >
                    Publish Artwork
                  </Button>
                </Modal.Footer>
              </Modal.Body>
            </Form>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
