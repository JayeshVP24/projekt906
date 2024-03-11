'use client'
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type {AppRouter} from "../../../server/express-trpc/src/trpc"
import {publicEnv} from "./env"

function createClient() {
  return createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: publicEnv.NEXT_PUBLIC_API_URL + "/trpc",
        // You can pass any HTTP headers you wish here
        async headers() {
          return {
           // authorization: getAuthCookie(),
          };
        },
      }),
    ],
  });

}

export { createClient }

