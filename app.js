// jshint esversion:6


// ----Requirements----
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const adminRoutes = require('./routes/admin')
const multer = require('multer');

const app = express();

const filestorage =  multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,'./images');
    },
    filename : (req,file,cb)=> {
        cb(null,file.fieldname + Date.now() + '-' + file.originalname )
    }
})

const filefilter = (req,file,cb) => {
    if(file.mimetype === 'image/jpg'
       || file.mimetype === 'image/jpeg'
       || file.mimetype === 'image/png'){
           cb(null,true)
       }else{
           cb(null,false)
       }
}


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use('/images',express.static("images"));
app.use(multer (
      {
        storage : filestorage,
        fileFilter : filefilter
     }
 ).single('postimg')
)

// const postSchema = {
//     title: String,
//     content: String
// };

// const Post = mongoose.model("Post", postSchema);


app.use(adminRoutes);

// app.get("/",function(req,res){
//     Post.find({}, function(err, posts){
//         console.log(posts);
//         res.render("home", {
//           posts: posts
//           });
//       });
// });

// app.get("/compose",function(req,res){
//     res.render("compose");
// });

// app.post("/compose",function(req,res){
//     const post = new Post({
//         title: req.body.postTitle,
//         content: req.body.postBody
//       });

//       Post.findOne({title: req.body.postTitle},function(err,obj){
//           if(!obj){
//             post.save(function(err){
//                 if (!err){
//                     res.redirect("/");
//                 }
//               });
//           }else{
//               res.redirect("/exists");
//           }
//       });

      
// });

// app.get("/exists",function(req,res){
//     res.render("exists");
// });
mongoose.connect("mongodb://localhost:27017/web4you", {useNewUrlParser: true});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});
  