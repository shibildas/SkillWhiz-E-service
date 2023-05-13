import io from "socket.io-client"
const socket = io.connect({ path: '/socket' })
export default socket