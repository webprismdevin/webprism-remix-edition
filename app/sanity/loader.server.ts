import { queryStore } from "~/sanity/loader";

import { client } from "~/sanity/client";

console.log(process.env.SANITY_READ_TOKEN);

const clientWithToken = client.withConfig({
  token: process.env.SANITY_READ_TOKEN,
});

// We need to set the client used by `loadQuery` here, it only affects the server and ensures the browser bundle isn't bloated
queryStore.setServerClient(clientWithToken);

export const { loadQuery } = queryStore;
