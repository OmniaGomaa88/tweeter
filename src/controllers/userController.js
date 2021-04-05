const { request, response } = require("express")
const bcrypt =require("bcrypt")
const jwt = require('jsonwebtoken');
const express=require("express")
const tweetModel=require("../models/tweet")
const userModel=require("../models/user")
const SECRET = "motSecret";
const MAXAGE = Math.floor(Date.now() / 1000) + (60 * 60);
// getting login page
exports.loginPage=(request,response)=>{
  response.render("login.ejs")
  
  }
// signup function to render to signup page
exports.signup=(request,response)=>{
response.render("signup.ejs")
}
// newUser function to creatUser
exports.newUser=(request,response)=>{
    const {first_name ,
        last_name,
       birthday,
        city,
        email,
        telephone,
        username,
        password}=request.body
        console.log(request.body)
    

    // chicking if userName not exist
    userModel.SelectUserName(username,(error,result)=>{
        if(error){
            response.send(error.message)
        }
        else if(result.length !==0){
            response.send("userName déjà utilisé")
        }
   
        else {
            const saltRounds = 10;
// hashing the password
            bcrypt.hash(password, saltRounds, (error, hash) => {
              if (error) {
                response.send(error.message);
              }
   
              const newUser = {
                first_name ,
                last_name,
               birthday,
                city,
                email,
                telephone,
                username,
                password: hash
              }
   
              userModel.create(newUser, (error, result) => {
                if (error) {
                  response.send(error.message);
                }
           
                response.redirect("/");
              })
            })
          }
        });
   }

// function to make login
exports.authenticate = (request, response) => {
  const { username,password } = request.body;

  userModel.chikingUser(username, (error, result) => {
    if (error) {
      response.send(error.message);
    } else if (result.length === 0) {
      response.send("This user doesn't exist!");
    } else {
      const hash = result[0].password;

      bcrypt.compare(password, hash, (error, correct) => {
        if (error) {
          response.send(error.message);
        }
  
        if (!correct) {
          response.send("password not correct");
        }
  
        const user = {
          id: result[0].id,
          username: result[0].pseudo,
          city :result[0].city,
          exp: MAXAGE
        };
  
        jwt.sign(user, SECRET, (error, token) => {
          if (error) {
            response.send(error.message);
          }
  
          request.user = {
            id: result[0].id,
            username: result[0].pseudo,
            city: result[0].city
          };
          
           response.cookie('authcookie', token, { maxAge: MAXAGE });
          response.redirect('/home');
          console.log("new infrmation",request.user.username)
          return  request.user 
        });
      });
    }
  })
}

exports.logout = (request, response) => {
  response.clearCookie("authcookie");
  response.render("login.ejs");
}