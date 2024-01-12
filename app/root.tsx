import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
} from "@remix-run/react";
import { isStegaEnabled, studioUrl } from "~/sanity/projectDetails";

import React, { ReactNode, Suspense, lazy } from "react";

import stylesheet from "~/app.css";
import { loadQuery } from "./sanity/loader.server";
import groq from "groq";
import { INTERNAL_LINK_FRAGMENT } from "./routes/_index";
import { useQuery } from "./sanity/loader";

const VisualEditing = lazy(() => import("~/components/VisualEditing"));

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "favicon", href: "/favicon.png"},
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

type SettingsType = {};

const SETTINGS_QUERY = groq`*[_type == "settings"][0]{
  ...,
  menu[]{
    ...,
    ${INTERNAL_LINK_FRAGMENT}
  }
}`;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const stegaEnabled = isStegaEnabled(request.url);

  const { data: initial } = await loadQuery<SettingsType>(
    SETTINGS_QUERY,
    {},
    {
      perspective: stegaEnabled ? "previewDrafts" : "published",
    }
  );

  return json({
    stegaEnabled,
    initial,
    ENV: {
      SANITY_STUDIO_PROJECT_ID: process.env.SANITY_STUDIO_PROJECT_ID,
      SANITY_STUDIO_DATASET: process.env.SANITY_STUDIO_DATASET,
      SANITY_STUDIO_URL: process.env.SANITY_STUDIO_URL,
      SANITY_STUDIO_STEGA_ENABLED: process.env.SANITY_STUDIO_STEGA_ENABLED,
      SANITY_STUDIO_API_VERSION: studioUrl,
    },
  });
};

export default function App() {
  const { ENV, stegaEnabled, initial } = useLoaderData<typeof loader>();

  const { data, loading } = useQuery(SETTINGS_QUERY, { initial });

  console.log({ data, initial });

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://unpkg.com/@botpoison/browser" defer></script>
        <Meta />
        <Links />
      </head>
      <body>
        {/* @ts-expect-error */}
        <Layout menu={!loading && data ? data?.meny : initial.menu}>
          <Outlet />
        </Layout>
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
          }}
        />
        {stegaEnabled ? (
          <Suspense>
            <VisualEditing studioUrl={ENV.SANITY_STUDIO_URL!} />
          </Suspense>
        ) : null}
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

const Layout = ({ children, menu }: { children: ReactNode; menu: any[] }) => {
  return (
    <>
      <div className="sticky top-0 right-0 left-0 h-nav flex justify-between items-center p-5 md:p-8 shadow z-50 bg-white/50 backdrop-blur">
        <Link to={"/"} className="font-heading uppercase text-xl md:text-2xl">
          WEBPRISM
        </Link>
        <div className="flex gap-5">
          {menu?.map((item) => {
            if (item._type == "linkExternal") {
              return (
                <a key={item._key} href={item.url}>
                  {item.title}
                </a>
              );
            }
            return (
              <Link key={item._key} to={item.to}>
                {item.title}
              </Link>
            );
          })}
        </div>
      </div>
      {children}
      {/* <div>Footer</div> */}
    </>
  );
};