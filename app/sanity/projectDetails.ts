// Based on how Remix recommends handling environment variables
// https://remix.run/docs/en/main/guides/envvars

// None of these are secrets, but all of them are required
// Throughout the app server and client side
declare global {
  interface Window {
    ENV: {
      SANITY_STUDIO_PROJECT_ID: string;
      SANITY_STUDIO_DATASET: string;
      SANITY_STUDIO_API_VERSION: string;
      SANITY_FRONTEND_URL: string;
      SANITY_STUDIO_URL: string;
      SANITY_STUDIO_STEGA_ENABLED: boolean;
    };
  }
}

const {
  SANITY_STUDIO_PROJECT_ID,
  SANITY_STUDIO_DATASET,
  SANITY_STUDIO_API_VERSION,
} = typeof document === "undefined" ? process.env : window.ENV;

export const projectId = "lm1sm3b1";
export const dataset = "production";
export const apiVersion = "2023-11-15";

export const projectDetails = () => ({
  projectId,
  dataset,
  apiVersion,
});

// Enable stega on production deploys, but NOT the non-production domain
// Allow the production Studio to access non-production domains cross-origin

// Vercel provides multiple URLs for a single deployment:
// www.your-production-domain.com
// <git-repo-slug>-git-<branch>-<username>.vercel.app
// <git-repo-slug>-<sha>-<username>.vercel.app

// This is used to enable stega on any URL except this one
export const PRODUCTION_URL = "https://webprism.co";

// This is the front end URL that should display inside Presentation
// export const frontendUrl =
//   typeof document === 'undefined'
//     ? process.env.VERCEL
//       ? `https://${process.env.VERCEL_BRANCH_URL}`
//       : process.env.SANITY_FRONTEND_URL!
//     : window.ENV.SANITY_FRONTEND_URL!

// This is the Studio URL that will be allowed to access the front end URL
export const studioUrl =
  process.env.NODE_ENV == "production"
    ? "https://webprism-remix.sanity.studio"
    : "http://localhost:3333";

// With the logic below we enable stega only on the non-production domain
export function isStegaEnabled(url: string) {
  const { hostname } = new URL(url);
  return hostname !== new URL(PRODUCTION_URL).hostname;
}

// If any of these values are missing, throw errors as the app requires them
if (!projectId) throw new Error("Missing SANITY_STUDIO_PROJECT_ID in .env");
if (!dataset) throw new Error("Missing SANITY_STUDIO_DATASET in .env");
if (!apiVersion) throw new Error("Missing SANITY_STUDIO_API_VERSION in .env");
// if (!frontendUrl) throw new Error('Missing SANITY_FRONTEND_URL in .env')
if (!studioUrl) throw new Error("Missing SANITY_STUDIO_URL in .env");
