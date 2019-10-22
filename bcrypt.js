const db = require("./db");
const { promisify } = require("util");
let { genSalt, hash, compare } = require("bcryptjs");
genSalt = promisify(genSalt);
hash = promisify(hash);
compare = promisify(compare);

exports.hash = password => genSalt().then(salt => hash(password, salt));
exports.auth = (email, password) => {
    return db.getHashPassword(email).then(result => {
        if (!result.rows[0]) {
            return Promise.reject(new Error("E-Mail error"));
        }
        const { hash } = result.rows[0];
        return compare(password, hash);
    });
};
