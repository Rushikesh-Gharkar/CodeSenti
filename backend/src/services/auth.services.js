const prisma = require("../config/database");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signupUser = async (name , email , password)=>{

  const existing_user = await prisma.user.findUnique({
    where : {email}
  })

  if(existing_user){
    const error = new Error("User already exists");
    error.statusCode = 409;
    throw error;
  }

  const password_hash = await bcrypt.hash(password , 12);

  const user = await prisma.user.create({
    data : {name , email , password_hash},
    select : {id:true , name:true , email:true}
  });

  return user

}

const loginUser = async(email , password)=>{

    const user = await prisma.user.findUnique({
        where : {email}
    });

    if(!user){
        const error = new Error("User doesn't exists");
        error.statusCode = 401;
        throw error;
    }

    const pass_match = await bcrypt.compare(
        password , user.password_hash
    )

    if(!pass_match){
        const error = new Error("Invalid credentials");
        error.statusCode = 401;
        throw error
    }

    const token = jwt.sign(
        {userId : user.id},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    return{
        user:{
            id:user.id,
            name:user.name,
            email:user.email
        },
        token
    }
}

module.exports = {
    signupUser,
    loginUser
};