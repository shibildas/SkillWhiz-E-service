import axios from "axios";

const instance = axios.create()

instance.interceptors.request.use(
function(config){

},
function(error){

}

)

instance.interceptors.response.use(
    function(response){

    }
    ,
    function(error){
        
    }
)
