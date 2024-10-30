<template>
  <div class="flex min-h-screen bg-gray-100 items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold text-center mb-6 text-gray-700">Connexion</h2>
      <form @submit.prevent="login" class="space-y-4">
        <div class="form-group">
          <label for="email" class="block text-sm font-medium text-gray-600">Email:</label>
          <input
              type="email"
              v-model="email"
              id="email"
              required
              class="mt-1 block w-full text-gray-800 px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <div class="form-group">
          <label for="password" class="block text-sm font-medium text-gray-600">Mot de passe:</label>
          <input
              type="password"
              v-model="password"
              id="password"
              required
              class="mt-1 block w-full px-4 py-2 text-gray-800 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <button
            type="submit"
            class="w-full bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
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
      try {
        const response = await axios.post('http://localhost:3000/api/login', {
          email: this.email,
          password: this.password,
        });

        const { redirectUrl, userInfo } = response.data;

        // Vérifie si userInfo est bien défini avant de le stocker
        if (userInfo) {
          localStorage.setItem('clientInfo', JSON.stringify(userInfo));
          console.log(localStorage.getItem('clientInfo')); // Vérifie le stockage
        } else {
          console.error('userInfo is undefined');
        }

        // Redirection vers la page appropriée
        this.$router.push(redirectUrl);
      } catch (error) {
        this.errorMessage = 'Email ou mot de passe incorrect.';
      }
    },
  },
};
</script>

<style scoped>
/* Aucun style additionnel n'est nécessaire ici, car Tailwind s'occupe de tout */
</style>
