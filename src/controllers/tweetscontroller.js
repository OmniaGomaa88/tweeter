const { request, response } = require("express")
const express=require("express")
const userController=require("../controllers/userController")
const tweetModel=require("../models/tweet")
const userModel = require("../models/user")

// ..

exports.findAllTweets=(request,response)=>{
    const {user}=request
    tweetModel.GetAllTweets((error,tweets)=>{
        if (error){
            response.send(error.message)
        }
       
        // render vers le viwe ejs avec le list
        response.render("index.ejs",{tweets, user})
        console.log('hi',user)
    })

    }
    exports.newTweet= (request,response)=>{
        const id =  request.user.id
         
                const {message}=request.body
                
                tweetModel.CreatNewTweet(id,message,(error,tweet)=>{
                    if(error)
                 {
                        response.send(error.message)
                    }
                    // render vers le viwe ejs avec le list
                     console.log('tweet text',message, "id of user",id)
                 response.redirect("/home")
                    
                 })
            } 
      // function to creat new tweet
 

    // .............
    // exports.findUserTweets=(request,response)=>{
        // const {username}=request.params.username
        // tweetModel.getUserTweets(username,(error,result)=>{
            // if (error){
                // response.send(error.massege)
            // }
        //    
            // render vers le viwe ejs avec le les tweets
            // response.render("profile.ejs",{tweetModel},{userModel})
            // 
        // })
    // }