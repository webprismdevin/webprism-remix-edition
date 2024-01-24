import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Form, useLoaderData, useSubmit } from "@remix-run/react";
import clsx from "clsx";
import { useState } from "react";
import { ArrowRight, OpenInNew } from "~/components/Icon";
import { urlFor } from "~/sanity/client";
import { useQuery } from "~/sanity/loader";
import { loadQuery } from "~/sanity/loader.server";

type Swipe = {};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchQuery = url.searchParams.get("q") ?? "*";
  const viewMode = url.searchParams.get("viewMode") ?? "grid";

  const { data: initial } = await loadQuery<Swipe[]>(SWIPE_QUERY, {
    q: searchQuery == "" ? "*" : searchQuery.toLowerCase() ?? "*",
  });

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
      <h1 className="w-full py-5 md:py-20 text-center font-heading text-6xl md:text-8xl">
        Swipe File
      </h1>
      <Form className="w-full flex flex-col-reverse md:flex-row justify-between items-end p-4 md:p-8 gap-3">
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
        <div className="flex border border-slate-300 rounded-sm">
          <button
            name="viewMode"
            className={`px-4 py-2 ${
              viewMode === "grid" ? "bg-slate-500 text-white" : "bg-white"
            }`}
            value="grid"
            type="submit"
          >
            Grid
          </button>
          <button
            name="viewMode"
            className={`px-4 py-2 border-x border-slate-300 ${
              viewMode === "carousel" ? "bg-slate-500 text-white" : "bg-white"
            }`}
            value="carousel"
            type="submit"
          >
            Carousel
          </button>
          <button
            name="viewMode"
            className={`px-4 py-2 ${
              viewMode === "list" ? "bg-slate-500 text-white" : "bg-white"
            }`}
            value="list"
            type="submit"
          >
            List
          </button>
          {/* this input needs to be last so it's only picked up by the form if the form is not submitted by the buttons */}
          <input type="hidden" name="viewMode" value={viewMode} />
        </div>
      </Form>
      <GridView data={data} layout={viewMode} />
    </>
  );
}

const GridView = ({ data, layout }: { data: Swipe[]; layout: ViewMode }) => {
  const viewMode = () => {
    switch (layout) {
      case "grid":
        return "grid grid-cols-2";
      case "carousel":
        return "flex overflow-x-auto";
      case "list":
        return "grid grid-cols-1";
      default:
        return "grid-cols-2";
    }
  };

  return (
    <div className={clsx(viewMode(), "gap-4 p-4 md:gap-8 md:p-8")}>
      {data.map((swipe: any) => (
        <SwipeCard key={swipe._id} swipe={swipe} layout={layout} />
      ))}
    </div>
  );
};

const SwipeCard = ({ swipe, layout }: { swipe: any; layout: ViewMode }) => {
  console.log(layout);

  return (
    <div
      className={clsx(
        "border border-black/10 rounded shadow-sm",
        layout == "carousel" && "min-w-[90%]",
        layout == "list" && "flex"
      )}
    >
      <div
        className={clsx(
          "aspect-video overflow-hidden",
          layout == "list" && "w-1/3"
        )}
      >
        <img
          className={clsx("object-cover aspect-video w-full relative")}
          src={urlFor(swipe.main).width(400).url()}
          alt={swipe.main?.alt ?? "Decorative"}
        />
      </div>
      <div className={clsx("p-4 relative", layout == "list" && "w-2/3")}>
        <div className="absolute top-4 right-4">
          <a href={swipe.url} target="_blank" rel="noopener noreferrer">
            <OpenInNew height={16} width={16} />
          </a>
        </div>
        <h1 className="font-heading text-2xl md:text-3xl">{swipe.title}</h1>
        <div className="flex justify-start gap-2">
          {swipe.tags.map((tag: string) => (
            <div className="px-2 py-1 rounded-sm bg-slate-200 text-xs md:text-sm text-slate-500">
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SWIPE_QUERY = `*[_type == "swipe" && (title match $q || keywords[] match $q)]{
    ...,
    "tags": tags[]->title
}`;
