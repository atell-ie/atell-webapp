import React from "react";
import format from "./format";
import sort from "./sort";

describe("testing format.js", () => {
    test("/common/lib/format/auditCompletion", () => {
        const { auditCompletion } = format;
        expect(auditCompletion(0, 0, 0)).toBe("0 / 0 asset");
        expect(auditCompletion(4, 5, 0)).toBe("4 / 5 assets");
        expect(auditCompletion(0, 0, 1)).toBe("0 / 0 + 1 asset");
        expect(auditCompletion(1, 10, 4)).toBe("1 / 10 + 4 assets");
    });

    test("/common/lib/format/dateTime", () => {
        const { dateTime } = format;
        const epoch = "1970-01-01T00:00:00.000Z";
        const now = new Date().toISOString();
        expect(dateTime(null)).toBe("");
        expect(dateTime("")).toBe("");
        expect(dateTime(epoch)).toBe("1 Jan 1970");
        expect(dateTime(epoch, "date")).toBe("1 Jan 1970");
        expect(dateTime(epoch, "shortDate")).toBe("01/01/1970");
        // expect(dateTime(now, "dateTime")).toMatch(
        //     /\d{1,2} \w{3} \d{4} \d{2}:\d{2}/
        // );
        //expect(dateTime(now, "time")).toMatch(/\d{2}:\d{2}/);
    });

    // import { authorized } from "../lib/http"; //request, response

    // test("/common/lib/http/authorize", () => {
    //     expect(authorized({})).toStrictEqual({ Authorization: "token " });
    // });

    // test("/common/lib/http/request", async () => {
    //     await expect(request()).rejects.toThrowError();
    // });

    // test("/common/lib/http/response", async () => {
    //     await expect(response()).rejects.toThrowError();
    // });

    test("/common/lib/sort/date", () => {
        const a = new Date("2018-01-02").toISOString();
        const b = new Date("2019-01-02").toISOString();
        expect(sort.date(b, a)).toBeGreaterThan(0);
        expect(sort.date(b, a, true)).toBeLessThan(0);
        expect(sort.date(a, b)).toBeLessThan(0);
        expect(sort.date(a, b, true)).toBeGreaterThan(0);
        expect(sort.date(b, b)).toBe(0);
        expect(sort.date(null, a)).toBeLessThan(0);
        expect(sort.date(b, null)).toBeGreaterThan(0);
        expect(sort.date(null, null)).toBe(0);
    });

    test("/common/lib/sort/number", () => {
        expect(sort.number(1, 2)).toBe(-1);
        expect(sort.number(1, 0)).toBe(1);
        expect(sort.number(100, 100)).toBe(0);
    });

    test("/common/lib/sort/string", () => {
        expect(sort.string("aaa", "aaaa")).toBe(-1);
        expect(sort.string("bbbb", "aaaa")).toBe(1);
        expect(sort.string("", "")).toBe(0);
        expect(sort.string("bBb", "BbB")).toBe(0);
        expect(sort.string("horse", "house")).toBe(-1);
    });
});
