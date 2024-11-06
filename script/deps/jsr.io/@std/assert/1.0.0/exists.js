(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./assertion_error.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.assertExists = assertExists;
    // Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
    // This module is browser compatible.
    const assertion_error_js_1 = require("./assertion_error.js");
    /**
     * Make an assertion that actual is not null or undefined.
     * If not then throw.
     *
     * @example Usage
     * ```ts no-eval
     * import { assertExists } from "@std/assert";
     *
     * assertExists("something"); // Doesn't throw
     * assertExists(undefined); // Throws
     * ```
     *
     * @typeParam T The type of the actual value.
     * @param actual The actual value to check.
     * @param msg The optional message to include in the error if the assertion fails.
     */
    function assertExists(actual, msg) {
        if (actual === undefined || actual === null) {
            const msgSuffix = msg ? `: ${msg}` : ".";
            msg =
                `Expected actual: "${actual}" to not be null or undefined${msgSuffix}`;
            throw new assertion_error_js_1.AssertionError(msg);
        }
    }
});
