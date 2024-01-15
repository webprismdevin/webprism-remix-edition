import { LoaderFunction, LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import groq from "groq";
import Modules, { Module } from "~/sanity-modules/Modules";
import { useQuery } from "~/sanity/loader";
import { loadQuery } from "~/sanity/loader.server";
import { isStegaEnabled } from "~/sanity/projectDetails";

type PageType = {
  modules: Module[];
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const stegaEnabled = isStegaEnabled(request.url);

  const { handle } = params;
  const { data: initial } = await loadQuery<PageType>(
    PAGE_QUERY,
    { handle },
    { perspective: stegaEnabled ? "previewDrafts" : "published" }
  );

  return json({ initial, handle });
};

export default function Index() {
  const { initial, handle } = useLoaderData<typeof loader>();

  const { data, loading } = useQuery(PAGE_QUERY, { handle }, { initial });

  return (
    <div>
      {/* @ts-ignore */}
      <Modules modules={loading || !data ? initial.modules : data?.modules} />
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
