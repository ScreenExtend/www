import { EmptyBox } from "@/components/home/drawings.tsx";

// The packing list, honestly filled in: what you actually get. Facts: free app
// for Windows and Mac; the app shows a QR code and link; a device joins with the
// session's 6-digit code, which can be renewed (FaqSimple.tsx).
const CONTENTS: [string, string][] = [
  ["ScreenExtend, for your Windows PC or Mac", "The only thing you install."],
  ["A QR code and a link", "The app shows them. They're how the other device finds your computer."],
  ["A 6-digit code", "Without it, nobody else's tablet can join. Make a new one whenever you like."],
];

export default function InTheBox() {
  return (
    <section id="box" className="bg-spot py-16 text-white lg:py-24">
      <div className="container grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <EmptyBox className="mx-auto w-full max-w-md" />
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <h2 className="display-lg">What's in the box</h2>
          <p className="mt-3 max-w-[34ch] text-xl leading-snug">
            Nothing you can hold. It's a download, and this is everything in it.
          </p>

          <ul className="mt-10 border-y-2 border-white" aria-label="Contents">
            {CONTENTS.map(([item, note]) => (
              <li key={item} className="grid grid-cols-[3.25rem_1fr] gap-x-2 border-t border-white py-4 first:border-t-0">
                <span className="condensed tabular text-3xl font-extrabold leading-none" aria-hidden="true">
                  1×
                </span>
                <p className="leading-snug">
                  <span className="sr-only">One </span>
                  <span className="wide font-bold">{item}</span>
                  <span className="mt-1 block">{note}</span>
                </p>
              </li>
            ))}
          </ul>

          <p className="mt-8 border-l-4 border-lime pl-4 leading-snug">
            <span className="wide font-bold">You'll also need</span> something with a web browser to
            be the second screen. That part you already own.
          </p>
        </div>
      </div>
    </section>
  );
}
