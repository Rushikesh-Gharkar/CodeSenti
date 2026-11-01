const z = require("zod");

const signupSchema = z.object({
    name : z.string().trim().min(3 , "Name must contain minimum 3 characters").max(15 , "Name is too long"),
    email : z.string().trim().email("Invalid email address").transform(value=> value.toLowerCase()),
    password : z.string().trim().min(5 , "Password must be at least 8 characters long")
});

const loginSchema = z.object({
    email : z.string().trim().email("Invalid email address").transform(value=> value.toLowerCase()),
    password : z.string().trim().min(5 , "Password must be at least 8 characters long")
})

module.exports = {
    signupSchema,
    loginSchema
};
