import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { SanityImageAssetDocument } from "@sanity/client";
import groq from "groq";
import { urlFor } from "~/sanity/client";
import { useQuery } from "~/sanity/loader";
import { loadQuery } from "~/sanity/loader.server";
import { isStegaEnabled } from "~/sanity/projectDetails";

type SwipeElement = {
  _id: string;
  image: SanityImageAssetDocument;
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  const stegaEnabled = isStegaEnabled(request.url);
  const { elementType } = params;

  const { data: initial } = await loadQuery<SwipeElement[]>(
    ELEMENT_QUERY,
    {
      elementType,
    },
    {
      perspective: stegaEnabled ? "previewDrafts" : "published",
    }
  );

  return json({
    initial,
    elementType,
  });
}

export default function Swipe() {
  const { initial, elementType } = useLoaderData<typeof loader>();

  const { data: live_data, loading } = useQuery<SwipeElement[]>(ELEMENT_QUERY, {
    elementType,
  });

  const data = live_data ?? initial;

  return (
    <div>
      <div className="px-10 md:px-20 py-10">
        <h1 className="text-4xl font-bold capitalize font-heading">
          {elementType}
        </h1>
      </div>
      <div className="flex flex-col max-h-[800px] flex-wrap gap-8 overflow-x-auto px-10 md:px-20 pb-10 md:pb-20 hidden-scroll">
        {data.map((element) => (
          <div key={element._id}>
            <img
              src={urlFor(element.image).url()}
              className="max-w-[600px] max-h-[320px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const ELEMENT_QUERY = groq`*[_type == "element" && lower($elementType) match lower(tags->title) && !(_id in path('drafts.**'))]`;
