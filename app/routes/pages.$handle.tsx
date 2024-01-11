import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import groq from "groq";
import Modules, { Module } from "~/sanity-modules/Modules";
import { useQuery } from "~/sanity/loader";
import { loadQuery } from "~/sanity/loader.server";

type PageType = {
  modules: Module[];
};

export const loader: LoaderFunction = async ({ params }) => {
  const { handle } = params;
  const { data: initial } = await loadQuery<PageType>(PAGE_QUERY, { handle });

  return json({ initial, handle });
};

export default function Index() {
  const { initial, handle } = useLoaderData<typeof loader>();

  const { data, loading } = useQuery(PAGE_QUERY, { handle }, { initial });

  if (loading && !data) return <div>loading...</div>;

  return (
    <div>
      <Modules
        // @ts-ignore
        modules={loading || !data ? initial.modules : data?.modules}
      />
    </div>
  );
}

const PAGE_QUERY = groq`*[_type == "page" && slug.current == $handle][0]{
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
