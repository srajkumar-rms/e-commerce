import path from 'path'
import ProductModel from '../models/product.model.js';

export default class ProductController {

    getProducts(req,res){
        
        let products = ProductModel.get()
        console.log(products);
        
        // return res.sendFile(path.join(path.resolve(),"src","views","products.html"))
    return res.render("products", {products})
    }

    getAddForm(req, res){
        return res.render('new-product', {errorMessage: null})
    }

    addNewProduct(req,res){

        // const {name, price, imageUrl} = req.body
        // let errors = [];
        // if(!name || name.trim()==""){
        //     errors.push('Invalid name or name cannot be empty')
        // }
        // if(!price || parseFloat(price) < 1){
        //     errors.push('Price cannot be negative')
        // }
        // try {
        //     const validUrl = new URL(imageUrl)
        // } catch (error) {
        //     errors.push('Invalid url')  
        // }
        // if(errors.length > 0){
        //     return res.render('new-product',{errorMessage: errors[0]} )
        // }
        ProductModel.add(req.body)
        let products = ProductModel.get()
        return res.render("products", {products})
    }
}