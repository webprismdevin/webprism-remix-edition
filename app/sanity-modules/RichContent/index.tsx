import { vercelStegaCleanAll } from "@sanity/client/stega";
import { Layout, ModuleProps } from "../Hero";
import Body from "../PortableText";
import clsx from "clsx";

type RichContentModule = {
  body: any[];
} & ModuleProps;

export default function RichContent(props: RichContentModule) {
  const layout = vercelStegaCleanAll<Layout>(props?.layout ?? {});

  console.log({ layout });

  return (
    <div
      className={clsx(
        layout.fullHeight && "h-hero",
        "p-5 md:p-8 flex flex-col mx-auto"
      )}
      style={{
        background: props.colorTheme?.background.hex,
        color: props.colorTheme?.text.hex,
        // @ts-ignore
        textAlign: layout?.text ?? "left",
        justifyContent: layout?.justify ?? "center",
        alignItems: layout?.align ?? "center",
      }}
    >
      <div className={clsx(layout?.align !== "center" && "mx-auto", "max-w-screen-lg")}>
        <Body value={props.body} />
      </div>
    </div>
  );
}
