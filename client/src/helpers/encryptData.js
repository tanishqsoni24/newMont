

class RBPEncryption {
    constructor(password, iv) {
        try{
            this.key = crypto.createHash('md5').update(password).digest().slice(0, 32);
            this.iv = Buffer.from(iv);
            this.method = 'aes-128-cbc';
        }
        catch(err){
            alert("Error in encryption");
        }
    }

    encryptText(plaintext) {
        const cipher = crypto.createCipheriv(this.method, this.key, this.iv);
        let encrypted = cipher.update(plaintext, 'utf8', 'base64');
        encrypted += cipher.final('base64');
        return encrypted;
    }
}

export default RBPEncryption;