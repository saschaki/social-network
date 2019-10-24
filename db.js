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

function getUser(email) {
    return db.query(
        `SELECT id AS user_id, first AS first, last AS last, email AS email
      FROM users
      WHERE email = $1;`,
        [email]
    );
}
function getHashPassword(email) {
    return db.query("SELECT password As hash FROM users WHERE email = $1", [
        email
    ]);
}

function getImage(id) {
    return db.query(`SELECT url FROM users WHERE $1 = id`, [id]);
}

function addImage(imageUrl) {
    return db
        .query(
            `
        INSERT INTO user (url) VALUES ($1) WHERE $1 = id RETURNING url;
        `,
            [imageUrl]
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
    addImage
};
