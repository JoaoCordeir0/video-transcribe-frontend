<template>
    <section class="hero-section d-flex justify-content-center align-items-center" id="section_1">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-12 mx-auto">
                    <h1 class="text-white text-center">Transcreva seu vídeo</h1>
                    <h6 class="text-center">Gere resumos e legendas com essa ferramenta</h6>
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
                                <div>
                                    <h5 class="mb-2">Resumos</h5>
                                    <p class="mb-0">When you search for free CSS templates, you will notice that
                                        TemplateMo is one of the best websites.</p>
                                </div>
                                <span class="badge bg-design rounded-pill ms-auto">14</span>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-lg-6 col-12">
                    <div class="custom-block custom-block-overlay">
                        <div class="d-flex flex-column h-100">
                            <img src="businesswoman-using-tablet-analysis.jpg" class="custom-block-image img-fluid" alt="">
                            <div class="custom-block-overlay-text d-flex">
                                <div>
                                    <h5 class="text-white mb-2">Legendas</h5>

                                    <p class="text-white">Topic Listing Template includes homepage, listing page,
                                        detail page, and contact page. You can feel free to edit and adapt for your
                                        CMS requirements.</p>
                                </div>
                                <span class="badge bg-finance rounded-pill ms-auto">25</span>
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
import Spinner from '../components/Spinner.vue';
import { getUserID } from '../hooks/useUser';
import { callApiTranscribeFile } from '../hooks/useFile';

export default defineComponent({
    setup(){
        const file = ref()        
        const link = ref("")

        return {
            file,
            link,
        }
    }, 
    methods: {             
        onFileChange(event) {                 
            this.file = event.target.files[0]                  
        },
        async sendFile() {
            let userID = getUserID()
            const result = await callApiTranscribeFile(userID, this.file)
            console.log(result)
        },
        async sendLink() {
            
        },
    },  
    beforeMount() {        
        console.log('teste')
    },
    components: {        
        Spinner  
    },
})
</script>