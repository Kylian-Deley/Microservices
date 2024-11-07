<template>
  <nav class="bg-gray-700 backdrop-blur-md fixed w-full p-4 text-white shadow-lg flex justify-between items-center z-10">
    <a href="/menu" class="text-3xl font-bold text-gray-300">🍽️ Restaurant</a>
    <div class="flex gap-5">
      <router-link to="/mes-commandes-client" class="hover:text-gray-400 text-lg flex items-center">
        <span>Mes commandes</span>
        <i class="fas fa-shopping-cart"></i>
      </router-link>
      <router-link to="/profil" class="hover:text-gray-400 text-lg flex items-center ml-2">
        <span>Profil</span>
        <i class="fas fa-user"></i>
      </router-link>
    </div>
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
