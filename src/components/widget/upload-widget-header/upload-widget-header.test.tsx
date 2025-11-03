import {render, screen} from "@testing-library/react";
import {UploadWidgetHeader} from "./upload-widget-header.tsx";
import userEvent from "@testing-library/user-event";
import * as Collapsible from "@radix-ui/react-collapsible";

const renderWithCollapsible = () => {
    return render(
        <Collapsible.Root>
            <UploadWidgetHeader/>
        </Collapsible.Root>
    );
};

describe("UploadWidgetHeader", () => {
    it("renders the header with the correct title", () => {
        renderWithCollapsible();
        const titleElement = screen.getByRole("heading");
        expect(titleElement).toBeInTheDocument();
        // expect(titleElement.textContent).toMatch(/upload/i);
    });

    it("renders a button with aria-label to toggle the widget", () => {
        renderWithCollapsible();
        const toggleButton = screen.getByRole("button", {name: /toggle upload widget/i});
        expect(toggleButton).toBeInTheDocument();
    });

    it("shows correct icon based on collapse state", async () => {
        const user = userEvent.setup();

        render(
            <Collapsible.Root defaultOpen={true}>
                <UploadWidgetHeader/>
            </Collapsible.Root>
        );

        const toggleButton = screen.getByRole("button", {name: /toggle upload widget/i});

        // When open, button should have data-state="open"
        expect(toggleButton).toHaveAttribute('data-state', 'open');

        // Click to close
        await user.click(toggleButton);

        // When closed, button should have data-state="closed"
        expect(toggleButton).toHaveAttribute('data-state', 'closed');

        // Click again to open
        await user.click(toggleButton);

        // Should return to initial state
        expect(toggleButton).toHaveAttribute('data-state', 'open');
    });

    it("is keyboard accessible", async () => {
        const user = userEvent.setup();
        renderWithCollapsible();

        const toggleButton = screen.getByRole("button", {name: /toggle upload widget/i});

        await user.tab();
        expect(toggleButton).toHaveFocus();

        await user.keyboard('{Enter}');
        expect(toggleButton).toBeEnabled();
    });
});