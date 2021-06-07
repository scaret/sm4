const SM4 = require('../SM4');
const util = require("util");

test('加密AAAAAAAAAAAAAAAABBBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCDDDDDDDDDDDDDDDD', () => {
    const key = "3l5butlj26hvv313";
    const textEncoder = new util.TextEncoder()
    const keyUint = textEncoder.encode(key);
    const ctx1 = new SM4.SM4Ctx();
    const ctx2 = new SM4.SM4Ctx();
    SM4.sm4_setkey_enc(ctx1, keyUint)
    SM4.sm4_setkey_dec(ctx2, keyUint)
    const str_data = "AAAAAAAAAAAAAAAABBBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCDDDDDDDDDDDDDDDD";
    const hexResult = "84c0f8f20927c2e7ab143f8c27048e516d4d09c1584b013e91754c645b37fe35e026ddebd01820b15cf1861e998db3df754557433eeef19b5a2aafc0a64c84784679ab8f5c3e7b71f9c2a";
    let u8Arr = SM4.stringToUint8Array(str_data);
    let encoding = SM4.sm4_crypt_ecb(ctx1, u8Arr);
    let hexOut = SM4.uint8ArrayToHex(encoding);
    expect(hexOut).toBe(hexResult);
    let decoded = SM4.sm4_crypt_ecb(ctx2, encoding);
    let text = SM4.uint8ArrayToString(decoded);
    expect(text).toBe(str_data);
});