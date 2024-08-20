<template>
    <nav class="navbar navbar-expand-lg">
        <div class="container">
            <a class="navbar-brand" href="/">
                <i class="bi bi-camera-reels-fill"></i>
                <span class="title-tool"> Video Transcribe</span>
            </a>
            <div class="d-lg-none ms-auto me-4">
                <a href="#" class="navbar-icon bi-person smoothscroll" data-bs-toggle="modal" data-bs-target="#modalLogin"></a>
            </div>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
                
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-lg-5 me-lg-auto">
                    <li class="nav-item">
                        <a class="nav-link click-scroll" href="/">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link click-scroll" href="/plans">Plans</a>
                    </li>
                </ul>

                <div class="d-none d-lg-block">
                    <a href="#" class="navbar-icon bi-person smoothscroll" data-bs-toggle="modal" data-bs-target="#modalLogin"></a>
                </div>
            </div>
        </div>
    </nav>
    
    <div class="modal fade" id="modalLogin" tabindex="-1" aria-labelledby="modalLoginLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalLoginLabel"><i class="bi bi-person-circle"></i> Minha conta</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div v-if="userLogged" class="modal-body" id="modal-body-logged-in">
                    <p>User logado: <b>{{ userName }}</b></p>
                    <p>Email: <b>{{ userEmail }}</b></p>
                    <p>Plano atual: <b>{{ userPlan }}</b></p>
                    <p class="d-flex justify-content-center">
                        <button class="btn btn-warning p-2 px-5" v-on:click="logout()">Sair</button>
                    </p>
                </div>
                <div v-else class="modal-body" id="modal-body-logged-out">
                    <div class="">
                        <h3 class="text-center text-sm">Faça login</h3>
                    </div>
                    <form @submit.prevent="login" class="custom-form contact-form mt-5">
                        <div class="row d-flex">
                            <div class="col-lg-12 col-md-6 col-12">
                                <div class="form-floating">
                                    <input type="email" pattern="[^ @]*@[^ @]*" v-model="email" name="email" id="email" class="form-control" placeholder="E-mail" required>
                                    <label for="floatingInput">E-mail</label>
                                </div>
                            </div>

                            <div class="col-lg-12 col-md-6 col-12">
                                <div class="form-floating">
                                    <input type="password" name="password" id="password" v-model="password" class="form-control" placeholder="" required>
                                    <label for="floatingInput">Senha</label>
                                </div>
                            </div>

                            <div class="col-lg-4 col-12 ms-auto m-auto">
                                <button type="submit" class="form-control">Entrar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Modal from './Modal.vue';
import { apiLogin, userLoggedIn } from '../hooks/useAuth';
import { getUserEmail, getUserName, getUserPlan } from '../hooks/useUser';
import { Toast } from '../hooks/useToast';

export default defineComponent({

    setup() {
        const userLogged = ref(false)
        const userName = ref()
        const userEmail = ref()
        const userPlan = ref()
        const email = ref()
        const password = ref()

        return {            
            userLogged,
            userName,
            userEmail,
            userPlan,
            email,
            password,
        }
    },
    methods: {
        async login() {            
            const result = await apiLogin(this.email, this.password)
            
            if (result.status == 'success') {
                Toast().fire({ icon: 'success', title: `Bem vindo ${result.user.name}` })
                this.checkAuth()
            } else {
                Toast().fire({ icon: 'error', title: 'Usuário ou senha incorretos!' })
            }
        },
        checkAuth() {
            this.userLogged = userLoggedIn()

            if (this.userLogged) {
                this.userName = getUserName()
                this.userEmail = getUserEmail()
                this.userPlan = getUserPlan()
            }
        },       
        logout() {
            localStorage.clear()
            Toast().fire({ icon: 'info', title: 'Até logo!' })
            this.checkAuth()
        }
    },
    beforeMount() {
        this.checkAuth()
    },
    components: { 
        Modal   
    },
})
</script>