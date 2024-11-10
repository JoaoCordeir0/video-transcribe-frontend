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
                                    <button v-if="index != 0" class="btn btn-success"
                                        @click="() => showModal(item.price, index)"><i class="bi bi-cash-stack"></i>
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


    <RegisterModal v-if="!loggedIn" @close="handleClose"/>
    <PaymentModal v-else :loading="loading" :pix-code="pixCopiaECola" />

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { callApiPlans } from '../hooks/usePlan';
import axios from 'axios';
import { userLoggedIn } from '../hooks/useAuth';
import PaymentModal from '../components/PaymentModal.vue';
import RegisterModal from '../components/RegisterModal.vue';
import { callUpdatePlan, updateUserPlan } from '../hooks/useUser';
import { TOGGLE_DIALOG, useEventBus, USER_UPDATE } from '../hooks/useEventBus';
import { reactive } from 'vue';

export default defineComponent({
    setup(){
        const plans = ref()
        const  dialogVisible= reactive({value: false});
        const registerShow = ref(false);
        const loading = ref(true);
        const pixCopiaECola = ref('');
        const loggedIn = userLoggedIn();
        return {
            registerShow,
            plans,
            dialogVisible,
            loading,
            pixCopiaECola,
            loggedIn
        }
    },
    methods: {
        async loadPlans() {
            const result = await callApiPlans()
            this.plans = result['data']
        },

        async getPix(price: number) {
            const result = await axios.post("http://localhost:8081" + '/create-pix', {
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

        async showModal(price: number, plan_id: number) {
            const { emit } = useEventBus();
            if(userLoggedIn()) {
                this.getPix(price);
                emit(TOGGLE_DIALOG as never);
                await callUpdatePlan(plan_id+1);
                await updateUserPlan();
                emit(USER_UPDATE);
            }
            else {
                console.log("Registre-se")
                emit(TOGGLE_DIALOG as never);
            }

        },
        handleClose() {
            this.dialogVisible.value = true;
        }
    },
    beforeMount() {
        this.loadPlans()
    },
     components: {
         PaymentModal,
         RegisterModal
     }
})
</script>
