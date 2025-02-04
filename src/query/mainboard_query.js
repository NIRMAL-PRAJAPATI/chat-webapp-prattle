const query1 = "SELECT * FROM prattle_user WHERE username <> $1 AND username NOT IN (SELECT unnest(followed_user) FROM prattle_user WHERE username = $1)";
const query2 = "SELECT followed_user FROM prattle_user WHERE username = $1";
const query3 = "SELECT CASE WHEN followed_user @> ARRAY[$1] THEN true ELSE false END AS exists FROM prattle_user WHERE username = $2";
const query4 = "UPDATE prattle_user SET followed_user = array_append(followed_user, $1) WHERE username = $2"; 

module.exports = { query1, query2, query3, query4 };