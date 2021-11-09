import React from "react";
import {
    firstNameLastNameRegex,
    moreThanTwoSpacesDashesApostrophes,
    noSpecialCharacterRegex,
    Rule,
} from "@src/features/Input/Rule";
import { InputRule } from "@src/interfaces/InputRuleInteface";

const testMessage = "test message";

describe("InputRulesUtils", () => {
    it("required rule should return correct object structure and values", () => {
        const rule = Rule.required();

        expect(rule).toHaveProperty("name");
        expect(rule).toHaveProperty("message");
        expect(rule.message).toEqual(undefined);
        expect(rule.name).toEqual(InputRule.required);

        const ruleWithMessage = Rule.required(testMessage);
        expect(ruleWithMessage.name).toEqual(InputRule.required);
        expect(ruleWithMessage.message).toEqual(testMessage);
    });

    it("min rule should return correct object structure and values", () => {
        const minValue = 5;
        const rule = Rule.min(minValue);

        expect(rule).toHaveProperty("name");
        expect(rule).toHaveProperty("message");
        expect(rule).toHaveProperty("min");
        expect(rule.name).toEqual(InputRule.min);
        expect(rule.message).toEqual(undefined);
        expect(rule.min).toEqual(minValue);

        const ruleWithMessage = Rule.min(5, testMessage);
        expect(ruleWithMessage.name).toEqual(InputRule.min);
        expect(ruleWithMessage.message).toEqual(testMessage);
        expect(ruleWithMessage.min).toEqual(minValue);
    });

    it("max rule should return correct object structure and values", () => {
        const maxValue = 5;
        const rule = Rule.max(maxValue);

        expect(rule).toHaveProperty("name");
        expect(rule).toHaveProperty("message");
        expect(rule).toHaveProperty("max");
        expect(rule.name).toEqual(InputRule.max);
        expect(rule.message).toEqual(undefined);
        expect(rule.max).toEqual(maxValue);

        const ruleWithMessage = Rule.max(5, testMessage);
        expect(ruleWithMessage.name).toEqual(InputRule.max);
        expect(ruleWithMessage.message).toEqual(testMessage);
        expect(ruleWithMessage.max).toEqual(maxValue);
    });

    it("minLen rule should return correct object structure and values", () => {
        const minLen = 5;
        const rule = Rule.minLen(minLen);

        expect(rule).toHaveProperty("name");
        expect(rule).toHaveProperty("message");
        expect(rule).toHaveProperty("minLen");
        expect(rule.name).toEqual(InputRule.minLen);
        expect(rule.message).toEqual(undefined);
        expect(rule.minLen).toEqual(minLen);

        const ruleWithMessage = Rule.minLen(5, testMessage);
        expect(ruleWithMessage.name).toEqual(InputRule.minLen);
        expect(ruleWithMessage.message).toEqual(testMessage);
        expect(ruleWithMessage.minLen).toEqual(minLen);
    });

    it("maxLen rule should return correct object structure and values", () => {
        const maxLen = 5;
        const rule = Rule.maxLen(maxLen);

        expect(rule).toHaveProperty("name");
        expect(rule).toHaveProperty("message");
        expect(rule).toHaveProperty("maxLen");
        expect(rule.name).toEqual(InputRule.maxLen);
        expect(rule.message).toEqual(undefined);
        expect(rule.maxLen).toEqual(maxLen);

        const ruleWithMessage = Rule.maxLen(5, testMessage);
        expect(ruleWithMessage.name).toEqual(InputRule.maxLen);
        expect(ruleWithMessage.message).toEqual(testMessage);
        expect(ruleWithMessage.maxLen).toEqual(maxLen);
    });

    it("forbiddenValues rule should return correct object structure and values", () => {
        const forbiddenValues = ["Name, Email"];
        const rule = Rule.forbiddenValues(forbiddenValues);

        expect(rule).toHaveProperty("name");
        expect(rule).toHaveProperty("message");
        expect(rule).toHaveProperty("forbiddenValues");
        expect(rule.name).toEqual(InputRule.forbiddenValues);
        expect(rule.message).toEqual(undefined);
        expect(rule.forbiddenValues).toHaveLength(forbiddenValues.length);
        expect(rule.forbiddenValues).toEqual(forbiddenValues);

        const ruleWithMessage = Rule.forbiddenValues(forbiddenValues, testMessage);
        expect(ruleWithMessage.name).toEqual(InputRule.forbiddenValues);
        expect(ruleWithMessage.message).toEqual(testMessage);
        expect(ruleWithMessage.forbiddenValues).toEqual(forbiddenValues);
    });

    it("regexExp rule should return correct object structure and values", () => {
        const rule = Rule.regexExp(noSpecialCharacterRegex);

        expect(rule).toHaveProperty("name");
        expect(rule).toHaveProperty("message");
        expect(rule).toHaveProperty("regex");
        expect(rule.name).toEqual(InputRule.regexExp);
        expect(rule.message).toEqual(undefined);
        expect(rule.regex).toEqual(noSpecialCharacterRegex);

        const ruleWithMessage = Rule.regexExp(noSpecialCharacterRegex, testMessage);
        expect(ruleWithMessage.name).toEqual(InputRule.regexExp);
        expect(ruleWithMessage.message).toEqual(testMessage);
        expect(ruleWithMessage.regex).toEqual(noSpecialCharacterRegex);
    });

    describe("InputRulesUtils validators", () => {
        let mockedInput: any;

        beforeEach(() => {
            mockedInput = () => <input name="test" type="text" value="" />;
        });

        it.each([
            ["", false],
            ["asd", true],
        ])("required validator should return correct value", (inputValue, expectedResult) => {
            mockedInput.value = inputValue;
            expect(Rule.required().isValid(mockedInput)).toEqual(expectedResult);
        });

        it.each([
            ["", 4, false],
            ["3", 4, false],
            ["4", 4, true],
            ["5", 4, true],
        ])("min validator should return correct value", (inputValue, minValue, expectedResult) => {
            mockedInput.value = inputValue;
            expect(Rule.min(minValue).isValid(mockedInput)).toEqual(expectedResult);
        });

        it("min validator should throw error if inputValue cannot be a number", () => {
            mockedInput.value = "asd";
            expect(() => Rule.min(5).isValid(mockedInput)).toThrow("The value entered is not a number");
        });

        it.each([
            ["11", 10, false],
            ["", 10, true],
            ["10", 10, true],
            ["5", 10, true],
        ])("max validator should return correct value", (inputValue, maxValue, expectedResult) => {
            mockedInput.value = inputValue;
            expect(Rule.max(maxValue).isValid(mockedInput)).toEqual(expectedResult);
        });

        it("max validator should throw error if inputValue cannot be a number", () => {
            mockedInput.value = "asd";
            expect(() => Rule.max(10).isValid(mockedInput)).toThrow("The value entered is not a number");
        });

        it.each([
            ["", 5, false],
            ["1", 5, false],
            ["12345", 5, true],
            ["123456", 5, true],
        ])("minLen validator should return correct value", (inputValue, minValue, expectedResult) => {
            mockedInput.value = inputValue;
            expect(Rule.minLen(minValue).isValid(mockedInput)).toEqual(expectedResult);
        });

        it.each([
            ["", 7, true],
            ["1", 7, true],
            ["1234567", 7, true],
            ["12345678", 7, false],
        ])("maxLen validator should return correct value", (inputValue, minValue, expectedResult) => {
            mockedInput.value = inputValue;
            expect(Rule.maxLen(minValue).isValid(mockedInput)).toEqual(expectedResult);
        });

        it.each([
            ["", ["SomeFirstName", "stoyan@gmail.com", "SomeLastName"], true],
            ["a", ["SomeFirstName", "stoyan@gmail.com", "SomeLastName"], true],
            ["SomeFirstName", ["SomeFirstName", "stoyan@gmail.com", "SomeLastName"], false],
            ["stoyan", ["SomeFirstName", "stoyan", "SomeLastName"], false],
            ["SomeLastName Asd", ["SomeFirstName", "stoyan@gmail.com", "SomeLastName"], false],
            ["Some valid value", ["SomeFirstName", "stoyan@gmail.com", "SomeLastName"], true],
        ])("forbiddenValues validator should return correct value", (inputValue, forbiddenValues, expectedResult) => {
            mockedInput.value = inputValue;
            expect(Rule.forbiddenValues(forbiddenValues).isValid(mockedInput)).toEqual(expectedResult);
        });

        //TODO: to make correct implementation
        it.each([
            ["", true],
            ["a", true],
            ["SomeFirstName", false],
            ["stoyan", false],
            ["SomeLastName Asd", false],
            ["Some valid value", ["SomeFirstName", "stoyan@gmail.com", "SomeLastName"], true],
        ])("date validator should return correct value", () => undefined);

        it.each([
            ["", noSpecialCharacterRegex, true],
            ["a", noSpecialCharacterRegex, true],
            ["@someValue", noSpecialCharacterRegex, false],
            ["$-someOtherValue", noSpecialCharacterRegex, false],
            ["@!%$@#5", noSpecialCharacterRegex, false],
            ["Some value with spaces", noSpecialCharacterRegex, false],
            ["PasswordWithoutSpaces", noSpecialCharacterRegex, true],
            ["", firstNameLastNameRegex, true],
            [" ", firstNameLastNameRegex, true],
            ["a", firstNameLastNameRegex, true],
            ["@someValue", firstNameLastNameRegex, false],
            ["$-someOtherValue", firstNameLastNameRegex, false],
            ["$&%^-someOtherValue", firstNameLastNameRegex, false],
            ["22123", firstNameLastNameRegex, false],
            ["Some value with spaces", firstNameLastNameRegex, true],
            ["Valid First Name", firstNameLastNameRegex, true],
            ["Stoyan-Kalinov", firstNameLastNameRegex, true],
            ["Stoyan't-Kalinov", firstNameLastNameRegex, true],
            ["Stoyan't-Kalinov Asd", firstNameLastNameRegex, true],
            ["---", moreThanTwoSpacesDashesApostrophes, true],
            ["   ", moreThanTwoSpacesDashesApostrophes, true],
            ["'''", moreThanTwoSpacesDashesApostrophes, true],
            ["--", moreThanTwoSpacesDashesApostrophes, false],
            ["''", moreThanTwoSpacesDashesApostrophes, false],
            ["  ", moreThanTwoSpacesDashesApostrophes, false],
            ["asd--", moreThanTwoSpacesDashesApostrophes, false],
            ["Stoyan't-Kalinov", moreThanTwoSpacesDashesApostrophes, false],
            ["Stoyan't-Kalinov's", moreThanTwoSpacesDashesApostrophes, false],
            ["Stoyan't--Kalinov's", moreThanTwoSpacesDashesApostrophes, false],
            ["Stoyan't---Kalinov's", moreThanTwoSpacesDashesApostrophes, true],
            ["Stoyan Kalinov", moreThanTwoSpacesDashesApostrophes, false],
        ])("regexExp validator should return correct value depending on the regex passed", (inputValue, regex: RegExp, expectedResult) => {
            mockedInput.value = inputValue;
            expect(Rule.regexExp(regex).isValid(mockedInput)).toEqual(expectedResult);
        });
    });
});
