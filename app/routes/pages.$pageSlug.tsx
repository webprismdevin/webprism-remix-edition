import { LoaderArgs, LoaderFunction } from "@remix-run/node";
import { sanity, urlFor } from "../lib/sanity";
import { Modules } from "~/components/Modules";
import { V2_MetaFunction, useLoaderData } from "@remix-run/react";
import { pageQuery } from "~/lib/queries";

export const loader: LoaderFunction = async ({
  request,
  params,
  context,
}: LoaderArgs) => {
  const data = await sanity.fetch(pageQuery, { slug: params.pageSlug });

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

  return <Modules modules={data.modules} />;
}
