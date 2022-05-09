const mongoose= require('mongoose');

const Schema = mongoose.Schema;

const subchallenge = new mongoose.Schema({  
  tag:{type:String},
  slug:{type:String}
},
{_id:false},
)
const challengeSchema=new mongoose.Schema({
username:{type:String,required:true},
message:{type:String,required:true},
tags:[subchallenge]
},
{versionKey: false}
)
challengeSchema.index({'$**': 'text'});
const challenge = mongoose.model('challenge',challengeSchema)
module.exports=challenge;