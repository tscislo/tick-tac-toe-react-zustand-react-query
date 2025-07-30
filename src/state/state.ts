import {create} from "zustand";
import {devtools} from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer';
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
    revertGamePlayToState: (history: History[]) => void;
}

export const useGameStore = create<GameState>()(
        devtools(immer((set, get) => ({
            currentTurn: startingTurn,
            squares: generateEmptyBoard(),
            history: [],
            addToHistory: (historyValue: SquareValue[]) => set((state) => {
                state.history.push({
                    turn: state.currentTurn,
                    time: (new Date()).toLocaleTimeString(),
                    value: historyValue,
                });
            }),
            goBackToHistoryItem: (historyItemIdx: number) => {
                set((state) => {
                    state.squares = state.history[historyItemIdx].value;
                    state.currentTurn = state.history[historyItemIdx].turn;
                    state.history = state.history.slice(0, historyItemIdx + 1);
                })
                get().changeTurn();
            },
            setSquares: (nextSquares: SquareValue[]) => set((state) => {
                state.squares = [...nextSquares];
            }),
            changeTurn: () => set((state) => {
                state.currentTurn = state.currentTurn==='x' ? 'o':'x'
            }),
            resetTurn: () => set((state) => {
                state.currentTurn = startingTurn;
                state.history = [];
                state.squares = generateEmptyBoard()
            }),
            revertGamePlayToState: (history: History[]) => {
                set((state) => {
                    state.history = history;
                })
                get().goBackToHistoryItem(get().history.length - 1);
            }
        })))
)
