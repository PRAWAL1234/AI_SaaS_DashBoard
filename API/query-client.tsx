"use client";

import React, { useState } from "react";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

export default function QueryProvider({ children }: React.PropsWithChildren) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
        queryCache: new QueryCache({
          onError(error) {
            console.error("GLOBAL QUERY ERROR", error);
          },
        }),
        mutationCache: new MutationCache({
          onError(error) {
            console.error("GLOBAL MUTATION ERROR", error);
          },
        }),
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

