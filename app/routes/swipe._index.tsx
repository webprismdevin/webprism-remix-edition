import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import clsx from "clsx";
import groq from "groq";
import {
  ArrowRight,
  CarouselIcon,
  GridIcon,
  ListIcon,
  OpenInNew,
} from "~/components/Icon";
import { EmailForm } from "~/components/Subscribe";
import cn from "~/lib/cn";
import Body from "~/sanity-modules/PortableText";
import { urlFor } from "~/sanity/client";
import { useQuery } from "~/sanity/loader";
import { loadQuery } from "~/sanity/loader.server";
import { isStegaEnabled } from "~/sanity/projectDetails";

type Swipe = {};

export const meta = () => {
  return [
    { title: "Our E-com Web Design Swipe File" },
    { name: "description", content: "Our design inspiration swipe file." },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const stegaEnabled = isStegaEnabled(request.url);
  const url = new URL(request.url);
  const searchQuery = url.searchParams.get("q") ?? "*";
  const viewMode = url.searchParams.get("viewMode") ?? "grid";

  const perspective = stegaEnabled ? "previewDrafts" : "published";

  const { data: initial } = await loadQuery<Swipe[]>(
    SWIPE_QUERY,
    {
      q: searchQuery == "" ? "*" : searchQuery.toLowerCase() ?? "*",
    },
    { perspective }
  );

  return json({
    initial,
    searchQuery,
    viewMode: viewMode as ViewMode,
  });
}

type ViewMode = "grid" | "carousel" | "list";

export default function Swipe() {
  const { initial, searchQuery, viewMode } = useLoaderData<typeof loader>();

  const { data: live_data, loading } = useQuery<Swipe[]>(
    SWIPE_QUERY,
    {
      searchQuery: searchQuery == "" ? "*" : searchQuery.toLowerCase() ?? "*",
    },
    // @ts-expect-error
    { initial }
  );

  const data = loading || !live_data ? initial : live_data;

  return (
    <>
      <div className="md:hidden p-5">
        <h1 className="font-heading text-4xl text-right">Sites that inspire us</h1>
      </div>
      <Form
        preventScrollReset={true}
        className="w-full flex flex-col-reverse md:flex-row justify-between items-end p-4 md:p-8 gap-3 sticky top-[72px] z-10 bg-white border-b"
      >
        <div className="border border-slate-300 rounded-sm flex">
          <input
            name="q"
            type="search"
            placeholder="Search..."
            className="px-3 py-2 max-w-[168px]"
          />
          <button
            type="submit"
            className="pr-2 pl-3 flex items-center bg-slate-200"
          >
            Go&nbsp;
            <ArrowRight className="inline" height={"1rem"} width={"1rem"} />
          </button>
        </div>
        <div className="hidden md:block">
          <h1 className="font-heading text-3xl">Sites that inspire us</h1>
        </div>
        <div className="flex border border-slate-300 rounded-sm">
          <button
            name="viewMode"
            className={`px-4 py-2 ${
              viewMode === "grid" ? "bg-slate-500 text-white" : "bg-white"
            }`}
            value="grid"
            type="submit"
          >
            <GridIcon
              color={viewMode === "grid" ? "white" : undefined}
              height={18}
            />
          </button>
          <button
            name="viewMode"
            className={`px-4 py-2 border-x border-slate-300 ${
              viewMode === "carousel" ? "bg-slate-500 text-white" : "bg-white"
            }`}
            value="carousel"
            type="submit"
          >
            <CarouselIcon
              color={viewMode === "carousel" ? "white" : undefined}
              height={18}
            />
          </button>
          <button
            name="viewMode"
            className={`px-4 py-2 ${
              viewMode === "list" ? "bg-slate-500 text-white" : "bg-white"
            }`}
            value="list"
            type="submit"
          >
            <ListIcon
              color={viewMode === "list" ? "white" : undefined}
              className="h-4"
            />
          </button>
          {/* this input needs to be last so it's only picked up by the form if the form is not submitted by the buttons */}
          <input type="hidden" name="viewMode" value={viewMode} />
        </div>
      </Form>
      <GridView data={data} layout={viewMode} />
      <div className="p-10 md:p-20 bg-slate-100 mt-3">
        <div className="mb-3 text-center">
          <h3 className="font-heading text-2xl">
            Want to know when we add new sites?
          </h3>
          <p>No spam. No sales. Just sites.</p>
        </div>
        <EmailForm />
      </div>
    </>
  );
}

const GridView = ({ data, layout }: { data: Swipe[]; layout: ViewMode }) => {
  const viewMode = () => {
    switch (layout) {
      case "grid":
        return "grid grid-cols-2";
      case "carousel":
        return "flex overflow-x-auto snap-x snap-mandatory hidden-scroll";
      case "list":
        return "grid grid-cols-1";
      default:
        return "grid-cols-2";
    }
  };

  return (
    <div className={clsx(viewMode(), "gap-4 p-4 md:gap-8 md:p-8")}>
      {data.map((swipe: any) => (
        <SwipeCard key={swipe._key} swipe={swipe} layout={layout} />
      ))}
      <div
        className={clsx(
          "text-center min-h-full min-w-full p-4 flex items-center gap-2",
          layout == "carousel"
            ? "min-w-[120px] flex-col justify-center"
            : "justify-center",
          layout == "grid" && "col-span-2"
        )}
      >
        <div>🥃</div>
        <div>You've reached the end. Cheers.</div>
        <div>🥃</div>
      </div>
    </div>
  );
};

const SwipeCard = ({ swipe, layout }: { swipe: any; layout: ViewMode }) => {
  return (
    <div
      className={clsx(
        "border border-black/10 rounded shadow-sm",
        layout == "carousel" && "min-w-[70%] snap-center",
        layout == "list" && "flex max-w-screen-lg mx-auto"
      )}
    >
      <Link
        to={`/swipe/${swipe.slug.current}`}
        className={clsx(
          "aspect-video overflow-hidden",
          layout == "list" && "w-1/3"
        )}
      >
        <img
          className={cn("object-cover aspect-video w-full relative", layout == "list" && "min-w-full min-h-full")}
          src={urlFor(swipe.main).width(400).url()}
          srcSet={`
            ${urlFor(swipe.main).width(400).url()} 400w,
            ${urlFor(swipe.main).width(800).url()} 800w,
            ${urlFor(swipe.main).width(1200).url()} 1200w,
          `}
          sizes="100vw"
          alt={swipe.main?.alt ?? "Decorative"}
        />
      </Link>
      <div className={clsx("p-4 relative", layout == "list" && "w-2/3")}>
        <div className="absolute top-4 right-4">
          <a href={swipe.url} target="_blank" rel="noopener noreferrer">
            <OpenInNew height={16} width={16} />
          </a>
        </div>
        <Link
          to={`/swipe/${swipe.slug.current}`}
          className="font-heading text-2xl md:text-3xl"
        >
          {swipe.title}
        </Link>
        <div className="flex justify-start flex-wrap gap-2 pt-1 pb-2">
          {swipe.tags.map((tag: string) => (
            <div className="px-2 py-1 rounded-sm bg-slate-200 text-xs md:text-sm text-slate-500">
              {tag}
            </div>
          ))}
        </div>
        {layout == "list" && (
          <div className="text-slate-500 text-sm md:text-base max-w-prose hidden md:block">
            <Body value={swipe.body} />
          </div>
        )}
      </div>
    </div>
  );
};

const SWIPE_QUERY = groq`*[_type == "swipe" && (title match $q || keywords[] match $q)  && !(_id in path('drafts.**')) ]{
    ...,
    "tags": tags[]->title
}`;
