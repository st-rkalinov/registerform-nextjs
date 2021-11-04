import { InputRule } from "@src/interfaces/InputRuleInteface";
import useValidation from "@src/hooks/useValidation/useValidation";
import { act, renderHook } from "@testing-library/react-hooks";

const requiredRuleMock = {
    name: InputRule.required,
    message: "The field is required",
};
const minRuleMock = {
    name: InputRule.min,
    message: "The field min length is",
    min: 5,
};
const maxRuleMock = {
    name: InputRule.max,
    message: "The field min length is",
    max: 10,
};

describe("useValidation Hook", () => {
    it("should return proper types and values on the initial call of the hook", () => {
        const { result } = renderHook(() => useValidation([requiredRuleMock, maxRuleMock, minRuleMock]));

        expect(result.current.errors).toBeInstanceOf(Array);
        expect(result.current.errors.length).toEqual(0);
        expect(result.current.checkForErrors).toBeInstanceOf(Function);
    });

    it("should return proper values if the state of the hooks changes", () => {
        const { result } = renderHook(() => useValidation([requiredRuleMock, minRuleMock]));

        act(() => result.current.checkForErrors(""));
        expect(result.current.errors).toBeInstanceOf(Array);
        expect(result.current.errors.length).toEqual(2);
        expect(result.current.errors).toEqual(expect.arrayContaining([requiredRuleMock.message, minRuleMock.message]));

        act(() => result.current.checkForErrors("asd"));
        expect(result.current.errors).toBeInstanceOf(Array);
        expect(result.current.errors.length).toEqual(1);
        expect(result.current.errors).toEqual(expect.arrayContaining([minRuleMock.message]));


        act(() => result.current.checkForErrors("asddd"));
        expect(result.current.errors).toBeInstanceOf(Array);
        expect(result.current.errors.length).toEqual(0);
    });
});
