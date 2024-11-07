<template>
    <div
            class="flex min-h-screen items-center justify-center bg-cover bg-center"
            style="background: url(https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2) center center/cover no-repeat;"
    >
        <div class="bg-white bg-opacity-70 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md">
            <div class="text-center">
                <h2 class="text-3xl font-extrabold text-gray-800 mb-6">Bienvenue!</h2>
                <p class="text-sm text-gray-600 mb-4">Connectez-vous pour continuer</p>
            </div>
            <form @submit.prevent="login" class="space-y-6">
                <div class="form-group relative">
                    <label for="email" class="sr-only">Email</label>
                    <input
                            type="email"
                            v-model="email"
                            id="email"
                            placeholder="Email"
                            required
                            class="block w-full text-gray-800 px-4 py-3 bg-white/80 rounded-lg border-none shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <span class="absolute left-3 top-3 text-gray-400">
                        <i class="fas fa-envelope"></i>
                    </span>
                </div>
                <div class="form-group relative">
                    <label for="password" class="sr-only">Mot de passe</label>
                    <input
                            type="password"
                            v-model="password"
                            id="password"
                            placeholder="Mot de passe"
                            required
                            class="block w-full text-gray-800 px-4 py-3 bg-white/80 rounded-lg border-none shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <span class="absolute left-3 top-3 text-gray-400">
                        <i class="fas fa-lock"></i>
                    </span>
                </div>
                <button
                        type="submit"
                        class="w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-semibold py-3 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                >
                    Se connecter
                </button>
                <p v-if="errorMessage" class="text-red-500 text-sm text-center mt-4">{{ errorMessage }}</p>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import {useAuthStore} from '../httpRequest/stores/auth.js'


export default {
    data() {
        return {
            email: '',
            password: '',
            errorMessage: null,
        };
    },
    methods: {
        async login() {
          console.log("Email:", this.email);
          console.log("Password:", this.password);
            const authStore = useAuthStore()
            await authStore.login({email: this.email, password: this.password})
        },
    },
};
</script>

<style scoped>
/* Styles par défaut de Tailwind, aucune personnalisation CSS supplémentaire nécessaire */
</style>
