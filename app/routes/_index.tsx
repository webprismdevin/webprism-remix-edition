import { json, LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { loadQuery } from "~/sanity/loader.server";
import groq from "groq";
import Modules from "~/sanity-modules/Modules";
import { useQuery } from "~/sanity/loader";
import { isStegaEnabled } from "~/sanity/projectDetails";
import { MODULE_FRAGMENT } from "~/sanity/fragments";

export const meta: MetaFunction = () => {
  return [
    { title: "WEBPRISM" },
    { name: "description", content: "A creative agency for Shopify brands." },
  ];
};

type HomeType = {
  initial: {
    modules: any[];
  };
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const stegaEnabled = isStegaEnabled(request.url);

  const { data: initial } = await loadQuery<HomeType>(
    HOME_QUERY,
    {},
    {
      perspective: stegaEnabled ? "previewDrafts" : "published",
    }
  );

  return json({ initial });
};

export default function Index() {
  const { initial } = useLoaderData<typeof loader>();

  const { data, loading } = useQuery(HOME_QUERY, { initial });

  return (
    <div>
      {/* @ts-ignore */}
      <Modules modules={loading || !data ? initial?.modules : data?.modules} />
    </div>
  );
}
const HOME_QUERY = groq`*[_type == "home"][0]{
  ...,
  ${MODULE_FRAGMENT}
}`;
