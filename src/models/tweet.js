const bodyParser = require("body-parser");
const db=require("../db");
exports.GetAllTweets=(callback)=>{
    db.query(`SELECT tweet.creation_date,tweet.text,user.pseudo FROM tweet inner JOIN user on tweet.author_id = user.id limit 20 offset 10`,(error,result)=>{
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
        // console.log(result)
        callback(null, result);
    })
}
// gits user tweets
    exports.getUserTweets=(username,callback)=>{
        db.query(`SELECT tweet.id,tweet.text,tweet.creation_date,user.pseudo,user.city
         from tweet inner join user on tweet.author_id = user.id where user.pseudo = "${username}"`,(error,result)=>{
if(error){
 console.log("error:",error);
 callback(error,null);
    return;
}
callback(null,result)
 console.log(result)
        })
    }
    // 
   
    // delet tweets
    exports.delet=(id,callback)=>{
        db.query(`DELETE FROM tweet
        WHERE id ="${id}";`,(error,result)=>{
            if(error){
                console.log("error:",error)
                callback(error,null)
                return
            }
            callback(null,result)
             console.log("the result of delet",result)
        })
    }
   