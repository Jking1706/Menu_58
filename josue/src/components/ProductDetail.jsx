import { useState } from "react";
import { buildWhatsAppLink } from "../utils/whatsapp.js";
import { assetPath } from "../utils/assetPath.js";
import { formatPrice } from "../utils/formatPrice.js";

export default function ProductDetail({ product, relatedProducts, onBack, onOpenProduct }) {
  const [copied, setCopied] = useState(false);
  const whatsappMessage = `Hola, quiero consultar más información sobre el ${product.commercialName}. Precio: ${formatPrice(
    product.price
  )}.`;
  const whatsappLink = buildWhatsAppLink(whatsappMessage);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="mx-auto max-w-[1200px] w-full px-4 md:px-10 pb-10 md:pb-12">
      <button
        onClick={onBack}
        className="font-sans-ui text-[13px] px-4 py-2 rounded-full border border-[#E8E8E8] text-ink/70 hover:text-ink hover:border-teal/30 transition"
      >
        ← Volver al catálogo
      </button>

      <div className="mt-4 grid lg:grid-cols-[1.15fr_0.85fr] gap-5 md:gap-6 items-start">
        <div className="rounded-[28px] overflow-hidden border border-[#F1F1F1] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
          <div className="relative min-h-[280px] md:min-h-[420px] bg-gradient-to-br from-[#F7FFFE] via-[#E8FFFE] to-[#D8F5F2] flex items-center justify-center p-8">
            <img
              src={product.image}
              alt={product.commercialName}
              className="relative z-10 max-h-[280px] md:max-h-[360px] w-auto object-contain drop-shadow-[0_16px_30px_rgba(0,0,0,0.12)]"
            />
          </div>
        </div>

        <div className="rounded-[28px] border border-[#F1F1F1] bg-white p-6 md:p-8 shadow-[0_16px_40px_rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-sans-ui text-[10px] tracking-[0.14em] px-2.5 py-1 rounded-full bg-ink text-white">
              {String(product.id).padStart(2, "0")}
            </span>
            <span className="font-sans-ui text-[10px] tracking-[0.12em] px-2.5 py-1 rounded-full bg-[#E6FFFB] border border-[#C9F2EF] text-teal-dark font-semibold">
              {product.category.toUpperCase()}
            </span>
          </div>

          <h1 className="mt-4 font-serif-display text-[28px] md:text-[36px] leading-[0.95] tracking-[-0.02em] uppercase">
            {product.commercialName}
          </h1>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="rounded-[16px] bg-[#FAFFFE] border border-[#EDF6F5] p-3">
              <div className="font-sans-ui text-[10px] tracking-[0.14em] text-ink/40 uppercase">
                Categoría
              </div>
              <div className="mt-1 font-serif-display text-[15px] font-bold">
                {product.category}
              </div>
            </div>
            <div className="rounded-[16px] bg-[#FAFFFE] border border-[#EDF6F5] p-3">
              <div className="font-sans-ui text-[10px] tracking-[0.14em] text-ink/40 uppercase">
                Beneficios
              </div>
              <div className="mt-1 font-serif-display text-[15px] font-bold">
                {product.benefits.length} puntos clave
              </div>
            </div>
            <div className="rounded-[16px] bg-[#FAFFFE] border border-[#EDF6F5] p-3">
              <div className="font-sans-ui text-[10px] tracking-[0.14em] text-ink/40 uppercase">
                Precio
              </div>
              <div className="mt-1 font-serif-display text-[15px] font-bold text-teal-dark">
                {formatPrice(product.price)}
              </div>
            </div>
          </div>

          <div className="mt-3 font-sans-ui text-[11px] md:text-[12px] leading-[1.5] tracking-[0.08em] text-ink/55 uppercase">
            {product.technicalName}
          </div>

          <p className="mt-4 font-sans-ui text-[16px] leading-[1.7] text-ink/70">
            {product.description}
          </p>

          <div className="mt-5 rounded-[18px] border border-[#EFEFEF] bg-[#FBFFFE] p-4">
            <div className="font-sans-ui text-[11px] tracking-[0.16em] text-ink/40 uppercase">
              Consulta rápida
            </div>
            <p className="mt-2 font-sans-ui text-[14px] leading-[1.6] text-ink/65">
              Comparte esta ficha por WhatsApp y consulta disponibilidad, protocolos o una combinación personalizada.
            </p>
          </div>

          <div className="mt-6">
            <div className="font-sans-ui text-[11px] tracking-[0.16em] text-ink/40 uppercase">
              Beneficios clave
            </div>
            <ul className="mt-3 space-y-2.5">
              {product.benefits.map((benefit) => (
                <li key={benefit} className="flex gap-3 font-sans-ui text-[15px] leading-[1.5] text-ink/80">
                  <span className="mt-[8px] w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-teal text-white font-sans-ui text-[14px] font-medium hover:bg-teal-dark transition"
            >
              Consultar por WhatsApp
            </a>
            <button
              onClick={copyLink}
              className="inline-flex items-center justify-center px-5 py-3 rounded-full border border-[#E8E8E8] font-sans-ui text-[14px] text-ink/70 hover:text-ink hover:border-teal/30 transition"
            >
              {copied ? "Enlace copiado" : "Copiar enlace"}
            </button>
          </div>

          <div className="mt-6 text-[12px] leading-6 text-ink/45 font-sans-ui">
            Ficha informativa para presentación comercial. No sustituye valoración médica.
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-8 md:mt-10">
          <div className="font-serif-display text-[20px] md:text-[24px] mb-4">
            Productos relacionados
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {relatedProducts.map((item) => (
              <button
                key={item.id}
                onClick={() => onOpenProduct(item.id)}
                className="text-left rounded-[18px] border border-[#EFEFEF] bg-white p-4 hover:border-teal/30 hover:shadow-[0_8px_20px_rgba(0,0,0,0.04)] transition"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.commercialName}
                    className="w-12 h-12 object-contain rounded-full bg-[#F7FFFE] border border-[#EEF8F7]"
                  />
                  <div>
                    <div className="font-sans-ui text-[10px] tracking-[0.12em] text-teal font-semibold">
                      {item.commercialTag}
                    </div>
                    <div className="font-serif-display text-[15px] leading-tight font-bold uppercase mt-1">
                      {item.commercialName}
                    </div>
                  </div>
                </div>
                <div className="mt-2 font-sans-ui text-[12px] text-ink/55 leading-[1.4] line-clamp-2">
                  {item.description}
                </div>
                <div className="mt-2 font-serif-display text-[13px] font-bold text-teal-dark">
                  {formatPrice(item.price)}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 rounded-[22px] overflow-hidden border border-[#F1F1F1] bg-[#FAFFFE]">
        <div className="px-5 py-4 flex items-center gap-3">
          <img src={assetPath("images/logo.jpg")} alt="Logo Josué Rangel" className="w-10 h-10 rounded-full object-cover" />
          <div>
            <div className="font-serif-display text-[16px] font-bold">JOSUÉ RANGEL</div>
            <div className="font-sans-ui text-[11px] tracking-[0.16em] text-teal font-semibold">SUEROTERAPIA</div>
          </div>
        </div>
      </div>
    </div>
  );
}
