import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const galleryImages = [
  { id: "2", src: "/images/blog2.png", alt: "Blog" },
  { id: "3", src: "/images/photos.png", alt: "Photos" },
  { id: "4", src: "/images/image.png", alt: "Image" },
  { id: "5", src: "/images/pdf.png", alt: "PDF" },
  { id: "6", src: "/images/trash.png", alt: "Trash" },
];

export function GalleryApp() {
  const [lightbox, setLightbox] = useState(null);
  const lightboxRef = useRef(null);

  useGSAP(() => {
    if (lightbox === null) return;
    if (lightboxRef.current) {
      gsap.fromTo(
        lightboxRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [lightbox]);

  const closeLightbox = () => {
    if (lightboxRef.current) {
      gsap.to(lightboxRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => setLightbox(null),
      });
    } else {
      setLightbox(null);
    }
  };

  return (
    <div className="p-6 overflow-auto">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {galleryImages.map((img) => (
          <button
            key={img.id}
            type="button"
            onClick={() => setLightbox(img)}
            className="aspect-square rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600 hover:ring-2 hover:ring-blue-400 transition-all"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={closeLightbox}
          role="dialog"
          aria-label="Image lightbox"
        >
          <div
            ref={lightboxRef}
            className="max-w-[90vw] max-h-[90vh] rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
