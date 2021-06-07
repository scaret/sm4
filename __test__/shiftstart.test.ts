const SM4 = require('../SM4');
const util = require("util");

test('shiftstart', () => {
    const key = "3l5butlj26hvv313";
    const textEncoder = new util.TextEncoder()
    const keyUint = textEncoder.encode(key);
    const ctx1 = new SM4.SM4Ctx();
    const ctx2 = new SM4.SM4Ctx();
    SM4.sm4_setkey_enc(ctx1, keyUint)
    SM4.sm4_setkey_dec(ctx2, keyUint)
    const dataset = [
        [
            "AAAAAAAAAAAAAAAABBBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCDDDDDDDDDDDDDDDD",
            1,
            "0084c0f8f20927c2e7ab143f8c27048e516d4d09c1584b013e91754c645b37fe35e026ddebd01820b15cf1861e998db3df754557433eeef19b5a2aafc0a64c84784679ab8f5c3e7b71f1d11c3ffb939c2a"
        ],
        [
            "AAAAAAAAAAAAAAAABBBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCDDDDDDDDDDDDDDDDEEEE",
            2,
            "000084c0f8f20927c2e7ab143f8c27048e516d4d09c1584b013e91754c645b37fe35e026ddebd01820b15cf1861e998db3df754557433eeef19b5a2aafc0a64c8478759940cc09c1a7b1fc54f95dcb25104f"
        ],
        [
            "abcabc",
            16,
            "00000000000000000000000000000000dd2f0c75eee0e87f7277b41dd31d11a0"
        ],
        [
            "12341234123412",
            17,
            "0000000000000000000000000000000000ae83cb9358c48229530c4215e6a6249e"
        ],
    ]
    for (let data of dataset){
        const str_data = data[0];
        const shiftStart = data[1];
        const hexResult = data[2]
        let u8Arr = SM4.stringToUint8Array(str_data);
        let encoding = SM4.sm4_crypt_ecb(ctx1, u8Arr, {shiftStart});
        let hexOut = SM4.uint8ArrayToHex(encoding);
        expect(hexOut).toBe(hexResult);

        let decoded = SM4.sm4_crypt_ecb(ctx2, encoding, {shiftStart});
        let text = SM4.uint8ArrayToString(decoded);
        expect(text).toBe(str_data);
    }
});

