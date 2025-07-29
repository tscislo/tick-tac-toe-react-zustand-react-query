import {create} from "zustand";
import type {SquareValue} from "../square/square-value.ts";

export interface GameState {
    squares: SquareValue[]
}

export const useGameStore = create<GameState>()(
        (set) => ({
            squares: Array<SquareValue>(9).fill(null)
        })
)
