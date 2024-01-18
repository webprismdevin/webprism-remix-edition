import Columns from "../Columns";
import Hero from "../Hero";
import TextWithImage from "../TextWithImage";
import type { SanityDocument, SanityImageAssetDocument } from "@sanity/client";

export type Modules = {
  modules: Module[];
};

export type ModuleProps = {
  colorTheme: ColorTheme;
  layout: Layout;
};

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

export type Layout = {
  text: string;
  justify: string;
  align: string;
  fullHeight: boolean;
};

export type ModuleImage = SanityImageAssetDocument & {
  alt: string;
  overlay: Color;
};

export type Module = SanityDocument & ModuleProps;

const ModuleSwitch = (module: Module) => {
  switch (module._type) {
    case "hero":
      // @ts-ignore
      return <Hero key={module._key} {...module} />;
    case "textWithImage":
      return <TextWithImage key={module._key} {...module} />;
    case "columns":
      return <Columns key={module._key} {...module} />;
    default:
      return <div key={module._key}>{module._type}</div>;
  }
};

export default function Modules(props: Module) {
  return <>{props.modules.map((module: Module) => ModuleSwitch(module))}</>;
}
