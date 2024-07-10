import { getPlaiceholder } from "plaiceholder";

export async function getImage(src: string) {
  const res = await fetch(src);
  const arrayBuffer = await res.arrayBuffer();

  // Use a dynamic import for the Buffer object
  const { Buffer } = await import("buffer");
  const buffer = Buffer.from(arrayBuffer);

  const {
    metadata: { height, width },
    ...plaiceholder
  } = await getPlaiceholder(buffer, { size: 10 });

  return {
    ...plaiceholder,
    img: { src, height, width },
  };
}
