import { urlFor } from "~/sanity/client";
import { ModuleImage, ModuleProps } from "../Hero";
import Body from "../PortableText";
import { vercelStegaCleanAll } from "@sanity/client/stega";
import clsx from "clsx";

export type TextWithImageProps = {
  body: any[];
  image: ModuleImage;
  flip: boolean;
} & ModuleProps;

export default function TextWithImage(props: TextWithImageProps) {
  const layout = vercelStegaCleanAll(props?.layout ?? {});

  return (
    <div
      className={clsx(
        layout.fullHeight && "h-hero",
        "grid grid-cols-1 md:grid-cols-2"
      )}
      style={{
        background: props.colorTheme?.background.hex,
        color: props.colorTheme?.text.hex,
      }}
    >
      <div
        className={clsx(
          props.flip && "md:order-1",
          "overflow-hidden h-full relative"
        )}
      >
        {props?.image && props.image?.asset && (
          <img
            src={urlFor(props.image).width(320).format("webp").url()}
            alt={props.image.alt ?? "decorative"}
            className="object-cover min-h-full min-w-full"
            srcSet={`
            ${urlFor(props.image).width(320).format("webp").url()} 320w,
            ${urlFor(props.image).width(640).format("webp").url()} 640w,
            ${urlFor(props.image).width(1280).format("webp").url()} 1280w,
            ${urlFor(props.image).width(1920).format("webp").url()} 1920w,
            ${urlFor(props.image).width(2560).format("webp").url()} 2560w,
            ${urlFor(props.image).width(3840).format("webp").url()} 3840w,
          `}
            sizes="100vw"
          />
        )}
        {props.image?.overlay && (
          <div
            style={{
              background: props.image.overlay.hex,
              opacity: props.image.overlay.alpha,
            }}
            className="absolute top-0 left-0 bottom-0 right-0 z-0"
          />
        )}
      </div>
      <div
        className="p-5 md:p-8 flex flex-col mx-auto w-full"
        style={{
          // @ts-ignore
          textAlign: layout?.text ?? "left",
          justifyContent: layout?.justify ?? "center",
          alignItems: layout?.align ?? "flex-start",
        }}
      >
        <Body value={props.body} />
      </div>
    </div>
  );
}
