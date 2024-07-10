// components/ServerImageFetcher.tsx
import { getPlaiceholder } from "plaiceholder";

const fetchBlurDataURL = async (url: string) => {
  const buffer = await fetch(url).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );
  const { base64 } = await getPlaiceholder(buffer);
  return base64;
};

const ServerImageFetcher = async ({
  url,
  children,
}: {
  url: string;
  children: (base64: string) => JSX.Element;
}) => {
  const base64 = await fetchBlurDataURL(url);
  return children(base64);
};

export default ServerImageFetcher;
