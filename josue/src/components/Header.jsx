import { DropletsIcon } from "./Icons.jsx";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-[18px] border-b border-[#F0F0F0]">
      <div className="mx-auto max-w-[1200px] px-4 md:px-10 h-[64px] md:h-[88px] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-ink flex items-center justify-center shrink-0">
            <DropletsIcon className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </div>
          <div className="leading-[0.9]">
            <div className="font-serif-display text-[13px] md:text-[15px] font-bold tracking-[0.08em]">
              JOSUÉ RANGEL
            </div>
            <div className="font-sans-ui text-[8px] md:text-[9px] tracking-[0.22em] text-teal font-semibold">
              SUEROTERAPIA
            </div>
          </div>
        </div>
        <div className="font-sans-ui text-[11px] px-3 md:px-4 py-2 rounded-full border border-[#E8E8E8] text-ink/70">
          Catálogo 2026
        </div>
      </div>
    </header>
  );
}
