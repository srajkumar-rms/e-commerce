import express from 'express'
import ejsLayout from 'express-ejs-layouts'
import ProductController from './src/controllers/product.controller.js'
import validationMiddleware from './src/middlewares/validation.middleware.js'
import path from 'path'

const productController = new ProductController()
const server = express()
server.use(express.urlencoded({extended: true}))

server.set('view engine', 'ejs')
server.set('views', path.join(path.resolve(),'src','views'))

server.use(ejsLayout)

server.use(express.static('src/views'))

server.get('/', productController.getProducts).get('/add-product', productController.getAddForm).get('/update-product/:id', productController.getUpdateProductView)
server.post('/add-product', validationMiddleware, productController.addNewProduct).post('/update-product',validationMiddleware, productController.postUpdateProduct)

server.listen(3000,()=>{
    console.log('server listening on port 3000');
    
})