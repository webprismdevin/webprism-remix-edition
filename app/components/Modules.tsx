import { PortableText, PortableTextComponents } from "@portabletext/react";
import { Marquee } from "~/components/marquee";
import Slides from "~/components/slides";
import { LogoMarquee } from "~/components/logoMarquee";
import { Testimonials } from "~/components/Testimonials";
import { urlFor } from "~/lib/sanity";
import { Button, buttonStyles } from "~/components/Button";
import { SanityImageAssetDocument } from "@sanity/client";
import { ReactNode } from "react";
import { Link } from "@remix-run/react";

export const sectionPadding = "p-6 py-12 md:p-12 lg:p-24";

export function Divider() {
  return <div className={`mx-6 md:mx-12 lg:mx-24 h-0.5 bg-white`} />;
}

export function Heading({
  children,
  size,
  className,
}: {
  children: ReactNode;
  size?: "small" | "large" | "super";
  className?: string;
}) {
  const mainHeadingStyles = "font-heading leading-tight";

  switch (size) {
    case "small":
      return (
        <h3
          className={`${mainHeadingStyles} text-2xl md:text-4xl ${className}`}
        >
          {children}
        </h3>
      );
    case "large":
      return (
        <h2
          className={`${mainHeadingStyles} text-4xl md:text-6xl ${className}`}
        >
          {children}
        </h2>
      );
  }
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
          case "contact":
            return <Contact key={module._key} {...module} />;
          default:
            return null;
        }
      })}
    </div>
  );
}

