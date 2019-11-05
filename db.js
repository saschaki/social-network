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
    return db.query(
        "SELECT password, id FROM users WHERE email = $1",
        [email]
    );
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
        console.log("getRecent-error : ", err);
        return Promise.reject(new Error("Can't get recent users"));
    });
   
}

function getAllUsers() {
    return db.query("SELECT id,first,last,image FROM users");
}

function findPeople(id,input){
    return db.query(
        `
        SELECT first, last, image, id FROM users
        WHERE (first ILIKE $2
        OR last ILIKE $2)
        AND id != $1`,
        [id,input + "%"]
    ).catch(err => {
        console.log("findPeople-error : ", err);
        return Promise.reject(new Error("Can't find people"));
    });
}

function getFriendshipStatus(myId, otherId){
    return db.query(
        `SELECT * FROM friendships 
    WHERE (receiver_id = $1 AND sender_id = $2)
    OR (receiver_id = $2 AND sender_id = $1)`,
        [myId, otherId]);
}

function makeFriendship(myId, otherId){
    return db.query(
        `INSERT INTO friendships (sender_id, receiver_id)
        VALUES ($1, $2) ON CONFLICT DO NOTHING`, [myId, otherId]); 
}

function cancelFriendship(myId, otherId){
    return db.query(
        `DELETE FROM friendships
        WHERE sender_id = $1 AND receiver_id= $2
        OR (receiver_id = $2 AND sender_id = $1)`, [myId, otherId]);
}

function acceptFriendship(myId, otherId){
    return db.query(
        `UPDATE friendships SET ACCEPTED = true
        WHERE receiver_id = $1 AND sender_id = $2`, [myId, otherId]); 
}

function findFriendsAndWannabes(id){
    return db.query(
        `SELECT users.id, first, last, image, accepted
        FROM friendships
        JOIN users
        ON (accepted = false AND receiver_id = $1 AND sender_id = users.id)
        OR (accepted = true AND receiver_id = $1 AND sender_id = users.id)
        OR (accepted = true AND sender_id = $1 AND receiver_id = users.id)`,[id]);
}

function getLastTenChatMessages(){
    return db.query(
        ``,[]);
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
    findPeople,
    getFriendshipStatus,
    makeFriendship,
    cancelFriendship,
    acceptFriendship,
    findFriendsAndWannabes,
    getLastTenChatMessages
};
/*
SELECT users.id, first, last, image, accepted
        FROM friendships
        JOIN users
        ON (accepted = false AND receiver_id = 201 AND sender_id = users.id)
        OR (accepted = true AND receiver_id = 201 AND sender_id = users.id)
        OR (accepted = true AND sender_id = 201 AND receiver_id = users.id)
*/