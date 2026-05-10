import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "../../src/hooks/useLocalStorage";

describe("useLocalStorage", () => {
    beforeEach(() => {
        window.localStorage.clear();
    });

    it("returneaza valoarea initiala cand localStorage nu contine cheia", () => {
        const { result } = renderHook(() =>
            useLocalStorage("test-key", { value: "initial" })
        );

        expect(result.current[0]).toEqual({ value: "initial" });
    });

    it("citeste valoarea existenta din localStorage", () => {
        window.localStorage.setItem(
            "test-key",
            JSON.stringify({ value: "stored" })
        );

        const { result } = renderHook(() =>
            useLocalStorage("test-key", { value: "initial" })
        );

        expect(result.current[0]).toEqual({ value: "stored" });
    });

    it("actualizeaza valoarea si o salveaza in localStorage", () => {
        const { result } = renderHook(() =>
            useLocalStorage("test-key", { value: "initial" })
        );

        act(() => {
            result.current[1]({ value: "updated" });
        });

        expect(result.current[0]).toEqual({ value: "updated" });
        expect(JSON.parse(window.localStorage.getItem("test-key"))).toEqual({
            value: "updated"
        });
    });

    it("revine la valoarea initiala la reset", () => {
        const { result } = renderHook(() =>
            useLocalStorage("test-key", { value: "initial" })
        );

        act(() => {
            result.current[1]({ value: "updated" });
        });

        act(() => {
            result.current[2]();
        });

        expect(result.current[0]).toEqual({ value: "initial" });
    });

    it("foloseste valoarea initiala daca localStorage contine JSON invalid", () => {
        window.localStorage.setItem("broken-key", "{invalid-json");

        const { result } = renderHook(() =>
            useLocalStorage("broken-key", "fallback")
        );

        expect(result.current[0]).toBe("fallback");
    });
});
