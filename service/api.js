import axios from 'axios';


export const  api = axios.create({
    baseURL: 'http://10.10.11.113:9000/api',
    

});

api.interceptors.request.use((request) => {

    const token = localStorage.getItem("TOKEN");
    
    if(token) {
        request.headers.Authorization = `Bearer ${token}`;
    }
    return request; 
});



export default api;