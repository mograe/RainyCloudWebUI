import io from "socket.io-client"

function VideoServer(url) {
    this.url = url
    socket = io.connect(url)
}