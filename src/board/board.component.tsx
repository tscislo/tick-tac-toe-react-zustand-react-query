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

export const Board = ({squares, currentTurn, onPlay, resetGame, load, save}: {
    squares: SquareValue[],
    currentTurn: SquareValue,
    onPlay: (squares: SquareValue[]) => void,
    resetGame: () => void,
    load: () => void,
    save: () => void,
}) => {
    const winner = calculateWinner(squares);
    const turns = calculateTurns(squares);
    const statusText = calculateStatusText(winner, turns, currentTurn);
    const status = calculateGameplayStatus(winner, turns);

    const setSquare = useCallback((squareIdx: number) => {
        if (squares[squareIdx]!==null || winner!==null) return;
        const squaresCopy = [...squares];
        squaresCopy[squareIdx] = currentTurn;
        onPlay(squaresCopy);
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
                            <Square value={square} key={index} onSquareClick={() => setSquare(index)} idx={index}/>
                    ))}
                </div>
                {<div><button onClick={load}>Load!</button></div>}
                {<div><button onClick={save}>Save!</button></div>}
                {(status !== GameplayStatus.ONGOING) && <div><button onClick={resetGame}>Reset!</button></div>}
            </>
    )
}
