const query1 = "SELECT u FROM prattle_user u WHERE u.username = $1";
const query2 = "SELECT * FROM prattle_user WHERE username = $1 AND password = $2";
const query3 = "INSERT INTO prattle_user(username, password) VALUES($1, $2)";

module.exports = {query1, query2, query3};