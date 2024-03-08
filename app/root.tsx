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
import { INTERNAL_LINK_FRAGMENT } from "~/sanity/fragments";
import { useQuery } from "./sanity/loader";
import { Menu } from "@headlessui/react";

// vercel stuffs
import { SpeedInsights } from "@vercel/speed-insights/remix";
import { Analytics } from "@vercel/analytics/react";
import clsx from "clsx";
import { Subscribe } from "./components/Subscribe";
import cn from "./lib/cn";

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

  const isHome = new URL(request.url).pathname === "/";

  console.log(request.url);

  const perspective = stegaEnabled ? "previewDrafts" : "published";

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

  const { data, loading } = useQuery<typeof initial>(
    SETTINGS_QUERY,
    {},
    // @ts-expect-error
    { initial }
  );

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
        {/* <Layout
          menu={loading || !data ? initial?.menu : data?.menu}
          isHome={isHome}
        > */}
        <Outlet />
        {/* </Layout> */}
        <Footer />
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

const Footer = () => {
  return (
    <div className="h-96 relative overflow-hidden">
      <div className="relative z-20 text-white p-8 md:p-20 md:pb-8 flex justify-center items-end h-full">
        <div>© WEBPRISM. {new Date().getFullYear()}</div>
      </div>
      <div className="w-full h-full absolute top-0 left-0 z-10 bg-black/70" />
      <img src="/footer.jpg" className="absolute bottom-0 h-full md:w-full z-0 object-cover" />
    </div>
  );
};

// const Layout = ({ children, menu }: { children: ReactNode; menu: any[] }) => {
//   return (
//     <>
//       <div
//         className={cn(
//           "sticky top-0 right-0 left-0 h-nav flex justify-between items-center p-5 md:p-8 z-50",
//           isHome ? "fixed top-0" : "bg-white"
//         )}
//       >
//         <Link
//           to={"/"}
//           className={cn(
//             "font-heading uppercase text-xl md:text-2xl",
//             isHome && "text-black drop-shadow-[0_4px_6px_rgba(255,255,255,0.5)]"
//           )}
//         >
//           WEBPRISM
//         </Link>
//         <MenuDropdown menu={menu} isHome={isHome} />
//       </div>
//       {children}
//       {/* <Subscribe /> */}
//       <div className="px-10 md:px-20">
//         <div className="pt-4 pb-8 text-center md:text-right">
//           © WEBPRISM {new Date().getFullYear()}.
//         </div>
//       </div>
//     </>
//   );
// };

// const MenuDropdown = ({ menu, isHome }: { menu: any[]; isHome: boolean }) => {
//   return (
//     <div className="relative inline-block text-left">
//       <Menu>
//         {({ open }) => (
//           <>
//             <Menu.Button
//               className={cn(
//                 "inline-flex justify-center w-full shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 rounded",
//                 isHome &&
//                   "text-white hover:text-black bg-black/95 backdrop-blur"
//               )}
//             >
//               Menu
//             </Menu.Button>
//             <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
//               <div className="py-1">
//                 {menu?.map((item) => {
//                   if (item._type == "linkExternal") {
//                     return (
//                       <Menu.Item key={item._key}>
//                         {({ active }) => (
//                           <a
//                             href={item.url}
//                             className={`${
//                               active
//                                 ? "bg-gray-100 text-gray-900"
//                                 : "text-gray-700"
//                             } flex justify-between w-full px-4 py-2 text-sm`}
//                           >
//                             {item.title}
//                           </a>
//                         )}
//                       </Menu.Item>
//                     );
//                   }
//                   return (
//                     <Menu.Item key={item._key}>
//                       {({ active }) => (
//                         <Link
//                           to={item.to}
//                           className={`${
//                             active
//                               ? "bg-gray-100 text-gray-900"
//                               : "text-gray-700"
//                           } flex justify-between w-full px-4 py-2 text-sm`}
//                         >
//                           {item.title}
//                         </Link>
//                       )}
//                     </Menu.Item>
//                   );
//                 })}
//               </div>
//             </Menu.Items>
//           </>
//         )}
//       </Menu>
//     </div>
//   );
// };
