import regex from "./regex";

describe("Queries", () => {
    test("Get Invalid Characters", () => {
        const { getInvalidCharacters } = regex;
        const regextest = /^[0-9A-HJ-NPR-Z]+$/i;
        /** Get the occurenece of i,q */
        expect(getInvalidCharacters(regextest, "4JGIF7BE8AA5395Q6")).toEqual([
            "I",
            "Q",
        ]);
        /** Get the occurenece of o,i,q */
        expect(getInvalidCharacters(regextest, "4JGBF7OE8AA5395IQ")).toEqual([
            "O",
            "I",
            "Q",
        ]);
        /** Return empty when there are no occurence  O I Q */
        expect(getInvalidCharacters(regextest, "4JGBF7BE8AA539546")).toEqual(
            []
        );
    });

    /** TODO:  
    test("Parse String", () => {
        const { parseString } = regex;
    }); */
});
