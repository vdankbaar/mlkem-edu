(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../internal/1.0.5/format.js", "./assertion_error.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.assertGreaterOrEqual = assertGreaterOrEqual;
    // Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
    // This module is browser compatible.
    const format_js_1 = require("../../internal/1.0.5/format.js");
    const assertion_error_js_1 = require("./assertion_error.js");
    /**
     * Make an assertion that `actual` is greater than or equal to `expected`.
     * If not then throw.
     *
     * @example Usage
     * ```ts no-eval
     * import { assertGreaterOrEqual } from "@std/assert";
     *
     * assertGreaterOrEqual(2, 1); // Doesn't throw
     * assertGreaterOrEqual(1, 1); // Doesn't throw
     * assertGreaterOrEqual(0, 1); // Throws
     * ```
     *
     * @typeParam T The type of the values to compare.
     * @param actual The actual value to compare.
     * @param expected The expected value to compare.
     * @param msg The optional message to display if the assertion fails.
     */
    function assertGreaterOrEqual(actual, expected, msg) {
        if (actual >= expected)
            return;
        const actualString = (0, format_js_1.format)(actual);
        const expectedString = (0, format_js_1.format)(expected);
        throw new assertion_error_js_1.AssertionError(msg ?? `Expect ${actualString} >= ${expectedString}`);
    }
});
