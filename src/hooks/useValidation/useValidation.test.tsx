import React from "react";
import useValidation from "@src/hooks/useValidation/useValidation";
import { act, renderHook } from "@testing-library/react-hooks";
import { Rule } from "@src/features/Input/Rule";

describe("useValidation Hook", () => {
     let mockedInput: any;

    beforeEach(() => {
        mockedInput = () => <input name="test" type="text" value="" />;
    });
    it("should return proper types and values on the initial call of the hook", () => {
        const { result } = renderHook(() => useValidation([Rule.required(), Rule.max(10), Rule.min(5)]));

        expect(result.current.errors).toBeInstanceOf(Array);
        expect(result.current.errors.length).toEqual(0);
        expect(result.current.checkForErrors).toBeInstanceOf(Function);
    });

    it("should return proper values if the state of the hooks changes", () => {
        const { result } = renderHook(() => useValidation([Rule.required(), Rule.min(5)]));

        mockedInput.value = "";
        act(() => result.current.checkForErrors(mockedInput));
        expect(result.current.errors).toBeInstanceOf(Array);
        expect(result.current.errors.length).toEqual(2);
        expect(result.current.errors).toEqual(expect.arrayContaining([Rule.required().defaultMessage, Rule.min(5).defaultMessage]));

        mockedInput.value = "4";
        act(() => result.current.checkForErrors(mockedInput));
        expect(result.current.errors).toBeInstanceOf(Array);
        expect(result.current.errors.length).toEqual(1);
        expect(result.current.errors).toEqual(expect.arrayContaining([Rule.min(5).defaultMessage]));

        mockedInput.value = "5";
        act(() => result.current.checkForErrors(mockedInput));
        expect(result.current.errors).toBeInstanceOf(Array);
        expect(result.current.errors.length).toEqual(0);
    });

    //TODO: to be completed
    it("should throw error if min OR max rule is used but the passed value is is NaN", () => {
        const { result } = renderHook(() => useValidation([Rule.required(), Rule.min(5)]));
    });
});
