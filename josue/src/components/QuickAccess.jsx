import { formatPrice } from "../utils/formatPrice.js";

export default function QuickAccess({ products, onSelect }) {
  const featured = products.slice(0, 4);

  return (
    <div className="mx-auto max-w-[1200px] w-full px-4 md:px-10 pb-10 md:pb-12">
      <div className="rounded-[20px] bg-ink text-white p-5 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="font-serif-display text-[18px] md:text-[20px] leading-tight">
            ¿Cómo funciona la sueroterapia personalizada?
          </div>
          <p className="font-sans-ui mt-1.5 text-[15px] md:text-[13px] leading-[1.6] text-white/60 max-w-[560px]">
            Selección de 1 a 4 componentes según objetivo. Infusión IV directa
            100% biodisponible. Protocolos supervisados.
          </p>
        </div>
        <div className="flex gap-2">
          <div className="px-3 md:px-4 py-2 rounded-full bg-white/10 border border-white/10 font-sans-ui text-[12px]">
            100% Biodisponible
          </div>
          <div className="px-3 md:px-4 py-2 rounded-full bg-teal font-sans-ui text-[12px] font-medium">
            USP Grade
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-3">
        {featured.map((product) => (
          <button
            key={product.id}
            onClick={() => onSelect(product.id)}
            className="text-left rounded-[16px] border border-[#EFEFEF] bg-white p-4 hover:border-teal/30 hover:shadow-[0_8px_20px_rgba(0,0,0,0.04)] transition group"
          >
            <div className="flex items-center gap-2">
              <img
                src={product.image}
                alt={product.commercialName}
                className="w-8 h-8 object-contain rounded-full bg-[#F7FFFE] border border-[#EEF8F7]"
              />
              <div className="font-sans-ui text-[9px] tracking-[0.12em] text-teal leading-tight font-semibold">
                {product.commercialTag}
              </div>
            </div>
            <div className="font-serif-display mt-2 text-[13px] leading-tight font-bold uppercase group-hover:text-teal-dark transition">
              {product.commercialName}
            </div>
            <div className="mt-1 font-sans-ui text-[10px] leading-[1.3] text-ink/50 uppercase tracking-wide line-clamp-2">
              {product.technicalName}
            </div>
            <div className="mt-2 font-serif-display text-[13px] font-bold text-teal-dark">
              {formatPrice(product.price)}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
