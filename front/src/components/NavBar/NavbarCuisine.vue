<template>
    <nav class="bg-gradient-to-r from-teal-800 to-green-700 bg-opacity-90 backdrop-blur-md fixed w-full p-5 text-white shadow-lg z-50">
        <div class="max-w-6xl mx-auto flex justify-between items-center">
            <a href="/cuisine" class="text-3xl font-bold tracking-wide text-gray-100 hover:text-yellow-400 transition">🍽️ Restaurant</a>
            <div class="space-x-6 flex items-center">
                <router-link to="/mes-plats" class="hover:text-yellow-400 text-lg font-medium transition">Tous mes Plats</router-link>
                <router-link to="/mes-commandes-cuisinier" class="hover:text-yellow-400 text-lg font-medium transition">Mes Commandes</router-link>
                <logout-button></logout-button>
            </div>
        </div>
    </nav>
</template>

<script>
import LogoutButton from '../LogoutButton.vue';
export default {
  components: { LogoutButton },
  name: "NavBarCuisine",
};
</script>

<style scoped>
/* Styles spécifiques au Navbar si besoin */
</style>
