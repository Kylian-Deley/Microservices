<template>
  <div class="bg-cover min-h-screen" style="background-image: url('https://www.le-coursier.fr/storage/images//aofStJKnS3wiMN7sMQQPvD4ZelWOZTCA3mkpmQL4.jpg');">
    <!-- Navbar fixe avec lien vers les commandes livrées -->
    <NavBarLivreur />

    <!-- Espacement pour éviter le chevauchement avec la navbar -->
    <div class="pt-28"></div>

    <!-- Section pour les commandes prêtes à être livrées -->
    <div class="max-w-5xl mx-auto p-8 bg-gray-200 rounded-lg mt-8 shadow-md">
      <h1 class="text-3xl font-bold text-center mb-8 text-gray-800">Commandes prêtes à être livrées</h1>

      <!-- Liste des commandes terminées mais non livrées -->
      <div v-for="commande in cuisineStore.commandesALivrer" :key="commande._id" class="p-4 bg-white rounded-lg shadow-lg mb-6">
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
import NavBarLivreur from "@/components/NavBar/NavbarLivreur.vue";
import { onMounted } from 'vue';
import { useCommandesStore } from '../../httpRequest/stores/commande';

export default {
  components: { NavBarLivreur },

  setup() {
    const cuisineStore = useCommandesStore();

    onMounted(() => {
      cuisineStore.fetchCommandesALivrer();
    });

    const updateDeliveryStatus = (commandeId, status) => {
      cuisineStore.updateDeliveryStatus(commandeId, status);
    };

    return {
      cuisineStore,
      updateDeliveryStatus,
    };
  },
};
</script>

<style scoped>
.bg-cover {
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
</style>
