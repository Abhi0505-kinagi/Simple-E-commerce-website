const mongoose=require('mongoose');

const itemSchema=new mongoose.Schema({
    title:{type:String},
    price:{type:Number},
    category:{type:String},
    imageUrl:{type:String}
})
module.exports=mongoose.model('Items',itemSchema);