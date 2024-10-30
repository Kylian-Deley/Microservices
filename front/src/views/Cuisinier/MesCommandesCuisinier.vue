<template>
  <div class="bg-cover min-h-screen" style="background-image: url('https://www.tourisme-rennes.com/voy_content/uploads/2023/09/Hotel-Balthazar-restaurant.jpg'); background-attachment: fixed; background-position: center;">
    <!-- Navbar stylisée pour le cuisinier -->
    <nav class="bg-gradient-to-r from-teal-800 to-green-700 bg-opacity-90 backdrop-blur-md fixed w-full p-5 text-white shadow-lg z-10">
      <div class="max-w-6xl mx-auto flex justify-between items-center">
        <a href="/cuisine" class="text-3xl font-bold tracking-wide text-gray-100 hover:text-yellow-400 transition">🍽️ Restaurant</a>
        <div class="space-x-6 flex items-center">
          <router-link to="/mes-plats" class="hover:text-yellow-400 text-lg font-medium transition">Tous mes Plats</router-link>
          <router-link to="/mes-commandes-cuisinier" class="hover:text-yellow-400 text-lg font-medium transition">Mes Commandes</router-link>
        </div>
      </div>
    </nav>

    <!-- Espacement pour éviter le chevauchement avec la navbar -->
    <div class="pt-28"></div>

    <!-- Section principale -->
    <div class="max-w-5xl mx-auto p-10 bg-gray-800 bg-opacity-80 shadow-2xl rounded-lg mt-16">
      <h1 class="text-4xl font-extrabold text-center mb-10 text-white bg-gray-700 bg-opacity-80 rounded-lg py-4">Mes Commandes</h1>

      <!-- Liste des commandes -->
      <ul class="space-y-8">
        <li v-for="commande in commandes" :key="commande._id" class="p-6 bg-gray-700 bg-opacity-90 rounded-lg shadow-md">
          <div class="flex justify-between items-center">
            <div>
              <h2 class="font-semibold text-xl text-yellow-400">Commande du {{ new Date(commande.date).toLocaleDateString() }}</h2>
              <p class="text-gray-300">Status: <span class="font-bold">{{ commande.status }}</span></p>
            </div>
            <div>
              <select v-model="commande.status" @change="updateStatus(commande)" class="bg-gray-600 text-white rounded-md px-3 py-1 shadow focus:outline-none focus:ring-2 focus:ring-yellow-500">
                <option value="pending">En attente</option>
                <option value="in progress">En cours</option>
                <option value="completed">Terminée</option>
              </select>
            </div>
          </div>

          <ul class="mt-4 space-y-2">
            <li v-for="plat in commande.plats" :key="plat.platId" class="flex justify-between text-gray-300">
              <div>{{ plat.name }} x{{ plat.quantity }}</div>
              <div>{{ plat.price }} €</div>
            </li>
          </ul>

          <div class="font-semibold text-right text-yellow-400 mt-4">
            Total: {{ commande.plats.reduce((sum, plat) => sum + plat.price * plat.quantity, 0) }} €
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      commandes: []
    };
  },
  async mounted() {
    const clientInfo = JSON.parse(localStorage.getItem('clientInfo'));
    try {
      const response = await axios.get(`http://localhost:3000/api/commandes/chef/${clientInfo.id}`, {
        headers: {'user-id': clientInfo.id, 'role': clientInfo.role}
      });
      this.commandes = response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des commandes:', error);
    }
  },
  methods: {
    async updateStatus(commande) {
      try {
        await axios.patch(`http://localhost:3000/api/commandes/${commande._id}/status`,
            {status: commande.status},
            {
              headers: {'user-id': JSON.parse(localStorage.getItem('clientInfo')).id, 'role': JSON.parse(localStorage.getItem('clientInfo')).role}
            }
        );
      } catch (error) {
        console.error('Erreur lors de la mise à jour du statut de la commande:', error);
      }
    }
  }
};
</script>

<style scoped>
.bg-cover {
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

ul li:hover {
  background-color: #2d2f36;
}

select {
  transition: background-color 0.3s ease;
}
</style>
