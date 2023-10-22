import { PortableText, PortableTextComponents } from "@portabletext/react";
import { Marquee } from "~/components/marquee";
import Slides from "~/components/slides";
import { LogoMarquee } from "~/components/logoMarquee";
import { Testimonials } from "~/components/Testimonials";
import { urlFor } from "~/lib/sanity";
import { Button } from "~/components/Button";

export const sectionPadding = "p-6 py-12 md:p-12 lg:p-24";

export function Divider() {
  return <div className={`mx-6 md:mx-12 lg:mx-24 h-0.5 bg-white`} />;
}

export function Heading({ children }) {
  return <h2 className="text-4xl font-heading">{children}</h2>;
}

type BlockProps = {
  _type: "title" | "subtitle" | "body" | "cta";
  value: any;
  url?: string;
  label?: string;
  _key: string;
  style?: "regular" | "super";
};

const blockIterator = (block: BlockProps, colorTheme: any) => {
  switch (block._type) {
    case "title":
      return (
        <h1
          key={block._key}
          className={`font-heading ${
            block.style === "super" ? "text-super" : "text-heading"
          } leading-[5.25rem] max-w-prose`}
          dangerouslySetInnerHTML={{
            __html: block.value,
          }}
        />
      );
    case "subtitle":
      return (
        <h3
          key={block._key}
          className={`max-w-prose ${
            block.style === "super"
              ? "text-heading font-heading"
              : "text-subheading font-heading"
          }`}
          dangerouslySetInnerHTML={{
            __html: block.value,
          }}
        />
      );
    case "body":
      return (
        <div className="max-w-prose" key={block._key}>
          <PortableText value={block.value} />
        </div>
      );
    case "cta":
      return (
        <Button
          variant="hero"
          url={block.url!}
          colorTheme={colorTheme}
          key={block._key}
        >
          {block.label}
        </Button>
      );
  }
};

export function Modules({ modules }) {
  return (
    <div>
      {modules.map((module) => {
        switch (module._type) {
          case "textHero":
            return <TextHero key={module._key} data={module} {...module} />;
          case "statement":
            return <Statement key={module._key} {...module} />;
          case "hero":
            return <Hero key={module._key} {...module} />;
          case "textWithImage":
            return <TextWithImage key={module._key} {...module} />;
          case "marquee":
            return <Marquee key={module._key} {...module} />;
          case "logoMarquee":
            return <LogoMarquee key={module._key} {...module} />;
          case "slides":
            return <Slides key={module._key} {...module} />;
          case "columns":
            return <Columns key={module._key} {...module} />;
          case "testimonials":
            return <Testimonials key={module._key} {...module} />;
          case "divider":
            return <Divider key={module._key} />;
          // case "contact":
          //   return <Contact key={module._key} {...module} />;
          default:
            return null;
        }
      })}
    </div>
  );
}

export function TextHero({ data }) {
  return (
    <div
      className="relative h-screen-peak overflow-hidden"
      style={{
        background: data.colorTheme?.background?.hex,
        color: data.colorTheme?.text?.hex,
      }}
    >
      <div
        className={`${sectionPadding} relative flex flex-col justify-end items-start z-10 w-full h-full`}
      >
        {data.blocks.map((block: BlockProps) =>
          blockIterator(block, data.colorTheme)
        )}
      </div>
      <img
        src={urlFor(data.image).url()}
        className="object-cover absolute top-0 left-0 object-center h-full md:w-full md:aspect-video z-0"
      />
    </div>
  );
}

// not currently in use
export function Hero({ title, subtitle, image }) {
  return (
    <div className="relative h-[500px] overflow-hidden">
      <div
        className={`${sectionPadding} relative flex flex-col justify-center items-start z-10 w-full h-full`}
      >
        <h1 className="font-heading">{title}</h1>
        <h2 className="text-lg md:text-xl lg:text-2xl">{subtitle}</h2>
      </div>
      <img
        src={urlFor(image).url()}
        className="object-cover absolute top-0 left-0 object-center h-full md:w-full md:aspect-video z-0"
      />
    </div>
  );
}

export const portableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="my-4 lowercase text-4xl font-heading">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="my-4 lowercase text-3xl font-heading">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="my-4 lowercase text-2xl font-heading">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="my-4 lowercase text-xl font-heading">{children}</h4>
    ),
    normal: ({ children }) => <p className="my-4">{children}</p>,
  },
  types: {
    image: ({ value }) => <img className="my-8" src={urlFor(value).url()} />,
  },
  list: {
    // Ex. 1: customizing common list types
    bullet: ({ children }) => <ul className="mt-xl">{children}</ul>,
    number: ({ children }) => <ol className="mt-lg">{children}</ol>,

    // Ex. 2: rendering custom lists
    checkmarks: ({ children }) => (
      <ol className="m-auto text-lg">{children}</ol>
    ),
  },
  listItem: {
    // Ex. 1: customizing common list types
    bullet: ({ children }) => <li className="list-disc ml-6">{children}</li>,
    number: ({ children }) => <li className="list-decimal ml-6">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
  },
};

export function Statement({ title, subtitle, body, colorTheme }) {
  return (
    <div
      style={{
        background: colorTheme?.background?.hex,
        color: colorTheme?.text?.hex,
      }}
      className="grid grid-cols-1 md:grid-cols-2 px-5 py-[3.75rem]"
    >
      <div className="md:px-20 md:py-[6.25rem]">
        <h2 className="font-heading text-heading md:text-super">{title}</h2>
      </div>
      <div className="max-w-prose md:px-20 md:py-[6.25rem]">
        <p className="text-title font-bold">{subtitle}</p>
        <PortableText components={portableTextComponents} value={body} />
      </div>
    </div>
  );
}

export function TextWithImage({ data, blocks }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div
        className={`${sectionPadding} grid place-items-center ${
          data?.layout === "left" && "order-2"
        }`}
      >
        {blocks.map((block: BlockProps) =>
          blockIterator(block, data.colorTheme)
        )}
      </div>
      {/* <div className={`${data.layout === "left" && "order-1"}`}>
        {data.image && <img
          src={urlFor(data.image).url()}
          className="object-cover w-full h-full"
        />}
      </div> */}
    </div>
  );
}

export function Columns({ columns, title, subtitle }) {
  const columnCount = () => {
    switch (columns.length) {
      case 1:
        return "md:grid-cols-1";
      case 2:
        return "md:grid-cols-2";
      case 3:
        return "md:grid-cols-3";
      case 4:
        return "md:grid-cols-4";
      default:
        return "md:grid-cols-1";
    }
  };

  return (
    <div className={`${sectionPadding}`}>
      <Heading>{title}</Heading>
      <div
        className={`grid grid-cols-1 ${columnCount()} md:gap-4 items-center`}
      >
        {columns.map((column) => {
          return (
            <div
              key={column._key}
              className={`p-4 md:p-6 lg:p-8 max-w-prose mx-auto text-center leading-loose ${
                column.layout === "left" && "md:text-left"
              } ${column.layout === "right" && "md:text-right"}
                  ${column.layout === "center" && "md:text-center"}
                    `}
            >
              <Heading>{column.title}</Heading>
              <PortableText
                components={portableTextComponents}
                value={column.body}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const inputStyle =
  "w-full shadow-md p-2 rounded md:px-4 lg:px-4 bg-white/25 border-2 border-white focus:bg-white";
