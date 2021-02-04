// jshint esversion:6


// ----Requirements----
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const { identity, remove } = require("lodash");


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// ----Startng the database----

mongoose.connect("mongodb://localhost:27017/web4you", {useNewUrlParser: true});

const postSchema = {
    title: String,
    content: String,
    email: String,
    name: String
};

const Post = mongoose.model("Post", postSchema);

var delID;

app.get("/",function(req,res){
    Post.find({}, function(err, posts){
        // console.log(posts);
        res.render("home", {
          posts: posts
          });
      });
});

app.get("/compose",function(req,res){
    res.render("compose");
});

app.post("/compose",function(req,res){

    const posttitle = req.body.postTitle;
    const postcontent =  req.body.postBody;
    const email = req.body.composerEmail
    const name = req.body.composerName;

    const post = new Post({
        title: posttitle,
        content: postcontent,
        email: email,
        name: name
      });

      Post.findOne({title: posttitle},function(err,obj){
          if(!obj){
            post.save(function(err){
                if (!err){
                    res.redirect("/");
                }
              });
          }else{
              res.redirect("/exists");
          }
      }); 
});

app.get("/exists",function(req,res){
    res.render("exists");
});

app.post("/delete",function(req,res){

    delID = req.body.checkbox;
    res.render("delCnf");
});

app.post("/delCnf",function(req,res){
    console.log(delID);
    const delEmail = req.body.delEmail;
    Post.findOne({_id: delID},function(err,post){
        if(post.email == delEmail){
            Post.findByIdAndRemove(delID, function(err){
                if(!err){
                  console.log("Successfully deleted...");
                  res.redirect("/");
                }
              });
        }else{
            console.log("Cannot Delete!");
        }
    });
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});
  