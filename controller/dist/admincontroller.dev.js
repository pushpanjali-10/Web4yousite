"use strict";

var Post = require('../models/post');

exports.getHome = function (req, res, next) {
  Post.find({}, function (err, posts) {
    console.log(posts);
    res.render("home", {
      posts: posts
    });
  });
};

exports.getCompose = function (req, res, next) {


  res.render("compose");
};

exports.postDelCnf = function(req,res,next) {

  const currID = req.params.id;
  console.log(currID);

  res.render("delCnf",{id : currID});
};

// exports.getDelCnf = function(req,res,next) {
//   res.render("delCnf")
// }

exports.postDelete = function(req,res,next){
  const currEmail = req.body.delEmail;
  const currID = req.body.button;
  console.log(currID);
  Post.findOne({_id: currID},function(err,obj){
    if(obj.email == currEmail){
      Post.findByIdAndRemove(currID,function(err){
        if(!err){
          console.log("Successfully Deleted");
          res.redirect("/");
        }
      });
    }else{
      res.render("Delete");
    }
  })
};

exports.postCompose = function (req, res, next) {
  var post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody,
    name: req.body.composerName,
    email: req.body.composerEmail
  });
  Post.findOne({
    title: req.body.postTitle
  }, function (err, obj) {
    if (!obj) {
      post.save(function (err) {
        if (!err) {
          res.redirect("/");
        }
      });
    } else {
      res.redirect("/exists");
    }
  });
};

exports.getExists = function (req, res, next) {
  res.render("exists");
};