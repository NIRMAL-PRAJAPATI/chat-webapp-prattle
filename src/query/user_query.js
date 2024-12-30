const query1 = "SELECT * FROM prattle_user";
const query2 = "SELECT * FROM prattle_user WHERE id = $1";
const query3 = "SELECT username FROM prattle_user WHERE followed_user @> ARRAY[$1]";
const query4 = "SELECT u FROM prattle_user u WHERE u.username = $1";
const query5 = "INSERT INTO prattle_user (username, password, followed_user, joining_date) VALUES ($1, $2, $3, $4)";
const query6 = "DELETE FROM prattle_user WHERE id = $1";

module.exports = {query1, query2, query3, query4, query5, query6};