import {render, screen} from "@testing-library/react";
import {describe, expect, test} from 'vitest'
import {HistoryComponent} from "./history.component.tsx";

describe("History", () => {
    test('should not show the header when history is empty', async () => {
        render(<HistoryComponent history={[]} onHistoryItemClick={() => {}} />);

        expect(screen.queryByTestId('title')).not.toBeInTheDocument();
    });

    test('should show the header when history is not empty', async () => {
        render(<HistoryComponent history={[
            {
                value: [],
                turn: 'x',
                time: ""
            }
        ]} onHistoryItemClick={() => {}} />);

        expect(screen.queryByTestId('title')).toBeInTheDocument();
    });
})

