import { assetPath } from "../utils/assetPath.js";
import { SparklesIcon } from "./Icons.jsx";

const CATEGORIES = ["Todos", "Vitaminas", "Antioxidantes"];

export default function Hero({ products, activeCategory, onCategoryChange }) {
  return (
    <div className="relative mx-auto max-w-[1200px] px-4 md:px-10 pt-7 md:pt-14 pb-5 md:pb-8 w-full">
      <div className="flex flex-col items-center text-center">
        <div className="relative">
          <div className="absolute -inset-8 rounded-full bg-gradient-to-br from-[#E6FFFB] to-[#C9F2EF] blur-[18px] opacity-60" />
          <div className="relative w-[96px] h-[96px] md:w-[132px] md:h-[132px] rounded-full bg-white shadow-[0_16px_40px_rgba(26,156,156,0.12),0_2px_12px_rgba(0,0,0,0.06)] p-[6px]">
            <img
              src={assetPath("images/logo.jpg")}
              alt="Logo Josué Rangel Sueroterapia"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-ink flex items-center justify-center shadow-lg">
            <SparklesIcon className="w-4 h-4 text-white" />
          </div>
        </div>

        <h1 className="mt-6 md:mt-8 font-serif-display text-[28px] md:text-[52px] leading-[0.95] tracking-[-0.02em] max-w-[680px] px-2">
          Catálogo de Componentes
          <span className="block font-normal italic text-teal mt-1.5">
            Sueroterapia Personalizada
          </span>
        </h1>

        <p className="mt-4 font-sans-ui text-[16px] md:text-[15px] leading-[1.6] text-ink/60 max-w-[560px] px-1">
          Fórmulas Vittamol 2026. Fotos reales de cada ampolla — hidratación,
          recuperación y equilibrio celular con biodisponibilidad 100%.
        </p>

        <div className="mt-6 grid grid-cols-3 gap-2 md:gap-3 w-full max-w-[560px]">
          <div className="rounded-[18px] border border-[#EFEFEF] bg-white p-3 md:p-4">
            <div className="font-serif-display text-[22px] md:text-[26px] leading-none">12</div>
            <div className="mt-1 font-sans-ui text-[10px] md:text-[11px] tracking-[0.14em] text-ink/45 uppercase">
              Sueros
            </div>
          </div>
          <div className="rounded-[18px] border border-[#EFEFEF] bg-white p-3 md:p-4">
            <div className="font-serif-display text-[22px] md:text-[26px] leading-none">2</div>
            <div className="mt-1 font-sans-ui text-[10px] md:text-[11px] tracking-[0.14em] text-ink/45 uppercase">
              Categorías
            </div>
          </div>
          <div className="rounded-[18px] border border-[#EFEFEF] bg-white p-3 md:p-4">
            <div className="font-serif-display text-[22px] md:text-[26px] leading-none">IV</div>
            <div className="mt-1 font-sans-ui text-[10px] md:text-[11px] tracking-[0.14em] text-ink/45 uppercase">
              Presentación
            </div>
          </div>
        </div>

        <div className="mt-6 md:mt-8 flex items-center gap-1.5 p-1 rounded-full bg-[#F7F7F7] border border-[#F0F0F0] max-w-full overflow-x-auto no-scrollbar">
          {CATEGORIES.map((category) => {
            const count =
              category === "Todos"
                ? products.length
                : products.filter((p) => p.category === category).length;
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`font-sans-ui text-[14px] md:text-[13px] px-4 md:px-5 py-2.5 md:py-2 rounded-full transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? "bg-ink text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
                    : "text-ink/60 hover:text-ink"
                }`}
              >
                {category}
                <span className="ml-2 text-[11px] opacity-60">{count}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
