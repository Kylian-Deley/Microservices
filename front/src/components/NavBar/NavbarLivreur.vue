<template>
    <nav class="bg-gradient-to-r from-indigo-700 to-purple-600 bg-opacity-90 backdrop-blur-md fixed w-full p-5 text-white shadow-lg z-50">
        <div class="max-w-6xl mx-auto flex justify-between items-center">
            <a href="/livraison" class="text-3xl font-bold tracking-wide text-gray-100 hover:text-yellow-400 transition">🚚 Salt Bae</a>
            <div class="space-x-6 flex items-center">
                <router-link to="/livrees" class="hover:text-yellow-400 text-lg font-medium transition">Commandes Livrées</router-link>
            </div>
            <logout-button></logout-button>
        </div>
    </nav>
</template>

<script>
import LogoutButton from '../LogoutButton.vue';
export default {
  components: { LogoutButton },
  name: "NavBarLivreur",
};
</script>

<style scoped>
/* Styles spécifiques au Navbar si besoin */
</style>
