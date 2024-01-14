import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import groq from "groq";
import { loadQuery } from "~/sanity/loader.server";
import { useQuery } from "~/sanity/loader";
import Body from "~/sanity-modules/PortableText";
import Hero from "~/sanity-modules/Hero";

export async function loader({ params }: LoaderFunctionArgs) {
  const { handle } = params;

  const { data: initial } = await loadQuery(ARTICLE_QUERY, { handle });

  return json({
    initial,
    handle,
  });
}

export default function Article() {
  const { initial, handle } = useLoaderData<typeof loader>();

  const { loading, data } = useQuery(ARTICLE_QUERY, { handle });

  const loadedData = loading || !data ? initial : data;

  console.log({ loadedData });

  return (
    <div>
      {/* @ts-ignore */}
      {loadedData?.hero && <Hero {...loadedData.hero} />}
      <div className="px-5 py-10 md:p-20">
        {/* @ts-ignore */}
        <Body value={loadedData?.body} />
      </div>
      {/* <Modules modules={loading || data ? initial?.modules : data?.modules} /> */}
    </div>
  );
}

const ARTICLE_QUERY = groq`*[_type == "article" && slug.current == $handle][0]`;
