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
import { apiVersion, isStegaEnabled, studioUrl } from "~/sanity/projectDetails";

import React, { ReactNode, Suspense, lazy } from "react";

import stylesheet from "~/app.css";
import { loadQuery } from "./sanity/loader.server";
import groq from "groq";
import { INTERNAL_LINK_FRAGMENT } from "./routes/_index";
import { useQuery } from "./sanity/loader";
import { Menu } from "@headlessui/react";

const VisualEditing = lazy(() => import("~/components/VisualEditing"));

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "icon", href: "/favicon.png" },
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
      SANITY_STUDIO_API_VERSION: apiVersion,
    },
  });
};

export default function App() {
  const { ENV, stegaEnabled, initial } = useLoaderData<typeof loader>();

  const { data, loading } = useQuery(SETTINGS_QUERY, { initial });

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
        <Layout menu={!loading && data ? data?.menu : initial.menu}>
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
        <MenuDropdown menu={menu} />
        {/* <div className="flex gap-2 md:gap-5">
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
        </div>*/}
      </div>
      {children}
      {/* <div>Footer</div> */}
    </>
  );
};

const MenuDropdown = ({ menu }: { menu: any[] }) => {
  return (
    <div className="relative inline-block text-left">
      <Menu>
        {({ open }) => (
          <>
            <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
              Menu
            </Menu.Button>
            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {menu?.map((item) => {
                  if (item._type == "linkExternal") {
                    return (
                      <Menu.Item key={item._key}>
                        {({ active }) => (
                          <a
                            href={item.url}
                            className={`${
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700"
                            } flex justify-between w-full px-4 py-2 text-sm`}
                          >
                            {item.title}
                          </a>
                        )}
                      </Menu.Item>
                    );
                  }
                  return (
                    <Menu.Item key={item._key}>
                      {({ active }) => (
                        <Link
                          to={item.to}
                          className={`${
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700"
                          } flex justify-between w-full px-4 py-2 text-sm`}
                        >
                          {item.title}
                        </Link>
                      )}
                    </Menu.Item>
                  );
                })}
              </div>
            </Menu.Items>
          </>
        )}
      </Menu>
    </div>
  );
};
