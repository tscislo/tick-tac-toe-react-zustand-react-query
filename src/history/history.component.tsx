import type {History} from "../state/state.ts";

export const HistoryComponent = ({history, onHistoryItemClick}: {
    history: History[],
    onHistoryItemClick: (idx: number) => void
}) => {
    const hasHistory = history.length > 0;

    return <>
        {hasHistory && (
                <>
                    <div style={{marginTop: '0.5rem'}}>History</div>
                    <div style={{marginLeft: '0.4rem'}}>
                        {
                            history.map((h: History, idx) => (
                                    <div key={idx}>
                                        <button
                                                onClick={() => onHistoryItemClick(idx)}
                                                style={{fontSize: '11px'}}>Time: {h.time} Turn: {h.turn}</button>
                                    </div>
                            ))
                        }
                    </div>
                </>)
        }
    </>
}
