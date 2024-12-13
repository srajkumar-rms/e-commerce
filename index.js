import express from 'express'
import ProductController from './src/controllers/product.controller.js'
import UserController from './src/controllers/user.controller.js'
import ejsLayout from 'express-ejs-layouts'
import path from 'path'
import validationMiddleware from './src/middlewares/validation.middleware.js'
import {auth} from './src/middlewares/auth.middleware.js'
import {uploadFile} from './src/middlewares/file-upload.middleware.js'
import session from 'express-session'

const server = express()

server.use(express.static('public'))
server.use(session({
    secret: 'smellykat',
    name: 'smellykat-session',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    }
}))
const productController = new ProductController()
const userController = new UserController()

server.use(ejsLayout)
server.use(express.urlencoded({extended: true}))
server.set('view engine', 'ejs')
server.set('views', path.join(path.resolve(),'src','views'))

server.use(express.static('src/views'))

server.get('/', auth, productController.getProducts)
server.get('/add-product', auth, productController.getAddForm)
server.get('/update-product/:id', auth, productController.getUpdateProductView)

server.post('/delete-product/:id', auth, productController.postDeleteProduct)
server.post('/add-product',auth, uploadFile.single('imageUrl'),validationMiddleware, productController.addNewProduct)
server.post('/update-product',auth, uploadFile.single('imageUrl'),validationMiddleware, productController.postUpdateProduct)

server.get('/register',userController.getRegister)
server.get('/login',userController.getLogin)
server.get('/logout', userController.logout)

server.post('/register', userController.postRegister)
server.post('/login', userController.postLogin)



server.listen(3000,()=>{
    console.log('server listening on port 3000');
    
})