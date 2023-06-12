import { LoaderArgs, LoaderFunction } from "@remix-run/node";
import { Modules, sanity } from "./_index";
import { useLoaderData } from "@remix-run/react";

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

export default function Page() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <div>
      <Modules modules={data.modules} />
    </div>
  );
}
