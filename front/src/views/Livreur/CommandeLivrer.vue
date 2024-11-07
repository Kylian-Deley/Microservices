<template>
  <div class="bg-cover min-h-screen" style="background-image: url('https://www.le-coursier.fr/storage/images//aofStJKnS3wiMN7sMQQPvD4ZelWOZTCA3mkpmQL4.jpg');">
    <NavBarLivreur />

    <div class="pt-28"></div>
    <!-- Section des commandes livrées -->
    <div class="max-w-5xl mx-auto p-8 bg-gray-200 rounded-lg mt-8 shadow-md">
      <h1 class="text-3xl font-bold text-center mb-8 text-gray-800">Commandes Livrées</h1>

      <!-- Liste des commandes livrées -->
      <div v-for="commande in cuisineStore.commandesLivrees" :key="commande._id" class="p-4 bg-white rounded-lg shadow-lg mb-6">
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
import NavBarLivreur from "@/components/NavBar/NavbarLivreur.vue";
import { onMounted } from 'vue';
import { useCommandesStore } from '../../httpRequest/stores/commande';

export default {
  components: { NavBarLivreur },

  setup() {
    const cuisineStore = useCommandesStore();

    onMounted(() => {
      cuisineStore.fetchCommandesLivrees();
    });

    return {
      cuisineStore,
    };
  },
};
</script>
