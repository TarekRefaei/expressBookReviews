const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let isRegistered = require("./auth_users.js").isRegistered;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const booksList = Object.values(books)


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    if(username&&password){
        if(isRegistered(username)){
                return res.json({message:"Already Registered"});
            }else{
                users.push({"username":username,"password":password})
                return res.json({message:"Registeration Success!"});
            }
    }else{
        return res.json({message:"Enter Valied username & Password"});
    }
});

public_users.get('/',function (req, res) {
  res.send(books)
});

public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    const booksList_filtered = booksList.filter((book)=>book.isbn === isbn);
    res.send(booksList_filtered);
 });
  
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    const booksList_filtered = booksList.filter((book)=>book.author === author);
    res.send(booksList_filtered);
});

public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    const booksList_filtered = booksList.filter((book) => book.title === title);
    res.send(booksList_filtered);
});

public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    const booksList_filtered = booksList.filter((book)=>book.isbn === isbn);
    res.send(booksList_filtered);
});

module.exports.general = public_users;
