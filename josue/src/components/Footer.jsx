import { assetPath } from "../utils/assetPath.js";
import { buildWhatsAppLink } from "../utils/whatsapp.js";

const whatsappLink = buildWhatsAppLink(
  "Hola, quiero consultar más información sobre los sueros."
);

export default function Footer() {
  return (
    <footer className="border-t border-[#F0F0F0] bg-[#FAFFFE]">
      <div className="mx-auto max-w-[1200px] px-4 md:px-10 py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="flex gap-4 items-start">
            <img
              src={assetPath("images/logo.jpg")}
              alt="Logo Josué Rangel"
              className="w-12 h-12 rounded-full object-cover border border-[#EFEFEF] shadow-sm"
            />
            <div>
              <div className="font-serif-display text-[16px] font-bold tracking-[0.06em]">
                JOSUÉ RANGEL
              </div>
              <div className="font-sans-ui text-[11px] tracking-[0.18em] text-teal font-semibold">
                SUEROTERAPIA
              </div>
              <div className="mt-3 font-sans-ui text-[15px] md:text-[13px] leading-6 text-ink/60 max-w-[380px]">
                Terapias de hidratación, recuperación y bienestar. Sueros
                personalizados con componentes USP de Vittamol 2026.
              </div>
            </div>
          </div>

          <div className="md:text-right">
            <div className="font-sans-ui text-[11px] tracking-[0.16em] text-ink/40">
              CONTACTO PROFESIONAL
            </div>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex font-sans-ui text-[15px] text-teal-dark hover:underline"
            >
              WhatsApp: +57 323 4085506
            </a>
            <div className="font-sans-ui text-[14px] md:text-[13px] text-ink/60">
              Este catálogo es informativo y no sustituye valoración médica.
            </div>
            <div className="mt-4 inline-flex px-4 py-2 rounded-full bg-ink text-white font-sans-ui text-[12px]">
              Uso exclusivo profesional • No automedicar
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#EFEFEF] flex flex-col md:flex-row justify-between gap-2 font-sans-ui text-[11px] text-ink/40">
          <span>© 2026 Josué Rangel — Sueroterapia | Hidratación • Recuperación • Bienestar</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-teal inline-block" /> Catálogo
            digital para envío a clientes
          </span>
        </div>
      </div>
    </footer>
  );
}
