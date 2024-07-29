var express =require("express")
var exe = require("./connection")
var route = express.Router()

route.get("/",async function(req,res){
    var data = await exe(`SELECT * FROM home_image`)
    res.render("user/home.ejs",{"home_image":data})
})

route.get("/gallery",async function (req,res){
    var data = await exe(`SELECT * FROM gallery_image`)
    res.render("user/gallery.ejs",{"gallery_image":data})
})
route.get("/about",async function (req,res){
    var data = await exe(`SELECT * FROM about_us`)
    var about = await exe(`SELECT * FROM about`)
    res.render("user/about.ejs",{"about_us":data,"about":about[0]})
})
route.get("/services",async function (req,res){
    var data =await exe(`SELECT * FROM services`)
    res.render("user/services.ejs",{"services":data})
})
route.get("/contact",async function (req,res){
    var data = await exe(`SELECT * FROM contact`)
    res.render("user/contact.ejs",{"contacts":data[0]})
})
route.post("/save_user_info",async function(req,res){
    var d = req.body
    var sql = `INSERT INTO user_info (fname,lname,email,subject,message) VALUES ('${d.fname}','${d.lname}','${d.email}','${d.subject}','${d.message}')`
    await exe(sql)
    var data = await exe(`SELECT * FROM contact`)
    res.render("user/contact.ejs",{"contacts":data[0]})
})
module.exports = route

// CREATE TABLE user_info (user_info_id INT PRIMARY KEY AUTO_INCREMENT,fname VARCHAR(30),lname VARCHAR(30),email VARCHAR(30),subject TEXT,message TEXT)
