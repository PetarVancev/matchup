const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const session = require("express-session");

// Hashing rounds for bcrypt
const saltRound = 5;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24, // Cookie expiry in seconds
    },
  })
);

const db = mysql.createConnection({
  user: "petar12",
  host: "db4free.net",
  password: "0702002pm",
  database: "matchup",
  port: "3306",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

app.post("/register", (req, res) => {
  const { name, lastName, email, phoneNum, skillLevel, favSportId, password } =
    req.body;
  bcrypt.hash(password, saltRound, (err, hashedPassword) => {
    if (err) {
      res.status(500).json({ message: "Error hashing password" });
    }
    db.execute(
      "INSERT INTO Users (name, last_name, email, phone_num, skill_level, fav_sport_id, password) VALUES (?,?,?,?,?,?,?)",
      [name, lastName, email, phoneNum, skillLevel, favSportId, hashedPassword],
      (err, result) => {
        if (err) {
          console.log("Error during registration:", err);
          res.status(500).json({ message: "Error during registration" });
        } else {
          console.log("User registered successfully");
          res.status(201).json({ message: "Successfully created user" });
        }
      }
    );
  });
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    console.log("User is logged in");
    res.status(200).json({ loggedIn: true, user: req.session.user });
  } else {
    console.log("User is not logged in");
    res.status(200).json({ loggedIn: false });
  }
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.execute("SELECT * FROM Users WHERE email = ?;", [email], (err, result) => {
    if (err) {
      console.log("Error during login:", err);
      res.status(500).json({ message: "Error during login" });
    }
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (response) {
          console.log("User logged in successfully");
          req.session.user = result;
          res.status(200).json(result);
        } else {
          console.log("Wrong username or password");
          res.status(401).json({ message: "Wrong username or password" });
        }
      });
    } else {
      console.log("User doesn't exist");
      res.status(404).json({ message: "User doesn't exist" });
    }
  });
});

app.post("/listings/create", (req, res) => {
  const {
    creatorId,
    sportId,
    skillLevel,
    dateTime,
    price,
    noPeople,
    additionalInfo,
    location,
  } = req.body;
  console.log(req.body);
  if (req.session.user) {
    db.execute(
      "INSERT INTO Listing (creator_id, time, sport_id, price, skill_level, num_players, additional_info,location) VALUES (?,?,?,?,?,?,?,?)",
      [
        creatorId,
        dateTime,
        sportId,
        price,
        skillLevel,
        noPeople,
        additionalInfo,
        location,
      ],
      (err, result) => {
        if (err) {
          console.log("Error during posting listing", err);
          res.status(500).json({ message: "Error during posting listing" });
        } else {
          console.log("Listing posted successfully");
          res.status(201).json({ message: "Successfully created listing" });
        }
      }
    );
  } else {
    console.log("Cannot post Listing because user is not logged in");
    res.status(401).json({ loggedIn: false, message: "You are not logged in" });
  }
});

app.listen(3001, () => {
  console.log("Running server on port 3001");
});
