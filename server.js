// REQUIREMENTS - EXPRESS AND MONGOOSE
const express = require("express");
const mongoose = require("mongoose");

// Express
const app = express();
const PORT = process.env.PORT || 3001;

const { Reaction, Thought, User } = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/Notedb",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.set("debug", true);

// ROUTE #1 - Post a New User //
app.post("/api/users", ({ body }, res) => {
  // Create the User
  User.create(body)
    // We want to pull the information from the username and email fields
    .then((dbUserInfo) => {
      // If information is invalid
      if (!dbUserInfo) {
        res.status(404).json({ message: "Invalid entry  - please try again!" });
        return;
      }
      // Send JSON with user information
      res.json(dbUserInfo);
    })
    // Catch any error(s)
    .catch((err) => res.json(err));
});
// ROUTE #1 - END //

// ROUTE #2 - Get ALL Users //
app.get("/api/users", (req, res) => {
  // Use the "find()" method to get all of the users in the database
  // Remember that empty curly braces will return everything inside of the find() method
  User.find({})
    .then((dbUserInfo) => {
      // If statement if user information is not found
      if (!dbUserInfo) {
        res.status(404).json({ message: "No users found!" });
        return;
      }
      res.json(dbUserInfo);
    })
    .catch((err) => res.json(err));
});
// ROUTE #2 - END //

// ROUTE #3 - Get a SINGLE User by ID and populated thought/friend data //
// Need to Confirm! //
app.get("/api/users/:id", ({ params }, res) => {
  // We will use the findOne() method
  User.findOne({ _id: params.id })
    .then((dbUserInfo) => {
      if (!dbUserInfo) {
        res
          .status(404)
          .json({ message: "No user found with that ID! Please try again." });
        return;
      }
      res.json(dbUserInfo);
    })
    .catch((err) => res.json(err));
});
// ROUTE #3 - END //

// ROUTE #4 - Update a User by its _id //
app.put("/api/users/:id", ({ params, body }, res) => {
  // Use the findOneAndUpdate() method
  User.findOneAndUpdate({ _id: params.id }, body)
    .then((dbUserInfo) => {
      if (!dbUserInfo) {
        res.status(404).json({ message: "No user found with that ID!" });
        return;
      }
      res.json(dbUserInfo);
    })
    .catch((err) => res.json(err));
});

// ROUTE #4 - END //

// ROUTE #5 - Delete User by ID //
app.delete("api/users/:id", ({ params }, res) => {
  // Use the findOneAndDelete() method
  User.findOneAndDelete({ _id: params.id })
    .then((dbUserInfo) => {
      if (!dbUserInfo) {
        res.status(404).json({ message: "No user found with that ID!" });
        return;
      }
      res.json(dbUserInfo);
    })
    .catch((err) => res.json(err));
});
// Set up App Listener
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!🚀`);
});
