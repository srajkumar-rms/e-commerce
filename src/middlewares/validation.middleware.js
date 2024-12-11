

// // condition for export default
// hosted declaration = function
// class
// assignment

import { body, validationResult } from "express-validator";

const validateRequest = async (req, res, next)=>{
    // 1. setup rules for validationResult
    const rules = [
        body("name").notEmpty().withMessage('Name is required!!'),
        body("price").isFloat({gt:0}).withMessage("Prive should be a positive value!!"),
        body("imageUrl").isURL().withMessage("Invalid Url")
        ]
    // 2. run those rules
    console.log("inside MW",req.body);

    await Promise.all(rules.map(rule=> rule.run(req)))

    // 3. check if there are any error after running the rules
    var validationErrors = validationResult(req)


    if(!validationErrors.isEmpty()){
            return res.render('new-product',{errorMessage: validationErrors.array()[0].msg} )
        }
    next()
}

export default validateRequest