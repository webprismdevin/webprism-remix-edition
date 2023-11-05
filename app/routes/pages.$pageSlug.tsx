import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { urlFor, getClient } from "~/lib/sanity";
import { getSession } from "~/sessions";
import { Modules } from "~/components/Modules";
import { useLiveQuery } from "@sanity/preview-kit";
import { SanityDocument } from "@sanity/client";
import { pageQuery } from "~/lib/queries";

export const loader: LoaderFunction = async ({ request, params,
}: LoaderArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("preview");
  const preview = token ? { token } : undefined;

  const data = await getClient(preview).fetch(pageQuery, {
    slug: params.pageSlug,
  });

  return {
    data,
    preview,
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
  const { data, preview } = useLoaderData();

  return (
    <div className="relative">
      {preview ? (
        <PagePreview initialData={data} />
      ) : (
        <Modules modules={data.modules} />
      )}
    </div>
  );
}

export function PagePreview({ initialData }: { initialData: SanityDocument }) {
  const [data] = useLiveQuery(initialData, pageQuery);

  // console.log(data);

  return (
    <div>
      <Modules modules={data ? data.modules : initialData.modules} />
    </div>
  );
}
