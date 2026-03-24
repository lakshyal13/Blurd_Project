const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Schema
const messageSchema = new mongoose.Schema({
    user: String,
    text: String,
    mood: String,
    time: String
});

const Message = mongoose.model("Message", messageSchema);

// Mood Analysis (DS)
function analyzeMood(text) {
    const positive = ["happy", "good", "great", "nice", "awesome"];
    const negative = ["sad", "bad", "angry", "tired", "upset"];

    let score = 0;

    positive.forEach(word => {
        if (text.toLowerCase().includes(word)) score++;
    });

    negative.forEach(word => {
        if (text.toLowerCase().includes(word)) score--;
    });

    if (score > 0) return "positive";
    if (score < 0) return "negative";
    return "neutral";
}

// Send Message
app.post("/send", async (req, res) => {
    const { user, text } = req.body;

    const msg = new Message({
        user,
        text,
        mood: analyzeMood(text),
        time: new Date().toLocaleTimeString()
    });

    await msg.save();
    res.json({ success: true });
});

// Get Messages
app.get("/messages", async (req, res) => {
    const messages = await Message.find().sort({ _id: 1 });
    res.json(messages);
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});

console.log(process.env.MONGO_URI)

app.get("/", (req, res) => {
    res.send("BLURD backend running");
});