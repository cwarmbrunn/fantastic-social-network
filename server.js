// REQUIREMENTS - EXPRESS AND MONGOOSE
const express = require("express");
const mongoose = require("mongoose");

// Express
const app = express();
const PORT = process.env.PORT || 3001;

const { User, Thought, Reaction } = require("./models");

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
    // TODO: Figure out how to populate thought and friend data
    .populate({ path: "thought", select: "-__v" })
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
app.put("/api/users/:id", ({ params }, res) => {
  // Use the findOneAndUpdate() method
  User.findOneAndUpdate({ _id: params.id })
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
app.delete("/api/users/:id", ({ params }, res) => {
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
// ROUTE #5 - END //

// FRIEND ROUTES START //

// ROUTE #6 - Add a new friend to a user's friends list //

app.post("/api/users/:userId/friends/:friendId", ({ body }, res) => {
  // Create the new friend
});

// ROUTE #6 - END //

// ROUTE #7 - Remove a friend from a user's friend's list //
app.delete("/api/users/:userId/friends/:friendId", ({ params }, res) => {
  // Use the findByIdAndDelete() method
  // Not sure if this is accurate - need to confirm
  User.findByIdAndDelete({ _id: params.id }).then((dbUserInfo) => {
    if (!dbUserInfo) {
      res.status(404).json({ message: "No user found with that ID!" });
      return;
    }
    res.json(dbUserInfo);
  });
});
// ROUTE #7 - END //

// FRIEND ROUTES END //

// THOUGHT ROUTES START //

// ROUTE #8 - Get ALL Thoughts //

app.get("/api/thoughts", (req, res) => {
  // Use the find() method to get all of the thoughts

  Thought.find()
    .then((dbUserInfo) => {
      // Conditional if information is not found
      if (!dbUserInfo) {
        res.status(404).json({ message: "No thoughts found - head empty!" });
        return;
      }
      res.json(dbUserInfo);
    })
    .catch((err) => res.json(err));
});

// ROUTE #8 - END //

// ROUTE #9 - Get a single thought by its id //
app.get("/api/thoughts/:id", ({ params }, res) => {
  // Use the findOne() method
  Thought.findOne({ _id: params.id })
    .then((dbUserInfo) => {
      if (!dbUserInfo) {
        res.status(404).json({ message: "Nothing was found!" });
        return;
      }
      res.json(dbUserInfo);
    })
    .catch((err) => res.json(err));
});
// ROUTE #9 - END //

// ROUTE #10 - Create a new thought //
app.post("/api/thoughts", ({ body }, res) => {
  // Create the Thought
  Thought.create(body)
    .then((dbUserInfo) => {
      if (!dbUserInfo) {
        res.status(404).json({ message: "Invalid entry - please try again!" });
        return;
      }
      res.json(dbUserInfo);
    })
    .catch((err) => res.json(err));
});
// ROUTE #10 - END //

// ROUTE #11 - Update a thought by its id //
app.put("/api/thoughts/:id", ({ params }, res) => {
  Thought.findOneAndUpdate({ _id: params.id })
    .then((dbUserInfo) => {
      if (!dbUserInfo) {
        res.status(404).json({ message: "No thoughts found!" });
        return;
      }
      res.json(dbUserInfo);
    })
    .catch((err) => res.json(err));
});
// ROUTE #11 - END //

// ROUTE #12 - Remove a thought by its id //
app.delete("/api/thoughts/:id", ({ params }, res) => {
  Thought.findOneAndDelete({ _id: params.id })
    .then((dbUserInfo) => {
      if (!dbUserInfo) {
        res.status(404).json({ message: "No thoughts found with that ID!" });
        return;
      }
      res.json(dbUserInfo);
    })
    .catch((err) => res.json(err));
});
// ROUTE #12 - END //

// THOUGHT ROUTES END //

// REACTION ROUTES START //
// TODO: Need to complete these //

// ROUTE #13 - Create a reaction stored in a single thought's reactions array field //
app.post("/api/thoughts/:thoughtId/reactions", ({ body }, res) => {
  Reaction.create(body)
    .then((dbUserInfo) => res.json(dbUserInfo))
    .catch((err) => res.json(err));
});
// ROUTE #13 - END //

// ROUTE #14 - Pull and remove a reaction by the reaction's reactionId value //
app.delete("/app/thoughts/:thoughtId/:reactionId", ({ params }, res) => {
  // Use the findOneAndDelete() method
  Reaction.findOneAndDelete({ _id: params.id })
    .then((dbUserInfo) => {
      if (!dbUserInfo) {
        res.status(404).json({ message: "No reaction found with that ID!" });
        return;
      }
      res.json(dbUserInfo);
    })
    // Catch Errors
    .catch((err) => res.json(err));
});
// ROUTE #14 - END //

// REACTION ROUTES END //

// Set up App Listener
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!🚀`);
});
