import { buildWhatsAppLink } from "../utils/whatsapp.js";
import { formatPrice } from "../utils/formatPrice.js";
import { DropletsIcon } from "./Icons.jsx";

export default function ProductCard({
  product,
  index,
  total,
  isActive,
  onOpen = () => {},
}) {
  const whatsappMessage = `Hola, quiero consultar más información sobre el ${product.commercialName}. Precio: ${formatPrice(
    product.price
  )}.`;
  const whatsappLink = buildWhatsAppLink(whatsappMessage);

  return (
    <div className="relative h-full rounded-[28px] bg-white border border-[#F1F1F1] shadow-[0_20px_60px_rgba(0,0,0,0.06),0_1px_0_white_inset] overflow-hidden flex flex-col">
      {/* Imagen */}
      <div className="relative w-full h-[200px] md:h-[280px] bg-gradient-to-br from-[#F7FFFE] via-[#E8FFFE] to-[#D8F5F2] flex items-center justify-center overflow-hidden">
        <div
          className="absolute left-1/2 top-1/2 w-[180px] h-[180px] md:w-[240px] md:h-[240px] rounded-[44px] bg-gradient-to-br from-[#E6F7F7] via-[#D4F0F0] to-[#BCE9E9] animate-bubbleFloat"
          style={{ transform: "translate(-50%,-50%) rotate(-8deg)" }}
        />
        <div className="absolute w-[140px] h-[140px] rounded-full bg-white/70 top-[46%] left-1/2 -translate-x-1/2 -translate-y-1/2" />

        <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
          <span className="font-sans-ui text-[10px] tracking-[0.14em] px-2.5 py-1 rounded-full bg-ink text-white">
            {String(product.id).padStart(2, "0")}
          </span>
          <span className="font-sans-ui text-[10px] tracking-[0.12em] px-2.5 py-1 rounded-full bg-white/90 backdrop-blur border border-[#E9E9E9] text-ink/70">
            {product.category.toUpperCase()}
          </span>
        </div>

        <img
          src={product.image}
          alt={product.commercialName}
          className="relative z-10 h-[160px] md:h-[210px] w-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)]"
          loading="lazy"
          draggable={false}
        />
      </div>

      {/* Contenido */}
      <div className="p-5 md:p-8 flex flex-col flex-1">
        <h2 className="font-serif-display font-bold text-[24px] md:text-[30px] leading-[0.92] tracking-[-0.02em] text-ink uppercase">
          {product.commercialName} {isActive && <span className="text-teal">•</span>}
        </h2>

        <div className="mt-3 flex">
          <span className="font-sans-ui inline-flex items-center px-3 py-1.5 rounded-full bg-[#E6FFFB] border border-[#C9F2EF] text-teal-dark text-[10px] font-semibold tracking-[0.14em]">
            {product.commercialTag}
          </span>
        </div>

        <div className="mt-3 font-sans-ui text-[11px] md:text-[12px] leading-[1.5] tracking-[0.06em] text-ink/55 uppercase">
          {product.technicalName}
        </div>

        <div className="mt-4 inline-flex items-baseline gap-2 rounded-full border border-[#E6F7F7] bg-[#F7FFFE] px-3.5 py-2">
          <span className="font-sans-ui text-[10px] tracking-[0.14em] text-ink/40 uppercase">
            Precio
          </span>
          <span className="font-serif-display text-[18px] font-bold text-ink">
            {formatPrice(product.price)}
          </span>
        </div>

        <p className="mt-4 font-sans-ui text-[16px] md:text-[15px] leading-[1.55] text-ink/65">
          {product.description}
        </p>

        <div className="mt-5">
          <div className="font-sans-ui text-[11px] tracking-[0.16em] text-ink/40">
            BENEFICIOS CLAVE
          </div>
          <ul className="mt-3 space-y-2.5">
            {product.benefits.map((benefit, i) => (
              <li
                key={i}
                className="flex gap-3 font-sans-ui text-[16px] md:text-[14px] leading-[1.45] text-ink/80"
              >
                <span className="mt-[8px] w-1.5 h-1.5 rounded-full bg-teal shrink-0 shadow-[0_0_0_4px_rgba(26,156,156,0.12)]" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto pt-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-ink flex items-center justify-center">
              <DropletsIcon className="w-4 h-4 text-white" />
            </div>
            <div className="leading-tight">
              <div className="font-sans-ui text-[10px] tracking-[0.12em] text-ink/50">EN</div>
              <div className="font-serif-display text-[14px]">Sueroterapia IV</div>
            </div>
          </div>
          <div className="font-sans-ui text-[11px] text-ink/40">
            USP • {index + 1}/{total}
          </div>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => onOpen(product.id)}
            className="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-full border border-[#E8E8E8] font-sans-ui text-[13px] text-ink/70 hover:text-ink hover:border-teal/30 transition"
          >
            Ver detalle
          </button>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-full bg-teal text-white font-sans-ui text-[13px] hover:bg-teal-dark transition"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
