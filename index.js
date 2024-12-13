import express from 'express'
import ProductController from './src/controllers/product.controller.js'
import UserController from './src/controllers/user.controller.js'
import ejsLayout from 'express-ejs-layouts'
import path from 'path'
import validationMiddleware from './src/middlewares/validation.middleware.js'
import {uploadFile} from './src/middlewares/file-upload.middleware.js'

const server = express()

server.use(express.static('public'))

const productController = new ProductController()
const userController = new UserController()

server.use(ejsLayout)
server.use(express.urlencoded({extended: true}))
server.set('view engine', 'ejs')
server.set('views', path.join(path.resolve(),'src','views'))

server.use(express.static('src/views'))

server.get('/', productController.getProducts)
server.get('/add-product', productController.getAddForm)
server.get('/update-product/:id', productController.getUpdateProductView)

server.post('/delete-product/:id', productController.postDeleteProduct)
server.post('/add-product',uploadFile.single('imageUrl'),validationMiddleware, productController.addNewProduct)
server.post('/update-product',uploadFile.single('imageUrl'),validationMiddleware, productController.postUpdateProduct)

server.get('/register',userController.getRegister)
server.get('/login',userController.getLogin)

server.post('/register', userController.postRegister)
server.post('/login', userController.postLogin)



server.listen(3000,()=>{
    console.log('server listening on port 3000');
    
})