const fs = require("fs")
const path = require("path")
const util = require("util")
const SM4 = require("..")

const content = fs.readFileSync(path.join(__dirname, "messages.txt"));
const messages = content.toString().trim().split("\n");
const key = "3l5butlj26hvv313";
const textEncoder = new util.TextEncoder()
const keyUint = textEncoder.encode(key);
console.log("keyUint", keyUint)
const ctx1 = new SM4.SM4Ctx();
const ctx2 = new SM4.SM4Ctx();
SM4.sm4_setkey_enc(ctx1, keyUint)
SM4.sm4_setkey_dec(ctx2, keyUint)

for (let str_data of messages){
    console.log("待加密内容：", str_data.length, str_data)
    let u8Arr = SM4.stringToUint8Array(str_data);
    // console.log("待加密的uint8Arr：", u8Arr.length, u8Arr)
    let encoding = SM4.sm4_crypt_ecb(ctx1, u8Arr);
    console.log("国密sm4加密后的结果：", encoding.length, SM4.uint8ArrayToHex(encoding));
    let decoded = SM4.sm4_crypt_ecb(ctx2, encoding);
    // console.log("国密sm4解密后的结果uint8Arr：", SM4.sm4_crypt_ecb(ctx2, encoding))
    let text = SM4.uint8ArrayToString(decoded);
    console.log("国密sm4解密后的结果：", text);
}