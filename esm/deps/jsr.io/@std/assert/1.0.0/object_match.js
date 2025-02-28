// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
import { assertEquals } from "./equals.js";
/**
 * Make an assertion that `expected` object is a subset of `actual` object,
 * deeply. If not, then throw.
 *
 * @example Usage
 * ```ts no-eval
 * import { assertObjectMatch } from "@std/assert";
 *
 * assertObjectMatch({ foo: "bar" }, { foo: "bar" }); // Doesn't throw
 * assertObjectMatch({ foo: "bar" }, { foo: "baz" }); // Throws
 * ```
 *
 * @example Usage with nested objects
 * ```ts no-eval
 * import { assertObjectMatch } from "@std/assert";
 *
 * assertObjectMatch({ foo: { bar: 3, baz: 4 } }, { foo: { bar: 3 } }); // Doesn't throw
 * assertObjectMatch({ foo: { bar: 3 } }, { foo: { bar: 3, baz: 4 } }); // Throws
 * ```
 *
 * @param actual The actual value to be matched.
 * @param expected The expected value to match.
 * @param msg The optional message to display if the assertion fails.
 */
export function assertObjectMatch(
// deno-lint-ignore no-explicit-any
actual, expected, msg) {
    function filter(a, b) {
        const seen = new WeakMap();
        return fn(a, b);
        function fn(a, b) {
            // Prevent infinite loop with circular references with same filter
            if ((seen.has(a)) && (seen.get(a) === b)) {
                return a;
            }
            try {
                seen.set(a, b);
            }
            catch (err) {
                if (err instanceof TypeError) {
                    throw new TypeError(`Cannot assertObjectMatch ${a === null ? null : `type ${typeof a}`}`);
                }
            }
            // Filter keys and symbols which are present in both actual and expected
            const filtered = {};
            const entries = [
                ...Object.getOwnPropertyNames(a),
                ...Object.getOwnPropertySymbols(a),
            ]
                .filter((key) => key in b)
                .map((key) => [key, a[key]]);
            for (const [key, value] of entries) {
                // On array references, build a filtered array and filter nested objects inside
                if (Array.isArray(value)) {
                    const subset = b[key];
                    if (Array.isArray(subset)) {
                        filtered[key] = fn({ ...value }, { ...subset });
                        continue;
                    }
                } // On regexp references, keep value as it to avoid loosing pattern and flags
                else if (value instanceof RegExp) {
                    filtered[key] = value;
                    continue;
                } // On nested objects references, build a filtered object recursively
                else if (typeof value === "object" && value !== null) {
                    const subset = b[key];
                    if ((typeof subset === "object") && subset) {
                        // When both operands are maps, build a filtered map with common keys and filter nested objects inside
                        if ((value instanceof Map) && (subset instanceof Map)) {
                            filtered[key] = new Map([...value].filter(([k]) => subset.has(k)).map(([k, v]) => [k, typeof v === "object" ? fn(v, subset.get(k)) : v]));
                            continue;
                        }
                        // When both operands are set, build a filtered set with common values
                        if ((value instanceof Set) && (subset instanceof Set)) {
                            filtered[key] = new Set([...value].filter((v) => subset.has(v)));
                            continue;
                        }
                        filtered[key] = fn(value, subset);
                        continue;
                    }
                }
                filtered[key] = value;
            }
            return filtered;
        }
    }
    return assertEquals(
    // get the intersection of "actual" and "expected"
    // side effect: all the instances' constructor field is "Object" now.
    filter(actual, expected), 
    // set (nested) instances' constructor field to be "Object" without changing expected value.
    // see https://github.com/denoland/deno_std/pull/1419
    filter(expected, expected), msg);
}
