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
import { FiEdit2 } from "react-icons/fi";

import { imgUpload } from "@/lib/imgUpload";
import Image from "next/image";

export default function EditArtworksModal({ artWork }) {
  console.log(artWork);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const addData = Object.fromEntries(formData.entries());

    let imageUrl = artWork?.image;

    if (addData.image && addData.image.size > 0) {
      const uploadRes = await imgUpload(addData.image);
      imageUrl = uploadRes?.url;
    }

    // await updateArtwork({
    //   id: artwork?.id,
    //   ...addData,
    //   image: imageUrl,
    //   updatedAt: new Date(),
    // });
  };

  const inputClass =
    "bg-[#131129] border border-white/10 rounded-xl h-11 text-white placeholder:text-slate-500 text-sm data-[hover=true]:border-[#6f4ff2]/50 data-[focus=true]:border-[#6f4ff2]";

  const labelClass =
    "text-xs font-semibold text-slate-400 uppercase tracking-wider";

  return (
    <Modal>
      <Button
        href={`/dashboard/artist/${artWork.id}`}
        size="sm"
        className="bg-[#6f4ff2]/10 border border-[#6f4ff2]/20 text-[#a78bfa] hover:bg-[#6f4ff2]/20 rounded-lg"
      >
        <FiEdit2 size={14} />
      </Button>

      <Modal.Backdrop variant="blur" className="bg-[#0f0d1f]/70">
        <Modal.Container placement="center" size="lg">
          <Modal.Dialog className="bg-[#1a163a] border border-white/5 rounded-2xl shadow-2xl overflow-hidden focus:outline-none">
            <Modal.CloseTrigger className="absolute top-4 right-4 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-lg transition-colors" />

            <Modal.Header className="p-6 border-b border-white/5 bg-[#131129]/50">
              <Modal.Heading className="text-xl font-bold text-white tracking-wide">
                Update Your Artworks
              </Modal.Heading>
              <p className="text-xs text-slate-400 mt-1">
                Update your artwork&apos;s details to align with your current
                creative vision.
              </p>
            </Modal.Header>

            <Form onSubmit={handleSubmit}>
              <Modal.Body className="p-6 flex flex-col gap-4 max-h-[60vh] overflow-y-auto">
                {/* Title */}
                <TextField
                  name="title"
                  isRequired
                  defaultValue={artWork?.title || ""}
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
                    defaultValue={artWork?.category || "digital-art"}
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
                          id="digital-art"
                          className="text-sm text-slate-200 px-3 py-2 rounded-lg hover:bg-[#6f4ff2]/20 cursor-pointer"
                        >
                          Digital Art
                        </ListBox.Item>
                        <ListBox.Item
                          id="3d-motion"
                          className="text-sm text-slate-200 px-3 py-2 rounded-lg hover:bg-[#6f4ff2]/20 cursor-pointer"
                        >
                          3D Motion
                        </ListBox.Item>
                        <ListBox.Item
                          id="abstract"
                          className="text-sm text-slate-200 px-3 py-2 rounded-lg hover:bg-[#6f4ff2]/20 cursor-pointer"
                        >
                          Abstract Blueprint
                        </ListBox.Item>
                        <ListBox.Item
                          id="vector"
                          className="text-sm text-slate-200 px-3 py-2 rounded-lg hover:bg-[#6f4ff2]/20 cursor-pointer"
                        >
                          Vector Illustration
                        </ListBox.Item>
                      </ListBox>
                    </Select.Popover>
                  </Select>

                  <TextField
                    name="price"
                    isRequired
                    defaultValue={artWork?.price || ""}
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
                  defaultValue={artWork?.description || ""}
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
                <TextField type="file" className="flex flex-col gap-1.5">
                  <Label className={labelClass}>
                    Update Artwork File (Optional)
                  </Label>
                  <div className="group flex flex-col items-center justify-center border-2 border-dashed border-white/10 hover:border-[#6f4ff2]/40 rounded-xl p-6 bg-[#131129]/50 transition-colors cursor-pointer">
                    {artWork?.image && (
                      <Image
                        src={artWork.image}
                        alt="Current preview"
                        width={100}
                        height={100}
                        className="w-16 h-16 object-cover rounded-lg mb-2 border border-white/10"
                      />
                    )}
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
                    slot="close"
                    type="submit"
                    className="bg-[#6f4ff2] hover:bg-[#5b3ed4] text-white font-semibold rounded-xl px-5 py-5 shadow-md shadow-[#6f4ff2]/10 transition-colors"
                  >
                    Save Changes
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
