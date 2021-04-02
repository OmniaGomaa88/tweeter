const db=require("../db");
// function for select all userName that match with the userName entried in siginUp
exports.SelectUserName=(username,Callback)=>{
    db.query(`SELECT pseudo FROM user where user.pseudo = "${username}"`,(error,result)=>{
        if(error){
            console.log("error:", error)
            Callback(error,null)
            return;
        }
        Callback(null,result)
    })
  
}
// function to chicking the userName and password for login
exports.chikingUser=(username,Callback)=>{
    db.query(`SELECT * FROM user where pseudo ="${username}";`,(error,result)=>{
        if(error){
            console.log("error:", error)
            Callback(error,null)
        }
        console.log(result)
        Callback(null,result)
    })
  
}
// function to git user

// creat newUser
exports.create = (user, callback) => {
    db.query(`INSERT INTO user (lastname,firstname,dateofbirth,email,password,phonenumber,pseudo,city) VALUES
     ("${user.last_name}","${user.first_name}","${user.birthday}","${user.email}","${user.password}","${user.telephone}","${user.username}","${user.city}");`, (error, result) => {
      if (error) {
        console.log("error: ", error);
        callback(error, null);
        return;
      }
      
      callback(null, result);
    })
  }

