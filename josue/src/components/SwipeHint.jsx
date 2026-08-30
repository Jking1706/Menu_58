export default function SwipeHint() {
  return (
    <div className="md:hidden mx-auto max-w-[1200px] w-full px-4 pb-3 flex justify-center">
      <div className="inline-flex items-center gap-2 font-sans-ui text-[13px] px-4 py-2 rounded-full bg-[#E8FFFE] border border-[#C9F2EF] text-teal-dark">
        <span>Desliza</span>
        <span className="inline-block animate-slideHint">→</span>
      </div>
    </div>
  );
}
