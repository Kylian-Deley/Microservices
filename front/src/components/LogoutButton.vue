<template>
    <button
      @click="handleLogout"
      class="flex items-center px-4 py-2 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
    >
      <i class="fas fa-sign-out-alt mr-2"></i> <!-- Icône de déconnexion -->
      Déconnexion
    </button>
  </template>
  
  <script>
  import router from '@/router';
import { defineComponent } from 'vue';
  
  export default defineComponent({
    setup() {
      const handleLogout = () => {
        localStorage.removeItem("clientInfo")
        router.push("/login")
      };
  
      return {
        handleLogout,
      };
    },
  });
  </script>
  
  <style scoped>
  /* Styles spécifiques au composant si nécessaire */
  </style>
  