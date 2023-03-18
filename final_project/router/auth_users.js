// const express = require('express');
// const jwt = require('jsonwebtoken');
// let books = require("./booksdb.js");
// const regd_users = express.Router();
// const booksList = Object.values(books)

// let users = [
//     {
//         "username":"test",
//         "password":"123"
//     }
// ];


// const isRegistered = (username)=>{ 
//     const filtered_users = users.filter((user) => user.username === username);
//     if(filtered_users.length > 0){
//         return true;
//     }else{
//         return false;
//     }
// }

// const authenticatedUser = (username,password)=>{ 
//     let validUser = users.filter((user) => user.username === username && user.password === password)
//     if(validUser.length>0){
//         return true;
//     }else{
//         return false;
//     }
// }

// regd_users.post("/login", (req,res) => {
//   username = req.body.username;
//   password = req.body.password;

//   if(!username || !password){
//       res.json({message:("Username or Password are missed")})
//   } else {
//     if(authenticatedUser(username,password)){
//         let accessToken = jwt.sign(
//             {data:password},
//             'access',
//             {expiresIn : 60*60}
//         );
//         req.session.accessToken = {
//             accessToken,username
//         }
//         res.json({message:("User successfully logged in")});
//     }else{
//         res.json({message:("Not Registered or wrong username Or Password")})        
//     }
//   }
// });

// // Add a book review
// regd_users.put("/auth/review/:isbn", (req, res) => {
//     //Write your code here
//       const isbn = req.params.isbn;
//       const review = req.body.review;
//       const username = req.session.authorization.username;
//       console.log("add review: ", req.params, req.body, req.session);
//       if (books[isbn]) {
//           let book = books[isbn];
//           book.reviews[username] = review;
//           return res.status(200).send("Review successfully posted");
//       }
//       else {
//           return res.status(404).json({message: `ISBN ${isbn} not found`});
//       }
//   });

// // regd_users.put("/auth/review/", (req, res) => {
// //     // let isbn = req.params.isbn
// //     // let text = req.query.review
// //     // let usernameAuth = req.session.authorization.username;
// //     // if(isbn) {
// //     //     if(booksList[isbn]) {
// //     //         booksList[isbn].reviews[usernameAuth] = text
// //     //         console.log(books)
// //     //         res.send("Your review was written successfully")
// //     //     }
// //     // }
// //     res.send("An error occurred")
// // });

// module.exports.authenticated = regd_users;
// module.exports.isRegistered = isRegistered;
// module.exports.users = users;

const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{"username":"dennis","password":"abc"}];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
    const userMatches = users.filter((user) => user.username === username);
    return userMatches.length > 0;
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
  const matchingUsers = users.filter((user) => user.username === username && user.password === password);
  return matchingUsers.length > 0;
}



//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  console.log("login: ", req.body);
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(404).json({message: "Error logging in"});
  }

  if (authenticatedUser(username,password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });

    req.session.authorization = {
            accessToken,username
        }
        return res.status(200).send("User successfully logged in");
    } else {
        return res.status(208).json({message: "Invalid Login. Check username and password"});
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
    const isbn = req.params.isbn;
    const review = req.body.review;
    const username = req.session.authorization.username;
    console.log("add review: ", req.params, req.body, req.session);
    if (books[isbn]) {
        let book = books[isbn];
        book.reviews[username] = review;
        return res.status(200).send("Review successfully posted");
    }
    else {
        return res.status(404).json({message: `ISBN ${isbn} not found`});
    }
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.session.authorization.username;
  if (books[isbn]) {
      let book = books[isbn];
      delete book.reviews[username];
      return res.status(200).send("Review successfully deleted");
  }
  else {
      return res.status(404).json({message: `ISBN ${isbn} not found`});
  }
});



module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
