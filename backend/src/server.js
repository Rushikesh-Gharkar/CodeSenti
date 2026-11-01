const app = require("./app")
require('dotenv').config()
const PORT = Number(process.env.PORT) || 3000

app.listen(PORT , (req , res)=>{
    console.log(`Server listening on PORT ${PORT}`);
})