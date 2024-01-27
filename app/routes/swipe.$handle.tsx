import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node";
import {
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
  useNavigation,
} from "@remix-run/react";
import groq from "groq";
import { useEffect, useRef } from "react";
import { NavArrowDown, OpenInNew } from "~/components/Icon";
import Body from "~/sanity-modules/PortableText";
import { urlFor } from "~/sanity/client";
import { useQuery } from "~/sanity/loader";
import { loadQuery } from "~/sanity/loader.server";
import { isStegaEnabled } from "~/sanity/projectDetails";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const stegaEnabled = isStegaEnabled(request.url);
  const { handle } = params;

  const { data: initial } = await loadQuery<PageType>(
    SWIPE_PAGE_QUERY,
    {
      handle,
    },
    { perspective: stegaEnabled ? "previewDrafts" : "published" }
  );

  return json({
    initial,
    handle,
  });
};

type PageType = {
  title: string;
  elements: any[];
};

export const meta: MetaFunction = ({ data }) => {
  console.log(data);

  return [
    {
      title: `${
        data?.initial?.title ? data?.initial?.title : ""
      } | WEBPRISM Swipe File`,
    },
  ];
};

export default function SwipePage() {
  const { initial, handle } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  const { data, loading } = useQuery<PageType>(SWIPE_PAGE_QUERY, {
    handle,
  });

  const pageData = loading || !data ? initial : data;

  return (
    <div className="p-4 md:p-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex justify-center items-center"
      >
        <NavArrowDown
          className="w-4 h-4 transform rotate-90"
          color={"#141414"}
        />{" "}
        <span>Back To List</span>
      </button>
      <div className="mb-8 max-w-prose grid gap-2">
        <div className="flex items-start gap-3">
          <h1 className="font-heading text-4xl md:text-6xl">
            {pageData.title}
          </h1>
          <a href={pageData.url} target="_blank" rel="noopener noreferrer">
            <OpenInNew height={16} width={16} />
          </a>
        </div>
        <Body value={pageData.body} />
      </div>
      <div>
        <div className="grid grid-cols-1 gap-4 mb-4">
          {pageData.elements
            .filter((element) => element.image.dimensions.aspectRatio > 2.25)
            .map((element) => (
              <div
                className="p-2 border border-slate-200 rounded grow relative"
                style={{
                  aspectRatio: `${element.image.dimensions.aspectRatio}`,
                }}
              >
                <img src={urlFor(element.image).url()} className="w-full" />
                <div className="absolute bottom-4 left-4 text-xs md:text-sm bg-slate-200 rounded shadow py-1 px-2">
                  {element.caption}
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory hidden-scroll">
        {pageData.elements
          .filter((element) => element.image.dimensions.aspectRatio < 2.25)
          .map((element) => (
            <div
              style={{
                aspectRatio: `${element.image.dimensions.aspectRatio}`,
              }}
              className="p-2 border border-slate-200 rounded shrink-0 snap-start relative"
            >
              <img
                style={{
                  height: 500,
                }}
                src={urlFor(element.image).url()}
              />
              <div className="absolute bottom-4 left-4 text-xs md:text-sm bg-slate-200 rounded shadow py-1 px-2">
                {element.caption}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

const SWIPE_PAGE_QUERY = groq`*[_type == "swipe" && slug.current == $handle][0]{
    ...,
    elements[]-> {
        ...,
        image {
            ...,
            "dimensions": asset->metadata.dimensions
        }
    }
}`;
