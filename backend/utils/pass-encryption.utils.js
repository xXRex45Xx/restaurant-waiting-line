import crypto from 'crypto';

const encryptPassword = (password) => {
    return crypto.createHash('sha256').update(password).digest();
}

export default encryptPassword;