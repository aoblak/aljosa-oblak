/**
 * DunjaGallery — Interactive image gallery for Dunja Residence
 * Features: thumbnail grid, lightbox with prev/next, keyboard navigation, smooth transitions
 */
import { useState, useEffect, useCallback } from "react";

const GALLERY_IMAGES = [
  {
    src: "/manus-storage/dunja-exterior-real_c330823f.jpg",
    alt: "Dunja Residence eksterijer — mediteranska kuća s balkonima i zelenilom, Premantura",
    caption: "Eksterijer",
  },
  {
    src: "/manus-storage/dunja-bedroom-real_9bacfe87.jpg",
    alt: "Dunja Residence spavaća soba — udoban krevet s drvenim namještajem",
    caption: "Spavaća soba",
  },
  {
    src: "/manus-storage/dunja-living-real_b8321cfc.jpg",
    alt: "Dunja Residence dnevni boravak — prostrani prostor s plavim kaučem",
    caption: "Dnevni boravak",
  },
  {
    src: "/manus-storage/dunja-balcony-real_ccc62ac8.jpg",
    alt: "Dunja Residence balkon — pogled na zelenilo s francuskim vratima",
    caption: "Balkon",
  },
  {
    src: "/manus-storage/dunja-room2-real_40170c70.jpg",
    alt: "Dunja Residence druga spavaća soba — svijetla soba s pogledom",
    caption: "Soba 2",
  },
  {
    src: "/manus-storage/dunja-living2-real_b0dd30a9.jpg",
    alt: "Dunja Residence salon — prostrani dnevni boravak s umjetninama",
    caption: "Salon",
  },
];

export function DunjaGallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxOpen, closeLightbox, goNext, goPrev]);

  return (
    <>
      {/* Thumbnail Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-8">
        {GALLERY_IMAGES.map((img, i) => (
          <button
            key={img.src}
            onClick={() => openLightbox(i)}
            className="relative group overflow-hidden aspect-[4/3] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#42F58D]"
            aria-label={`Otvori sliku: ${img.caption}`}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
              <span
                className="text-white text-sm font-semibold tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0"
                style={{ fontFamily: "var(--font-mono)", transitionProperty: "opacity, transform", transitionDuration: "300ms" }}
              >
                {img.caption}
              </span>
            </div>
            {/* Zoom icon */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
                <path d="M11 8v6M8 11h6" />
              </svg>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Galerija slika"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={closeLightbox}
          />

          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-10 text-white/70 hover:text-white transition-colors p-2"
            aria-label="Zatvori galeriju"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Previous button */}
          <button
            onClick={goPrev}
            className="absolute left-4 md:left-8 z-10 text-white/60 hover:text-white transition-all p-3 hover:bg-white/10 rounded-full"
            aria-label="Prethodna slika"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Next button */}
          <button
            onClick={goNext}
            className="absolute right-4 md:right-8 z-10 text-white/60 hover:text-white transition-all p-3 hover:bg-white/10 rounded-full"
            aria-label="Sljedeća slika"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* Main image */}
          <div className="relative z-10 max-w-[85vw] max-h-[80vh] flex flex-col items-center">
            <img
              src={GALLERY_IMAGES[activeIndex].src}
              alt={GALLERY_IMAGES[activeIndex].alt}
              className="max-w-full max-h-[70vh] object-contain rounded-sm shadow-2xl"
              style={{ transition: "opacity 0.3s ease" }}
            />
            {/* Caption */}
            <p
              className="mt-4 text-white/80 text-sm tracking-wider uppercase"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {GALLERY_IMAGES[activeIndex].caption} — {activeIndex + 1} / {GALLERY_IMAGES.length}
            </p>

            {/* Thumbnail strip */}
            <div className="flex gap-2 mt-4">
              {GALLERY_IMAGES.map((img, i) => (
                <button
                  key={img.src}
                  onClick={() => setActiveIndex(i)}
                  className={`w-12 h-9 rounded-sm overflow-hidden border-2 transition-all duration-200 ${
                    i === activeIndex ? "border-[#42F58D] scale-110" : "border-white/20 opacity-60 hover:opacity-100"
                  }`}
                  aria-label={`Prikaži: ${img.caption}`}
                >
                  <img src={img.src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
