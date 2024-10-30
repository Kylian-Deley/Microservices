<template>
  <div class="bg-cover min-h-screen" style="background-image: url('https://www.le-coursier.fr/storage/images//aofStJKnS3wiMN7sMQQPvD4ZelWOZTCA3mkpmQL4.jpg');">
    <nav class="bg-gradient-to-r from-indigo-700 to-purple-600 bg-opacity-90 backdrop-blur-md fixed w-full p-5 text-white shadow-lg z-50">
      <div class="max-w-6xl mx-auto flex justify-between items-center">
        <a href="/livraison" class="text-3xl font-bold tracking-wide text-gray-100 hover:text-yellow-400 transition">🚚 Livraison</a>
        <div class="space-x-6 flex items-center">
          <router-link to="/livrees" class="hover:text-yellow-400 text-lg font-medium transition">Commandes Livrées</router-link>
        </div>
      </div>
    </nav>

    <div class="pt-28"></div>
    <!-- Section des commandes livrées -->
    <div class="max-w-5xl mx-auto p-8 bg-gray-200 rounded-lg mt-8 shadow-md">
      <h1 class="text-3xl font-bold text-center mb-8 text-gray-800">Commandes Livrées</h1>

      <!-- Liste des commandes livrées -->
      <div v-for="commande in commandesLivrees" :key="commande._id" class="p-4 bg-white rounded-lg shadow-lg mb-6">
        <div class="flex justify-between">
          <div>
            <h2 class="font-bold text-lg text-gray-700">Commande ID : {{ commande._id }}</h2>
            <p class="text-sm text-gray-600">Date : {{ new Date(commande.date).toLocaleString() }}</p>
          </div>
        </div>
        <div class="mt-4">
          <h3 class="text-md font-semibold text-gray-800">Plats :</h3>
          <ul class="list-disc ml-5 text-gray-800">
            <li v-for="plat in commande.plats" :key="plat.platId">
              {{ plat.name }} x{{ plat.quantity }} - {{ plat.price }} €
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      commandesLivrees: []
    };
  },
  async mounted() {
    await this.fetchCommandesLivrees();
  },
  methods: {
    async fetchCommandesLivrees() {
      try {
        // Récupération du rôle et ID du livreur depuis localStorage (ou une autre source si nécessaire)
        const livreurInfo = JSON.parse(localStorage.getItem('clientInfo'));

        // Appel API avec headers pour inclure le rôle et l'ID du livreur
        const response = await axios.get(`http://localhost:3000/api/commandes/livreur/${livreurInfo.id}/delivered`, {
          headers: {
            'role': livreurInfo.role,
            'user-id': livreurInfo.id // ou l'ID pertinent pour le livreur
          }
        });
        this.commandesLivrees = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des commandes livrées :', error);
      }
    }
  }
};

</script>
