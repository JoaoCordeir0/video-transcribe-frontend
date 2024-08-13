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
