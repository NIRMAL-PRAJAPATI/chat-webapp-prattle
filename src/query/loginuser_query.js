const query1 = `SELECT * FROM public."prattle_user" WHERE username = $1`;
const query2 = `SELECT * FROM public."prattle_user" WHERE username = $1 AND password = $2`;
const query3 = `INSERT INTO public."prattle_user"(username, password, followed_user) VALUES($1, $2, ARRAY[$3])`;

module.exports = {query1, query2, query3};