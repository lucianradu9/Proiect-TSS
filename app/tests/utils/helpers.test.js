import { describe, it, expect, vi, afterEach } from "vitest";
import { filterTasks, formatDate, generateId } from "../../src/utils/helpers";

describe("helpers.js", () => {
    afterEach(() => {
        vi.useRealTimers();
    });

    describe("generateId", () => {
        it("genereaza id-uri de tip string", () => {
            const id = generateId();

            expect(typeof id).toBe("string");
            expect(id.length).toBeGreaterThan(0);
        });

        it("genereaza id-uri diferite la apeluri succesive", () => {
            const firstId = generateId();
            const secondId = generateId();

            expect(firstId).not.toBe(secondId);
        });
    });

    describe("formatDate", () => {
        it("returneaza 'just now' pentru o data foarte recenta", () => {
            vi.useFakeTimers();
            vi.setSystemTime(new Date("2026-03-10T12:00:00Z"));

            const result = formatDate("2026-03-10T12:00:00Z");

            expect(result).toBe("just now");
        });

        it("returneaza numarul de minute pentru o diferenta mai mica de o ora", () => {
            vi.useFakeTimers();
            vi.setSystemTime(new Date("2026-03-10T12:10:00Z"));

            const result = formatDate("2026-03-10T12:00:00Z");

            expect(result).toBe("10m ago");
        });

        it("returneaza numarul de ore pentru o diferenta mai mica de o zi", () => {
            vi.useFakeTimers();
            vi.setSystemTime(new Date("2026-03-10T15:00:00Z"));

            const result = formatDate("2026-03-10T12:00:00Z");

            expect(result).toBe("3h ago");
        });

        it("returneaza numarul de zile pentru o diferenta mai mica de o saptamana", () => {
            vi.useFakeTimers();
            vi.setSystemTime(new Date("2026-03-13T12:00:00Z"));

            const result = formatDate("2026-03-10T12:00:00Z");

            expect(result).toBe("3d ago");
        });
    });

    describe("filterTasks", () => {
        const tasks = [
            {
                id: "1",
                title: "Fix login bug",
                description: "Authentication redirect issue",
                priority: "high",
                labels: ["bug"]
            },
            {
                id: "2",
                title: "Update documentation",
                description: "Improve README",
                priority: "low",
                labels: ["docs"]
            },
            {
                id: "3",
                title: "Create dashboard",
                description: "New feature for users",
                priority: "medium",
                labels: ["feature"]
            }
        ];

        it("returneaza toate task-urile cand nu exista filtre", () => {
            const result = filterTasks(tasks, {});

            expect(result).toHaveLength(3);
        });

        it("filtreaza dupa text in titlu", () => {
            const result = filterTasks(tasks, { search: "login" });

            expect(result).toHaveLength(1);
            expect(result[0].title).toBe("Fix login bug");
        });

        it("filtreaza dupa text in descriere", () => {
            const result = filterTasks(tasks, { search: "readme" });

            expect(result).toHaveLength(1);
            expect(result[0].title).toBe("Update documentation");
        });

        it("filtreaza dupa prioritate", () => {
            const result = filterTasks(tasks, { priority: "high" });

            expect(result).toHaveLength(1);
            expect(result[0].priority).toBe("high");
        });

        it("filtreaza dupa label", () => {
            const result = filterTasks(tasks, { label: "feature" });

            expect(result).toHaveLength(1);
            expect(result[0].labels).toContain("feature");
        });

        it("combina filtrele de cautare, prioritate si label", () => {
            const result = filterTasks(tasks, {
                search: "dashboard",
                priority: "medium",
                label: "feature"
            });

            expect(result).toHaveLength(1);
            expect(result[0].title).toBe("Create dashboard");
        });

        it("returneaza lista goala daca niciun task nu respecta filtrele", () => {
            const result = filterTasks(tasks, {
                search: "payment",
                priority: "urgent",
                label: "bug"
            });

            expect(result).toEqual([]);
        });
    });
});
