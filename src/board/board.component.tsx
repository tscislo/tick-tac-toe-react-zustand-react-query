import {Square} from "../square/square.component.tsx";
import {useGameStore} from "../state/state.ts";

export const Board = () => {
    const {squares} = useGameStore()

    return (
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
                        <Square value={square} key={index} onSquareClick={() => {}} />
                ))}

            </div>
    )
}
