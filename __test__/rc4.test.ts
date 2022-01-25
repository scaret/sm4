// https://cryptii.com/pipes/rc4-encryption

const SM4 = require('../SM4');
const util = require("util");

test('rc4', () => {
    const key = new Uint8Array([0x63, 0x72, 0x79, 0x70, 0x74, 0x69, 0x69]);

    const dataset = [
        [
            "The quick brown fox jumps over the lazy dog.",
            0,
            '2ac2fecdd8fbb84638e3a4820eb205cc8e29c28b9d5d6b2ef974f311964971c90e8b9ca16467ef2dc6fc3520'
        ],
        [
            // ASCII: '0' => 0x30 === 48
            "0AAAAAAAAAAAAAAAABBBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCDDDDDDDDDDDDDDDD",
            1,
            "303febdaace8cf9064128287b120842aadaa04f8e9b56a441cc816de25b17913ff25adff8e465ed54ee1d0114d0068e4f294f87c57b4d9c00f3504a63d15b23359"
        ],
        [
            "00AAAAAAAAAAAAAAAABBBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCDDDDDDDDDDDDDDDDEEEE",
            2,
            "30303febdaace8cf9064128287b120842aadaa04f8e9b56a441cc816de25b17913ff25adff8e465ed54ee1d0114d0068e4f294f87c57b4d9c00f3504a63d15b233595e5ffc08"
        ],
        [
            "00AAAAAAAAAAAAAAAABBBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCDDDDDDDDDDDDDDDDEEEE",
            2,
            "30303febdaace8cf9064128287b120842aad42424242424242424242424242424242434343434343434343434343434343434444444444444444444444444444444445454545",
            18
        ],
    ]
    for (let data of dataset){
        const str_data = data[0];
        const shiftStart = data[1];
        const hexResult = data[2]
        const end = data[3];
        let u8Arr = SM4.stringToUint8Array(str_data);
        let encoding = SM4.rc4_encrypt(u8Arr, key ,{shiftStart, end});
        let hexOut = SM4.uint8ArrayToHex(encoding);
        expect(hexOut).toBe(hexResult);
        let decoded = SM4.rc4_decrypt(u8Arr, key,  {shiftStart, end});
        let text = SM4.uint8ArrayToString(decoded);
        expect(text).toBe(str_data);
    }
});

