import {create} from "zustand";
import {generateEmptyBoard} from "../helpers/helpers.ts";
import type {SquareValue} from "../square/square-value.ts";

const startingTurn : SquareValue = 'x';

type setSquaresFn = (squares: SquareValue[]) => void;

export interface GameState {
    squares: SquareValue[];
    setSquares: setSquaresFn;
    currentTurn: SquareValue;
    changeTurn: () => void;
    resetTurn: () => void;
    history: SquareValue[][];
}

export const useGameStore = create<GameState>()(
        (set) => ({
            currentTurn: startingTurn,
            squares: generateEmptyBoard(),
            history: [],
            setSquares: (nextSquares: SquareValue[]) => set(() => ({squares: [...nextSquares]})),
            changeTurn: () => set((state) => ({currentTurn: state.currentTurn === 'x' ? 'o' : 'x'})),
            resetTurn:() => set(() => ({currentTurn: startingTurn, squares: generateEmptyBoard()})),
        })
)
