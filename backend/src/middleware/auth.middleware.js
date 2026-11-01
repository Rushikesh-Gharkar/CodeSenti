
const validate = (schema) =>{
    return (req , res , next)=>{
        try{
            const result = schema.safeParse(req.body);
            if(!result.success){
                return res.status(400).json({
                    message : "Validation failed",
                     errors: result.error.issues.map(issue => ({
                        field: issue.path.join("."),
                        message: issue.message
                    }))
                })
            }
        }
        catch(err){
            next(err);
        }
    }
}

module.exports = validate;