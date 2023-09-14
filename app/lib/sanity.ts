import { SanityImageAssetDocument, createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const sanity = createClient({
  projectId: "lm1sm3b1",
  dataset: "production",
  useCdn: false,
  apiVersion: "2021-03-25",
});

// ./app/lib/sanity.ts

import type { SanityClient } from "@sanity/client";

// Copy these from your Studio's sanity.config.ts
export const projectId = "lm1sm3b1";
export const dataset = "production";
export const apiVersion = "2023-07-01";

export function getClient(preview?: { token?: string }): SanityClient {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
    perspective: "published",
  });
  if (preview) {
    if (!preview.token) {
      throw new Error(
        "Attempted to activate Preview but a token was not provided"
      );
    }
    return client.withConfig({
      token: preview.token,
      useCdn: false,
      ignoreBrowserTokenWarning: true,
      perspective: "previewDrafts",
    });
  }
  return client;
}

export const urlFor = (source: SanityImageAssetDocument) => {
  return imageUrlBuilder(sanity).image(source);
};
