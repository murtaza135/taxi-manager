// @source https://stackoverflow.com/questions/67540150/upload-compressed-image-file-from-client-side-using-javascript
export type Options = {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  type?: string;
  throwError?: boolean;
};

export async function compressImage(image: File, options?: Options) {
  if (!image.type.startsWith('image/')) {
    if (options?.throwError) {
      throw new Error(`Unsupported file type: ${image.type}`);
    }
    return image;
  }

  // create Image object from File object
  const img = new Image();
  img.src = URL.createObjectURL(image);
  await img.decode();

  // determine the lowest possible aspect ratio
  const aspectRatio = Math.min(
    1,
    (options?.maxWidth ?? img.naturalWidth) / img.naturalWidth,
    (options?.maxHeight ?? img.naturalHeight) / img.naturalHeight,
  );

  const targetWidth = img.naturalHeight * aspectRatio;
  const targetHeight = img.naturalHeight * aspectRatio;

  // draw image on canvas
  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const context = canvas.getContext('2d');
  if (!context) {
    if (options?.throwError) {
      throw new Error('Could not load canvas');
    }
    return image;
  }
  context.drawImage(img, 0, 0, targetWidth, targetHeight);

  // convert image on canvas to File object
  const targetImg = await new Promise<File>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          if (options?.throwError) {
            return reject(new Error('Conversion from Image to Blob failed'));
          }
          return resolve(image);
        }

        const file = new File([blob], image.name, {
          type: options?.type ?? image.type,
          lastModified: image.lastModified,
        });

        return resolve(file);
      },
      options?.type ?? image.type,
      options?.quality,
    );
  });

  URL.revokeObjectURL(img.src);

  // canvas has bad compression ability, therefore compare targetImg to the source image
  // and determine which is better
  return targetImg.size < image.size ? targetImg : image;
}
