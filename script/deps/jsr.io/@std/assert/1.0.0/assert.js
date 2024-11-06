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
    exports.assert = assert;
    // Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
    // This module is browser compatible.
    const assertion_error_js_1 = require("./assertion_error.js");
    /**
     * Make an assertion, error will be thrown if `expr` does not have truthy value.
     *
     * @example Usage
     * ```ts no-eval
     * import { assert } from "@std/assert";
     *
     * assert("hello".includes("ello")); // Doesn't throw
     * assert("hello".includes("world")); // Throws
     * ```
     *
     * @param expr The expression to test.
     * @param msg The optional message to display if the assertion fails.
     */
    function assert(expr, msg = "") {
        if (!expr) {
            throw new assertion_error_js_1.AssertionError(msg);
        }
    }
});
