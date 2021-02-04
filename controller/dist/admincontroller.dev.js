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

exports.postCompose = function (req, res, next) {
  var post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
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