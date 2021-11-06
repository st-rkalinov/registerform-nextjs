import useValidation from "@src/hooks/useValidation/useValidation";
import { act, renderHook } from "@testing-library/react-hooks";
import { Rule } from "@src/utils/Input/Rule";

describe("useValidation Hook", () => {
    it("should return proper types and values on the initial call of the hook", () => {
        const { result } = renderHook(() => useValidation([Rule.required(), Rule.max(10), Rule.min(5)]));

        expect(result.current.errors).toBeInstanceOf(Array);
        expect(result.current.errors.length).toEqual(0);
        expect(result.current.checkForErrors).toBeInstanceOf(Function);
    });

    it("should return proper values if the state of the hooks changes", () => {
        const { result } = renderHook(() => useValidation([Rule.required(), Rule.min(5)]));

        act(() => result.current.checkForErrors(""));
        expect(result.current.errors).toBeInstanceOf(Array);
        expect(result.current.errors.length).toEqual(2);
        expect(result.current.errors).toEqual(expect.arrayContaining([Rule.required().defaultMessage, Rule.min(5).defaultMessage]));

        act(() => result.current.checkForErrors("4"));
        expect(result.current.errors).toBeInstanceOf(Array);
        expect(result.current.errors.length).toEqual(1);
        expect(result.current.errors).toEqual(expect.arrayContaining([Rule.min(5).defaultMessage]));

        act(() => result.current.checkForErrors("5"));
        expect(result.current.errors).toBeInstanceOf(Array);
        expect(result.current.errors.length).toEqual(0);
    });

    //TODO: to be completed
    it("should throw error if min OR max rule is used but the passed value is is NaN", () => {
        const { result } = renderHook(() => useValidation([Rule.required(), Rule.min(5)]));
    });
});
