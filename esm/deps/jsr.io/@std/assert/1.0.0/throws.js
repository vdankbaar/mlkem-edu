// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
import { assertIsError } from "./is_error.js";
import { AssertionError } from "./assertion_error.js";
export function assertThrows(fn, errorClassOrMsg, msgIncludesOrMsg, msg) {
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
                throw new AssertionError(`A non-Error object was thrown${msgSuffix}`);
            }
            assertIsError(error, ErrorClass, msgIncludes, msg);
        }
        err = error;
        doesThrow = true;
    }
    if (!doesThrow) {
        msg = `Expected function to throw${msgSuffix}`;
        throw new AssertionError(msg);
    }
    return err;
}
