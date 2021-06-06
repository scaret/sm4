from gmssl.sm4 import CryptSM4, SM4_ENCRYPT, SM4_DECRYPT
import binascii
from heapq import heappush, heappop
from collections import OrderedDict

class SM4:
    """
    国密sm4加解密
    """

    def __init__(self):
        self.crypt_sm4 = CryptSM4()

    def str_to_hexStr(self, hex_str):
        """
        字符串转hex
        :param hex_str: 字符串
        :return: hex
        """
        hex_data = hex_str.encode('utf-8')
        str_bin = binascii.unhexlify(hex_data)
        return str_bin.decode('utf-8')

    def encrypt(self, encrypt_key, value):
        """
        国密sm4加密
        :param encrypt_key: sm4加密key
        :param value: 待加密的字符串
        :return: sm4加密后的hex值
        """
        crypt_sm4 = self.crypt_sm4
        crypt_sm4.set_key(encrypt_key.encode(), SM4_ENCRYPT)
        encrypt_value = crypt_sm4.crypt_ecb(value.encode())  # bytes类型
        return encrypt_value.hex()

    def decrypt(self, decrypt_key, encrypt_value):
        """
        国密sm4解密
        :param decrypt_key:sm4加密key
        :param encrypt_value: 待解密的hex值
        :return: 原字符串
        """
        crypt_sm4 = self.crypt_sm4
        crypt_sm4.set_key(decrypt_key.encode(), SM4_DECRYPT)
        decrypt_value = crypt_sm4.crypt_ecb(bytes.fromhex(encrypt_value))  # bytes类型
        return self.str_to_hexStr(decrypt_value.hex())
key = "3l5butlj26hvv313"
SM4 = SM4()

fo = open("messages.txt", "r")
for line in fo.readlines():
    str_data = line.strip()
    print("待加密内容：", len(str_data), str_data)
    encoding = SM4.encrypt(key, str_data)
    print("国密sm4加密后的结果：", int(len(encoding) / 2), encoding)
    print("国密sm4解密后的结果：", SM4.decrypt(key, encoding))
