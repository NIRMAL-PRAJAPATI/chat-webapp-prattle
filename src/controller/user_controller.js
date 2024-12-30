const datatable = require('../model/user_model');
const query = require('../query/user_query');

// display all users
const controller1 = (req, res) => {
    datatable.query(query.query1, (error, result) => {
        if (error) {
            res.send(error);
            console.log(error);
        } else {
            res.status(200).json(result.rows);
        }
    })
}

// display user based on there ID
const controller2 = (req, res) => {
    const id = parseInt(req.params.id);
    datatable.query(query.query2, [id], (error, result) => {
        if (error) {
            res.send(error);
            console.log(error);
        } else {
            res.status(200).json(result.rows);
        }
    })
}

// display users who followed them
const controller3 = (req, res) => {
    const username = req.params.username;
    datatable.query(query.query3, [username], (error, result) => {
        if (error) {
            res.send(error);
            console.log(error);
        } else {
            res.status(200).json(result.rows);
        }
    })
}

// check user existance and add them
const controller4 = (req, res) => {
    const { username, password, followed_user, joining_date } = req.body;

    datatable.query(query.query4, [username], (error, result) => {
        if (error) {
            console.log(error);
        } else {
            if (result.rows.length) {
                res.send("username already taken!, try another username.");
            } else {
                datatable.query(query.query5, [username, password, followed_user, joining_date], (error, result) => {
                    if (error) {
                        res.send("something gone wrong");
                    } else {
                        res.send("Congratulations, account successfully created");
                    }
                })
            }
        }
    });
}

// check and delete the user
const controller5 = async (req, res) => {
    const id = Number.parseInt(req.params.id);

    datatable.query(query.query2, [id], (error, result) => {
        try {
            if (!result.rows.length) {
                res.send("User you are looking for is not found!");
            } else {
                datatable.query(query.query6, [id], (error, result) => {
                    res.send("User deleted successfully!");
                })
            }
        } catch {
            res.send("something gone wrong", error);
        }
    })
}

// update the existing user
const controller6 = (req, res) => {
    const id = parseInt(req.params.id);
    const { password } = req.body;

    datatable.query(query.query2, [id], (error, result) => {
        if(result.rows.length) {
            datatable.query(query.query7, [id, password], (error, result) => {
                if(error) {
                    res.send("something update query issue");
                    console.log(error);
                } else {
                    res.send("your password changed successfully");
                }
            })
        } else {
            res.send("user not exist !");
        }
    })
}

module.exports = { controller1, controller2, controller3, controller4, controller5, controller6 };