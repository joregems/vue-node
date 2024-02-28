const bcrypt = require("bcryptjs")
async function hashPassword(plaintextPassword) {
    const hash = await bcrypt.hash(plaintextPassword, 10);
    return hash;
}
module.exports.hashPassword = hashPassword;

// compare password
async function comparePassword(plaintextPassword, hash) {
    const result = await bcrypt.compare(plaintextPassword, hash);
    return result;
}
module.exports.comparePassword = comparePassword;
