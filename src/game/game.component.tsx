import {useCallback} from "react";
import {Board} from "../board/board.component.tsx";
import {HistoryComponent} from "../history/history.component.tsx";
import type {SquareValue} from "../square/square-value.ts";
import {useGameStore} from "../state/state.ts";

export const Game = () => {
    const {squares, setSquares, currentTurn, changeTurn, resetTurn, addToHistory,  goBackToHistoryItem, history} = useGameStore();

    const onPlay = useCallback((nextSquares: SquareValue[]) => {
        setSquares(nextSquares);
        addToHistory(nextSquares);
        changeTurn();
    }, [setSquares, changeTurn, addToHistory]);

    return (
            <>
                <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontFamily: 'monospace',
                        }}
                >
                    <div>
                        <Board
                                squares={squares}
                                resetGame={resetTurn}
                                currentTurn={currentTurn}
                                onPlay={onPlay}
                        />
                    </div>
                </div>
                <HistoryComponent history={history} onHistoryItemClick={goBackToHistoryItem} />
            </>
    )
}
