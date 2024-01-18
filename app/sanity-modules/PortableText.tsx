import { Disclosure } from "@headlessui/react";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { Link } from "@remix-run/react";
import { vercelStegaSplit } from "@vercel/stega";
import clsx from "clsx";
import { urlFor } from "~/sanity/client";
import { NavArrowDown } from "~/components/Icon";
import { useRef } from "react";
import { useInView, motion } from "framer-motion";

const myPortableTextComponents: PortableTextComponents = {
  list: {
    bullet: ({ children }) => <ul className="mt-xl">{children}</ul>,
    number: ({ children }) => <ol className="mt-lg">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="ml-8 list-disc">{children}</li>,
    number: ({ children }) => <li className="ml-8 list-decimal">{children}</li>,
  },
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
    normal: ({ children }) => {
      // @ts-ignore
      if (children[0] == "") return <br className="h-8" />;

      return <p className="text-base">{children}</p>;
    },
  },
  marks: {
    color: ({ children, value }) => {
      return <span style={{ color: value?.hex ?? "inherit" }}>{children}</span>;
    },
    shadow: ({ children, value }) => {
      return <span className="drop-shadow-md">{children}</span>;
    },
    linkInternal: ({ children, value }) => {
      return <Link to={value?.to ?? "/"}>{children}</Link>;
    },
    linkExternal: ({ children, value }) => {
      return (
        <a
          className="w-full"
          target={value?.newWindow ? "_blank" : "_self"}
          href={value?.url ?? "/"}
        >
          {children}
        </a>
      );
    },
    textRight: ({ children }) => {
      return <span className="justify-self-end">{children}</span>;
    },
    textCenter: ({ children }) => {
      return <span className="justify-self-center">{children}</span>;
    },
    textLeft: ({ children }) => {
      return <span className="justify-self-start">{children}</span>;
    },
  },
  types: {
    buttons: ({ value }) => {
      return (
        <div
          className={clsx(value.center && "justify-center", "flex gap-3 mt-2")}
        >
          {value?.buttons?.map((button: any) => {
            if (button._type == "linkInternal") {
              return (
                <Link
                  key={button._key}
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
                key={button._key}
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
      const ref = useRef<HTMLImageElement>(null);

      const isInView = useInView(ref, { once: true });

      if (!value?.asset) return null;

      return (
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          ref={ref}
          src={urlFor(value?.asset).url()}
          alt={value?.alt}
          style={{ aspectRatio: value?.aspectRatio ?? "[4/5]" }}
          className={"w-full h-full object-cover"}
        />
      );
    },
    columns: ({ value }) => {
      return (
        <div
          key={value._key}
          className="flex flex-col md:flex-row justify-around gap-3 md:gap-12 mt-3 w-full"
        >
          {value?.columns?.map((column: any) => {
            return (
              <div
                key={column._key}
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
          data-botpoison-public-key="pk_f7d9a478-bf2d-4ae9-9227-cc4cc2fcbc4e"
        >
          {value.fields.map((field: any) => {
            return (
              <div className="flex flex-col gap-2" key={field._key}>
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
    accordions: ({ value }) => {
      return (
        <div className="flex flex-col gap-3 mt-3 w-full md:min-w-[65ch] max-w-prose mx-auto text-left border-t">
          {value?.groups?.map((accordion: any) => {
            return (
              <Disclosure
                as="div"
                className="border-b py-2"
                key={accordion._key}
              >
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between w-full">
                      <span className="font-bold">{accordion.title}</span>
                      <NavArrowDown
                        className={clsx(open && "transform rotate-180")}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="pt-1">
                      <PortableText
                        value={accordion?.body}
                        components={myPortableTextComponents}
                      />
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            );
          })}
        </div>
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
