import type {SquareValue} from "./square-value.ts";

export const Square = ({ value, onSquareClick, idx }: {value: SquareValue, onSquareClick: () => void, idx: number})=>  {
    return (
            <button
                    data-testid={`square-${idx}`}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 0,
                        backgroundColor: '#fff',
                        color: 'black',
                        border: '1px solid #999',
                        outline: 0,
                        borderRadius: 0,
                        fontSize: '1rem',
                        fontWeight: 'bold',
                    }}
                    onClick={onSquareClick}
            >
                {value}
            </button>
    )
}
