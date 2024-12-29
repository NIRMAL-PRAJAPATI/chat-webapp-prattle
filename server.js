const express = require('express');
const user_router = require('./src/route/user_route');

const app = express();
const port = 3000;

app.use(express.json());

// server running
app.listen(port, () => console.log(`your port is ${port}`));

app.get('/', (req, res) => {
    res.send("yo yo")
})

app.use('/api/prattle/user', user_router);