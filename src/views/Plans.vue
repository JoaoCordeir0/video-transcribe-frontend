<template>
    <section class="hero-section d-flex justify-content-center align-items-center" id="section_1">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-12 mx-auto">
                    <h1 class="text-white text-center">Nossos planos</h1>
                    <h6 class="text-center">Gere resumos e legendas em vários idiomas</h6>
                </div>
            </div>
        </div>
    </section>

    <section class="featured-section">
        <div class="container">
            <div class="row justify-content-center">
                <div v-for="(item, index) in plans" class="col-lg-4 col-12 mb-4 mb-lg-0">
                    <div class="custom-block bg-white shadow-lg">
                        <a href="#">
                            <div class="d-flex">
                                <div class="w-100">
                                    <h5 class="mb-2">{{ item.title }}</h5>                                    
                                    <p class="mb-0" v-html="item.description"></p>
                                    <p v-if="index != 0" class="mt-2"><b>R$ <i>{{ item.price }}.00</i></b></p>
                                    <p v-else class="mt-2"><b>Gratuito</b></p>
                                    <p v-if="index != 0" class="mt-0">Válido por 30 dias</p>
                                    <div class="d-flex justify-content-center">
                                        <button v-if="index != 0" class="btn btn-success"><i class="bi bi-cash-stack"></i> <b>Comprar</b></button>
                                    </div>
                                </div>                
                                <span class="badge bg-design rounded-pill ms-auto">{{ index + 1 }}</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { callApiPlans } from '../hooks/usePlan';

export default defineComponent({
    setup(){
        const plans = ref()
        
        return {
            plans
        }
    }, 
    methods: {             
        async loadPlans() {
            const result = await callApiPlans()
            this.plans = result['data']
        },
    },  
    beforeMount() {        
        this.loadPlans()
    },
    components: {        
          
    },
})
</script>