import axios from 'axios';
import { credentials } from './useAuth';

const api = await credentials()

export async function callApiPlans() {    
    try {
        const { data } = await axios.get(`${api.url}/plans`)
        return data
    } catch {
        return 'error'
    }    
}