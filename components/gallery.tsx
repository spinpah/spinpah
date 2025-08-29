import ScrollArea from "@/components/scroll-area";
import Photo from "@/components/photo";
import { PhoneOutgoing } from "@phosphor-icons/react";

const Gallery = ({
  photos,
}: {
  photos: {
    src: string;
    alt: string;
  }[];
}) => {
  return (
    <ScrollArea className="relative mx-3 md:w-[calc(100%+100px)] before:absolute before:h-full before:w-px before:bg-gray-12 before:top-0 before:-left-2 after:absolute after:h-full after:w-px after:bg-gray-12 after:top-0 after:-right-2">
      <div className="flex w-full h-full gap-x-2">
        {photos.map((photo) => (
          <Photo
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            className="first:ml-1 last:mr-1"
          />
        ))}
      </div>
    </ScrollArea>
  );
};

const Gallery2 = ({
  images,
}: {
  images: string[];
}) => {
  return (
    <ScrollArea className="relative mx-3 md:w-[calc(100%+100px)] before:absolute before:h-full before:w-px before:bg-gray-12 before:top-0 before:-left-2 after:absolute after:h-full after:w-px after:bg-gray-12 after:top-0 after:-right-2">
      <div className="flex w-full h-full gap-x-2">
        {images.map((image) => (
          <Photo
            key={image}
            src={image}
            alt={image}
            className="first:ml-1 last:mr-1"
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default Gallery;

export { Gallery2 };
