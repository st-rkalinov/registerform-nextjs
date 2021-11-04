import { act, renderHook } from "@testing-library/react-hooks";
import useIsTouched from "@src/hooks/useIsTouched/useIsTouched";

describe("useIsTouched Hook", () => {
    it("should return proper types and values on the initial call of the hook", () => {
        const { result } = renderHook(() => useIsTouched());

        expect(typeof result.current.isTouched).toEqual("boolean");
        expect(result.current.isTouched).toEqual(false);
        expect(result.current.setIsTouched).toBeInstanceOf(Function);
    });

    it("should return proper values if the state of the hooks changes", () => {
        const { result } = renderHook(() => useIsTouched());

        act(() => result.current.setIsTouched(true));
        expect(result.current.isTouched).toEqual(true);
    });
});
