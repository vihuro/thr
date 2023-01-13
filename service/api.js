import axios from 'axios';


export const  api = axios.create({
    baseURL: 'https://localhost:7157/api',
    

});

api.interceptors.request.use((request) => {

    const token = localStorage.getItem("TOKEN");
    
    if(token) {
        request.headers.Authorization = `Bearer ${token}`;
    }
    return request; 
});



export default api;