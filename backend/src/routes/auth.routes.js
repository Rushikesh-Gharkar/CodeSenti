const express = require("express");
const router = express.Router();

const{signup , login} = require("../controllers/auth.controller");
const validate = require("../middleware/auth.middleware")
const {loginSchema , signupSchema} = require("../validators/auth.validator")

router.post("/signup", validate(signupSchema) ,signup );
router.post("/signin", validate(loginSchema) , login);

module.exports = router;

