// lib/imageFetcher.ts
import { getPlaiceholder } from "plaiceholder";
import sharp from "sharp";

export async function fetchImageData(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch image from URL: ${url}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Check if the image format is supported
    await sharp(buffer).metadata(); // This line will throw an error if the format is not supported

    const { base64 } = await getPlaiceholder(buffer);
    return { url, base64 };
  } catch (error) {
    console.error(`Error fetching or processing image from URL: ${url}`, error);
    throw error;
  }
}
