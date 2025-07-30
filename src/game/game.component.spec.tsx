import {render, screen} from "@testing-library/react";
import {describe, expect, test} from 'vitest'
import {Game} from "./game.component.tsx";
import userEvent from '@testing-library/user-event'

describe("Game", () => {
    test('should render board container', async () => {
        // ARRANGE + ACT
        render(<Game />);

        // ASSERT
        expect(await screen.findByTestId('board')).toBeInTheDocument();
    });

    test('should allow for clicking on the board and marking "x"', async () => {
        // ARRANGE
        render(<Game />);

        // ACT
        await userEvent.click(screen.getByTestId('square-0'))

        // ASSERT
        expect(await screen.findByTestId('square-0')).toHaveTextContent('x');
    });

    test('should allow for clicking on the board and marking "x" and next turn as "o"', async () => {
        // ARRANGE
        render(<Game />);

        // ACT
        await userEvent.click(screen.getByTestId('square-0'));
        await userEvent.click(screen.getByTestId('square-1'));

        // ASSERT
        expect(await screen.findByTestId('square-1')).toHaveTextContent('o');
    });

})

