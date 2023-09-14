import { Fragment } from "react";
import { urlFor } from "~/lib/sanity";

const random = () => Math.random().toString(36).substring(7);

export function Marquee({
  icon,
  items,
  reverse,
}: {
  icon: any;
  items: [string];
  reverse?: boolean;
}) {
  return (
    <div className="flex select-none gap-[3rem] overflow-hidden py-4">
      <div
        className={`${
          reverse && "reverse"
        } scroll flex min-w-full flex-shrink-0 items-center justify-around gap-[3rem]`}
      >
        {items.map((item: any) => (
          <Fragment key={random()}>
            <div>
              <span className="font-heading text-4xl uppercase">{item}</span>
            </div>
            <div>
              <img
                src={urlFor(icon).url()}
                width="36px"
                height="36px"
                alt="decorative icon"
                loading="lazy"
              />
            </div>
          </Fragment>
        ))}
        {items.map((item: any) => (
          <Fragment key={random()}>
            <div>
              <span className="font-heading text-4xl uppercase">{item}</span>
            </div>
            <div>
              <img
                src={urlFor(icon).url()}
                width="36px"
                height="36px"
                alt="decorative icon"
                loading="lazy"
              />
            </div>
          </Fragment>
        ))}
      </div>
      <div
        className={`${
          reverse && "reverse"
        }  scroll flex min-w-full flex-shrink-0 items-center justify-around gap-[3rem]`}
      >
        {items.map((item: any) => (
          <Fragment key={random()}>
            <div>
              <span className="font-heading text-4xl uppercase">{item}</span>
            </div>
            <div>
              <img
                src={urlFor(icon).url()}
                width="36px"
                height="36px"
                alt="decorative icon"
                loading="lazy"
              />
            </div>
          </Fragment>
        ))}
        {items.map((item: any) => (
          <Fragment key={random()}>
            <div>
              <span className="font-heading text-4xl uppercase">{item}</span>
            </div>
            <div>
              <img
                src={urlFor(icon).url()}
                width="36px"
                height="36px"
                alt="decorative icon"
                loading="lazy"
              />
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
