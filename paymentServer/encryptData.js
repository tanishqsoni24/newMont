const crypto = require('crypto');

class RBPEncryption {
    constructor(password, iv) {
        this.key = crypto.createHash('md5').update(password).digest().slice(0, 32);
        this.iv = Buffer.from(iv);
        this.method = 'aes-128-cbc';
    }

    encryptText(plaintext) {
        const cipher = crypto.createCipheriv(this.method, this.key, this.iv);
        let encrypted = cipher.update(plaintext, 'utf8', 'base64');
        encrypted += cipher.final('base64');
        return encrypted;
    }
}

module.exports = RBPEncryption;
