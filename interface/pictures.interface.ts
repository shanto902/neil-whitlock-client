export type TImageData = {
  id: string;
  image: string;
  alt: string;
  width: number;
  height: number;
  category: {
    slug: string;
  };
  blurDataURL?: string;
};
