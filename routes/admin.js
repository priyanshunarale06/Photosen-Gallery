var express = require("express")
var exe = require("./connection")
var route = express.Router()

route.get("/",function(req,res){
    res.render("admin/home.ejs") 
})


route.get("/dashboard",function(req,res){
    res.render("admin/dashboard.ejs")
})

// HOME
route.get("/manage_home",async function(req,res){
    var data = await exe(`SELECT * FROM home_image`)
    res.render("admin/manage_home.ejs",{"home_image":data})
})
route.post("/save_home_image",async function(req,res){
    var d = req.body
    var home_images = new Date().getTime()+req.files.home_images.name
    req.files.home_images.mv("public/images/"+home_images)
    var sql = `INSERT INTO home_image (home_image_title,home_images) VALUES('${d.home_image_title}','${home_images}')`
    await exe(sql)
    res.redirect("/admin/manage_home")
})
route.get("/edit_home_image/:id",async function(req,res){
    var id = req.params.id
    var data =await exe(`SELECT * FROM home_image WHERE home_image_id='${id}'`)
    res.render("admin/edit_home.ejs",{"home_image":data})
})
route.post("/update_home_image",async function(req,res){
    var d = req.body
    if(req.files != null){
        var home_images = new Date().getTime()+req.files.home_images.name
        req.files.home_images.mv("public/images/"+home_images)
        var sql =`UPDATE home_image SET home_images='${home_images}' WHERE home_image_id='${d.home_image_id}'`
        await exe(sql)
    }
    var sql = `UPDATE home_image SET home_image_title ='${d.home_image_title}' WHERE home_image_id='${d.home_image_id}'`
    await exe(sql)
    res.redirect("/admin/manage_home")
})
route.get("/delete_home_image/:id",async function(req,res){
    var id = req.params.id
    var sql = `DELETE from home_image WHERE home_image_id='${id}'`
    await exe(sql)
    res.redirect("/admin/manage_home")
})


// GALLERY
route.get("/manage_gallery",async function(req,res){
    var data = await exe(`SELECT * FROM gallery_image`)
    res.render("admin/manage_gallery.ejs",{"gallery_image":data})
})
route.post("/save_gallery_image",async function(req,res){
    var d = req.body
    var gallery_images = new Date().getTime()+req.files.gallery_images.name
    req.files.gallery_images.mv("public/images/"+gallery_images)
    var sql = `INSERT INTO gallery_image (gallery_images) VALUES ('${gallery_images}')`
    await exe(sql)
    res.redirect("/admin/manage_gallery")
})
route.get("/edit_gallery_image/:id",async function(req,res){
    var id = req.params.id
    var data = await exe(`SELECT * FROM gallery_image WHERE gallery_image_id='${id}'`)
    res.render("admin/edit_gallery.ejs",{"gallery_image":data})
})
route.post("/update_gallery_image",async function(req,res){
    var d= req.body
    if(req.files != null){
        var gallery_images = new Date().getTime()+req.files.gallery_images.name
        req.files.gallery_images.mv("public/images/"+gallery_images)
        var sql =`UPDATE gallery_image SET gallery_images='${gallery_images}' WHERE gallery_image_id='${d.gallery_image_id}'`
        await exe(sql)
    }
    res.redirect("/admin/manage_gallery")
})
route.get("/delete_gallery_image/:id",async function(req,res){
    var id = req.params.id
    var sql = `DELETE from gallery_image WHERE gallery_image_id='${id}'`
    await exe(sql)
    res.redirect("/admin/manage_gallery")
})

// ABOUT
route.get("/manage_about",async function(req,res){
    var data = await exe(`SELECT * FROM about`)
    res.render("admin/manage_about.ejs",{"about":data[0]})
})
route.post("/save_about",async function(req,res){
    var d = req.body
    if(req.files){
        var about_image = new Date().getTime()+req.files.about_image.name
        req.files.about_image.mv("public/images/"+about_image)
        var sql = `UPDATE about SET about_image='${about_image}'`
        await exe(sql)
    }
    // var sql = `INSERT INTO about(about_image,about_title,about_paragraph) VALUES ('${about_image}',
    // '${d.about_title}','${d.about_paragraph}')`
    // await exe(sql)
    var sql = `UPDATE about SET about_title='${d.about_title}',about_paragraph='${d.about_paragraph}'`
    await exe(sql)
    res.redirect("/admin/manage_about")
})

