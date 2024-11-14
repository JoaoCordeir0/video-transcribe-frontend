<template>
    <ElDialog v-model="showModal" :append-to-body="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body" id="modal-body-logged-out">
                    <div class="">
                        <h3 class="text-center text-sm">Preencha o formulário a seguir para se cadastrar</h3>
                    </div>
                    <form @submit.prevent="register" class="custom-form contact-form mt-5">
                        <div class="col-lg-12 col-md-6 col-12">
                            <div class="form-floating">
                                <input type="text" name="name" id="name" v-model="nome" class="form-control"
                                    placeholder="Nome" required>
                                <label for="floatingInput">Nome</label>
                            </div>
                        </div>
                        <div class="row d-flex">
                            <div class="col-lg-12 col-md-6 col-12">
                                <div class="form-floating">
                                    <input type="email" pattern="[^ @]*@[^ @]*" v-model="email" name="email" id="email"
                                        class="form-control" placeholder="E-mail" required>
                                    <label for="floatingInput">E-mail</label>
                                </div>
                            </div>

                            <div class="col-lg-12 col-md-6 col-12">
                                <div class="form-floating">
                                    <input type="password" name="password" id="password" v-model="password"
                                        class="form-control" placeholder="" required>
                                    <label for="floatingInput">Senha</label>
                                </div>
                            </div>

                            <div class="col-lg-4 col-12 ms-auto m-auto">
                                <button type="submit" class="form-control">Cadastrar-se</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </ElDialog>
</template>

<script lang="ts">
import axios from 'axios';
import { ElDialog } from 'element-plus';
import { ref } from 'vue';
import { credentials } from '../hooks/useAuth';
import { Toast } from '../hooks/useToast';
import { TOGGLE_DIALOG, useEventBus } from '../hooks/useEventBus';

 export default {
     setup() {
        let password = ref('');
        let email = ref('');
        let nome = ref('');
        let showModal = ref(false);

         return {
             nome,
             email,
             password,
             showModal
         }

     },
     methods: {
         async register() {
             const api = await credentials();
             const data: any = {
                 email: this.email,
                 password: this.password,
                 name: this.nome,
                 plan: 1, // Sempre inicia como plano grátis
                 validity: "2024-01-01"
             };

             axios.post(`${api.url}/user/register`, data);
             Toast().fire({ icon: "success", text: "Cadastro realizado com sucesso" })
         },

         toggle() {
             this.showModal = !this.showModal
         }
     },
     components: {
         ElDialog
     },
     beforeMount() {
         const { on } = useEventBus();
         on(TOGGLE_DIALOG, this.toggle);
     }

 }
</script>
