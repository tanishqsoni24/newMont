

class RBPEncryption {
    constructor(password, iv) {
        console.log(password)
        try{
            this.key = crypto.createHash('md5').update(password).digest().slice(0, 32);
            this.iv = Buffer.from(iv);
            this.method = 'aes-128-cbc';
            console.log(this.key);
        }
        catch(err){
            console.log(err);
        }
    }

    encryptText(plaintext) {
        console.log(plaintext)
        const cipher = crypto.createCipheriv(this.method, this.key, this.iv);
        let encrypted = cipher.update(plaintext, 'utf8', 'base64');
        encrypted += cipher.final('base64');
        return encrypted;
    }
}

export default RBPEncryption;