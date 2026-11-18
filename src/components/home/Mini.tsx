// A tiny version of the hero's arrangement panel: numbered screens in the logo
// colours, each labelled with what is on it. Used to show each use case.
export type MiniScreen = { n: 1 | 2 | 3; label: string };

const LOOK = {
  1: "bg-logo-blue text-white aspect-[16/10] w-[58%]",
  2: "bg-logo-mint text-[#0f1419] aspect-[3/4] w-[26%]",
  3: "bg-lime text-[#0f1419] aspect-[1/2] w-[13%]",
} as const;

export default function Mini({ screens, link }: { screens: MiniScreen[]; link?: string }) {
  return (
    <div aria-hidden="true" className="flex items-end gap-[2%] rounded-panel bg-surface p-[6%]">
      {screens.map((s, i) => (
        <div key={s.n} className="contents">
          {link && i === 1 && (
            <span className="mb-[6%] flex-1 self-center border-t-2 border-dashed border-muted text-center text-[0.65rem] leading-none text-muted">
              <span className="relative -top-2 bg-surface px-1">{link}</span>
            </span>
          )}
          <div className={`flex flex-col justify-between rounded-[5px] p-[3%] ${LOOK[s.n]}`}>
            <span className="text-sm font-semibold leading-none">{s.n}</span>
            <span className="text-[0.7rem] font-medium leading-tight">{s.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
