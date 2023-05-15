import io from "socket.io-client"
const url = import.meta.env.VITE_LOCAL
const socket = io.connect(url)
export default socket