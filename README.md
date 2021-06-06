# sm4-128-ecb

从[zhangyu921 / jssm4](https://github.com/zhangyu921/jssm4)搬过来的。

一个 SM4 加解密 JavaScript 实现。
+ 使用ts实现
+ 128位ECB模式，padding方式为PKCS7
+ 使用Uint8Array处理（可用于 [Encoded Transform](https://github.com/w3c/webrtc-encoded-transform/blob/main/explainer.md) 。）
+ 与Python实现对齐

## 使用

见 `npm run example`