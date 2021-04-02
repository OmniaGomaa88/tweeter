const bodyParser = require("body-parser");
const db=require("../db");
exports.GetAllTweets=(callback)=>{
    db.query(`SELECT tweet.creation_date,tweet.text,user.pseudo FROM tweet inner JOIN user on tweet.author_id = user.id limit 200`,(error,result)=>{
        if(error){
            console.log("error: ", error);
            callback(error, null);
            return;
        }
        callback(null, result);
       
    })
    
 }
//  
//  creat new tweet
exports.CreatNewTweet=(id,text,callback)=>{
    db.query(`INSERT INTO tweet (author_id,text) VALUES ("${id}","${text}")`
    ,(error,result)=>{
        if(error){
            console.log("error: ", error);
            callback(error, null);
            return;
        }
        console.log(result)
        callback(null, result);
    })
}
// ..........
    exports.getUserTweets=(username,callback)=>{
        db.query(`SELECT * from tweet inner join user on tweet.author_id = user.id
         where user.pseudo = "${username}" `,(error,result)=>{
if(error){
 console.log("error:",error);
 callback(error,null);
    return;
}
callback(null,result)
console.log(result)
        })
    }
   