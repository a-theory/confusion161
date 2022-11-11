import aesjs from 'aes-js';

export function encryptAES(text, key) {
    const textBytes = aesjs.utils.utf8.toBytes(text);

    const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    const encryptedBytes = aesCtr.encrypt(textBytes);

    return aesjs.utils.hex.fromBytes(encryptedBytes);
}

export function decryptAES(text, key){
    const encryptedBytes = aesjs.utils.hex.toBytes(text);

    const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));

    const decryptedBytes = aesCtr.decrypt(encryptedBytes);

    return aesjs.utils.utf8.fromBytes(decryptedBytes);
}
