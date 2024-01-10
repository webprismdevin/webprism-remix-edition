import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { loadQuery } from "~/sanity/loader.server";
import groq from "groq";
import Modules from "~/sanity-modules/Modules";
import { useQuery } from "~/sanity/loader";

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

export const loader = async () => {
  const { data: initial } = await loadQuery<HomeType>(HOME_QUERY);

  return json({ initial });
};

export default function Index() {
  const { initial } = useLoaderData<typeof loader>();

  const { data, loading } = useQuery(HOME_QUERY, { initial });

  if (loading && !data) return <div>loading...</div>;

  console.log(data)

  return (
    <div>
      <Modules
        // @ts-ignore
        modules={loading || !data ? initial.modules : data?.modules}
      />
    </div>
  );
}

const HOME_QUERY = groq`*[_type == "home"][0]{
  ...,
  modules[]{
    ...,
    colorTheme->,
    body[]{
      ...,
      markDefs[]{
        ...,
        (_type == "linkInternal") => {
          (reference->_type == "page") => {
            "to": "/pages/" + reference->slug.current
          },
        }
      },
      buttons[]{
        ...,
        (_type == "linkInternal") => {
          ...,
          (reference->_type == "page") => {
            "to": "/pages/" + reference->slug.current
          },
        }
      }
    }
  }
}`;
