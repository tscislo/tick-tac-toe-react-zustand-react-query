import {useMutation, useQuery} from "@tanstack/react-query";
import {useCallback, useEffect, useState} from "react";
import {Board} from "../board/board.component.tsx";
import {HistoryComponent} from "../history/history.component.tsx";
import type {SquareValue} from "../square/square-value.ts";
import {useGameStore} from "../state/state.ts";
import classes from "./game.component.module.scss";

const jsonBinUrl = "https://api.jsonbin.io/v3/b/688a11daf7e7a370d1f06af1";

const jsonBinHeaders = {
    "Content-Type": "application/json",
    "X-Master-Key": "$2a$10$t/OnWes5rsUW7h17uR/dy.vLoo3oaKIHpj9ouXxXGpBVgSDtOZ.tC",
}

export const Game = () => {
    const [isLoading, setIsLoading] = useState(true);
    const {data, status, refetch, fetchStatus, isFetching,} = useQuery<History[]>({
        queryKey: ['saved-game'],
        enabled: false,
        queryFn: async ({signal}) => {
            const response = await fetch(jsonBinUrl, {
                method: "GET",
                headers: jsonBinHeaders,
                signal
            });
            const json = await response.json();
            return json.record as History[];
        },
    });
    const saveGame = useMutation({
        mutationFn: async (gameState: History[]) => {
            const response = await fetch(jsonBinUrl, {
                method: "PUT",
                headers: jsonBinHeaders,
                body: JSON.stringify(gameState)
            });
            const json = await response.json();
            return json.record as History[];
        },
    })

    const {
        squares,
        setSquares,
        currentTurn,
        changeTurn,
        resetTurn,
        addToHistory,
        goBackToHistoryItem,
        history,
        revertGamePlayToState
    } = useGameStore();

    const onPlay = useCallback((nextSquares: SquareValue[]) => {
        setSquares(nextSquares);
        addToHistory(nextSquares);
        changeTurn();
    }, [setSquares, changeTurn, addToHistory]);

    const loadSavedGame = useCallback(() => {
        refetch();
    }, [refetch]);

    const save = useCallback(() => {
        console.log(history)
        saveGame.mutate(history)
    }, [history, saveGame]);

    useEffect(() => {
        if (status==='success' && fetchStatus==='idle') {
            revertGamePlayToState(data);
        }
    }, [status, fetchStatus, revertGamePlayToState, data]);

    useEffect(() => {
        setIsLoading(isFetching || saveGame.isPending);
    }, [isFetching, saveGame.isPending]);

    return (
            <>
                {isLoading && <div>LOADING...</div>}
                {!isLoading && (
                        <>
                            <div className={classes.game}>
                                <div data-testid="board">
                                    <Board
                                            squares={squares}
                                            resetGame={resetTurn}
                                            currentTurn={currentTurn}
                                            onPlay={onPlay}
                                            load={loadSavedGame}
                                            save={save}
                                    />
                                </div>
                            </div>
                            <HistoryComponent history={history} onHistoryItemClick={goBackToHistoryItem}/>
                        </>
                )}
            </>
    )
}
