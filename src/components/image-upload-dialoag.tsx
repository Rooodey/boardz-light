"use client";

import React, { useState, type ChangeEvent, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import AvatarCropper from "~/components/avatar-cropper";
import { uploadAvatar } from "~/lib/file-upload";
import { useUserProfile } from "~/contexts/UserProfileContext";
import { type ExtendedUserProfile } from "~/server/db/schemas/user-profiles";

export function ImageUploadDialog() {
  const [open, setOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const { data: session } = useSession();
  const { setProfile } = useUserProfile();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        const url = URL.createObjectURL(selectedFile);
        setImageSrc(url);
      }
    }
  };

  const handleCropComplete = async (croppedImageUrl: string) => {
    try {
      const response = await fetch(croppedImageUrl);
      const blob = await response.blob();

      const file = new File([blob], "avatar.jpg", { type: blob.type });

      if (session?.user?.name) {
        const newImageUrl = await uploadAvatar(
          file,
          session.user.id,
          session.user.name,
        );
        setProfile((prev: ExtendedUserProfile) => ({
          ...prev,
          image: newImageUrl,
        }));
      }
    } catch (error) {
      console.error("Error uploading cropped image:", error);
    }
    handleCancel();
    setOpen(false);
  };

  const handleCancel = () => {
    setImageSrc(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="accent" size="iconBorder">
          <Plus size={16} className="text-primary" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Avatar</DialogTitle>
        </DialogHeader>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        {imageSrc ? (
          <AvatarCropper
            imageSrc={imageSrc}
            onCropCompleteAction={handleCropComplete}
            onCancelAction={handleCancel}
          />
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <p>No image selected yet.</p>
            <Button variant={"accent"} onClick={handleButtonClick}>
              Choose Image
            </Button>
          </div>
        )}
        <DialogClose asChild>
          <Button className="mt-4">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
