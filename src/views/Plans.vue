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
                        <div class="d-flex">
                            <div class="w-100">
                                <h5 class="mb-2">{{ item.title }}</h5>
                                <div class="mb-0 text-sm" v-html="item.description"></div>
                                <p v-if="index != 0" class="mt-2"><b>R$ <i>{{ item.price }}.00</i></b></p>
                                <p v-else class="mt-2"><b>Gratuito</b></p>
                                <p v-if="index != 0" class="mt-0">Válido por 30 dias</p>
                                <div class="d-flex justify-content-center">
                                    <button v-if="index != 0" class="btn btn-success" @click="() => showModal(item.price)"><i class="bi bi-cash-stack"></i>
                                        <b>Comprar</b></button>
                                </div>
                            </div>
                            <span class="badge bg-design rounded-pill ms-auto">{{ index + 1 }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

<ElDialog v-model="dialogVisible" title="Gerar código pix" :append-to-body="true">
                    <div v-if="loading">
                </div>
                <div v-else>
                    <!-- Exibe o QR Code -->
                    <QrCodeVue :value="pixCopiaECola" :size="200" v-if="pixCopiaECola" />

                    <!-- Exibe o código PIX copia e cola -->
                    <div v-if="pixCopiaECola" class="pix-code">
                    <p><strong>PIX Copia e Cola:</strong></p>
                    <el-input v-model="pixCopiaECola"></el-input>
                    <el-button icon="el-icon-document-copy" @click="">
                        Copiar
                    </el-button>
                    </div>
                </div>

                <span slot="footer" class="dialog-footer">
                    <el-button @click="$emit('toggleDialog')">Fechar</el-button>
                </span>
                </ElDialog>

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { callApiPlans } from '../hooks/usePlan';
import { ElButton, ElDialog, ElInput } from 'element-plus';
 import  QrCodeVue from 'qrcode.vue';
import axios from 'axios';

export default defineComponent({
    setup(){
        const plans = ref()
        const  dialogVisible= ref(false);
        const loading = ref(true);
        const pixCopiaECola = ref('');
        return {
            plans,
            dialogVisible,
            loading,
            pixCopiaECola
        }
    },
    methods: {
        async loadPlans() {
            const result = await callApiPlans()
            this.plans = result['data']
        },

        async getPix(price: number) {
            const result = await axios.post("http://localhost:8080" + '/create-pix', {
                "user_id": 1,
                "plan": {
                    "id": 0,
                    "amount": Math.round(price)+`.00`
                }
            })
            console.log('PIX: ' + result.data)

            this.loading = false;
            this.pixCopiaECola = result.data;
        },

        showModal(price: number) {
            this.getPix(price);

            this.dialogVisible = true;
        }
    },
    beforeMount() {
        this.loadPlans()
    },
    components: {
        ElDialog,
        ElInput,
        ElButton,
        QrCodeVue
    },
})
</script>
