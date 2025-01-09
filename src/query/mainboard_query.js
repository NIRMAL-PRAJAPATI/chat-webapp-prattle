const query1 = "SELECT * FROM prattle_user WHERE username != $1";
const query2 = "SELECT followed_user FROM prattle_user WHERE username = $1";

module.exports = { query1, query2 };