import {create} from "zustand";
import {generateEmptyBoard} from "../helpers/helpers.ts";
import type {SquareValue} from "../square/square-value.ts";

const startingTurn: SquareValue = 'x';

type setSquaresFn = (squares: SquareValue[]) => void;

export interface History {
    turn: SquareValue;
    time: string;
    value: SquareValue[]
}

export interface GameState {
    squares: SquareValue[];
    history: History[];
    setSquares: setSquaresFn;
    currentTurn: SquareValue;
    changeTurn: () => void;
    resetTurn: () => void;
    addToHistory: (newHistoryItem: SquareValue[]) => void;
    goBackToHistoryItem: (historyItemIdx: number) => void;
}

export const useGameStore = create<GameState>()(
        (set) => ({
            currentTurn: startingTurn,
            squares: generateEmptyBoard(),
            history: [],
            addToHistory: (historyValue: SquareValue[]) => set((state) => {
                const newHistoryItem = {
                    turn: state.currentTurn,
                    time: (new Date()).toLocaleTimeString(),
                    value: historyValue,
                }
                return {history: [...state.history, newHistoryItem]}
            }),
            goBackToHistoryItem: (historyItemIdx: number) => set((state) => {
                return {
                    squares: [...state.history[historyItemIdx].value],
                    currentTurn: state.history[historyItemIdx].turn,
                    history: state.history.slice(0, historyItemIdx),
                }
            }),
            setSquares: (nextSquares: SquareValue[]) => set(() => ({squares: [...nextSquares]})),
            changeTurn: () => set((state) => ({currentTurn: state.currentTurn==='x' ? 'o':'x'})),
            resetTurn: () => set(() => ({currentTurn: startingTurn, history: [], squares: generateEmptyBoard()})),
        })
)
