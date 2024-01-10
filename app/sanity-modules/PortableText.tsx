import { PortableText, PortableTextComponents } from "@portabletext/react";
import { Link } from "@remix-run/react";
import { vercelStegaSplit } from "@vercel/stega";
import { urlFor } from "~/sanity/client";

const myPortableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="font-heading text-6xl md:text-8xl">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-heading text-4xl md:text-6xl">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-heading text-2xl md:text-4xl">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-heading text-lg md:text-2xl">{children}</h4>
    ),
    h5: ({ children }) => (
      <h5 className="font-heading text-sm md:text-lg">{children}</h5>
    ),
    h6: ({ children }) => (
      <h6 className="font-heading text-xs md:text-sm">{children}</h6>
    ),
  },
  marks: {
    color: ({ children, value }) => {
      return <span style={{ color: value?.hex ?? "inherit" }}>{children}</span>;
    },
    shadow: ({ children, value }) => {
      return <span className="drop-shadow-md">{children}</span>;
    },
    linkInternal: ({ children, value }) => {
      console.log(value)

      return (
        <Link to={value?.to ?? "/"}>
          {children}
        </Link>
      );
    },
  },
  types: {
    buttons: ({ value }) => {
      console.log({ value });

      return (
        <div className="flex gap-3 mt-2">
          {value?.buttons?.map((button: any) => {
            if (button._type == "linkInternal") {
              return (
                <Link
                  to={button?.to}
                  className="bg-black text-white px-4 py-2 rounded-full drop-shadow-sm"
                  style={{
                    background: button?.color?.hex ?? "white",
                    color: button?.text?.hex ?? "black",
                  }}
                >
                  {button.title}
                </Link>
              );
            }

            return (
              <a
                href={button?.url}
                className="bg-black text-white px-4 py-2 rounded-full drop-shadow-sm"
                style={{
                  background: button?.color?.hex ?? "white",
                  color: button?.text?.hex ?? "black",
                }}
              >
                {button?.title}
              </a>
            );
          })}
        </div>
      );
    },
    image: ({ value }) => {
      return (
        <div
          className="w-full md:w-[80%] h-full relative"
          style={{ aspectRatio: value?.aspectRatio ?? "auto" }}
        >
          <img
            src={urlFor(value?.asset).url()}
            alt={value?.alt}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      );
    },
    columns: ({ value }) => {
      return (
        <div className="flex flex-col md:flex-row justify-around gap-8 md:gap-3 mt-3">
          {value?.columns?.map((column: any) => {
            return (
              <div
                className="flex-1 flex flex-col gap-2"
                style={{
                  textAlign: value.layout?.textAlign ?? "center",
                  justifyContent: value.layout?.justify ?? "center",
                  alignItems: value.layout?.align ?? "center",
                }}
              >
                <PortableText
                  value={column?.body}
                  components={myPortableTextComponents}
                />
              </div>
            );
          })}
        </div>
      );
    },
    form: ({ value }) => {
      const { cleaned, encoded } = vercelStegaSplit(value?.htmlId ?? "form");

      return (
        <form
          id={cleaned}
          className="grid grid-cols-1 gap-3 mt-3 w-full md:min-w-[65ch] max-w-prose mx-auto text-left"
          action={value?.action}
        >
          {value.fields.map((field: any) => {
            return (
              <div className="flex flex-col gap-2">
                <label htmlFor={field.name}>{field.label}</label>
                <input
                  placeholder={field?.placeholder}
                  className="border-2 border-black/10 rounded-sm py-2 px-2"
                  type={field.type}
                  name={field.name}
                  id={field.name}
                />
              </div>
            );
          })}
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-full drop-shadow-sm"
          >
            Submit
          </button>
        </form>
      );
    },
  },
};

// @ts-ignore
const Body = ({ value }) => {
  // @ts-ignore
  return <PortableText value={value} components={myPortableTextComponents} />;
};

export default Body;
