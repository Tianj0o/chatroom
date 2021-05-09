function useWebSocket(handleMessage){

    const ws = new WebSocket('ws://localhost:3040')
    const init = ()=>{
       bindEvent()
    }
    function bindEvent(){
        ws.addEventListener('open',(e)=>{
            // console.log('open',e)
        })
        ws.addEventListener('error',(e)=>{
            console.log('error',e)
        })
        ws.addEventListener('close',(e)=>{
            console.log('close',e)
        })
        ws.addEventListener('message',handleMessage)
    }

    init()
    return ws
}

export default useWebSocket