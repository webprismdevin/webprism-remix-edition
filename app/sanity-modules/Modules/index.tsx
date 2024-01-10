import Columns from "../Columns";
import Hero, { HeroProps, ModuleProps } from "../Hero";
import RichContent from "../RichContent";
import TextWithImage from "../TextWithImage";
import type { SanityDocument } from "@sanity/client";

export type ModulesProps = {
  modules: Module[];
};

export type Module = SanityDocument & ModuleProps;

const ModuleSwitch = (module: Module) => {
  switch (module._type) {
    case "hero":
      return <Hero key={module._key} {...module} />;
    case "textWithImage":
      return <TextWithImage key={module._key} {...module} />;
    case "richContent":
      return <RichContent key={module._key} {...module} />;
    case "columns":
      return <Columns key={module._key} {...module} />;
    default:
      return <div key={module._key}>{module._type}</div>;
  }
};

export default function Modules(props: ModulesProps) {
  return <>{props.modules.map((module) => ModuleSwitch(module))}</>;
}
