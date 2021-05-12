
const express = require('express')
const app = express()
// app.use(require('cors')())

// app.use('/',express.static(__dirname+'/dist'))


app.use(require('cors')())
//支持跨域请求

app.use(express.json())

//处理数据中间件

require('./mongoose/db')(app)

require('./routes/index')(app)

require('./routes/music')(app)

app.use('/chatroom',express.static(__dirname+'/chatroom'))
const Ws = require('ws')
app.listen(3041,()=>{
    console.log('监听3041端口')
})




const Server = new Ws.Server({
    port:3040
})
;(function(server){

    const init = ()=>{
        bindEvent()
    }

    function bindEvent(){
        server.on('open',()=>{
            console.log('open')
        })
        server.on('close',()=>{
            console.log('close')
        })
        server.on('error',()=>{
            console.log('error')
        })
        server.on('connection',(ws)=>{
            console.log('connection')
            ws.on('message',(data)=>{
                // console.log(data)
                server.clients.forEach((c)=>{
                // if(c!==ws){
                c.send(data)
                // }
            }
                )
            })
        })
    }

    init()

})(Server)

