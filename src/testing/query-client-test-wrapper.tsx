import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import type {PropsWithChildren} from "react";

const queryClient = new QueryClient()
export const QueryClientTestWrapper = (props: PropsWithChildren) => (
        <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
)
