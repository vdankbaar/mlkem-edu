/**
 * Represents the base class for the ML-KEM key encapsulation mechanism.
 *
 * This class provides the base implementation for the ML-KEM key encapsulation mechanism.
 *
 * @remarks
 *
 * This class is not intended to be used directly. Instead, use one of the subclasses:
 *
 * @example
 *
 * ```ts
 * // Using jsr:
 * import { MlKemBase } from "@dajiaji/mlkem";
 * // Using npm:
 * // import { MlKemBase } from "mlkem"; // or "crystals-kyber-js"
 *
 * class MlKem768 extends MlKemBase {
 *   protected _k = 3;
 *   protected _du = 10;
 *   protected _dv = 4;
 *   protected _eta1 = 2;
 *   protected _eta2 = 2;
 *
 *   constructor() {
 *     super();
 *     this._skSize = 12 * this._k * N / 8;
 *     this._pkSize = this._skSize + 32;
 *     this._compressedUSize = this._k * this._du * N / 8;
 *     this._compressedVSize = this._dv * N / 8;
 *   }
 * }
 *
 * const kyber = new MlKem768();
 * ```
 */
export declare class MlKemBase {
    private _api;
    protected _k: number;
    protected _du: number;
    protected _dv: number;
    protected _eta1: number;
    protected _eta2: number;
    protected _skSize: number;
    protected _pkSize: number;
    protected _compressedUSize: number;
    protected _compressedVSize: number;
    _debug_cca_keygen: {
        skBody: null | Uint8Array;
        pk: null | Uint8Array;
        hpk: null | Uint8Array;
        z: null | Uint8Array;
    };
    _debug_cpa_keygen: {
        d: null | Uint8Array;
        rho: null | Uint8Array;
        sigma: null | Uint8Array;
        AHat: null | Array<Array<Array<number>>>;
        s: null | Array<Array<number>>;
        sHat: null | Array<Array<number>>;
        e: null | Array<Array<number>>;
        eHat: null | Array<Array<number>>;
        tHat: null | Array<Array<number>>;
        tBytes: null | Uint8Array;
        A_S_mult: null | Array<Array<number>>;
    };
    _debug_cca_encap: {
        m: null | Uint8Array;
        pk: null | Uint8Array;
        hpk: null | Uint8Array;
        r: null | Uint8Array;
        k: null | Uint8Array;
        ct: null | Uint8Array;
    };
    _debug_cpa_encrypt: {
        tHat: null | Array<Array<number>>;
        rho: null | Uint8Array;
        AHat: null | Array<Array<Array<number>>>;
        rPrime: null | Array<Array<number>>;
        rHat: null | Array<Array<number>>;
        e1: null | Array<Array<number>>;
        e2: null | Array<number>;
        mPrime: null | Array<number>;
        vHat: null | Array<number>;
        vPrime: null | Array<number>;
        uHat: null | Array<Array<number>>;
        uPrime: null | Array<Array<number>>;
        u: null | Array<Array<number>>;
        v: null | Array<number>;
    };
    _debug_cca_decap: {
        ct: null | Uint8Array;
        sk: null | Uint8Array;
        sk2: null | Uint8Array;
        pk: null | Uint8Array;
        hpk: null | Uint8Array;
        z: null | Uint8Array;
        m2: null | Uint8Array;
        r2: null | Uint8Array;
        k2: null | Uint8Array;
        kBar: null | Uint8Array;
        ct2: null | Uint8Array;
        success: null | boolean;
    };
    _debug_cpa_decrypt: {
        sHat: null | Array<Array<number>>;
        u: null | Array<Array<number>>;
        uHat: null | Array<Array<number>>;
        vHat: null | Array<number>;
        vPrime: null | Array<number>;
        v: null | Array<number>;
        mPrime: null | Array<number>;
    };
    /**
     * Creates a new instance of the MlKemBase class.
     */
    constructor();
    /**
     * Generates a keypair [publicKey, privateKey].
     *
     * If an error occurred, throws {@link MlKemError}.
     *
     * @returns A kaypair [publicKey, privateKey].
     * @throws {@link MlKemError}
     *
     * @example Generates a {@link MlKem768} keypair.
     *
     * ```ts
     * // Using jsr:
     * import { MlKem768 } from "@dajiaji/mlkem";
     * // Using npm:
     * // import { MlKem768 } from "mlkem"; // or "crystals-kyber-js"
     *
     * const kyber = new MlKem768();
     * const [pk, sk] = await kyber.generateKeyPair();
     * ```
     */
    generateKeyPair(): Promise<[Uint8Array, Uint8Array]>;
    /**
     * Derives a keypair [publicKey, privateKey] deterministically from a 64-octet seed.
     *
     * If an error occurred, throws {@link MlKemError}.
     *
     * @param seed A 64-octet seed for the deterministic key generation.
     * @returns A kaypair [publicKey, privateKey].
     * @throws {@link MlKemError}
     *
     * @example Derives a {@link MlKem768} keypair deterministically.
     *
     * ```ts
     * // Using jsr:
     * import { MlKem768 } from "@dajiaji/mlkem";
     * // Using npm:
     * // import { MlKem768 } from "mlkem"; // or "crystals-kyber-js"
     *
     * const kyber = new MlKem768();
     * const seed = new Uint8Array(64);
     * globalThis.crypto.getRandomValues(seed);
     * const [pk, sk] = await kyber.deriveKeyPair(seed);
     * ```
     */
    deriveKeyPair(seed: Uint8Array): Promise<[Uint8Array, Uint8Array]>;
    /**
     * Generates a shared secret from the encapsulated ciphertext and the private key.
     *
     * If an error occurred, throws {@link MlKemError}.
     *
     * @param pk A public key.
     * @param seed An optional 32-octet seed for the deterministic shared secret generation.
     * @returns A ciphertext (encapsulated public key) and a shared secret.
     * @throws {@link MlKemError}
     *
     * @example The {@link MlKem768} encapsulation.
     *
     * ```ts
     * // Using jsr:
     * import { MlKem768 } from "@dajiaji/mlkem";
     * // Using npm:
     * // import { MlKem768 } from "mlkem"; // or "crystals-kyber-js"
     *
     * const kyber = new MlKem768();
     * const [pk, sk] = await kyber.generateKeyPair();
     * const [ct, ss] = await kyber.encap(pk);
     * ```
     */
    encap(pk: Uint8Array, seed?: Uint8Array): Promise<[Uint8Array, Uint8Array]>;
    /**
     * Generates a ciphertext for the public key and a shared secret.
     *
     * If an error occurred, throws {@link MlKemError}.
     *
     * @param ct A ciphertext generated by {@link encap}.
     * @param sk A private key.
     * @returns A shared secret.
     * @throws {@link MlKemError}
     *
     * @example The {@link MlKem768} decapsulation.
     *
     * ```ts
     * // Using jsr:
     * import { MlKem768 } from "@dajiaji/mlkem";
     * // Using npm:
     * // import { MlKem768 } from "mlkem"; // or "crystals-kyber-js"
     *
     * const kyber = new MlKem768();
     * const [pk, sk] = await kyber.generateKeyPair();
     * const [ct, ssS] = await kyber.encap(pk);
     * const ssR = await kyber.decap(ct, sk);
     * // ssS === ssR
     * ```
     */
    decap(ct: Uint8Array, sk: Uint8Array): Promise<Uint8Array>;
    /**
     * Sets up the MlKemBase instance by loading the necessary crypto library.
     * If the crypto library is already loaded, this method does nothing.
     * @returns {Promise<void>} A promise that resolves when the setup is complete.
     */
    private _setup;
    /**
     * Returns a Uint8Array seed for cryptographic operations.
     * If no seed is provided, a random seed of length 32 bytes is generated.
     * If a seed is provided, it must be exactly 32 bytes in length.
     *
     * @param seed - Optional seed for cryptographic operations.
     * @returns A Uint8Array seed.
     * @throws Error if the provided seed is not 32 bytes in length.
     */
    private _getSeed;
    /**
     * Derives a key pair from a given seed.
     *
     * @param seed - The seed used for key derivation.
     * @returns An array containing the public key and secret key.
     */
    private _deriveKeyPair;
    /**
     * Derives a CPA key pair using the provided CPA seed.
     *
     * @param cpaSeed - The CPA seed used for key derivation.
     * @returns An array containing the public key and private key.
     */
    private _deriveCpaKeyPair;
    /**
     * Encapsulates a message using the ML-KEM encryption scheme.
     *
     * @param pk - The public key.
     * @param msg - The message to be encapsulated.
     * @param seed - The seed used for generating random values.
     * @returns The encapsulated message as a Uint8Array.
     */
    private _encap;
    /**
     * Decapsulates the ciphertext using the provided secret key.
     *
     * @param ct - The ciphertext to be decapsulated.
     * @param sk - The secret key used for decapsulation.
     * @returns The decapsulated message as a Uint8Array.
     */
    private _decap;
    /**
     * Generates a sample matrix based on the provided seed and transposition flag.
     *
     * @param seed - The seed used for generating the matrix.
     * @param transposed - A flag indicating whether the matrix should be transposed or not.
     * @returns The generated sample matrix.
     */
    private _sampleMatrix;
    /**
     * Generates a 2D array of noise samples.
     *
     * @param sigma - The noise parameter.
     * @param offset - The offset value.
     * @param size - The size of the array.
     * @returns The generated 2D array of noise samples.
     */
    protected _sampleNoise1(sigma: Uint8Array, offset: number, size: number): Array<Array<number>>;
    /**
     * Generates a 2-dimensional array of noise samples.
     *
     * @param sigma - The noise parameter.
     * @param offset - The offset value.
     * @param size - The size of the array.
     * @returns The generated 2-dimensional array of noise samples.
     */
    protected _sampleNoise2(sigma: Uint8Array, offset: number, size: number): Array<Array<number>>;
    /**
     * Converts a Uint8Array to a 2D array of numbers representing a polynomial vector.
     * Each element in the resulting array represents a polynomial.
     * @param a The Uint8Array to convert.
     * @returns The 2D array of numbers representing the polynomial vector.
     */
    private _polyvecFromBytes;
    /**
     * Compresses the given array of coefficients into a Uint8Array.
     *
     * @param r - The output Uint8Array.
     * @param u - The array of coefficients.
     * @returns The compressed Uint8Array.
     */
    protected _compressU(r: Uint8Array, u: Array<Array<number>>): Uint8Array;
    /**
     * Compresses the given array of numbers into a Uint8Array.
     *
     * @param r - The Uint8Array to store the compressed values.
     * @param v - The array of numbers to compress.
     * @returns The compressed Uint8Array.
     */
    protected _compressV(r: Uint8Array, v: Array<number>): Uint8Array;
    /**
     * Decompresses a Uint8Array into a two-dimensional array of numbers.
     *
     * @param a The Uint8Array to decompress.
     * @returns The decompressed two-dimensional array.
     */
    protected _decompressU(a: Uint8Array): Array<Array<number>>;
    /**
     * Decompresses a Uint8Array into an array of numbers.
     *
     * @param a - The Uint8Array to decompress.
     * @returns An array of numbers.
     */
    protected _decompressV(a: Uint8Array): Array<number>;
}
//# sourceMappingURL=mlKemBase.d.ts.map