import type {SquareValue} from "../square/square-value.ts";

export enum GameplayStatus {
    ONGOING = "ONGOING",
    DRAW = "DRAW",
    WINNER = "WINNER",
}

export function calculateWinner(squares: SquareValue[]) {
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
        if (squares[a] && squares[a]===squares[b] && squares[a]===squares[c]) {
            return squares[a]
        }
    }

    return null
}

export function calculateTurns(squares: SquareValue[]) {
    return squares.filter((square) => square===null).length
}

export function calculateStatusText(winner: SquareValue, turns: number, player: SquareValue) {
    if (calculateGameplayStatus(winner, turns) === GameplayStatus.DRAW)  {
        return "Draw!";
    } else if (calculateGameplayStatus(winner, turns) === GameplayStatus.WINNER) {
        return `Winner ${winner}`;
    }
    return `Next player: ${player}`
}

export function calculateGameplayStatus(winner: SquareValue, turns: number): GameplayStatus {
    if (!winner && !turns) return GameplayStatus.DRAW
    if (winner) return GameplayStatus.WINNER;
    return GameplayStatus.ONGOING;
}

export function generateEmptyBoard() {
    return Array<SquareValue>(9).fill(null);
}
