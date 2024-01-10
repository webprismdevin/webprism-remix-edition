import { vercelStegaCleanAll } from "@sanity/client/stega";
import Body from "../PortableText";
import { urlFor } from "~/sanity/client";
import { SanityImageAssetDocument } from "@sanity/client";
import clsx from "clsx";

export type Layout = {
  text: string;
  justify: string;
  align: string;
  fullHeight: boolean;
};

export type ModuleProps = {
  colorTheme: ColorTheme;
  layout: Layout;
};

export type ModuleImage = SanityImageAssetDocument & {
  alt: string;
  overlay: Color;
};

export type HeroProps = {
  body: any[];
  image: ModuleImage;
} & ModuleProps;

type ColorTheme = {
  accent: Color;
  background: Color;
  text: Color;
};

type Color = {
  hex: string;
  rgb: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
  alpha: number;
};

export default function Hero(props: HeroProps) {
  const layout = vercelStegaCleanAll<Layout>(props.layout);

  return (
    <div
      className={clsx(
        layout.fullHeight && "h-hero",
        "flex flex-col relative p-5 md:p-8 min-h-[450px]"
      )}
      style={{
        background: props.colorTheme?.background.hex,
        color: props.colorTheme?.text.hex,
        // @ts-ignore
        textAlign: layout.text,
        justifyContent: layout.justify,
        alignItems: layout.align,
      }}
    >
      {props.image && props.image?.asset && (
        <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
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
          {props.image.overlay && (
            <div
              style={{
                background: props.image.overlay.hex,
                opacity: props.image.overlay.alpha,
              }}
              className="absolute top-0 left-0 bottom-0 right-0 z-0"
            />
          )}
        </div>
      )}
      <div className="relative z-10">
        <Body value={props.body} />
      </div>
    </div>
  );
}
