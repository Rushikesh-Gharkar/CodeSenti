const {signupUser , loginUser} = require("../services/auth.services");

const signup = async (req , res , next)=>{
    try{
        const {name , email , password} = req.body;

        const user = await signupUser(name , email , password);

        res.status(201).json({
            message : "SignUp successful",
            user
        })
    }
    catch(err){
        next(err);
    }
}

const login = async (req , res , next)=>{
    try{
        const {email , password} = req.body;
        
        const user = await loginUser(email , password);

        res.status(200).json({
            message : "Login successful",
            ...user
        })

    }
    catch(err){
        next(err);
    }
}

module.exports = {signup , login};