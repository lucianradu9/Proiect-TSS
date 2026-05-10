import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "../../src/hooks/useLocalStorage";

describe("useLocalStorage - teste generate cu AI", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("foloseste valoarea initiala daca nu exista date salvate", () => {
    const { result } = renderHook(() =>
      useLocalStorage("ai-test-key", "valoare initiala")
    );

    expect(result.current[0]).toBe("valoare initiala");
  });

  it("incarca valoarea existenta din localStorage", () => {
    localStorage.setItem("ai-test-key", JSON.stringify("valoare salvata"));

    const { result } = renderHook(() =>
      useLocalStorage("ai-test-key", "valoare initiala")
    );

    expect(result.current[0]).toBe("valoare salvata");
  });

  it("actualizeaza valoarea si o salveaza in localStorage", () => {
    const { result } = renderHook(() =>
      useLocalStorage("ai-test-key", "valoare initiala")
    );

    act(() => {
      result.current[1]("valoare modificata");
    });

    expect(result.current[0]).toBe("valoare modificata");
    expect(JSON.parse(localStorage.getItem("ai-test-key"))).toBe(
      "valoare modificata"
    );
  });

  it("reseteaza valoarea la valoarea initiala", () => {
    const { result } = renderHook(() =>
      useLocalStorage("ai-test-key", "valoare initiala")
    );

    act(() => {
      result.current[1]("valoare modificata");
    });

    act(() => {
      result.current[2]();
    });

    expect(result.current[0]).toBe("valoare initiala");
  });
});
