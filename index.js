const express = require('express');
const app = express();
const mongoose = require('mongoose');
const UserModel = require('./models/Users');
const cors = require('cors');

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://hritikhotagi:hritikhotagi@mw.ni3sso0.mongodb.net/?retryWrites=true&w=majority&appName=MW");

app.get("/getUsers",async (req, res) => {
    UserModel.find().then((err,result) => {
        console.log(result);
        if (err) {
            res.json(err);
        }
        res.json(result);
    })
});

app.post("/createUser",async (req, res) => {
    const user = req.body;
    const newUser = UserModel(user);
    await newUser.save();

    res.json(user);
});

app.listen(3001, () => {
    console.log("Server Runs Perfectly!");
})