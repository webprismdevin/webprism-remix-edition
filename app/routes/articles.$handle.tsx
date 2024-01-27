import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import groq from "groq";
import { loadQuery } from "~/sanity/loader.server";
import { useQuery } from "~/sanity/loader";
import Body from "~/sanity-modules/PortableText";
import Hero from "~/sanity-modules/Hero";
import { BODY_FRAGMENT } from "~/sanity/fragments";

export async function loader({ params }: LoaderFunctionArgs) {
  const { handle } = params;

  const { data: initial } = await loadQuery(ARTICLE_QUERY, { handle });

  return json({
    initial,
    handle,
  });
}

export const meta: MetaFunction = ({ data }) => {
  // @ts-ignore
  const { title, description, image } = data.initial ?? {};

  return [
    { title: title },
    { name: "description", content: description ?? "A webprism article" },
    { property: "og:image", content: image?.url ?? "" },
  ];
};

export default function Article() {
  const { initial, handle } = useLoaderData<typeof loader>();

  const { loading, data } = useQuery(ARTICLE_QUERY, { handle });

  const loadedData = loading || !data ? initial : data;

  return (
    <div>
      {/* @ts-ignore */}
      {loadedData?.hero && <Hero {...loadedData.hero} />}
      <div className="px-5 py-10 md:p-20 max-w-screen-lg mx-auto">
        {/* @ts-ignore */}
        <Body value={loadedData?.body} />
      </div>
    </div>
  );
}

const ARTICLE_QUERY = groq`*[_type == "article" && slug.current == $handle][0]{
  ...,
  hero {
    ...,
    ${BODY_FRAGMENT},
    colorTheme->
  },
  ${BODY_FRAGMENT}
}`;
