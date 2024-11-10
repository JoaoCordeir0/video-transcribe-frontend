import axios from 'axios';
import { ref } from 'vue';
import { credentials } from './useAuth';

const api = await credentials()

export function getUserID() { 
    return localStorage.getItem('user-id')
}

export function getUserName() { 
    return localStorage.getItem('user-name')
}

export function getUserEmail() { 
    return localStorage.getItem('user-email')
}

export function getUserPlan() { 
    return localStorage.getItem('user-plan-name')
}

export function getUserToken() {
    return localStorage.getItem('user-token')
}

export async function callApiMyTranscribes() {
    try {
        const { data } = await axios.get(`${api.url}/transcribes`, {
            headers: api.authBearer2
        })
        return data
    } catch {
        return 'error'
    }    
}

export async function callApiMyTranscribe(id) {
    try {
        const { data } = await axios.get(`${api.url}/transcribe/${id}`, {
            headers: api.authBearer2
        })
        return data
    } catch {
        return 'error'
    }    
}

export async function callUpdatePlan(plan_id: number) {
    try {
        const { data } = await axios.post(`${api.url}/user/update-plan`, {
            plan_id,
            user_id: getUserID()
        })
        return data;
    } catch {
        return 'error'
    }
}

export async function updateUserPlan() {
    try {
        const { data } = await axios.get(`${api.url}/user/update-plan/${getUserID()}`, {
            headers: api.authBearer2
        })
        localStorage.setItem('user-plan-name', data.title)
        return data
    } catch {
        return 'error'
    }
}
