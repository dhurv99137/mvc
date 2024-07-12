const User = require("../models/User.models");
const bcrypt = require('bcrypt');

const get = (req, res) => {
    res.send("Welcome to page");
}

const getUsers = async (req, res) => {
    let data = await User.find();
    res.send(data);
}

const createUser = async (req, res) => {
    try {
        let { email, password } = req.body;
        let hashedPassword = await bcrypt.hash(password, 10);
        req.body.password = hashedPassword;

        let user = await User.findOne({ email: email });
        if (user) {
            res.send({ msg: "User already exists", user });
        } else {
            let data = await User.create(req.body);

            res.cookie({ "uId": data.id, "role": data.role }).send(data);
        }
    } catch (error) {
        res.send("Error creating user");
    }
}

const Login = async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).send("User not found");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).send("Wrong password");
        }
        else {
            res.cookie("uId", user.id)
            res.cookie("role", user.role)
            res.send("Successfully logged in");
        }

    } catch (error) {
        res.status(500).send("Error logging in");
    }
}

const deleteUser = async (req, res) => {
    let { id } = req.params;
    let data = await User.findByIdAndDelete(id,req.body);
    res.send("delete Successfully");
}

const updateUser = async (req, res) => {
    let { id } = req.params;
    let data = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.send("update Successfully");
}

const singupPage = (req, res) => {
    res.render("signup");
}
const loginPage = (req, res) => {
    res.render("login");
}
const homePgee = (req, res) => {
    res.render("index")
}

module.exports = { get, getUsers, createUser, singupPage, Login, loginPage, deleteUser, updateUser, homePgee };
