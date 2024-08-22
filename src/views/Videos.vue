<template>
    <section class="hero-section d-flex justify-content-center align-items-center" id="section_1">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-12 mx-auto">
                    <h1 class="text-white text-center">Seus vídeos</h1>         
                    <h6 class="text-center">Clique sobre os vídeos para obter os detalhes</h6>           
                </div>
            </div>
        </div>
    </section>

    <section class="featured-section">
        <div class="container">            
            <div class="row justify-content-center bg-white rounded p-3 mb-2" v-if="issetVideos()" v-for="(item, index) in videos">              
                <div class="col-4">
                    <a v-if="item.progress == 100" :href="'/video/' + item.id" class="text-secondary">
                        <span>{{ item.video_name }} <i class="bi bi-arrow-up-right-square-fill"></i></span>    
                    </a>  
                    <a v-else href="#" class="text-secondary">
                        <span>{{ item.video_name }}</span>    
                    </a>                                                                       
                </div>
                <div class="col-6">
                    <div class="progress">
                        <div class="progress-bar progress-bar-striped" :class="(item.progress < 100 && item.progress > 0) ? 'progress-bar-animated' : '' + (item.progress == -1 ? 'bg-danger' : 'bg-success')" role="progressbar" :aria-valuenow="item.progress" aria-valuemin="0" aria-valuemax="100" v-bind:style="{ 'width': getProgress(item.progress) + '%' }">
                            {{ getProgress(item.progress) }}%
                        </div>
                    </div>
                </div>
                <div class="col-2">
                    <span class="float-end text-secondary">
                        <span v-if="item.progress == 100">100% ✅</span>
                        <span v-else-if="item.progress == -1">Erro ❌</span>
                        <span v-else>{{ item.progress }}% 🌀</span>
                    </span>
                </div>                                                                   
            </div>
            <div v-else class="row justify-content-center bg-white rounded p-3">
                <p class="mb-0 rounded p-2 fs-6">
                    Nenhum vídeo disponível
                </p>
            </div>      
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { callApiMyTranscribes } from '../hooks/useUser';
import Loading from '../components/Loading.vue';

export default defineComponent({
    setup(){
        const videos = ref()        
        const loading = ref()
        
        return {
            videos,          
            loading,  
        }
    }, 
    methods: {             
        async loadVideos() {
            await this.getVideos()
            var loop = setInterval(async () => {   
                try {
                    await this.getVideos()
                    this.loading = false
                    let flag = true
                    this.videos.forEach(element => {
                        if (element.progress < 100) {
                            flag = false
                        }
                    })
                    if (flag) {
                        clearInterval(loop)
                    }
                } catch {
                    clearInterval(loop)                    
                }                                
            }, 5 * 1000); // A cada 5 segundos                      
        },
        async getVideos() {
            this.loading = true
            const result = await callApiMyTranscribes()                        
            this.videos = result['data']  
            this.loading = false
        },
        issetVideos() {
            try {
                return Object.keys(this.videos).length
            } catch {
                return false
            }   
        },
        getProgress(progress) {
            if (progress == -1) {
                return 70
            } 
            return progress
        }
    },  
    beforeMount() {        
        this.loadVideos()
    },
    components: {        
        Loading
    },
})
</script>