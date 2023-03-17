const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [
    {
        username:"Test1",
        password:"123"
    },
    {
        username:"Test2",
        password:"456"
    }
];


const isRegistered = (username)=>{ 
    const filtered_users = users.filter((user) => user.username === username);
    if(filtered_users.length > 0){
        return true;
    }else{
        return false;
    }
}

const authenticatedUser = (username,password)=>{ 
    let validUser = users.filter((user) => user.username === username && user.password === password)
    if(validUser.length>0){
        return true;
    }else{
        return false;
    }
}

regd_users.post("/login", (req,res) => {
  username = req.body.username;
  password = req.body.password;

  if(!username || !password){
      res.json({message:("Username or Password are missed")})
  } else {
    if(!authenticatedUser(username,password)){
        res.json({message:("Not Registered or wrong username Or Password")})
    }else{
        let accessToken = jwt.sign(
            {data:password},
            'access',
            {expiresIn : 60*60}
        );
        req.session.accessToken = {
            accessToken,username
        }
    }
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isRegistered = isRegistered;
module.exports.users = users;
