import type {SquareValue} from "../square/square-value.ts";

export function calculateWinner(squares:SquareValue[]) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }
    }

    return null
}

export function calculateTurns(squares: SquareValue[]) {
    return squares.filter((square) => square === null).length
}

export function calculateStatus(winner: SquareValue, turns: number, player: SquareValue) {
    if (!winner && !turns) return 'Draw'
    if (winner) return `Winner ${winner}`
    return `Next player: ${player}`
}

export function generateEmptyBoard() {
    return Array<SquareValue>(9).fill(null);
}
