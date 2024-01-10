// ./app/sanity/client.ts

import { createClient } from "@sanity/client/stega";
import { stegaEnabled, projectId, dataset, studioUrl } from "./projectDetails";
import { SanityImageAssetDocument } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Do not import this into client-side components unless lazy-loaded
export const client = createClient({
  projectId,
  dataset,
  useCdn: process.env.NODE_ENV === "production" ?? false,
  apiVersion: "2023-03-20",
  stega: {
    enabled: stegaEnabled,
    studioUrl,
  },
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageAssetDocument) {
  return builder.image(source);
}
