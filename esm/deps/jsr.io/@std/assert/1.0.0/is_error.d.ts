/**
 * Make an assertion that `error` is an `Error`.
 * If not then an error will be thrown.
 * An error class and a string that should be included in the
 * error message can also be asserted.
 *
 * @example Usage
 * ```ts no-eval
 * import { assertIsError } from "@std/assert";
 *
 * assertIsError(null); // Throws
 * assertIsError(new RangeError("Out of range")); // Doesn't throw
 * assertIsError(new RangeError("Out of range"), SyntaxError); // Throws
 * assertIsError(new RangeError("Out of range"), SyntaxError, "Out of range"); // Doesn't throw
 * assertIsError(new RangeError("Out of range"), SyntaxError, "Within range"); // Throws
 * ```
 *
 * @typeParam E The type of the error to assert.
 * @param error The error to assert.
 * @param ErrorClass The optional error class to assert.
 * @param msgMatches The optional string or RegExp to assert in the error message.
 * @param msg The optional message to display if the assertion fails.
 */
export declare function assertIsError<E extends Error = Error>(error: unknown, ErrorClass?: new (...args: any[]) => E, msgMatches?: string | RegExp, msg?: string): asserts error is E;
//# sourceMappingURL=is_error.d.ts.map