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
    exports.unreachable = unreachable;
    // Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
    // This module is browser compatible.
    const assertion_error_js_1 = require("./assertion_error.js");
    /**
     * Use this to assert unreachable code.
     *
     * @example Usage
     * ```ts no-eval
     * import { unreachable } from "@std/assert";
     *
     * unreachable(); // Throws
     * ```
     *
     * @param msg Optional message to include in the error.
     * @returns Never returns, always throws.
     */
    function unreachable(msg) {
        const msgSuffix = msg ? `: ${msg}` : ".";
        throw new assertion_error_js_1.AssertionError(`Unreachable${msgSuffix}`);
    }
});
