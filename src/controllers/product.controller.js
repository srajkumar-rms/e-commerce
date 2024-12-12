import ProductModel from '../models/product.model.js';

class ProductController {

    getProducts(req, res) {

        var products = ProductModel.get()
        // return res.sendFile(path.join(path.resolve(),"src","views","products.html"))
        return res.render("products", { products })
    }

    getAddForm(req, res) {
        return res.render('new-product', { errorMessage: null })
    }

    addNewProduct(req, res) {
        const {name, desc, price} = req.body
        const imageUrl = "images/"+req.file.filename
        ProductModel.add(name, desc, price, imageUrl)
        var products = ProductModel.get()
        return res.render("products", { products })
    }

    postUpdateProduct(req, res) {
        const {id, name, desc, price} = req.body
        const imageUrl = "images/"+req.file.filename
        ProductModel.update(id, name, desc, price, imageUrl)
        var products = ProductModel.get()
        return res.render("products", { products, errorMessage: null })

    }
    getUpdateProductView(req, res) {
        // 1. if product exit then return 
        const { id } = req.params
        const productFound = ProductModel.getById(id)
        if (productFound) {
            return res.render('update-product', { product: productFound, errorMessage: null })
        }
        // 2. else return error
        else {
            res.status(401).send('product not found')
        }
    }

    postDeleteProduct(req, res, next) {
        const id = req.params.id
        const productFound = ProductModel.getById(id)
        if (!productFound) {
            return res.status(401).send('product not found')
        }

        ProductModel.delete(id)
        var products = ProductModel.get()
        return res.render('products', { products })

    }
}

export default ProductController