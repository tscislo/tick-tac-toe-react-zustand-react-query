import {useCallback} from "react";
import {Board} from "../board/board.component.tsx";
import type {SquareValue} from "../square/square-value.ts";
import {useGameStore} from "../state/state.ts";

export const Game = () => {
    const {squares, setSquares, currentTurn, changeTurn, resetTurn} = useGameStore();

    const onPlay = useCallback((nextSquares: SquareValue[]) => {
        setSquares(nextSquares);
        changeTurn();
    }, [setSquares, changeTurn]);

    return (
            <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
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
                <div style={{ marginLeft: '1rem' }}>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
    )
}
