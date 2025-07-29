import {useCallback} from "react";
import {
    calculateGameplayStatus,
    calculateStatusText,
    calculateTurns,
    calculateWinner,
    GameplayStatus
} from "../helpers/helpers.ts";
import type {SquareValue} from "../square/square-value.ts";
import {Square} from "../square/square.component.tsx";

export const Board = ({squares, currentTurn, onPlay, resetGame}: {squares: SquareValue[], currentTurn: SquareValue, onPlay: (squares: SquareValue[]) => void, resetGame: () => void}) => {
    const winner = calculateWinner(squares);
    const turns = calculateTurns(squares);
    const statusText = calculateStatusText(winner, turns, currentTurn);
    const status = calculateGameplayStatus(winner, turns);

    const setSquare = useCallback((squareIdx: number) => {
        if (squares[squareIdx]!==null || winner!==null) return;
        squares[squareIdx] = currentTurn;
        onPlay(squares);
    }, [squares, onPlay, winner, currentTurn]);

    return (
            <>
                <div style={{marginBottom: '0.5rem'}}>{statusText}</div>
                <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gridTemplateRows: 'repeat(3, 1fr)',
                            width: 'calc(3 * 2.5rem)',
                            height: 'calc(3 * 2.5rem)',
                            border: '1px solid #999',
                        }}
                >
                    {squares.map((square, index) => (
                            <Square value={square} key={index} onSquareClick={() => setSquare(index)}/>
                    ))}
                </div>
                {(status !== GameplayStatus.ONGOING) && <button onClick={resetGame}>Reset!</button>}
            </>
    )
}
