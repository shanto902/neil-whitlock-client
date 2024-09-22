export const calculateImageSize = (imageWidth: number, imageHeight: number) => {
  // Get viewport dimensions
  const maxWidth = window.innerWidth * 0.95; // 90% of viewport width
  const maxHeight = window.innerHeight * 0.95; // 90% of viewport height

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