{
  /*
TODO
- add size option to hero
- remove blockIterator
*/
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
        {/* this was dumb, rebuild to static-ish */}
        {data.blocks.map((block: BlockProps) =>
          blockIterator(block, data.colorTheme)
        )}
      </div>
      {data.image && (
        <img
          //prettier-ignore
          srcSet={`
          ${urlFor(data.image).quality(60).width(320).format('webp').url()} 320w,
          ${urlFor(data.image).quality(60).width(640).format('webp').url()} 640w,
          ${urlFor(data.image).quality(60).width(768).format('webp').url()} 768w,
          ${urlFor(data.image).quality(60).width(1024).format('webp').url()} 1024w,
          ${urlFor(data.image).quality(60).width(1280).format('webp').url()} 1280w,
          ${urlFor(data.image).quality(60).width(1536).format('webp').url()} 1536w,
          ${urlFor(data.image).quality(60).width(1920).format('webp').url()} 1920w,
          ${urlFor(data.image).quality(60).width(2560).format('webp').url()} 2560w,
          ${urlFor(data.image).quality(60).width(3840).format('webp').url()} 3840w
        `}
          sizes={"100vw"}
          src={urlFor(data.image).quality(90).format("webp").url()}
          className="object-cover absolute top-0 left-0 object-center h-full w-full md:aspect-video z-0"
        />
      )}
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
        <p className="text-title font-bold">{subtitle}</p>
      </div>
      <div className="max-w-prose md:px-20 md:py-[6.25rem]">
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

export function Columns({ columns, title, subtitle, colorTheme }) {
  const colorThemeStyles = {
    background: colorTheme?.background?.hex,
    color: colorTheme?.text?.hex,
  };

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
    <div className={`${sectionPadding}`} style={colorThemeStyles}>
      <Heading size="large" className="text-center mb-8">
        {title}
      </Heading>
      <div className={`grid grid-cols-1 ${columnCount()} gap-4 items-center`}>
        {columns.map((column: Column) => {
          const columnLayout = `
            ${column.layout === "left" && "md:text-left"} 
            ${column.layout === "right" && "md:text-right"}
            ${column.layout === "center" && "md:text-center"}
          `;

          const columnColorTheme = {
            background: column.colorTheme?.background?.hex,
            color: column.colorTheme?.text?.hex,
          };

          if (!column.image?.link)
            return (
              <div
                key={column._key}
                style={columnColorTheme}
                className={`w-full p-4 md:p-6 lg:p-8 relative max-w-prose mx-auto text-center grid place-items-center aspect-square ${columnLayout}`}
              >
                <img
                  //prettier-ignore
                  src={urlFor(column.image).height(800).width(800).quality(90).format("webp").url()}
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  className="absolute z-0 top-0 left-0 w-full h-full "
                  loading="lazy"
                />
                <div className="relative z-10">
                  <Heading size="small" className="text-center text-shadow">
                    {column.title}
                  </Heading>
                </div>
              </div>
            );

          return (
            <Link
              to={column.image?.link}
              key={column._key}
              style={columnColorTheme}
              className={`w-full p-4 md:p-6 lg:p-8 relative max-w-prose mx-auto text-center grid place-items-center aspect-square ${columnLayout}`}
            >
              <img
                //prettier-ignore
                src={urlFor(column.image).height(800).width(800).quality(90).format("webp").url()}
                style={{ objectFit: "cover", objectPosition: "center" }}
                className="absolute z-0 top-0 left-0 w-full h-full "
                loading="lazy"
              />
              <div className="relative z-10">
                <Heading size="small" className="text-center text-shadow">
                  {column.title}
                </Heading>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

// export const inputStyle =
//   "w-full shadow-md p-2 rounded md:px-4 lg:px-4 bg-white/25 border-2 border-white focus:bg-white";

export function Contact({
  title,
  subtitle,
  fields,
  colorTheme,
  submit,
}: {
  title: string;
  subtitle: string;
  fields: [any];
  colorTheme: ColorTheme;
  submit: any;
}) {
  return (
    <div
      className={sectionPadding}
      style={{
        background: colorTheme?.background?.hex,
        color: colorTheme?.text?.hex,
      }}
    >
      <Heading size="large">{title}</Heading>
      <p className="text-title font-bold mb-8">{subtitle}</p>
      <ContactForm fields={fields} submit={submit} colorTheme={colorTheme} />
    </div>
  );
}

export function ContactForm({ fields, submit, colorTheme }) {
  const inputClass = "w-full border-b-2 p-2 md:px-4",
    inputStyle = {
      borderColor: colorTheme?.accent.hex,
      background: "transparent",
      color: colorTheme?.text.hex,
      outlineColor: "transparent",
      "outlineColor&:focus": {
        outlineColor: colorTheme?.accent.hex,
      },
    };

  return (
    <form
      className="grid grid-cols-1 md:grid-cols-2 gap-4 place-items-start"
      action="https://submit-form.com/hF7Ye4Ew"
    >
      {fields.map((field) => {
        switch (field.type) {
          case "text":
            return (
              <input
                key={field._key}
                style={inputStyle}
                className={`col-span-1 ${inputClass}`}
                type={field.type}
                placeholder={field.label}
                required={field.required ?? false}
                name={field.label}
              />
            );
          case "email":
            return (
              <input
                key={field._key}
                style={inputStyle}
                className={`col-span-1 ${inputClass}`}
                type={field.type}
                placeholder={field.label}
                required={field.required ?? false}
                name={field.label}
              />
            );
          case "radio":
            return (
              <div className="flex gap-2 p-2 md:px-4" key={field._key}>
                <label htmlFor={field.label}>{field.label}</label>
                {field.options.map((option) => (
                  <label key={option._key} htmlFor={field.label}>
                    <input
                      type="radio"
                      name={field.label}
                      value={option.value}
                    />
                    <span className="pl-1">{option.label}</span>
                  </label>
                ))}
              </div>
            );
          case "textarea":
            return (
              <textarea
                key={field._key}
                style={inputStyle}
                className={`col-span-1 md:col-span-2 ${inputClass}`}
                placeholder={field.label}
                rows={5}
                required={field.required ?? false}
                name={field.label}
              />
            );
          case "select":
            return (
              <select
                key={field._key}
                className={inputClass}
                placeholder={field.placeholder}
              />
            );
        }
      })}
      <button
        className={`${buttonStyles} items-center min-w-[150px]`}
        type="submit"
      >
        {submit}
      </button>
    </form>
  );
}

export type Column = {
  _key: string;
  _type: "column";
  layout: "left" | "right" | "center";
  title: string;
  image: SanityImageAssetDocument & {
    alt: string;
    link: string;
  };
  colorTheme: ColorTheme;
  body: any;
};

export type ColorTheme = {
  accent: {
    _type: "color";
    hex: string;
  };
  background: {
    _type: "color";
    hex: string;
  };
  text: {
    _type: "color";
    hex: string;
  };
};
