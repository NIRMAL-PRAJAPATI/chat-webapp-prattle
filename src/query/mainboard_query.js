const query1 = `SELECT * FROM public."prattle_user" WHERE username <> $1 AND username NOT IN (SELECT unnest(followed_user) FROM public."prattle_user" WHERE username = $1)`;
const query2 = `SELECT followed_user FROM public."prattle_user" WHERE username = $1`;
const query3 = `SELECT CASE WHEN COALESCE(followed_user, '{}') @> ARRAY[$1]::VARCHAR[] 
    THEN true ELSE false 
END AS exists 
FROM public."prattle_user" 
WHERE username = $2;
`;
const query4 = `UPDATE public."prattle_user" SET followed_user = array_append(followed_user, $1) WHERE username = $2`;
const query5 = `SELECT * FROM public."prattle_user" WHERE username ILIKE $1`;

module.exports = { query1, query2, query3, query4, query5 };