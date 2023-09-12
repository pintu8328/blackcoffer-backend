const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  end_year:Number,
  intensity:String,
  sector:String,
  topic:String,
  insight:String,
  url:String,
  region:String,
  start_year:String,
  impact:String,
  added:String,
  published:String,
  country:String,
  relevance:Number,
  pestle:String,
  source:String,
  title:String,
  likelihood:String 
});

const UserModel = mongoose.model("dashboard", UserSchema);

module.exports = UserModel;
