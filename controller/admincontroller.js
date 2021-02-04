const Post = require('../models/post')

exports.getHome = (req,res,next) => {
    Post.find({}, function(err, posts){
        console.log(posts);
        res.render("home", {
          posts: posts
          });
      });
}

exports.getCompose = (req,res,next)=> {
    res.render("compose");
}

exports.postCompose = (req,res,next) => {
    const title = req.body.postTitle;
    const imageUrl = req.file.path;
    const content = req.body.postBody
    console.log(imageUrl)
    const post = new Post({
        title: title,
        imageUrl : imageUrl,
        content: content
      });
      console.log('post created')
      Post.findOne({title: title},function(err,obj){
          console.log('post finding')
          if(!obj){
            post.save(function(err){
                console.log('post save')
                if (!err){
                    res.redirect("/");
                }
              });
          }else{
              res.redirect("/exists");
          }
      });
}

exports.getExists = (req,res,next)=> {
    res.render("exists"); 
}