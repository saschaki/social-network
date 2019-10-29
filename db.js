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
         SELECT * FROM public.users
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
            console.log("addImage-error : ", err);
            return Promise.reject(new Error("Can't insert image"));
        });
}

function editBio(id, bio) {
    return db
        .query(
            `
        UPDATE users SET bio=$2
        WHERE id =$1
        RETURNING bio
        `,
            [id, bio]
        )
        .catch(err => {
            console.log("editBio-error : ", err);
            return Promise.reject(new Error("Can't edit bio"));
        });
}

function getRecentUsers(id) {
        return db.query(
            `
            SELECT first, last, image, id FROM users
            WHERE id != $1
            ORDER BY id DESC
            LIMIT 3
        `,[id]
        ).catch(err => {
            console.log("addImage-error : ", err);
            return Promise.reject(new Error("Can't get recent users"));
        });
   
}

function getAllUsers() {
    return db.query("SELECT id,first,last,image FROM users");
}

function findPeople(input){
    return db.query(
        `
        SELECT first, last, image, id FROM users
        WHERE first ILIKE $1`,
        [input + "%"]
    ).catch(err => {
        console.log("addImage-error : ", err);
        return Promise.reject(new Error("Can't find people"));
    });
}

module.exports = {
    addUser,
    getUser,
    getHashPassword,
    getImage,
    addImage,
    getLoginId,
    editBio,
    getRecentUsers,
    getAllUsers,
    findPeople
};
