"use server";

import { prisma } from "@/lib/prisma";

export async function likeVideo(videoId: string) {
  try {
    const video = await prisma.video.update({
      where: { id: videoId },
      data: { likes: { increment: 1 } },
    });
    return { success: true, likes: video.likes };
  } catch (error) {
    console.error("Error liking video", error);
    return { error: "Xəta baş verdi" };
  }
}

export async function saveVideo(videoId: string) {
  // Mock save function since we don't have a SavedVideo model in schema yet
  // Simply mock a success delay
  await new Promise(res => setTimeout(res, 500));
  return { success: true };
}
