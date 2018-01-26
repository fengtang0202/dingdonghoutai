import axios from 'axios'
export const requestList=(url,params)=>{
    axios.post(url,{...params})
}
