import {useCallback} from "react";
import {calculateStatus, calculateTurns, calculateWinner} from "../helpers/helpers.ts";
import {Square} from "../square/square.component.tsx";
import {useGameStore} from "../state/state.ts";

export const Board = () => {
    const {squares, setSquares, currentTurn, changeTurn, resetTurn} = useGameStore();
    const winner = calculateWinner(squares)
    const turns = calculateTurns(squares)
    const status = calculateStatus(winner, turns, currentTurn)

    const setSquare = useCallback((squareIdx: number) => {
        if (squares[squareIdx]!==null || winner!==null) return;
        squares[squareIdx] = currentTurn;
        setSquares(squares);
        changeTurn();
    }, [squares, setSquares, currentTurn, changeTurn, winner]);

    return (
            <>
                <div style={{marginBottom: '0.5rem'}}>{status}</div>
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
                {(winner) && <button onClick={resetTurn}>Restart!</button>}
            </>
    )
}
