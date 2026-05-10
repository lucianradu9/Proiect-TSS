import { describe, it, expect } from "vitest";
import {
    DEFAULT_COLUMNS,
    LABELS,
    PRIORITIES,
    createCard,
    getDefaultBoard
} from "../../src/utils/data";

describe("data.js", () => {
    describe("createCard", () => {
        it("creeaza un card cu datele primite", () => {
            const card = createCard({
                title: "Write tests",
                description: "Add unit tests",
                column: "To Do",
                labels: ["test"],
                priority: "high"
            });

            expect(card.title).toBe("Write tests");
            expect(card.description).toBe("Add unit tests");
            expect(card.column).toBe("To Do");
            expect(card.labels).toEqual(["test"]);
            expect(card.priority).toBe("high");
            expect(card.id).toBeDefined();
            expect(card.createdAt).toBeDefined();
        });

        it("foloseste valori implicite pentru campurile optionale", () => {
            const card = createCard({
                title: "Simple card",
                column: "Backlog"
            });

            expect(card.description).toBe("");
            expect(card.labels).toEqual([]);
            expect(card.priority).toBe("medium");
        });
    });

    describe("getDefaultBoard", () => {
        it("returneaza coloanele implicite", () => {
            const board = getDefaultBoard();

            expect(board.columns).toEqual(DEFAULT_COLUMNS);
        });

        it("returneaza carduri initiale valide", () => {
            const board = getDefaultBoard();

            expect(board.cards.length).toBeGreaterThan(0);

            board.cards.forEach((card) => {
                expect(card.id).toBeDefined();
                expect(card.title).toBeDefined();
                expect(DEFAULT_COLUMNS).toContain(card.column);
                expect(PRIORITIES).toContain(card.priority);

                card.labels.forEach((label) => {
                    expect(LABELS).toContain(label);
                });
            });
        });
    });
});
