const SM4 = require('../SM4');
const util = require("util");

test('字符集加密', () => {
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
            "84c0f8f20927c2e7ab143f8c27048e516d4d09c1584b013e91754c645b37fe35e026ddebd01820b15cf1861e998db3df754557433eeef19b5a2aafc0a64c84784679ab8f5c3e7b71f1d11c3ffb939c2a"
        ],
        [
            "AAAAAAAAAAAAAAAABBBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCDDDDDDDDDDDDDDDDEEEE",
            "84c0f8f20927c2e7ab143f8c27048e516d4d09c1584b013e91754c645b37fe35e026ddebd01820b15cf1861e998db3df754557433eeef19b5a2aafc0a64c8478759940cc09c1a7b1fc54f95dcb25104f"
        ],
        [
            "abcabc",
            "dd2f0c75eee0e87f7277b41dd31d11a0"
        ],
        [
            "12341234123412",
            "ae83cb9358c48229530c4215e6a6249e"
        ],
        [
            "123412341234123",
            "d19d0ffe35449fcec5137f8a7d5521bf"
        ],
        [
            "1234123412341234",
            "ef90725ca14c8eaa9ba8808a0b9026ce4679ab8f5c3e7b71f1d11c3ffb939c2a"
        ],
    ]
    for (let data of dataset){
        const str_data = data[0];
        const hexResult = data[1]
        let u8Arr = SM4.stringToUint8Array(str_data);
        let encoding = SM4.sm4_crypt_ecb(ctx1, u8Arr);
        let hexOut = SM4.uint8ArrayToHex(encoding);
        expect(hexOut).toBe(hexResult);
        let decoded = SM4.sm4_crypt_ecb(ctx2, encoding);
        let text = SM4.uint8ArrayToString(decoded);
        expect(text).toBe(str_data);
    }
});

