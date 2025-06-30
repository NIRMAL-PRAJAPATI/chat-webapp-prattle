const datatable = require('../db');
const query = require('../query/user_query');

// display all users
const controller1 = async (req, res) => {
    try {
        const result = await datatable.query(query.query1);
        res.status(200).json(result.rows);
    } catch (error) {
        res.send(error);
        console.log(error);
    }
}

// display user based on there ID
const controller2 = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const result = await datatable.query(query.query2, [id]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.send(error);
        console.log(error);
    }
}

// display users who followed them
const controller3 = async (req, res) => {
    try {
        const username = req.params.username;
        const result = await datatable.query(query.query3, [username]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.send(error);
        console.log(error);
    }
}

// check user existance and add them
const controller4 = async (req, res) => {
    try {
        const { username, password, followed_user, joining_date } = req.body;
        const result = await datatable.query(query.query4, [username]);
        
        if (result.rows.length) {
            res.send("username already taken!, try another username.");
        } else {
            await datatable.query(query.query5, [username, password, followed_user, joining_date]);
            res.send("Congratulations, account successfully created");
        }
    } catch (error) {
        console.log(error);
        res.send("something gone wrong");
    }
}

// check and delete the user
const controller5 = async (req, res) => {
    try {
        const id = Number.parseInt(req.params.id);
        const result = await datatable.query(query.query2, [id]);
        
        if (!result.rows.length) {
            res.send("User you are looking for is not found!");
        } else {
            await datatable.query(query.query6, [id]);
            res.send("User deleted successfully!");
        }
    } catch (error) {
        res.send("something gone wrong: " + error);
    }
}

// update the existing user
const controller6 = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { password } = req.body;
        const result = await datatable.query(query.query2, [id]);
        
        if(result.rows.length) {
            await datatable.query(query.query7, [id, password]);
            res.send("your password changed successfully");
        } else {
            res.send("user not exist !");
        }
    } catch (error) {
        res.send("something update query issue");
        console.log(error);
    }
}

module.exports = { controller1, controller2, controller3, controller4, controller5, controller6 };