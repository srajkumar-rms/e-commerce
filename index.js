import express from 'express'
import ProductController from './src/controllers/product.controller.js'
import path from 'path'

const productController = new ProductController()
const server = express()

server.set('view engine', 'ejs')
server.set('views', path.join(path.resolve(),'src','views'))

server.use(express.static('src/views'))

server.get('/', productController.getProducts)

server.listen(3000,()=>{
    console.log('server listening on port 3000');
    
})