<template>
  <div class="bg-cover min-h-screen" style="background-image: url('https://img.freepik.com/photos-gratuite/planches-bois-restaurant-flou-fond_1253-56.jpg');">
    <!-- Navbar stylisée et fixe -->
    <NavBar />

    <!-- Contenu principal des commandes avec style -->
    <div class="max-w-5xl mx-auto pt-28 px-6 pb-12">
      <h1 class="text-4xl font-bold text-center mb-8 text-gray-800 bg-white bg-opacity-70 rounded-lg py-2">Mes Commandes</h1>

      <!-- Liste des commandes stylisées -->
      <div v-for="commande in commandes" :key="commande._id" class="mb-8 bg-white bg-opacity-90 rounded-xl shadow-md overflow-hidden">
        <div class="bg-gradient-to-r from-gray-600 to-gray-500 text-white p-4 flex justify-between items-center">
          <h2 class="text-xl font-semibold">Commande du {{ new Date(commande.date).toLocaleDateString() }}</h2>
          <p class="text-sm font-semibold bg-green-500 rounded-full px-3 py-1">{{ commande.status }}</p>
        </div>

        <div class="bg-gray-50 p-6 space-y-4">
          <ul class="space-y-2">
            <li v-for="plat in commande.plats" :key="plat.platId" class="flex justify-between items-center border-b py-2">
              <div class="text-lg font-medium text-gray-800">{{ plat.name }} x{{ plat.quantity }}</div>
              <div class="text-lg font-semibold text-gray-600">{{ plat.price }} €</div>
            </li>
          </ul>
          <div class="font-semibold text-right mt-4 text-lg text-gray-800">
            Total: <span class="text-yellow-600">{{ commande.plats.reduce((sum, plat) => sum + plat.price * plat.quantity, 0) }} €</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import NavBar from "@/views/NavbarClient.vue";

export default {
  components: {NavBar},
  data() {
    return {
      commandes: []
    };
  },
  async mounted() {
    try {
      const clientInfo = JSON.parse(localStorage.getItem('clientInfo'));
      if (!clientInfo || !clientInfo.id || !clientInfo.role) {
        throw new Error("Les informations du client sont manquantes dans localStorage.");
      }

      // Appel de l'API avec l'ID du client dans l'URL
      const response = await axios.get(`http://localhost:3000/api/commandes/client/${clientInfo.id}`, {
        headers: {
          'user-id': clientInfo.id,
          'role': clientInfo.role
        }
      });

      this.commandes = response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des commandes:', error);
    }
  }
};
</script>

<style scoped>
/* Effet de fond */
.bg-cover {
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

/* Styles pour transition et hover */
.bg-gradient-to-r {
  background: linear-gradient(to right, #4a4e69, #9a8c98);
}

.shadow-md:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}
</style>
