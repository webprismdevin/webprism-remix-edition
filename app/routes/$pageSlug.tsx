import { LoaderArgs, LoaderFunction } from "@remix-run/node";
import { Modules, sanity, urlFor } from "./_index";
import { V2_MetaFunction, useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async ({
  request,
  params,
  context,
}: LoaderArgs) => {
  const query = `*[_type == "page" && slug.current == $slug][0]`;

  const data = await sanity.fetch(query, { slug: params.pageSlug });

  return {
    data,
  };
};

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => {
  const { data: loaderData } = data;

  return [
    { title: loaderData.seo?.title },
    { name: "description", content: loaderData.seo?.description },
    {
      property: "og:image",
      content: loaderData.seo?.image
        ? urlFor(loaderData.seo?.image).width(1200).height(630).url()
        : null,
    },
  ];
};

export default function Page() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <div>
      <Modules modules={data.modules} />
    </div>
  );
}
