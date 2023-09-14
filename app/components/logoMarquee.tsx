import { Fragment } from "react";
import { urlFor } from "~/lib/sanity";

const random = () => Math.random().toString(36).substring(7);

export function LogoMarquee({ icon, items }: { icon: any; items: [string] }) {
  return (
    <div className="flex select-none gap-[3rem] overflow-hidden py-4">
      <div className="scroll flex min-w-full flex-shrink-0 items-center justify-around gap-[3rem]">
        {items.map((item: any) => (
          <Fragment key={random()}>
            <div>
              <img
                src={urlFor(item).url()}
                width="128"
                height="128"
                alt={item.name}
                loading="eager"
              />
            </div>
          </Fragment>
        ))}
        {items.map((item: any) => (
          <Fragment key={random()}>
            <div>
              <img
                src={urlFor(item).url()}
                width="128"
                height="128"
                alt={item.name}
                loading="eager"
              />
            </div>
          </Fragment>
        ))}
      </div>
      <div className="scroll flex min-w-full flex-shrink-0 items-center justify-around gap-[3rem]">
        {items.map((item: any) => (
          <Fragment key={random()}>
            <div>
              <img
                src={urlFor(item).url()}
                width="128"
                height="128"
                alt={item.name}
                loading="eager"
              />
            </div>
          </Fragment>
        ))}
        {items.map((item: any) => (
          <Fragment key={random()}>
            <div>
              <img
                src={urlFor(item).width(128).url()}
                width="128"
                height="128"
                alt={item.name}
                loading="eager"
              />
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
