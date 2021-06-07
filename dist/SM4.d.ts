declare class SM4Ctx {
    mode: 0 | 1;
    sk: number[];
    isPadding: boolean;
    constructor();
}
declare function sm4_setkey_enc(ctx: SM4Ctx, key: Uint8Array): void;
declare function sm4_setkey_dec(ctx: SM4Ctx, key: Uint8Array): void;
declare function sm4_crypt_ecb(ctx: SM4Ctx, input: Uint8Array, options?: {
    shiftStart?: number;
}): Uint8Array;
declare function stringToByte(str: string): any[];
declare function stringToUint8Array(str: string): Uint8Array;
declare function uint8ArrayToString(u8Arr: Uint8Array): string;
declare function uint8ArrayToHex(u8Arr: Uint8Array): string;
export { SM4Ctx, sm4_crypt_ecb, sm4_setkey_enc, sm4_setkey_dec, stringToByte, stringToUint8Array, uint8ArrayToString, uint8ArrayToHex, };
