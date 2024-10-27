const mongoose=require('mongoose');
const contactSchema=mongoose.Schema({
    user_id:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:"User"
    },

    name:{
        type:String,
        required:[true,"Please fill the name"]
    },
    email:{
        type:String,
        required:[true,"Please fill the email"]
    },
    phone:{
        type:String,
        required:[true,"Please fill the number"]
    }

},{
    timestamps:true
});

module.exports=mongoose.model("contact",contactSchema);