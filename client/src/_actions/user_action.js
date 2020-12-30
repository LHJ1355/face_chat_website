import axios from 'axios'

function auth(){
    const req = axios.get(`/auth`, 
    {
        headers:{
        'Content-Type': 'application/json',
        'token': window.localStorage.getItem("token")
        }
    })
    .then(res => res.data)
    .catch(err => console.log(err));

    return {
        type : "AUTH_USER",
        payload : req
    }
}

export {auth}