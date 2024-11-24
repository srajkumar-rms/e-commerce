import express from 'express'

const server = express()

server.get('/', (req,res)=>{
    return res.send('Welcome')
})

server.listen(3000)