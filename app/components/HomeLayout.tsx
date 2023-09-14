import { TextHero, Modules } from "~/routes/_index";

export default function ({data}: any) {
  return (
    <>
      <div
        className="grid place-content-center p-4 absolute top-0 left-0 right-0 w-screen z-50"
      >
        <div className="font-heading uppercase text-cta">webprism</div>
      </div>
      <Modules modules={data.modules} />
    </>
  );
}
