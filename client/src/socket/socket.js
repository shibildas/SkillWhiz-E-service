import io from "socket.io-client"
import { baseUrl } from "../constants/constants"
const socket = io.connect(baseUrl)
export default socket