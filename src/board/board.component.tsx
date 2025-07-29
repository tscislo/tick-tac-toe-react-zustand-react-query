import {Square} from "../square/square.component.tsx";

export const Board = () => {
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
                <Square value="x" onSquareClick={() => {}} />
                <Square value="x" onSquareClick={() => {}} />
                <Square value="x" onSquareClick={() => {}} />
                <Square value="x" onSquareClick={() => {}} />
                <Square value="x" onSquareClick={() => {}} />
                <Square value="x" onSquareClick={() => {}} />
                <Square value="x" onSquareClick={() => {}} />
                <Square value="x" onSquareClick={() => {}} />
                <Square value="x" onSquareClick={() => {}} />
            </div>
    )
}
