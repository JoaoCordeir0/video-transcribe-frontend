<template>
    <section class="hero-section d-flex justify-content-center align-items-center" id="section_1">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-12 mx-auto">
                    <h1 class="text-white text-center">Detalhes para utilizar a API</h1>                    
                </div>
            </div>
        </div>
    </section>

    <section class="featured-section">
        <div class="container">
            <div class="row justify-content-center rounded">
                <div class="col-12 p-2 bg-white rounded p-4">
                    <p><b>Suas credenciais</b></p>
                    <ul>
                        <li>url: {{url}}</li>
                        <li>user: {{ user }}</li>
                        <li>token: 
                            <input class="rounded" type="text" :value="token" id="token_api">
                            <button v-on:click="copyToken()" class="btn btn-primary ms-2">Copiar</button>
                        </li>
                    </ul>
                    <p><b>Exemplos de requisição com JavaScript</b></p>
                    <p class="text-sm">Criando um novo processo: </p>
                    <div class="bg-black rounded mt-0 px-4">
                        <code>const formData = new FormData()</code> <br>
                        <code>formData.append('user', user)</code> <br>
                        <code>if (typeof file == "object") {</code> <br>
                        <code>&nbsp;&nbsp;&nbsp;&nbsp;formData.append('file', file)</code> <br>
                        <code>}</code> <br><br>
                        <code>const { data } = await axios.post(`${url}/transcribe/video-file`, formData, {</code> <br>
                        <code>&nbsp;&nbsp;&nbsp;&nbsp;headers: {</code> <br>
                        <code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'Authorization': `Bearer ${token}`, </code> <br>
                        <code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'Content-Type': 'multipart/form-data'</code> <br>
                        <code>&nbsp;&nbsp;&nbsp;&nbsp;}</code> <br>
                        <code>})</code> <br>
                    </div>
                    <br>
                    <p class="text-sm">Resgatando todos os processos: </p>
                    <div class="bg-black rounded mt-0 px-4">
                        <code>const { data } = await axios.post(`${url}/transcribes`, formData, {</code> <br>
                        <code>&nbsp;&nbsp;&nbsp;&nbsp;headers: {</code> <br>
                        <code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'Authorization': `Bearer ${token}`, </code> <br>
                        <code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'Content-Type': 'application/json'</code> <br>
                        <code>&nbsp;&nbsp;&nbsp;&nbsp;}</code> <br>
                        <code>})</code> <br>
                    </div>
                    <br>
                    <p class="text-sm">Resgatando um processo específico: </p>
                    <div class="bg-black rounded mt-0 px-4">
                        <code>const { data } = await axios.post(`${url}/transcribe/{id}`, formData, {</code> <br>
                        <code>&nbsp;&nbsp;&nbsp;&nbsp;headers: {</code> <br>
                        <code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'Authorization': `Bearer ${token}`, </code> <br>
                        <code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'Content-Type': 'application/json'</code> <br>
                        <code>&nbsp;&nbsp;&nbsp;&nbsp;}</code> <br>
                        <code>})</code> <br>
                    </div>
                </div>                           
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { callApiMyTranscribe } from '../hooks/useUser';
import { Toast } from '../hooks/useToast';
import { callApiSummary } from '../hooks/useFile';

export default defineComponent({
    setup(){
        const url = import.meta.env.VITE_URL_API
        const user = localStorage.getItem('user-id')
        const token = localStorage.getItem('user-token')

        return {
            url,
            user,
            token
        }
    }, 
    methods: {
        copyToken() {
            const texto = document.getElementById("token_api").value;

            navigator.clipboard.writeText(texto)
            .then(() => {
                Toast().fire({ icon: "success", text: "Token copiado para a área de transferência!" })
            })
            .catch(err => {
                Toast().fire({ icon: "error", text: "Erro ao copiar!" })
            });
        }
    }
})
</script>