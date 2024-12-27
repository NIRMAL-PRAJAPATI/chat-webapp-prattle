const express = require('express');
const studentrouter = require('./src/route/user_route');

const app = express();
const port = 3000;

// server running
app.listen(port, () => console.log(`your port is ${port}`));

app.get('/', (req, res) => {
    res.send("yo yo")
})

app.use('/api/prattle/userlist', studentrouter);