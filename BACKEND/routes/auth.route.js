const express=require('express')
const authconstroller=require('../controller/authcontroller')
const route = express.Router()
route.post('/signup',authconstroller.signup)
route.post('/signin',authconstroller.signin)
route.post('/google',authconstroller.google)

module.exports=route
