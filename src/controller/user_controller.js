const bcrypt = require('bcryptjs');
const datatable = require('../db');
const query = require('../query/user_query');

// display all users
const controller1 = async (req, res) => {
    try {
        const result = await datatable.query(query.query1);
        // BUG FIX: Don't send passwords in API response
        const safeRows = result.rows.map(({ password, ...rest }) => rest);
        res.status(200).json(safeRows);
    } catch (error) {
        console.error("Get all users error:", error);
        // BUG FIX: Don't leak raw error objects to client (old code: res.send(error))
        res.status(500).json({ error: "Failed to fetch users" });
    }
}

// display user based on there ID
const controller2 = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        // BUG FIX: Validate id is a number
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid user ID" });
        }
        const result = await datatable.query(query.query2, [id]);
        // BUG FIX: Don't send password in response
        const safeRows = result.rows.map(({ password, ...rest }) => rest);
        res.status(200).json(safeRows);
    } catch (error) {
        console.error("Get user by ID error:", error);
        res.status(500).json({ error: "Failed to fetch user" });
    }
}

// display users who followed them
const controller3 = async (req, res) => {
    try {
        const username = req.params.username;
        if (!username || typeof username !== 'string') {
            return res.status(400).json({ error: "Invalid username" });
        }
        const result = await datatable.query(query.query3, [username]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Get followers error:", error);
        res.status(500).json({ error: "Failed to fetch followers" });
    }
}

// check user existance and add them
const controller4 = async (req, res) => {
    try {
        const { username, password, followed_user, joining_date } = req.body;

        // BUG FIX: Validate required fields
        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }

        const result = await datatable.query(query.query4, [username]);
        
        if (result.rows.length) {
            res.status(409).json({ error: "Username already taken, try another username." });
        } else {
            // BUG FIX: Old code stored password as PLAINTEXT — now we hash it
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            await datatable.query(query.query5, [username, hashedPassword, followed_user, joining_date]);
            res.status(201).json({ message: "Congratulations, account successfully created" });
        }
    } catch (error) {
        console.error("Add user error:", error);
        res.status(500).json({ error: "Something went wrong during account creation" });
    }
}

// check and delete the user
const controller5 = async (req, res) => {
    try {
        const id = Number.parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid user ID" });
        }
        const result = await datatable.query(query.query2, [id]);
        
        if (!result.rows.length) {
            res.status(404).json({ error: "User you are looking for is not found!" });
        } else {
            await datatable.query(query.query6, [id]);
            res.status(200).json({ message: "User deleted successfully!" });
        }
    } catch (error) {
        console.error("Delete user error:", error);
        // BUG FIX: Don't concatenate raw error (old: "something gone wrong: " + error)
        res.status(500).json({ error: "Something went wrong during deletion" });
    }
}

// update the existing user
const controller6 = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid user ID" });
        }
        const { password } = req.body;
        if (!password) {
            return res.status(400).json({ error: "New password is required" });
        }

        const result = await datatable.query(query.query2, [id]);
        
        if(result.rows.length) {
            // BUG FIX: Old code stored the new password as PLAINTEXT
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            await datatable.query(query.query7, [id, hashedPassword]);
            res.status(200).json({ message: "Your password changed successfully" });
        } else {
            res.status(404).json({ error: "User does not exist!" });
        }
    } catch (error) {
        console.error("Update user error:", error);
        res.status(500).json({ error: "Something went wrong during password update" });
    }
}

module.exports = { controller1, controller2, controller3, controller4, controller5, controller6 };