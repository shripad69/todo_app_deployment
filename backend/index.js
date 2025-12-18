const express = require("express");
const { user, todos } = require("./db.js");
const { v4: uuidv4 } = require("uuid");
var cors = require("cors");
const jwt = require("jsonwebtoken");
const secretKey = "abcde12345";
const { auth } = require("./middleware/auth.js");
const app = express();
const port = 8080;

app.use(cors());

app.use(express.json());

app.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const userId = uuidv4();

  if (username && password) {
    const currentuser = await user.findOne({
      username: username,
    });

    if (currentuser) {
      res.json({
        message: "Username already exits",
      });
    } else {
      user.create({ username, password, userId });
      res.status(200).json({ message: "Signup successful" });
    }
  } else {
    res.json({ message: "Enter all the details..." });
  }
});

app.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    try {
      const currentuser = await user.findOne({
        username: username,
        password: password,
      });

      if (currentuser) {
        const token = jwt.sign(
          {
            userId: currentuser.userId,
          },
          secretKey
        );

        res.json({
          token: token,
          message: "loggged in",
          userId: currentuser.userId,
        });
      } else {
        res.json({
          message: "invalid credentials",
        });
      }
    } catch (e) {
      res.json({
        message: "internal server error",
      });
    }
  } else {
    res.json({
      message: "Enter all the details...",
    });
  }
});

app.post("/add-todo", auth, async (req, res) => {
  const currentuserId = req.userId;
  const title = req.body.title;
  const description = req.body.description;
 
  try {
    await todos.create({
      userId: currentuserId,
      title: title,
      description: description,
    });

    res.json({
      message: "added-todo",
    });
  } catch (e) {
    res.json({
      message: "internal server error",
    });
  }
});


app.get("/get-todos",auth, async (req, res) => {

  const userId = req.userId;
  
  const data = await todos.find({
    userId : userId
  })
  console.log(data);

  if (data) {
    res.json ({
      data
    })
  }
  else {
    res.json({
      message : "no-todos found"
    })
  }
})

app.delete("/delete-todo", auth, async(req, res) => {
  const userId = req.userId;
  const title = req.body.title;
  const description = req.body.description;

  try {
    await todos.deleteOne({
      userId : userId,
      title : title,
      description : description
    });

    res.json({
      message : "todo-deleted"
    })
  }
  catch (e) {
    res.json({
      message : "internal server error"
    })
  }
})

app.get("/cicd-check", (req, res) => {
  res.json({
    status: "OK",
    message: "CI/CD DEPLOYMENT SUCCESS by dj",
    version: "v1",
    time: new Date().toISOString()
  });
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
