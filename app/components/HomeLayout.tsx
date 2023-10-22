import { Modules } from "~/components/Modules";

export default function ({ data }: any) {
  return (
    <>
      <div className="grid place-content-center p-4 absolute top-0 left-0 right-0 z-50">
        <div className="font-heading uppercase text-cta text-white">
          webprism
        </div>
      </div>
      <Modules modules={data.modules} />
    </>
  );
}
