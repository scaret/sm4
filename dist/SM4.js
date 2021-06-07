"use strict";
exports.__esModule = true;
exports.uint8ArrayToHex = exports.uint8ArrayToString = exports.stringToUint8Array = exports.stringToByte = exports.sm4_setkey_dec = exports.sm4_setkey_enc = exports.sm4_crypt_ecb = exports.SM4Ctx = void 0;
var SM4Ctx = /** @class */ (function () {
    function SM4Ctx() {
        this.mode = 1;
        this.sk = [];
        this.isPadding = true;
    }
    return SM4Ctx;
}());
exports.SM4Ctx = SM4Ctx;
//byte转long
function GET_ULONG_BE(b, i) {
    var n = ((b[i] & 0xff) << 24) |
        ((b[i + 1] & 0xff) << 16) |
        ((b[i + 2] & 0xff) << 8) |
        (b[i + 3] & 0xff);
    return n;
}
//long转byte
function PUT_ULONG_BE(n, b, i) {
    b[i] = 0xff & (n >> 24);
    b[i + 1] = 0xff & (n >> 16);
    b[i + 2] = 0xff & (n >> 8);
    b[i + 3] = 0xff & n;
}
//循环左移n
function ROTL(a, n, size) {
    if (size === void 0) { size = 32; }
    n = n % size;
    return (a << n) | (a >>> (size - n));
}
//交换sk的i位和31-i位
function SWAP(sk, i) {
    var t = sk[i];
    sk[i] = sk[31 - i];
    sk[31 - i] = t;
}
var sboxTable = [
    0xd6,
    0x90,
    0xe9,
    0xfe,
    0xcc,
    0xe1,
    0x3d,
    0xb7,
    0x16,
    0xb6,
    0x14,
    0xc2,
    0x28,
    0xfb,
    0x2c,
    0x05,
    0x2b,
    0x67,
    0x9a,
    0x76,
    0x2a,
    0xbe,
    0x04,
    0xc3,
    0xaa,
    0x44,
    0x13,
    0x26,
    0x49,
    0x86,
    0x06,
    0x99,
    0x9c,
    0x42,
    0x50,
    0xf4,
    0x91,
    0xef,
    0x98,
    0x7a,
    0x33,
    0x54,
    0x0b,
    0x43,
    0xed,
    0xcf,
    0xac,
    0x62,
    0xe4,
    0xb3,
    0x1c,
    0xa9,
    0xc9,
    0x08,
    0xe8,
    0x95,
    0x80,
    0xdf,
    0x94,
    0xfa,
    0x75,
    0x8f,
    0x3f,
    0xa6,
    0x47,
    0x07,
    0xa7,
    0xfc,
    0xf3,
    0x73,
    0x17,
    0xba,
    0x83,
    0x59,
    0x3c,
    0x19,
    0xe6,
    0x85,
    0x4f,
    0xa8,
    0x68,
    0x6b,
    0x81,
    0xb2,
    0x71,
    0x64,
    0xda,
    0x8b,
    0xf8,
    0xeb,
    0x0f,
    0x4b,
    0x70,
    0x56,
    0x9d,
    0x35,
    0x1e,
    0x24,
    0x0e,
    0x5e,
    0x63,
    0x58,
    0xd1,
    0xa2,
    0x25,
    0x22,
    0x7c,
    0x3b,
    0x01,
    0x21,
    0x78,
    0x87,
    0xd4,
    0x00,
    0x46,
    0x57,
    0x9f,
    0xd3,
    0x27,
    0x52,
    0x4c,
    0x36,
    0x02,
    0xe7,
    0xa0,
    0xc4,
    0xc8,
    0x9e,
    0xea,
    0xbf,
    0x8a,
    0xd2,
    0x40,
    0xc7,
    0x38,
    0xb5,
    0xa3,
    0xf7,
    0xf2,
    0xce,
    0xf9,
    0x61,
    0x15,
    0xa1,
    0xe0,
    0xae,
    0x5d,
    0xa4,
    0x9b,
    0x34,
    0x1a,
    0x55,
    0xad,
    0x93,
    0x32,
    0x30,
    0xf5,
    0x8c,
    0xb1,
    0xe3,
    0x1d,
    0xf6,
    0xe2,
    0x2e,
    0x82,
    0x66,
    0xca,
    0x60,
    0xc0,
    0x29,
    0x23,
    0xab,
    0x0d,
    0x53,
    0x4e,
    0x6f,
    0xd5,
    0xdb,
    0x37,
    0x45,
    0xde,
    0xfd,
    0x8e,
    0x2f,
    0x03,
    0xff,
    0x6a,
    0x72,
    0x6d,
    0x6c,
    0x5b,
    0x51,
    0x8d,
    0x1b,
    0xaf,
    0x92,
    0xbb,
    0xdd,
    0xbc,
    0x7f,
    0x11,
    0xd9,
    0x5c,
    0x41,
    0x1f,
    0x10,
    0x5a,
    0xd8,
    0x0a,
    0xc1,
    0x31,
    0x88,
    0xa5,
    0xcd,
    0x7b,
    0xbd,
    0x2d,
    0x74,
    0xd0,
    0x12,
    0xb8,
    0xe5,
    0xb4,
    0xb0,
    0x89,
    0x69,
    0x97,
    0x4a,
    0x0c,
    0x96,
    0x77,
    0x7e,
    0x65,
    0xb9,
    0xf1,
    0x09,
    0xc5,
    0x6e,
    0xc6,
    0x84,
    0x18,
    0xf0,
    0x7d,
    0xec,
    0x3a,
    0xdc,
    0x4d,
    0x20,
    0x79,
    0xee,
    0x5f,
    0x3e,
    0xd7,
    0xcb,
    0x39,
    0x48,
];
var CK = [
    0x00070e15,
    0x1c232a31,
    0x383f464d,
    0x545b6269,
    0x70777e85,
    0x8c939aa1,
    0xa8afb6bd,
    0xc4cbd2d9,
    0xe0e7eef5,
    0xfc030a11,
    0x181f262d,
    0x343b4249,
    0x50575e65,
    0x6c737a81,
    0x888f969d,
    0xa4abb2b9,
    0xc0c7ced5,
    0xdce3eaf1,
    0xf8ff060d,
    0x141b2229,
    0x30373e45,
    0x4c535a61,
    0x686f767d,
    0x848b9299,
    0xa0a7aeb5,
    0xbcc3cad1,
    0xd8dfe6ed,
    0xf4fb0209,
    0x10171e25,
    0x2c333a41,
    0x484f565d,
    0x646b7279,
];
var FK = [0xa3b1bac6, 0x56aa3350, 0x677d9197, 0xb27022dc];
//8比特的s盒变换
function sm4Sbox(inch) {
    var i = inch & 0xff;
    var retVal = sboxTable[i];
    return retVal;
}
//算法Lt(.)
function sm4Lt(ka) {
    var bb = 0;
    var c = 0;
    var a = new Uint8Array(4);
    var b = new Uint8Array(4);
    PUT_ULONG_BE(ka, a, 0);
    b[0] = sm4Sbox(a[0]);
    b[1] = sm4Sbox(a[1]);
    b[2] = sm4Sbox(a[2]);
    b[3] = sm4Sbox(a[3]);
    bb = GET_ULONG_BE(b, 0);
    c = bb ^ ROTL(bb, 2) ^ ROTL(bb, 10) ^ ROTL(bb, 18) ^ ROTL(bb, 24);
    return c;
}
//算法F()，即一轮变换
function sm4F(x0, x1, x2, x3, rk) {
    return x0 ^ sm4Lt(x1 ^ x2 ^ x3 ^ rk);
}
function sm4CalciRK(ka) {
    var bb = 0;
    var rk = 0;
    var a = new Uint8Array(4);
    var b = new Uint8Array(4);
    PUT_ULONG_BE(ka, a, 0);
    b[0] = sm4Sbox(a[0]);
    b[1] = sm4Sbox(a[1]);
    b[2] = sm4Sbox(a[2]);
    b[3] = sm4Sbox(a[3]);
    bb = GET_ULONG_BE(b, 0);
    rk = bb ^ ROTL(bb, 13) ^ ROTL(bb, 23);
    return rk;
}
//轮密钥生成
function sm4_setkey(SK, key) {
    var MK = new Array(4);
    var k = new Array(36);
    var i = 0;
    // alert("aaa")
    MK[0] = GET_ULONG_BE(key, 0);
    MK[1] = GET_ULONG_BE(key, 4);
    MK[2] = GET_ULONG_BE(key, 8);
    MK[3] = GET_ULONG_BE(key, 12);
    k[0] = MK[0] ^ FK[0];
    k[1] = MK[1] ^ FK[1];
    k[2] = MK[2] ^ FK[2];
    k[3] = MK[3] ^ FK[3];
    for (; i < 32; i++) {
        k[i + 4] = k[i] ^ sm4CalciRK(k[i + 1] ^ k[i + 2] ^ k[i + 3] ^ CK[i]);
        SK[i] = k[i + 4];
    }
    // alert("SK:"+SK.length+" "+SK[0])
}
//
function sm4_rounds(sk, input, output) {
    var i = 0;
    var ulbuf = new Array(36);
    ulbuf[0] = GET_ULONG_BE(input, 0);
    ulbuf[1] = GET_ULONG_BE(input, 4);
    ulbuf[2] = GET_ULONG_BE(input, 8);
    ulbuf[3] = GET_ULONG_BE(input, 12);
    while (i < 32) {
        ulbuf[i + 4] = sm4F(ulbuf[i], ulbuf[i + 1], ulbuf[i + 2], ulbuf[i + 3], sk[i]);
        i++;
    }
    PUT_ULONG_BE(ulbuf[35], output, 0);
    PUT_ULONG_BE(ulbuf[34], output, 4);
    PUT_ULONG_BE(ulbuf[33], output, 8);
    PUT_ULONG_BE(ulbuf[32], output, 12);
}
function padding(input, mode) {
    var ret;
    if (mode == 1) {
        var p = 16 - (input.length % 16);
        ret = new Uint8Array(input.length + p);
        ret.set(input);
        ret.fill(p, input.length);
    }
    else {
        ret = input.subarray(0, input.length - input[input.length - 1]);
    }
    return ret;
}
//生成加密密钥
function sm4_setkey_enc(ctx, key) {
    ctx.mode = 1;
    sm4_setkey(ctx.sk, key);
}
exports.sm4_setkey_enc = sm4_setkey_enc;
//生成解密密钥
function sm4_setkey_dec(ctx, key) {
    if (ctx == null) {
        Error("ctx is null!");
    }
    if (key == null || key.length != 16) {
        Error("key error!");
    }
    var i = 0;
    ctx.mode = 0;
    sm4_setkey(ctx.sk, key);
    ctx.sk = ctx.sk.reverse();
}
exports.sm4_setkey_dec = sm4_setkey_dec;
function sm4_crypt_ecb(ctx, input, options) {
    if (!options) {
        options = {};
    }
    if (!options.shiftStart) {
        options.shiftStart = 0;
    }
    if (ctx.isPadding && ctx.mode == 1) {
        input = padding(input, 1);
    }
    // alert("input-size"+input.length)
    var inputLength = input.length;
    // console.error("sm4_crypt_ecb input.length", input.length, "input", input)
    var inputOffset, outputOffset;
    if (ctx.mode == 1) {
        inputOffset = 0;
        outputOffset = options.shiftStart;
    }
    else {
        inputOffset = options.shiftStart;
        outputOffset = 0;
    }
    var bous = new Uint8Array(inputLength + outputOffset - inputOffset);
    for (var t = 0; t < inputLength - inputOffset; t += 16) {
        var inn = new Uint8Array(input.buffer, t + inputOffset, 16);
        var out = new Uint8Array(bous.buffer, t + outputOffset, 16);
        // alert("inn-size"+inn.length);
        sm4_rounds(ctx.sk, inn, out);
        // alert("out-size"+out.length)
    }
    // alert("bous-size"+bous.length);
    if (ctx.isPadding && ctx.mode == 0) {
        bous = padding(bous, 0);
    }
    // console.log("sm4_crypt_ecb", "out", bous);
    // console.log("sm4_crypt_ecb", "ctx",  JSON.stringify(ctx, null, 2));
    return bous;
}
exports.sm4_crypt_ecb = sm4_crypt_ecb;
function stringToByte(str) {
    var bytes = new Array();
    var len, c;
    len = str.length;
    for (var i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if (c >= 0x010000 && c <= 0x10ffff) {
            bytes.push(((c >> 18) & 0x07) | 0xf0);
            bytes.push(((c >> 12) & 0x3f) | 0x80);
            bytes.push(((c >> 6) & 0x3f) | 0x80);
            bytes.push((c & 0x3f) | 0x80);
        }
        else if (c >= 0x000800 && c <= 0x00ffff) {
            bytes.push(((c >> 12) & 0x0f) | 0xe0);
            bytes.push(((c >> 6) & 0x3f) | 0x80);
            bytes.push((c & 0x3f) | 0x80);
        }
        else if (c >= 0x000080 && c <= 0x0007ff) {
            bytes.push(((c >> 6) & 0x1f) | 0xc0);
            bytes.push((c & 0x3f) | 0x80);
        }
        else {
            bytes.push(c & 0xff);
        }
    }
    return bytes;
}
exports.stringToByte = stringToByte;
function stringToUint8Array(str) {
    var u8Arr = new Uint8Array(str.length);
    for (var i = 0; i < str.length; i++) {
        u8Arr[i] = str.charCodeAt(i);
    }
    return u8Arr;
}
exports.stringToUint8Array = stringToUint8Array;
function uint8ArrayToString(u8Arr) {
    var str = "";
    for (var i = 0; i < u8Arr.length; i++) {
        str += String.fromCharCode(u8Arr[i]);
    }
    return str;
}
exports.uint8ArrayToString = uint8ArrayToString;
function uint8ArrayToHex(u8Arr) {
    var str = "";
    for (var i = 0; i < u8Arr.length; i++) {
        str += u8Arr[i].toString(16).padStart(2, "0");
    }
    return str;
}
exports.uint8ArrayToHex = uint8ArrayToHex;
