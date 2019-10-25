const spicedPg = require("spiced-pg");
let db;
if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    const { dbUser, dbPass } = require("./secrets");
    db = spicedPg(
        `postgres://${dbUser}:${dbPass}@localhost:5432/socialnetwork`
    );
}

function addUser(first, last, email, password) {
    return db.query(
        `INSERT INTO users (first, last, email, password) VALUES ($1, $2, $3, $4) RETURNING id AS user_id, first AS first, last AS last, email AS email;`,
        [first, last, email, password]
    );
}

function getUser(id) {
    return db.query(
        `
         SELECT * FROM users
         WHERE id= $1`,
        [id]
    );
}
function getHashPassword(email) {
    return db.query("SELECT password As hash FROM users WHERE email = $1", [
        email
    ]);
}

function getImage(id) {
    return db.query(`SELECT image FROM users WHERE $1 = id`, [id]);
}

function getLoginId(email) {
    return db.query("SELECT id FROM users WHERE email = $1", [email]);
}

function addImage(id, image) {
    return db
        .query(
            `
        UPDATE users SET image=$2
        WHERE id =$1
        Returning image
        `,
            [id, image]
        )
        .catch(err => {
            console.log(err);
            return Promise.reject(new Error("Can't insert image"));
        });
}

module.exports = {
    addUser,
    getUser,
    getHashPassword,
    getImage,
    addImage,
    getLoginId
};
