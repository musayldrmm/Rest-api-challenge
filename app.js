const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./model");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/Rest_challenge");
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT}`);
});
app.get("/", function (req, res) {
  res.send("Merhaba");
});
app.get("/healtcheck", function (req, res) {
  res.sendStatus(200);
});

app.post("/messages", function (req, res) {
  const headersname = req.header("X-username");
  const bodymessage = req.body.message;
  const Totaltag = [];
  if (bodymessage.length) {
    let preHashtags = bodymessage.split("#");
    let i = 0;
    if (bodymessage[0] !== "#") i++;
    for (i; i < preHashtags.length; i++) {
      let item = preHashtags[i];
      Totaltag.push({
        tag: item.split(' ')[0]   ,
        slug: item.split(' ')[0].toLowerCase(),
      });
    }
  }
  console.log("total tag" + JSON.stringify(Totaltag));
  let user = new User({
    username: headersname,
    message: bodymessage,
    tags: Totaltag,
  });
  user.save();
  res.status(200).send(user);
});

app.delete("/messages/:id", function (req, res) {
  const headersname = req.header("X-username");
  const userId = req.params.id;
  console.log(userId);
  User.findById(userId, function (err, user) {
    if (user.username == headersname) {
      User.findByIdAndRemove(userId, function (err, user) {

        res.status(200).send(user);
      });
    } else {
 
      res.status(204);
    }
  });
});

app.get("/messages/:id", function (req, res) {
  const userId = req.params.id;
  User.findById(userId, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(docs);
    }
  });
});

app.get('/messages',function (req, res){
const tag = String(req.query.tag)
const headersname = req.header("X-username")? req.header("X-username"):"empty";
const page = parseInt(req.query.page)? req.query.page:1
const count=parseInt(req.query.count)? req.query.count:10
if(headersname=="empty"){
    console.log("isim değeri verilmemiş.")
    User.find({$text: {$search: tag}},function(err, docs) { 
res.status(200).send(docs);
    }).limit(count);    
}
else{
    console.log("isim değeri verilmiş")
    User.find({username:headersname,$text: {$search: tag}},function(err, docs) { 
      console.log(docs)
   res.status(200).send(docs);
     }).limit(count);    
}
}) 