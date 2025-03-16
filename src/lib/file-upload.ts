"use server";

import { createClient } from "@supabase/supabase-js";
import { env } from "~/env.js";
import { updateUserImage } from "~/lib/user-service";

const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY);

export async function uploadAvatar(
  file: File,
  userId: string,
  fileName: string,
): Promise<string> {
  try {
    const filePath = `${Date.now()}_${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { contentType: "image/jpeg" });

    if (uploadError) {
      console.error("Error uploading file:", uploadError.message);
      throw new Error("Avatar image could not be uploaded.");
    }
    console.log("File uploaded successfully");

    const { data: publicData } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);
    if (!publicData.publicUrl) {
      throw new Error("Public URL for uploaded file could not be retrieved.");
    }
    const publicUrl = publicData.publicUrl;

    const newImageUrl = await updateUserImage(userId, publicUrl);
    return newImageUrl;
  } catch (error) {
    console.error("uploadAvatar error:", error);
    throw error;
  }
}
