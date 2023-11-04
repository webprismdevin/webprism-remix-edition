import { Modules } from "~/components/Modules";

export default function ({ data }: any) {
  return (
    <>
      <Modules modules={data.modules} />
    </>
  );
}
