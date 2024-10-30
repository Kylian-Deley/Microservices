<template>
  <div class="bg-cover min-h-screen" style="background-image: url('https://www.le-coursier.fr/storage/images//aofStJKnS3wiMN7sMQQPvD4ZelWOZTCA3mkpmQL4.jpg');">
    <!-- Navbar fixe avec lien vers les commandes livrées -->
    <nav class="bg-gradient-to-r from-indigo-700 to-purple-600 bg-opacity-90 backdrop-blur-md fixed w-full p-5 text-white shadow-lg z-50">
      <div class="max-w-6xl mx-auto flex justify-between items-center">
        <a href="/livraison" class="text-3xl font-bold tracking-wide text-gray-100 hover:text-yellow-400 transition">🚚 Livraison</a>
        <div class="space-x-6 flex items-center">
          <router-link to="/livrees" class="hover:text-yellow-400 text-lg font-medium transition">Commandes Livrées</router-link>
        </div>
      </div>
    </nav>

    <!-- Espacement pour éviter le chevauchement avec la navbar -->
    <div class="pt-28"></div>

    <!-- Section pour les commandes prêtes à être livrées -->
    <div class="max-w-5xl mx-auto p-8 bg-gray-200 rounded-lg mt-8 shadow-md">
      <h1 class="text-3xl font-bold text-center mb-8 text-gray-800">Commandes prêtes à être livrées</h1>

      <!-- Liste des commandes terminées mais non livrées -->
      <div v-for="commande in commandes" :key="commande._id" class="p-4 bg-white rounded-lg shadow-lg mb-6">
        <div class="flex justify-between">
          <div>
            <h2 class="font-bold text-lg text-gray-700">Commande ID : {{ commande._id }}</h2>
            <p class="text-sm text-gray-600">Date : {{ new Date(commande.date).toLocaleString() }}</p>
          </div>
          <div>
            <select v-model="commande.deliveryStatus" @change="updateDeliveryStatus(commande._id, commande.deliveryStatus)" class="p-2 rounded bg-indigo-200 text-gray-800">
              <option value="awaiting">En attente</option>
              <option value="in delivery">En livraison</option>
              <option value="delivered">Livrée</option>
            </select>
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
      commandes: []
    };
  },
  async mounted() {
    await this.fetchCommandesALivrer();
  },
  methods: {
    async fetchCommandesALivrer() {
      const livreurInfo = JSON.parse(localStorage.getItem('clientInfo'));
      try {
        const response = await axios.get('http://localhost:3000/api/commandes/completed', {
          headers: {
            'user-id': livreurInfo.id,
            'role': livreurInfo.role
          }
        });
        this.commandes = response.data.filter(commande => commande.deliveryStatus !== 'delivered');
      } catch (error) {
        console.error('Erreur lors de la récupération des commandes :', error);
      }
    },
    async updateDeliveryStatus(commandeId, status) {
      const livreurInfo = JSON.parse(localStorage.getItem('clientInfo'));
      try {
        await axios.patch(`http://localhost:3000/api/commandes/${commandeId}/delivery-status`,
            { deliveryStatus: status, livreurId: livreurInfo.id }, // Envoyer l'ID du livreur dans le corps de la requête
            {
              headers: {
                'user-id': livreurInfo.id,
                'role': livreurInfo.role
              }
            }
        );
        console.log('Statut de livraison mis à jour avec succès');
        if (status === 'delivered') {
          this.fetchCommandesALivrer();
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour du statut de livraison :", error);
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
</style>
