import Config from "../common/Config";
import { io } from "socket.io-client";

class SocketApis {

    socket;
    tempIds = {}

    constructor() {
        this.socket = io(Config.apiSocketUrl, {
            transports: ["websocket"],
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 3000,
            randomizationFactor: 0,
            reconnectionAttempts: Infinity
        })

        let self = this;
        this.socket.on('connect', () => {
            console.log('Socket connected')
        })

        this.socket.on('reconnect', function (attempt) {
            console.log(`Socket reconnect attempt ${attempt}`)
            // ReConnect Notification
            for (let key in self.tempIds) {
                self.subscribe(key)
            }
        })
        this.socket.on('reconnect_error', function (err) {
            console.log(`Socket reconnect error ${err}`)
        })
        this.socket.on('reconnect_failed', function () {
            console.log(`Socket reconnect failed`)
        })
    }

    subscribe(id) {
        this.socket.emit('subscribe', id)

        // Save Temp Ids
        if (id in this.tempIds === false) {
            this.tempIds[id] = true
        }
    }

    unSubscribe(id) {
        this.socket.emit('unSubscribe', id)
        // Delete Temp Ids
        delete this.tempIds[id]
    }

    getSocketData(id, cb) {
        this.socket.on((data) => {
            console.log(data)
            // cb(date)
        })
    }

}

export default new SocketApis();