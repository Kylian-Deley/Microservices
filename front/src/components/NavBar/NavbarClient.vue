<template>
  <nav class="bg-gray-700 backdrop-blur-md fixed w-full p-4 text-white shadow-lg flex justify-between items-center z-10">
    <a href="/menu" class="text-3xl font-bold text-gray-300">🍽️ Restaurant</a>
    <router-link to="/mes-commandes-client" class="hover:text-gray-400 text-lg flex items-center space-x-1">
      <span>Voir mes commandes</span>
      <i class="fas fa-shopping-cart"></i>
    </router-link>
    <logout-button></logout-button>
  </nav>
</template>

<script>
import LogoutButton from '../LogoutButton.vue';
export default {
  components: { LogoutButton },
  name: "NavBar",
};
</script>

<style scoped>
/* Styles spécifiques au Navbar si besoin */
</style>
