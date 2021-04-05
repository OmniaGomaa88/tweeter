const { request, response } = require("express")
const express=require("express")
const userController=require("../controllers/userController")
const tweetModel=require("../models/tweet")
const userModel = require("../models/user")

// .. function to get all users tweets and show it in home page

exports.findAllTweets=(request,response)=>{
    const  {user}=request
    tweetModel.GetAllTweets((error,tweets)=>{
        if (error){
            response.send(error.message)
        }
       
        // render vers le viwe ejs avec le list
        response.render("index.ejs",{tweets, user})
        console.log('hi',user)
    })

    }
  
// function to add new tweet
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
     
 

    // function to get tweet by user name qnd show it in the profile of the user
    exports.findUserTweets=(request,response)=>{
         const username=request.user.username
         const userCity=request.user.city
        console.log(request.user.city)
        tweetModel.getUserTweets(username,(error,mytweet)=>{
            if (error){
                response.send(error.massege)
             }
            
            // render vers le viwe ejs avec le les tweets
            response.render("profile.ejs",{mytweet,username,userCity})
            
        })
    }
    // 
   
    // function to delet un tweet
    exports.DeletUntweet=(request,response)=>{
    const {id}=request.params
    console.log("the id of tweet",id)
    tweetModel.delet(id,(error,theTweet)=>{
        if (error){
            response.send(error.massege)
         }
        
        // render vers le viwe ejs avec le  tweet
        response.redirect("/myTweet")
    })
    }
    // to update tweet
   exports.updateTweet=(request,response)=>{
    const {id}=request.params
    const text= request.body.text
    console.log("the id of tweet",id,"the new text is",text)
    tweetModel.update(id,text,(error,theTweet)=>{
        if (error){
            response.send(error.massege)
         }
        
        // render vers le viwe ejs avec le  tweet
        response.redirect("/myTweet")
    })
    }