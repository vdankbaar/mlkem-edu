// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
import { assertFalse } from "./false.js";
/**
 * Make an assertion that `obj` is not an instance of `type`.
 * If so, then throw.
 *
 * @example Usage
 * ```ts no-eval
 * import { assertNotInstanceOf } from "@std/assert";
 *
 * assertNotInstanceOf(new Date(), Number); // Doesn't throw
 * assertNotInstanceOf(new Date(), Date); // Throws
 * ```
 *
 * @typeParam A The type of the object to check.
 * @typeParam T The type of the class to check against.
 * @param actual The object to check.
 * @param unexpectedType The class constructor to check against.
 * @param msg The optional message to display if the assertion fails.
 */
export function assertNotInstanceOf(actual, 
// deno-lint-ignore no-explicit-any
unexpectedType, msg) {
    const msgSuffix = msg ? `: ${msg}` : ".";
    msg =
        `Expected object to not be an instance of "${typeof unexpectedType}"${msgSuffix}`;
    assertFalse(actual instanceof unexpectedType, msg);
}
