const mongoose=require('mongoose')

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profilePicture:{
        type:String,
        default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Ficonduck.com%2Ficons%2F180867%2Fprofile-circle&psig=AOvVaw0OlkEc20rKnOwxG2DhcdS9&ust=1712815636034000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJCy4c_9toUDFQAAAAAdAAAAABAE"
    }
    
},{timestamps:true})

const Users= mongoose.model('Users',userSchema)

module.exports=Users