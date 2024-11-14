import axios from 'axios';
import { credentials } from './useAuth';

const api = await credentials()

export async function callApiTranscribeFile(user, file) {    
    try {
        const formData = new FormData()    
        formData.append('user', user)
        if (typeof file == "object") {                  
            formData.append('file', file)
        }     
        const { data } = await axios.post(`${api.url}/transcribe/video-file`, formData, {
            headers: api.authBearer2
        })
        return data
    } catch {
        return 'error'
    }    
}

export async function callApiSummary(text) {    
    try {   
        const { data } = await axios.post(`${api.url}/summary/generate`, {
            'text': text
        }, {
            headers: api.authBearer
        })
        return data
    } catch {
        return 'error'
    }    
}

