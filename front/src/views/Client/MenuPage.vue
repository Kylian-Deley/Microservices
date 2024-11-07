<template>
  <div class="bg-cover min-h-screen" style="background-image: url('https://img.freepik.com/photos-gratuite/planches-bois-restaurant-flou-fond_1253-56.jpg');">
    <!-- Navbar stylisée et fixe -->
    <NavbarClient />

    <!-- Bouton "Passer la commande" sous la navbar -->
    <div class="bg-gray-100 py-4">
      <div class="max-w-5xl mx-auto flex justify-end mt-16">
        <button
            @click="passerCommande"
            :disabled="panier.length === 0"
            class="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-6 rounded-full shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Passer la commande ({{ panier.length }} articles)
        </button>
      </div>
    </div>

    <!-- Contenu principal des menus avec style -->
    <div class="max-w-5xl mx-auto pt-8 px-6 pb-12">
      <h1 class="text-4xl font-bold text-center mb-8 text-gray-800">Menus par Cuisinier</h1>

      <!-- Cartes de menu stylisées -->
      <div v-for="menu in menus" :key="menu._id" class="mb-8 bg-white bg-opacity-90 rounded-xl shadow-md overflow-hidden">
        <div
            @click="toggleMenu(menu.name)"
            class="cursor-pointer bg-gradient-to-r from-gray-600 to-gray-500 text-white p-4 flex justify-between items-center"
        >
          <h2 class="text-xl font-semibold">{{ menu.name }}</h2>
          <span class="text-xl">{{ expandedMenu === menu.name ? '▲' : '▼' }}</span>
        </div>

        <!-- Contenu déplié du menu -->
        <transition name="fade">
          <div v-if="expandedMenu === menu.name" class="bg-gray-50 p-6 space-y-4">
            <div v-for="plat in menu.plats" :key="plat._id" class="flex justify-between items-center border-b py-4">
              <div class="flex flex-col">
                <h3 class="text-lg font-semibold text-gray-800">{{ plat.name }}</h3>
                <p class="text-sm text-gray-500">{{ plat.description || 'Aucune description' }}</p>
              </div>
              <div class="flex items-center space-x-4">
                <span class="text-lg font-semibold text-gray-600">{{ plat.price }} €</span>
                <input
                    type="number"
                    v-model.number="quantities[plat._id]"
                    min="0"
                    placeholder="Qty"
                    class="w-16 border border-gray-300 rounded-full px-2 py-1 text-gray-700 focus:outline-none focus:ring focus:border-gray-500"
                />
                <button
                    @click="ajouterAuPanier(plat)"
                    :disabled="quantities[plat._id] === 0"
                    class="bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded-full shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import NavbarClient from "@/components/NavBar/NavbarClient.vue";

export default {
  components: { NavbarClient },
  data() {
    return {
      menus: [],
      quantities: {},
      panier: [],
      expandedMenu: null,
    };
  },
  async mounted() {
    try {
      const response = await axios.get('http://localhost:3003/cuisine/menus-public'); // Appel de la route publique
      this.menus = response.data;

      // Initialise la quantité de chaque plat
      this.menus.forEach(menu => {
        menu.plats.forEach(plat => {
          this.quantities[plat._id] = 1;
        });
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des menus:', error);
    }
  },
  methods: {
    toggleMenu(menuName) {
      this.expandedMenu = this.expandedMenu === menuName ? null : menuName;
    },
    ajouterAuPanier(plat) {
      const quantity = this.quantities[plat._id] || 1;
      const item = { ...plat, quantity };
      this.panier.push(item);
      this.quantities[plat._id] = 1;
    },
    async passerCommande() {
      const commandeDetails = this.panier.map(item => ({
        platId: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      }));

      try {
        const clientInfo = JSON.parse(localStorage.getItem('clientInfo'));
        if (!clientInfo || !clientInfo.id || !clientInfo.role) {
          throw new Error("Les informations du client sont manquantes dans localStorage.");
        }

        await axios.post('http://localhost:3000/api/commandes', {
          clientId: clientInfo.id,
          plats: commandeDetails,
        }, {
          headers: {
            'user-id': clientInfo.id,
            'role': clientInfo.role,
          },
        });

        this.$router.push('/mes-commandes-client');
      } catch (error) {
        console.error('Erreur lors de la commande:', error);
      }
    },
  },
};
</script>

<style scoped>
.bg-cover {
  background-size: cover;
  background-position: center;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

button.bg-gray-700:hover {
  transition: transform 0.1s;
  transform: scale(1.05);
}

button:active {
  background-color: #555555;
  transform: scale(0.95);
}
</style>
