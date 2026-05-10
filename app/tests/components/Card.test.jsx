import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Card from "../../src/components/Card";

describe("Card", () => {
    const card = {
        id: "card-1",
        title: "Implement tests",
        description: "Write unit tests for components",
        column: "To Do",
        labels: ["test", "feature"],
        priority: "high"
    };

    it("afiseaza informatiile cardului", () => {
        render(
            <Card
                card={card}
                onDragStart={vi.fn()}
                onDragEnd={vi.fn()}
                onEdit={vi.fn()}
                onDelete={vi.fn()}
                isDragging={false}
            />
        );

        expect(screen.getByText("Implement tests")).toBeInTheDocument();
        expect(screen.getByText("Write unit tests for components")).toBeInTheDocument();
        expect(screen.getByText("test")).toBeInTheDocument();
        expect(screen.getByText("feature")).toBeInTheDocument();
    });

    it("apeleaza onEdit cand utilizatorul apasa butonul de editare", async () => {
        const user = userEvent.setup();
        const onEdit = vi.fn();

        render(
            <Card
                card={card}
                onDragStart={vi.fn()}
                onDragEnd={vi.fn()}
                onEdit={onEdit}
                onDelete={vi.fn()}
                isDragging={false}
            />
        );

        await user.click(screen.getByLabelText(/edit card/i));

        expect(onEdit).toHaveBeenCalledWith(card);
    });

    it("apeleaza onDelete cu id-ul cardului", async () => {
        const user = userEvent.setup();
        const onDelete = vi.fn();

        render(
            <Card
                card={card}
                onDragStart={vi.fn()}
                onDragEnd={vi.fn()}
                onEdit={vi.fn()}
                onDelete={onDelete}
                isDragging={false}
            />
        );

        await user.click(screen.getByLabelText(/delete card/i));

        expect(onDelete).toHaveBeenCalledWith("card-1");
    });

    it("apeleaza onDragStart cu id-ul cardului", () => {
        const onDragStart = vi.fn();

        render(
            <Card
                card={card}
                onDragStart={onDragStart}
                onDragEnd={vi.fn()}
                onEdit={vi.fn()}
                onDelete={vi.fn()}
                isDragging={false}
            />
        );

        const cardElement = screen.getByRole("listitem");
        const dragEvent = new Event("dragstart", { bubbles: true });

        Object.defineProperty(dragEvent, "dataTransfer", {
            value: {
                effectAllowed: "",
                setData: vi.fn()
            }
        });

        cardElement.dispatchEvent(dragEvent);

        expect(onDragStart).toHaveBeenCalled();
    });
});
