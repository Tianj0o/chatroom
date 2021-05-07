module.exports = app => {

    const express = require('express')

    const router = express.Router()
    //创建子路由
    
    const user = require('../model/user')
    const msg = require('../model/msg')
    router.post('/user',async (req,res)=>{
     const model = await user.create(req.body)
     console.log(req.body)
     res.send(model)
    })
    router.post('/msg',async(req,res)=>{
        const model = await msg.create(req.body)
        console.log(req.body)
        res.send(model)
    })
    router.get('/msg',async (req,res) =>{
        const model = await msg.find()
        res.send(model)
    })
    app.use('/chatroom/api',router)
}