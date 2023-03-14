import { dev } from "$app/environment";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "./server";

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: dev
        ? "http://127.0.0.1:5173/api/trpc"
        : `https://example.com/api/trpc`,
    }),
  ],
});
