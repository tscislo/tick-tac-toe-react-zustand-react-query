import './App.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {Game} from "./game/game.component.tsx";

const queryClient = new QueryClient()

function App() {

    return (
            <QueryClientProvider client={queryClient}>
                <Game/>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
    )
}

export default App
