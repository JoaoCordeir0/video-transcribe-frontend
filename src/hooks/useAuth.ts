import axios from 'axios';

const endpointUrl = import.meta.env.VITE_URL_API

export async function apiLogin(email, password) {

    localStorage.clear()

    var params = {
        'email': email,
        'password': password
    } 

    const { data } = await axios.post(`${endpointUrl}/user/login`, params)

    if (data.access_token != undefined) 
    {       
        localStorage.clear()        
        localStorage.setItem('user-id', data.user.id)     
        localStorage.setItem('user-name', data.user.name)     
        localStorage.setItem('user-email', data.user.email)             
        localStorage.setItem('user-plan-name', data.user.plan.title)             
        localStorage.setItem('user-plan-validity', data.user.plan.validity)             
        localStorage.setItem('user-token', data.access_token)     
        localStorage.setItem('user-auth-day', (new Date()).getDate().toString())        
    }

    return data
}

export function auth(to, from, next) {
    const token = localStorage.getItem('user-token') != undefined    
    token ? next() : next('/login')    
}

export function userLoggedIn() {
    let user_id = localStorage.getItem('user-id')     
    let user_token = localStorage.getItem('user-token')     

    if (user_id != undefined && user_token != undefined) {
        return true
    }
    return false
}

export async function credentials() {
    let url = String(endpointUrl)
    let token = String(localStorage.getItem('user-token'))
    let authBearer = {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`,
    }
    let authBearer2 = {
        'Content-Type': 'multipart/form-data',
        'Authorization' : `Bearer ${token}`,
    }
    return {
        url,
        token,
        authBearer,
        authBearer2,
    }
}
