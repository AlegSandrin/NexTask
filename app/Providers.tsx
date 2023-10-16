'use client';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

export const NextAuthProvider = ({ children }: { children: React.ReactNode }) => {
    return <SessionProvider refetchOnWindowFocus={false}>{children}</SessionProvider>;
}

export const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient()
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}