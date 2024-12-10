import express from 'express'
import ProductController from './src/controllers/product.controller.js'

const server = express()
const productController = new ProductController()
server.use(express.static('src/views'))

server.get('/', productController.getProducts)

server.listen(3000,()=>{
    console.log('server listening on port 3000');
    
})