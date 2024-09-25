export const calculateImageSize = (
  width: number,
  height: number,
  imageWidth: number,
  imageHeight: number
) => {
  // Get viewport dimensions
  const maxWidth = window.innerWidth * width; // 90% of viewport width
  const maxHeight = window.innerHeight * height; // 90% of viewport height

  // Calculate the aspect ratio of the image
  const imageAspectRatio = imageWidth / imageHeight;

  // Adjust the dimensions based on the aspect ratio
  let newWidth = imageWidth;
  let newHeight = imageHeight;

  if (newWidth > maxWidth) {
    newWidth = maxWidth;
    newHeight = newWidth / imageAspectRatio;
  }

  if (newHeight > maxHeight) {
    newHeight = maxHeight;
    newWidth = newHeight * imageAspectRatio;
  }

  return { width: newWidth, height: newHeight };
};
