const SectionHead = ({ eyebrow, title, meta }) => (
  <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-7">
    <div>
      <p className="text-eyebrow mb-2 flex items-center gap-1.5 uppercase text-muted-foreground">{eyebrow}</p>
      <h2 className="text-[clamp(1.6rem,3.2vw,2.4rem)] font-medium tracking-tight text-foreground">{title}</h2>
    </div>
    {meta ? <p className="text-meta text-placeholder">{meta}</p> : null}
  </div>
);

export default SectionHead;
