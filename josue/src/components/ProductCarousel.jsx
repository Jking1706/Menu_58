import { useRef, useState, useCallback } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "./Icons.jsx";
import ProductCard from "./ProductCard.jsx";

export default function ProductCarousel({ products, activeCategory, onOpenProduct }) {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Detecta qué tarjeta está más centrada mientras el usuario hace scroll.
  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const children = Array.from(track.children);
    const trackCenter = track.scrollLeft + track.clientWidth / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;
    children.forEach((child, i) => {
      const childCenter = child.offsetLeft + child.clientWidth / 2;
      const distance = Math.abs(childCenter - trackCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    });
    setActiveIndex(closestIndex);
  }, []);

  const scrollToIndex = useCallback((index) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(index, track.children.length - 1));
    const child = track.children[clamped];
    if (child) {
      track.scrollTo({ left: child.offsetLeft - 16, behavior: "smooth" });
    }
  }, []);

  const scrollByCard = (direction) => {
    scrollToIndex(activeIndex + direction);
  };

  return (
    <div className="mx-auto max-w-[1200px] w-full px-0 pb-8 md:pb-10 overflow-hidden">
      <div className="relative w-full max-w-full overflow-hidden">
        {/* Flechas (desktop) */}
        <button
          onClick={() => scrollByCard(-1)}
          aria-label="Anterior"
          className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white border border-[#EDEDED] shadow-[0_8px_20px_rgba(0,0,0,0.08)] items-center justify-center hover:bg-ink hover:text-white transition"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => scrollByCard(1)}
          aria-label="Siguiente"
          className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white border border-[#EDEDED] shadow-[0_8px_20px_rgba(0,0,0,0.08)] items-center justify-center hover:bg-ink hover:text-white transition"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>

        {/* Track de tarjetas */}
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto no-scrollbar snap-x-mandatory px-4 md:px-14 py-4 md:py-6 w-full max-w-[100vw] box-border"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {products.map((product, i) => (
            <div
              key={product.id}
              className="snap-start-item shrink-0 w-[86vw] max-w-[86vw] md:w-[46%] md:max-w-[46%] lg:w-[520px] lg:max-w-[520px] select-none"
            >
              <ProductCard
                product={product}
                index={i}
                total={products.length}
                isActive={i === activeIndex}
                onOpen={onOpenProduct}
              />
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="mt-4 flex items-center justify-center gap-2 px-4">
          {products.map((product, i) => (
            <button
              key={product.id}
              onClick={() => scrollToIndex(i)}
              aria-label={`Ir a ${i + 1}`}
              className={`transition-all rounded-full ${
                i === activeIndex ? "w-8 h-2.5 bg-ink" : "w-2.5 h-2.5 bg-ink/15 hover:bg-ink/30"
              }`}
            />
          ))}
        </div>

        <div className="mt-2 flex justify-center">
          <div className="font-sans-ui text-[10px] tracking-[0.12em] px-3 py-1 rounded-full bg-[#F7F7F7] border border-[#EFEFEF] text-ink/50">
            {activeCategory} • {activeIndex + 1}/{products.length}
          </div>
        </div>

        {/* Botones (mobile) */}
        <div className="mt-4 flex md:hidden items-center justify-center gap-3 px-4">
          <button
            onClick={() => scrollByCard(-1)}
            className="flex-1 max-w-[160px] h-12 rounded-full bg-white border border-[#E9E9E9] shadow-sm font-sans-ui text-[14px] flex items-center justify-center gap-2 active:scale-[0.97] transition"
          >
            <ChevronLeftIcon className="w-4 h-4" /> Anterior
          </button>
          <button
            onClick={() => scrollByCard(1)}
            className="flex-1 max-w-[160px] h-12 rounded-full bg-ink text-white font-sans-ui text-[14px] flex items-center justify-center gap-2 active:scale-[0.97] transition"
          >
            Siguiente <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
