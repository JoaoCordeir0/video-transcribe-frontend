<template>
    <section class="hero-section d-flex justify-content-center align-items-center" id="section_1">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-12 mx-auto">
                    <h1 class="text-white text-center">Transcreva seus vídeos</h1>
                    <h6 class="text-center">Gere resumos e legendas em vários idiomas</h6>
                    <nav>
                        <div class="nav nav-tabs" id="nav-tab" role="tablist">
                            <button class="nav-link active" id="nav-upload-tab" data-bs-toggle="tab" data-bs-target="#nav-upload" type="button" role="tab" aria-controls="nav-upload" aria-selected="true">Upload</button>
                            <button class="nav-link" id="nav-link-tab" data-bs-toggle="tab" data-bs-target="#nav-link" type="button" role="tab" aria-controls="nav-link" aria-selected="false">Link</button>
                        </div>
                    </nav>
                    <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane fade show active" id="nav-upload" role="tabpanel"
                            aria-labelledby="nav-upload-tab">
                            <form class="custom-form mt-4 mb-lg-0 mb-5" role="search" @submit.prevent="sendFile">
                                <div class="input-group input-group-lg">
                                    <input name="input-file" type="file" @change="onFileChange" class="form-control" id="input-file" required>
                                    <button type="submit" class="form-control">Enviar</button>
                                </div>
                            </form>
                        </div>
                        <div class="tab-pane fade" id="nav-link" role="tabpanel" aria-labelledby="nav-link-tab">
                            <form class="custom-form mt-4 mb-lg-0 mb-5" role="search" @submit.prevent="sendLink">
                                <div class="input-group input-group-lg">
                                    <span class="input-group-text bi-search" id="basic-addon1"></span>

                                    <input v-model="link" name="input-link" type="search" class="form-control" id="input-link" placeholder="https://www.youtube.com/watch?v=tHK5DnOPzI8" aria-label="Search" accept=".mp4" required>
                                    <button type="submit" class="form-control">Procurar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="featured-section">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-4 col-12 mb-4 mb-lg-0">
                    <div class="custom-block bg-white shadow-lg">
                        <a href="#">
                            <div class="d-flex">
                                <div class="d-block">
                                    <div>
                                        <h5 class="mb-2">Resumos</h5>
                                        <p class="mb-0">Transcreva seu vídeo e opte por resumos com nossa ferramenta</p>
                                    </div>
                                    <div class="mt-5">
                                        <h5 class="mb-2">Legendas</h5>
                                        <p class="mb-0">Gere legendas de qualidade para seus vídeos</p>
                                    </div>
                                </div>                    
                                <span class="badge bg-design rounded-pill ms-auto">01</span>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-lg-6 col-12">
                    <div class="custom-block custom-block-overlay">
                        <div class="d-flex flex-column h-100">
                            <img src="transcricao-de-audio.png" class="custom-block-image img-fluid" alt="">
                            <div class="custom-block-overlay-text">          
                                <h5 class="mb-2 text-white bold">Pŕevia dos meus vídeos</h5>
                                
                                <div v-if="loading">
                                    <Loading/>
                                </div>                                                                                      
                                <div v-if="issetTranscribes()" v-for="(item, index) in my_transcribes">
                                    <div class="mb-0 bg-light rounded p-2 fs-6 mb-2 video-item">    
                                        <a v-if="item.progress == 100" :href="'/video/' + item.id" class="text-secondary">
                                            <span>{{ item.video_name }} <i class="bi bi-arrow-up-right-square-fill"></i></span>    
                                        </a>  
                                        <a v-else href="#" class="text-secondary">
                                            <span>{{ item.video_name }}</span>    
                                        </a>                                                                       
                                        <span class="float-end text-secondary">
                                            <span v-if="item.progress == 100">100% ✅</span>
                                            <span v-else-if="item.progress == -1">Erro ❌</span>
                                            <span v-else>{{ item.progress }}% 🌀</span>                                            
                                        </span>
                                    </div>                                   
                                </div>
                                <div v-else>
                                    <p class="mb-0 bg-light rounded p-2 fs-6 mb-2">
                                        Nenhum histórico disponível
                                    </p>
                                </div>                                
                            </div>
                            <div class="section-overlay"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { callApiMyTranscribes, getUserID, getUserToken } from '../hooks/useUser';
import { callApiTranscribeFile } from '../hooks/useFile';
import { Toast } from '../hooks/useToast';
import Loading from '../components/Loading.vue';

export default defineComponent({
    setup(){
        const my_transcribes = ref()
        const file = ref()        
        const link = ref("")
        const loading = ref(false)

        return {
            my_transcribes,
            file,
            link,
            loading,
        }
    }, 
    methods: {             
        onFileChange(event) {                 
            const now = new Date()
            let currentMilliseconds = now.getMilliseconds()                           

            const file = event.target.files[0]                 
            if (file) {                            
                const newFileName = `${currentMilliseconds}-${file.name}`
                this.file = new File([file], newFileName, {
                    type: file.type,
                    lastModified: file.lastModified
                })     
            }           
        },
        async sendFile() {
            let userID = getUserID()

            if (userID == undefined) {
                var modalLogin = document.getElementById('btn-show-modal-login');
                modalLogin?.click()
                return
            }
            
            this.loading = true
            const result = await callApiTranscribeFile(userID, this.file)
            
            if (result.status == 'success') {
                Toast().fire({ icon: 'success', title: `Processo iniciado` })                
            } else {
                Toast().fire({ icon: 'error', title: 'Erro ao realizar tarefa, tente mais tarde!' })
            }
            
            var loop = setInterval(async () => {      
                await this.loadTranscribes()
                this.loading = false
                let flag = true
                this.my_transcribes.forEach(element => {
                    if (element.progress < 100) {
                        flag = false
                    }
                })
                if (flag) {
                    clearInterval(loop)
                }
            }, 5 * 1000); // A cada 5 segundos
        },
        async sendLink() {
            
        },
        async loadTranscribes() {
            if (getUserToken() != undefined) {
                const result = await callApiMyTranscribes()
                this.my_transcribes = result['data'].slice(0, 5)
                return result['data'][0]['progress']
            }
            return 0
        },
        issetTranscribes() {
            try {
                return Object.keys(this.my_transcribes).length
            } catch {
                return false
            }            
        }
    },  
    beforeMount() {        
        this.loadTranscribes()
    },
    components: {                
        Loading
    },
})
</script>