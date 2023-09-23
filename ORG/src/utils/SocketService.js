import io from 'socket.io-client'
const Socket_URL="http://127.0.0.1:3000"
 



console.log("Socket Service is here running here down below in the classs")
class wSService{
    
    initialzeSocket = async()=>{
        try {

            console.log("Wss service  is here loaded in this file below = ")
            this.socket=io(Socket_URL,{
                transports:['websocket']
            })
            console.log('connect',this.socket)
            this.socket.on('connect',(data )=>{
                console.log("===select connected ===",data)
            })

            this.socket.on('disconnect',(data )=>{
                console.log("===select disconnected ===",data)
            })
            this.socket.on('error',(data )=>{
                console.log("socket error",data)
            })
        } catch (error) {
            console.log("its an error")
        }
 

    }
    emit(event,data={}){
        this.socket.emit(event,data)
    }

    on(event,cb){
        this.socket.on(event,cb)
    }
    removeListener(event,data={}){
        // Remove this event will be dealt later 

    }




}

const socketServices=new wSService
export default socketServices;