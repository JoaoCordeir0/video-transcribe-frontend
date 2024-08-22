<template>
    <section class="hero-section d-flex justify-content-center align-items-center" id="section_1">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-12 mx-auto">
                    <h1 class="text-white text-center">Detalhes do seu vídeo</h1>                    
                </div>
            </div>
        </div>
    </section>

    <section class="featured-section">
        <div class="container">
            <div class="row justify-content-center bg-white rounded">
                <div class="col-12 p-2">
                    <p><b>Nome do video:</b> {{ video_name }}</p>
                    <p><b>Transcrição:</b> {{ video_transcribe }}</p>
                    <p><b>Legendas:</b> {{ video_subtitles }}</p>
                </div>                
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { callApiMyTranscribe } from '../hooks/useUser';

export default defineComponent({
    setup(){
        const video = ref()
        const video_name = ref()
        const video_transcribe = ref()
        const video_subtitles = ref()
        
        return {
            video,
            video_name,
            video_transcribe,
            video_subtitles,
        }
    }, 
    methods: {             
        async loadVideo() {
            const result = await callApiMyTranscribe(this.$route.params.id)            
            const data = result['data']            
            this.video_name = data.video.video_name
            this.video_transcribe = data.video.transcribe
            this.video_subtitles = data.video.segments
        },
    },  
    beforeMount() {        
        this.loadVideo()
    },
    components: {        
          
    },
})
</script>