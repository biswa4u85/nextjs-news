import { createClient } from 'redis';
import axios from 'axios';
import { Server } from "socket.io";
import Config from "../../common/Config";
const redisClient = createClient({ url: Config.redisUrl });

function apiScoreCalls(path) {
    const options = {
        method: 'GET',
        url: `${Config.rapidAPIUrl}/${path}`,
        headers: {
            'X-RapidAPI-Key': Config.rapidAPIKey,
            'X-RapidAPI-Host': Config.rapidAPIHost
        }
    };
    return axios.request(options).then((response) => {
        return response.data.results
    }).catch((error) => {
        return { 'status': "error", 'data': error?.message }
    });
}

let io;
export default async (req, res) => {
    if (res.socket.server.io) {
        console.log("Already set up");
        res.end();
        return;
    }

    io = new Server(res.socket.server)
    res.socket.server.io = io;
    await redisClient.connect();

    io.on("connection", (client) => {
        let allRooms = {}
        client.on("subscribe", async (eventID) => {
            console.log(eventID)
            client.join(eventID);
            allRooms[eventID] = true
            let checkKey = await redisClient.get(`fetch_${eventID}`)
            if (!checkKey) {
                await redisClient.set(`fetch_${eventID}`, "true");
            }
        })

        client.on("unSubscribe", (eventID) => {
            client.leave(eventID);
        })

        setInterval(async () => {
            for (let key in allRooms) {
                let size = io.sockets.adapter.rooms.get(key)?.size
                if (!size) {
                    redisClient.expire(`fetch_${key}`, 5)
                }
            }
        }, 2000)

    })

    setInterval(async () => {
        let allKey = await redisClient.keys(`*`)
        for (let key of allKey) {
            let value = key.split('_')
            if (value[0] === 'fetch') {
                let matchId = value[1]
                // let data = await apiScoreCalls(`match/${matchId}`)
                // io.to(matchId).emit(data);
            }
        }
    }, 5000)

    res.end();
};