<template>
    <div class="bg-cover min-h-screen" style="background-image: url('https://www.tourisme-rennes.com/voy_content/uploads/2023/09/Hotel-Balthazar-restaurant.jpg'); background-attachment: fixed; background-position: center;">
        <!-- Navbar stylisée pour le cuisinier -->
        <NavBarCuisine />

        <!-- Espacement pour éviter le chevauchement avec la navbar -->
        <div class="pt-28"></div>

        <!-- Section principale -->
        <div class="max-w-5xl mx-auto p-10 bg-gray-800 bg-opacity-80 shadow-2xl rounded-lg mt-16">
            <h1 class="text-4xl font-extrabold text-center mb-10 text-white bg-gray-700 bg-opacity-80 rounded-lg py-4">Mes Commandes</h1>

            <!-- Onglets -->
            <div class="flex justify-center mb-8">
                <button
                        class="px-4 py-2 font-semibold text-white rounded-t-lg focus:outline-none"
                        :class="activeTab === 'inProgress' ? 'bg-yellow-500' : 'bg-gray-600'"
                        @click="activeTab = 'inProgress'"
                >
                    Commandes en cours
                </button>
                <button
                        class="px-4 py-2 font-semibold text-white rounded-t-lg focus:outline-none ml-4"
                        :class="activeTab === 'completed' ? 'bg-yellow-500' : 'bg-gray-600'"
                        @click="activeTab = 'completed'"
                >
                    Commandes terminées
                </button>
            </div>

            <!-- Liste des commandes -->
            <ul class="space-y-8" v-if="filteredCommandes.length">
                <li v-for="commande in filteredCommandes" :key="commande._id" class="p-6 bg-gray-700 bg-opacity-90 rounded-lg shadow-md">
                    <div class="flex justify-between items-center">
                        <div>
                        <h2 class="font-semibold text-xl text-yellow-400">Commande du {{ new Date(commande.date).toLocaleDateString() }}</h2>
                        <p class="text-gray-300">Status: <span class="font-bold">{{ commande.status }}</span></p>
                        </div>
                        <div>
                            <select
                                :value="commande._id === selectedCommande?._id ? tempStatus : commande.status"
                                @change="handleStatusChange(commande, $event)"
                                class="bg-gray-600 text-white rounded-md px-3 py-1 shadow focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                :disabled="commande.status === 'completed'"
                            >
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

            <!-- Message si aucune commande dans l'onglet -->
            <p v-else class="text-center text-gray-300">Aucune commande dans cette catégorie.</p>

            <!-- Popup de confirmation -->
            <div v-if="showPopup" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div class="bg-white p-6 rounded-lg shadow-lg">
                    <p class="mb-4 text-gray-800">Êtes-vous sûr de vouloir changer le statut de cette commande ?</p>
                    <div class="flex justify-end">
                        <button @click="confirmChange" class="px-4 py-2 bg-green-500 text-white rounded-md mr-2">Oui</button>
                        <button @click="cancelChange" class="px-4 py-2 bg-red-500 text-white rounded-md">Non</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useCommandesStore } from '@/httpRequest/stores/commande.js';
import NavBarCuisine from "@/components/NavBar/NavbarCuisine.vue";
import { computed, ref } from 'vue';
import { onMounted } from 'vue';

export default {
  components: { NavBarCuisine },

  setup() {
    const commandesStore = useCommandesStore();
    const activeTab = ref("inProgress")
    const previousStatus = ref();
    const tempStatus = ref();
    const selectedCommande = ref();
    const showPopup = ref(false);

    onMounted(() => {
      commandesStore.fetchCommandes();
    });

    const updateStatus = (commande) => {
      commandesStore.updateCommandeStatus(commande._id, commande.status);
    };

    const filteredCommandes = computed(() => {
        return commandesStore.commandes.filter(commande =>
            activeTab.value === 'inProgress' ? commande.status !== 'completed' : commande.status === 'completed'
        );
    })

    const handleStatusChange = (commande) => {
        console.log(commande)
        previousStatus.value = commande.status;
        tempStatus.value = event.target.value;
        selectedCommande.value = commande;
        showPopup.value = true;
    }

    const confirmChange = () => {
        selectedCommande.value.status = tempStatus.value
          updateStatus(selectedCommande.value);
        showPopup.value = false;
    }
    const cancelChange = () => {
        selectedCommande.value.status = previousStatus;
        showPopup.value = false;
        selectedCommande.value = null;
    }

    return {
        commandesStore,
        showPopup,
        tempStatus,
        selectedCommande,
        filteredCommandes,
        updateStatus,
        activeTab,
        previousStatus,
        cancelChange,
        confirmChange,
        handleStatusChange,
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

ul li:hover {
  background-color: #2d2f36;
}

select {
  transition: background-color 0.3s ease;
}
</style>
