// jshint esversion:6


// ----Requirements----
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


mongoose.connect("mongodb://localhost:27017/web4you", {useNewUrlParser: true});

const postSchema = {
    title: String,
    content: String
};

const Post = mongoose.model("Post", postSchema);


app.get("/",function(req,res){
    Post.find({}, function(err, posts){
        console.log(posts);
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

    const post = new Post({
        title: posttitle,
        content: postcontent
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

app.listen(3000, function() {
    console.log("Server started on port 3000");
});
  