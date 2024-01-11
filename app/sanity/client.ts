// ./app/sanity/client.ts

import { createClient } from "@sanity/client/stega";
import {
  apiVersion,
  dataset,
  projectId,
  studioUrl,
} from "~/sanity/projectDetails";
import { SanityImageAssetDocument } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Do not import this into client-side components unless lazy-loaded
export const client = createClient({
  projectId,
  dataset,
  useCdn: true,
  apiVersion: apiVersion,
  stega: {
    enabled: false,
    studioUrl,
  },
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageAssetDocument) {
  return builder.image(source);
}
