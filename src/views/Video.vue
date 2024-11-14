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
            <div class="row justify-content-center rounded">
                <div class="col-12 p-2 bg-white rounded pt-2">
                    <p><b>Nome do video:</b> {{ video_name }}</p>
                    <p><b>Transcrição:</b> {{ video_transcribe }}</p>
                    <p><b>Resumo:</b> {{ video_summary }}</p>
                    <p><b>Legendas: </b> 
                        <div v-for="item in video_subtitles" class="subtitles rounded p-2 mb-2">
                            <span class="bg-light me-2 px-2 rounded text-subtitle-time"> {{ item.start }}s </span>
                            <span class="bg-light me-2 px-2 rounded text-subtitle-time"> {{ item.end }}s </span>
                            <span class="text-white text-subtitle-content"> {{ item.content }} </span>
                        </div>
                        <button class="btn btn-secondary" v-on:click="downloadVtt(video)">Baixar legenda em .vtt</button>
                    </p>
                </div>                

                <div class="col-12 bg-white rounded mt-4 pt-2" v-for="item in videos_plus">
                    <p><b>Transcrição em "{{ item.language.toUpperCase() }}":</b> {{ item.transcribe }}</p>
                    <p><b>Resumo em "{{ item.language.toUpperCase() }}":</b> {{ get_summary_by_lang(item.language) }}</p>
                    <p><b>Legendas em "{{ item.language.toUpperCase() }}": </b> 
                        <div v-for="item in JSON.parse(item.segments)" class="subtitles rounded p-2 mb-2">
                            <span class="bg-light me-2 px-2 rounded text-subtitle-time"> {{ item.start }}s </span>
                            <span class="bg-light me-2 px-2 rounded text-subtitle-time"> {{ item.end }}s </span>
                            <span class="text-white text-subtitle-content"> {{ item.content }} </span>
                        </div>
                    </p>
                    <button class="btn btn-secondary mb-4" v-on:click="downloadVttPlus(item.id)">Baixar legenda em .vtt</button>
                </div>                
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { callApiMyTranscribe, downloadVttApi, downloadVttPlusApi} from '../hooks/useUser';
import { callApiSummary } from '../hooks/useFile';

export default defineComponent({
    setup(){
        const video = ref()
        const video_name = ref()
        const video_transcribe = ref()
        const video_summary = ref('Processando resumo...')
        const video_subtitles = ref()
        const other_languages = ref(false)
        const videos_plus = ref()
        const summarys = ref()
        
        return {
            video,
            video_name,
            video_transcribe,
            video_summary,
            video_subtitles,
            other_languages,
            summarys,
        }
    }, 
    methods: {             
        async loadVideo() {
            const result = await callApiMyTranscribe(this.$route.params.id)            
            const data = result['data']     
            this.video = data.video.id       
            this.video_name = data.video.video_name
            this.video_transcribe = data.video.transcribe
            this.video_subtitles = JSON.parse(data.video.segments)

            if (data.videos_plus) {
                this.other_languages = true
                this.videos_plus = data.videos_plus
                await this.get_summary_plus(data.videos_plus)
            }
        
            this.video_summary = await this.get_summary(data.video.transcribe)
        },
        async get_summary(text) {
            const result = await callApiSummary(text)
            return result['summary_text']
        },
        async get_summary_plus(videos) {
            let summarys_list = []
            // videos.forEach(async element => {
            //     summarys_list.push({
            //         lang: element.language,
            //         summary: (await callApiSummary(element.transcribe))['summary_text']
            //     })
            // });
            this.summarys = summarys_list
        },
        get_summary_by_lang(lang) {
            let summary = ''
            this.summarys.forEach(element => {
                if (element.lang == lang) {
                    summary = element.summary
                }
            });
            return summary
        },
        async downloadVtt(id) {
            const result = await downloadVttApi(id)
            console.log(result)
        },
        async downloadVttPlus(id) {
            const result = await downloadVttPlusApi(id)
        }
    },  
    beforeMount() {        
        this.loadVideo()
    },
    components: {        
          
    },
})
</script>