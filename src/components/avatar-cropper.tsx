"use client";

import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Slider } from "~/components/ui/slider";
import { Area } from "react-easy-crop";
import getCroppedImg from "~/lib/cropImage";
import { Button } from "~/components/ui/button";

interface AvatarCropperProps {
  imageSrc: string;
  onCropComplete: (croppedImageUrl: string) => void;
  onCancel: () => void;
}

export default function AvatarCropper({
  imageSrc,
  onCropComplete,
  onCancel,
}: AvatarCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropCompleteInternal = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  const handleSave = async () => {
    if (croppedAreaPixels) {
      try {
        const croppedImageUrl = await getCroppedImg(
          imageSrc,
          croppedAreaPixels,
        );
        onCropComplete(croppedImageUrl);
      } catch (error) {
        console.error("Error cropping image:", error);
      }
    }
  };

  return (
    <div className="relative w-full">
      <div className="relative h-64 bg-gray-200">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1} // quadratisch
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropCompleteInternal}
        />
      </div>
      <div className="mt-2">
        <Slider
          value={[zoom]}
          min={1}
          max={3}
          step={0.1}
          onValueChange={(value) => setZoom(value[0] as number)}
        />
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Button onClick={onCancel} variant={"outline"}>
          Cancel
        </Button>
        <Button onClick={handleSave} variant={"accent"}>
          Save
        </Button>
      </div>
    </div>
  );
}
