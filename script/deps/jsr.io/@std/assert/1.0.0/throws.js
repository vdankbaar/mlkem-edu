(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./is_error.js", "./assertion_error.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.assertThrows = assertThrows;
    // Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
    // This module is browser compatible.
    const is_error_js_1 = require("./is_error.js");
    const assertion_error_js_1 = require("./assertion_error.js");
    function assertThrows(fn, errorClassOrMsg, msgIncludesOrMsg, msg) {
        // deno-lint-ignore no-explicit-any
        let ErrorClass = undefined;
        let msgIncludes = undefined;
        let err;
        if (typeof errorClassOrMsg !== "string") {
            if (errorClassOrMsg === undefined ||
                errorClassOrMsg?.prototype instanceof Error ||
                errorClassOrMsg?.prototype === Error.prototype) {
                // deno-lint-ignore no-explicit-any
                ErrorClass = errorClassOrMsg;
                msgIncludes = msgIncludesOrMsg;
            }
            else {
                msg = msgIncludesOrMsg;
            }
        }
        else {
            msg = errorClassOrMsg;
        }
        let doesThrow = false;
        const msgSuffix = msg ? `: ${msg}` : ".";
        try {
            fn();
        }
        catch (error) {
            if (ErrorClass) {
                if (error instanceof Error === false) {
                    throw new assertion_error_js_1.AssertionError(`A non-Error object was thrown${msgSuffix}`);
                }
                (0, is_error_js_1.assertIsError)(error, ErrorClass, msgIncludes, msg);
            }
            err = error;
            doesThrow = true;
        }
        if (!doesThrow) {
            msg = `Expected function to throw${msgSuffix}`;
            throw new assertion_error_js_1.AssertionError(msg);
        }
        return err;
    }
});
