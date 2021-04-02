const express  = require("express");
const ejs=require('ejs');
const routeur= require("./router/router");
const server = express();
const cookie=require("cookie-parser")
// ajouter elemnt de configration statice

 server.use(express.static("/statice/images"))
server.use(express.static("./src/statice"))
// indiquer à la server quel metour de rendu il faut utiliser et avc quel fanction
server.engine("ejs",ejs.renderFile);
server.set("views","./src/views")
server.use(express.urlencoded({  extended: true}))
server.use(cookie())
server.use(routeur)
server.listen(8080,()=>{
  
})
