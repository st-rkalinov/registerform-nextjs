import {
    charactersAllowedRegex,
    forbiddenValuesRule,
    maxLenRule,
    maxRule,
    maxRuleValidator,
    minLenRule,
    minRule,
    minRuleValidator,
    noNCharsNextToEachOtherRule,
    noSpecialCharsRule,
    onlyLettersRegex,
    onlyLettersRule,
    requiredRule,
    requiredRuleValidator
} from "@src/utils/InputRulesUtils";
import { expect } from "@jest/globals";
import { InputRule } from "@src/interfaces/InputRuleInteface";

const testMessage = "test message";

describe("InputRulesUtils", () => {
    it("required rule should return correct object structure and values", () => {
        const rule = requiredRule();

        expect(rule).toHaveProperty("name");
        expect(rule).toHaveProperty("message");
        expect(rule.message).toEqual(undefined);
        expect(rule.name).toEqual(InputRule.required);

        const ruleWithMessage = requiredRule(testMessage);
        expect(ruleWithMessage.name).toEqual(InputRule.required);
        expect(ruleWithMessage.message).toEqual(testMessage);
    });

    it("min rule should return correct object structure and values", () => {
        const minValue = 5;
        const rule = minRule(minValue);

        expect(rule).toHaveProperty("name");
        expect(rule).toHaveProperty("message");
        expect(rule).toHaveProperty("min");
        expect(rule.name).toEqual(InputRule.min);
        expect(rule.message).toEqual(undefined);
        expect(rule.min).toEqual(minValue);

        const ruleWithMessage = minRule(5, testMessage);
        expect(ruleWithMessage.name).toEqual(InputRule.min);
        expect(ruleWithMessage.message).toEqual(testMessage);
        expect(ruleWithMessage.min).toEqual(minValue);
    });

    it("max rule should return correct object structure and values", () => {
        const maxValue = 5;
        const rule = maxRule(maxValue);

        expect(rule).toHaveProperty("name");
        expect(rule).toHaveProperty("message");
        expect(rule).toHaveProperty("max");
        expect(rule.name).toEqual(InputRule.max);
        expect(rule.message).toEqual(undefined);
        expect(rule.max).toEqual(maxValue);

        const ruleWithMessage = maxRule(5, testMessage);
        expect(ruleWithMessage.name).toEqual(InputRule.max);
        expect(ruleWithMessage.message).toEqual(testMessage);
        expect(ruleWithMessage.max).toEqual(maxValue);
    });

    it("minLen rule should return correct object structure and values", () => {
        const minLen = 5;
        const rule = minLenRule(minLen);

        expect(rule).toHaveProperty("name");
        expect(rule).toHaveProperty("message");
        expect(rule).toHaveProperty("minLen");
        expect(rule.name).toEqual(InputRule.minLen);
        expect(rule.message).toEqual(undefined);
        expect(rule.minLen).toEqual(minLen);

        const ruleWithMessage = minLenRule(5, testMessage);
        expect(ruleWithMessage.name).toEqual(InputRule.minLen);
        expect(ruleWithMessage.message).toEqual(testMessage);
        expect(ruleWithMessage.minLen).toEqual(minLen);
    });

    it("maxLen rule should return correct object structure and values", () => {
        const maxLen = 5;
        const rule = maxLenRule(maxLen);

        expect(rule).toHaveProperty("name");
        expect(rule).toHaveProperty("message");
        expect(rule).toHaveProperty("maxLen");
        expect(rule.name).toEqual(InputRule.maxLen);
        expect(rule.message).toEqual(undefined);
        expect(rule.maxLen).toEqual(maxLen);

        const ruleWithMessage = maxLenRule(5, testMessage);
        expect(ruleWithMessage.name).toEqual(InputRule.maxLen);
        expect(ruleWithMessage.message).toEqual(testMessage);
        expect(ruleWithMessage.maxLen).toEqual(maxLen);
    });

    it("forbiddenValues rule should return correct object structure and values", () => {
        const forbiddenValues = ["Name, Email"];
        const rule = forbiddenValuesRule(forbiddenValues);

        expect(rule).toHaveProperty("name");
        expect(rule).toHaveProperty("message");
        expect(rule).toHaveProperty("forbiddenValues");
        expect(rule.name).toEqual(InputRule.forbiddenValues);
        expect(rule.message).toEqual(undefined);
        expect(rule.forbiddenValues).toHaveLength(forbiddenValues.length);
        expect(rule.forbiddenValues).toEqual(forbiddenValues);

        const ruleWithMessage = forbiddenValuesRule(forbiddenValues, testMessage);
        expect(ruleWithMessage.name).toEqual(InputRule.forbiddenValues);
        expect(ruleWithMessage.message).toEqual(testMessage);
        expect(ruleWithMessage.forbiddenValues).toEqual(forbiddenValues);
    });

    it("noSpecialChars rule should return correct object structure and values", () => {
        const rule = noSpecialCharsRule();

        expect(rule).toHaveProperty("name");
        expect(rule).toHaveProperty("message");
        expect(rule).toHaveProperty("charactersAllowedRegex");
        expect(rule.name).toEqual(InputRule.noSpecialChars);
        expect(rule.message).toEqual(undefined);
        expect(rule.charactersAllowedRegex).toEqual(charactersAllowedRegex);

        const ruleWithMessage = noSpecialCharsRule(testMessage);
        expect(ruleWithMessage.name).toEqual(InputRule.noSpecialChars);
        expect(ruleWithMessage.message).toEqual(testMessage);
        expect(ruleWithMessage.charactersAllowedRegex).toEqual(charactersAllowedRegex);
    });

    it("onlyLetters rule should return correct object structure and values", () => {
        const rule = onlyLettersRule();

        expect(rule).toHaveProperty("name");
        expect(rule).toHaveProperty("message");
        expect(rule).toHaveProperty("onlyLettersRegex");
        expect(rule.name).toEqual(InputRule.onlyLetters);
        expect(rule.message).toEqual(undefined);
        expect(rule.onlyLettersRegex).toEqual(onlyLettersRegex);

        const ruleWithMessage = onlyLettersRule(testMessage);
        expect(ruleWithMessage.name).toEqual(InputRule.onlyLetters);
        expect(ruleWithMessage.message).toEqual(testMessage);
        expect(ruleWithMessage.onlyLettersRegex).toEqual(onlyLettersRegex);
    });

    it("noNchars rule should return correct object structure and values", () => {
        const charsForTest = ["-' "];
        const charsCountForTest = 2;

        const rule = noNCharsNextToEachOtherRule(charsForTest, charsCountForTest);

        expect(rule).toHaveProperty("name");
        expect(rule).toHaveProperty("message");
        expect(rule).toHaveProperty("chars");
        expect(rule).toHaveProperty("charsCount");
        expect(rule.name).toEqual(InputRule.no_N_charactersNextToEachOther);
        expect(rule.message).toEqual(undefined);
        expect(rule.chars).toEqual(charsForTest);
        expect(rule.charsCount).toEqual(charsCountForTest);

        const ruleWithMessage = noNCharsNextToEachOtherRule(charsForTest, charsCountForTest, testMessage);
        expect(ruleWithMessage.name).toEqual(InputRule.no_N_charactersNextToEachOther);
        expect(ruleWithMessage.message).toEqual(testMessage);
        expect(ruleWithMessage.chars).toEqual(charsForTest);
        expect(ruleWithMessage.charsCount).toEqual(charsCountForTest);
    });

    describe("InputRulesUtils validators", () => {
        it.each([
            ["", false],
            ["asd", true],
        ])("required validator should return correct value", (inputValue, expectedResult) => {
            const rule = requiredRuleValidator(inputValue);
            expect(rule).toEqual(expectedResult);
        });

        it.each([
            ["", 4, false],
            ["3", 4, false],
            ["4", 4, true],
            ["5", 4, true],
        ])("min validator should return correct value", (inputValue, minValue, expectedResult) => {
            const rule = minRuleValidator(minValue, inputValue);
            expect(rule).toEqual(expectedResult);
        });

        it("min validator should throw error if inputValue cannot be a number", () => {
            expect(() => minRuleValidator(5, "asd")).toThrow("NaN input value");
        });

        it.each([
            ["11", 10, false],
            ["", 10, true],
            ["10", 10, true],
            ["5", 10, true],
        ])("max validator should return correct value", (inputValue, maxValue, expectedResult) => {
            const rule = maxRuleValidator(maxValue, inputValue);
            expect(rule).toEqual(expectedResult);
        });

        it("max validator should throw error if inputValue cannot be a number", () => {
            expect(() => maxRuleValidator(10, "asd")).toThrow("NaN input value");
        });
    });
});
