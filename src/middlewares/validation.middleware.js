

// // condition for export default
// hosted declaration = function
// class
// assignment

const validateRequest = (req, res, next)=>{
    const {name, price, imageUrl} = req.body
        let errors = [];
        if(!name || name.trim()==""){
            errors.push('Invalid name or name cannot be empty')
        }
        if(!price || parseFloat(price) < 1){
            errors.push('Price cannot be negative')
        }
        try {
            const validUrl = new URL(imageUrl)
        } catch (error) {
            errors.push('Invalid url')  
        }
        if(errors.length > 0){
            return res.render('new-product',{errorMessage: errors[0]} )
        }
        next()
}

export default validateRequest