// ABOUT US
route.get("/manage_about_us",async function(req,res){
    var data = await exe(`SELECT * FROM about_us`)
    res.render("admin/manage_about_us.ejs",{"about_us":data})
})
route.post("/save_about_us",async function(req,res){
    var d = req.body
    var about_us_image = new Date().getTime()+req.files.about_us_image.name
    req.files.about_us_image.mv("public/images/"+about_us_image)
    var sql = `INSERT INTO about_us (about_us_image,about_us_paragraph,about_us_facebook,about_us_twitter,
        about_us_instagram) VALUES ('${about_us_image}','${d.about_us_paragraph}','${d.about_us_facebook}',
        '${d.about_us_twitter}','${d.about_us_instagram}')`
    await exe(sql)
    res.redirect("/admin/manage_about_us")
})
route.get("/edit_about_us/:id",async function(req,res){
    var id = req.params.id
    var data = await exe(`SELECT * FROM about_us WHERE about_us_id='${id}'`)
    res.render("admin/edit_about_us.ejs",{"about_us":data})
})
route.post("/update_about_us",async function(req,res){
    var d = req.body
    if(req.files != null){
        var about_us_image = new Date().getTime()+req.files.about_us_image.name
        req.files.about_us_image.mv("public/images/"+about_us_image)
        var sql = `UPDATE about_us SET about_us_image='${about_us_image}' WHERE about_us_id='${d.about_us_id}'`
        await exe(sql)
    }
    var sql =`UPDATE about_us SET about_us_paragraph='${d.about_us_paragraph}',
    about_us_facebook='${d.about_us_facebook}',about_us_twitter='${d.about_us_twitter}',
    about_us_instagram='${d.about_us_instagram}' WHERE about_us_id='${d.about_us_id}'`
    await exe(sql)
    res.redirect("/admin/manage_about_us")
})
route.get("/delete_about_us/:id",async function(req,res){
    var id = req.params.id
    var sql = `DELETE from about_us WHERE about_us_id='${id}'`
    await exe(sql)
    res.redirect("/admin/manage_about_us")
})

// SERVICES
route.get("/manage_services",async function(req,res){
    var data =await exe(`SELECT * FROM services`)
    res.render("admin/manage_services.ejs",{"services":data})
})
route.post("/save_services",async function(req,res){
    var d = req.body
    var sql = `INSERT INTO services(services_title,services_paragraph,services_price) VALUES 
    ('${d.services_title}','${d.services_paragraph}','${d.services_price}')`
    await exe(sql)
    res.redirect("/admin/manage_services")
})
route.get("/edit_services/:id",async function(req,res){
    var id = req.params.id
    var data = await exe(`SELECT * FROM services WHERE services_id='${id}'`)
    res.render("admin/edit_services.ejs",{"services":data})
})
route.post("/update_services",async function(req,res){
    var d = req.body
    var sql =`UPDATE services SET services_title='${d.services_title}',
    services_paragraph='${d.services_paragraph}',services_price='${d.services_price}' WHERE services_id='${d.services_id}'`
    await exe(sql)
    res.redirect("/admin/manage_services")
})
route.get("/delete_services/:id",async function(req,res){
    var id = req.params.id
    var sql = `DELETE from services WHERE services_id='${id}'`
    await exe(sql)
    res.redirect("/admin/manage_services")
})

// CONTACT
route.get("/manage_contact",async function(req,res){
    var data = await exe(`SELECT * FROM contact`)
    res.render("admin/manage_contact.ejs",{"contact":data[0]})
})
route.post("/save_contact",async function(req,res){
    var d = req.body
    // var sql = `INSERT INTO contact(contact_address,contact_phone,contact_email)
    //  VALUES ('${d.contact_address}','${d.contact_phone}','${d.contact_email}')`
    var sql = `UPDATE contact SET contact_address='${d.contact_address}',
                contact_phone='${d.contact_phone}',contact_email='${d.contact_email}'`
    await exe(sql)
    res.redirect("/admin/manage_contact")
})

// USER INFO
route.get("/user_info",async function(req,res){
    var data = await exe(`SELECT * FROM user_info`)
    res.render("admin/user_info.ejs",{"user_info":data})
})
module.exports = route

// CREATE TABLE home_image(home_image_id INT PRIMARY KEY AUTO_INCREMENT,home_image_title VARCHAR(30),home_images TEXT)
// CREATE TABLE gallery_image(gallery_image_id INT PRIMARY KEY AUTO_INCREMENT,gallery_images TEXT) 
// CREATE TABLE about(about_id INT PRIMARY KEY AUTO_INCREMENT,about_image TEXT,about_title VARCHAR(30),about_paragraph TEXT)
// CREATE TABLE about_us(about_us_id INT PRIMARY KEY AUTO_INCREMENT,about_us_image TEXT,about_us_paragraph VARCHAR(100),about_us_facebook VARCHAR(30),about_us_twitter VARCHAR(30),,about_us_instagram VARCHAR(30))
// CREATE TABLE services(services_id INT PRIMARY KEY AUTO_INCREMENT,services_title VARCHAR(40),services_paragraph VARCHAR(100),services_price VARCHAR(10))
// CREATE TABLE contact(contact_id INT PRIMARY KEY AUTO_INCREMENT,contact_address VARCHAR(40),contact_phone VARCHAR(13),contact_address VARCHAR(20))






