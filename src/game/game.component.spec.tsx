import {render, screen} from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import {describe, expect, test} from 'vitest'
import {QueryClientTestWrapper} from "../testing/query-client-test-wrapper.tsx";
import {Game} from "./game.component.tsx";

describe("Game", () => {
    test('should render board container', async () => {
        // ARRANGE + ACT
        render(<QueryClientTestWrapper><Game/></QueryClientTestWrapper>);

        // ASSERT
        expect(await screen.findByTestId('board')).toBeInTheDocument();
    });

    test('should allow for clicking on the board and marking "x"', async () => {
        // ARRANGE
        render(<QueryClientTestWrapper><Game/></QueryClientTestWrapper>);

        // ACT
        await userEvent.click(screen.getByTestId('square-0'))

        // ASSERT
        expect(await screen.findByTestId('square-0')).toHaveTextContent('x');
    });

    test('should allow for clicking on the board and marking "x" and next turn as "o"', async () => {
        // ARRANGE
        render(<QueryClientTestWrapper><Game/></QueryClientTestWrapper>);

        // ACT
        await userEvent.click(screen.getByTestId('square-0'));
        await userEvent.click(screen.getByTestId('square-1'));

        // ASSERT
        expect(await screen.findByTestId('square-1')).toHaveTextContent('o');
    });

})

