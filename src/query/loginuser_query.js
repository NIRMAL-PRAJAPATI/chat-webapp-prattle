const query1 = "SELECT u FROM prattle_user u WHERE u.username = $1";
const query2 = "SELECT * FROM prattle_user WHERE username = $1 AND password = $2";
const query3 = "INSERT INTO prattle_user(username, password, followed_user) VALUES($1, $2, ARRAY[$3])";

module.exports = {query1, query2, query3};