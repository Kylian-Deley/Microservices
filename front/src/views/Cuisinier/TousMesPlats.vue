<template>
  <div class="bg-cover min-h-screen" style="background-image: url('https://www.tourisme-rennes.com/voy_content/uploads/2023/09/Hotel-Balthazar-restaurant.jpg'); background-attachment: fixed; background-position: center;">
    <!-- Navbar stylisée -->
    <nav class="bg-gradient-to-r from-teal-800 to-green-700 bg-opacity-90 backdrop-blur-md fixed w-full p-5 text-white shadow-lg z-50">
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

    <!-- Section des menus -->
    <div class="max-w-4xl mx-auto p-8 bg-gray-800 bg-opacity-95 shadow-2xl rounded-lg mt-8">
      <h1 class="text-4xl font-bold text-center mb-12 text-white bg-gray-700 bg-opacity-80 rounded-lg py-4">Mes Menus et Plats</h1>

      <!-- Liste des menus -->
      <div v-for="menu in menus" :key="menu._id" class="mb-8">
        <div class="p-6 bg-gray-700 bg-opacity-90 rounded-lg shadow-md hover:shadow-xl transition-shadow">
          <div class="flex justify-between items-center">
            <h2 class="font-bold text-2xl text-yellow-400">{{ menu.name }}</h2>
            <div>
              <button @click="openEditMenuModal(menu)" class="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition">Modifier</button>
              <button @click="openDeleteMenuModal(menu._id)" class="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition">Supprimer</button>
            </div>
          </div>
          <!-- Liste des plats dans chaque menu -->
          <ul class="space-y-4 mt-4">
            <li v-for="plat in menu.plats" :key="plat._id" class="p-4 bg-gray-800 bg-opacity-80 rounded-lg shadow hover:shadow-xl transition-shadow">
              <div class="flex justify-between items-center">
                <div>
                  <h3 class="font-bold text-xl text-yellow-400">{{ plat.name }}</h3>
                  <p class="text-gray-300 mt-1">{{ plat.description || 'Aucune description disponible' }}</p>
                </div>
                <div class="text-right">
                  <p class="text-lg font-semibold text-white">{{ plat.price }} €</p>
                  <button @click="openEditPlatModal(plat)" class="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition">Modifier</button>
                  <button @click="openDeletePlatModal(plat._id)" class="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition">Supprimer</button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Modals pour la gestion des menus et plats -->
    <ModalComponentChef
        v-if="showEditMenuModal"
        :data="editMenu"
        dataType="menu"
        title="Modifier le Menu"
        @close="closeEditMenuModal"
        @save="mettreAJourMenu"
    />

    <ModalComponentChef
        v-if="showEditPlatModal"
        :data="editPlat"
        dataType="plat"
        title="Modifier le Plat"
        @close="closeEditPlatModal"
        @save="mettreAJourPlat"
    />

    <ConfirmModalChef
        v-if="showDeleteMenuModal"
        @confirm="confirmDeleteMenu"
        @close="closeDeleteMenuModal"
    />

    <ConfirmModalChef
        v-if="showDeletePlatModal"
        @confirm="confirmDeletePlat"
        @close="closeDeletePlatModal"
    />
  </div>
</template>

<script>
import axios from 'axios';
import ModalComponentChef from "@/components/ModalComponentChef.vue";
import ConfirmModalChef from "@/components/ConfirmModalChef.vue";

export default {
  components: { ModalComponentChef, ConfirmModalChef },
  data() {
    return {
      menus: [],
      showEditMenuModal: false,
      showEditPlatModal: false,
      showDeleteMenuModal: false,
      showDeletePlatModal: false,
      editMenu: {},
      editPlat: {},
      deleteMenuId: null,
      deletePlatId: null
    };
  },
  async mounted() {
    await this.fetchMenus();
  },
  methods: {
    async fetchMenus() {
      const clientInfo = JSON.parse(localStorage.getItem('clientInfo'));
      try {
        const response = await axios.get('http://localhost:3000/api/cuisine/menus', {
          headers: {'user-id': clientInfo.id, 'role': clientInfo.role}
        });
        this.menus = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des menus:', error);
      }
    },
    openEditMenuModal(menu) {
      this.editMenu = {...menu};
      this.showEditMenuModal = true;
    },
    closeEditMenuModal() {
      this.showEditMenuModal = false;
      this.editMenu = {};
    },
    openEditPlatModal(plat) {
      this.editPlat = {...plat};
      this.showEditPlatModal = true;
    },
    closeEditPlatModal() {
      this.showEditPlatModal = false;
      this.editPlat = {};
    },
    async mettreAJourMenu(updatedMenu) {
      try {
        await axios.put(`http://localhost:3000/api/cuisine/menus/${updatedMenu._id}`, updatedMenu);
        this.fetchMenus();
        this.closeEditMenuModal();
      } catch (error) {
        console.error('Erreur lors de la mise à jour du menu:', error);
      }
    },
    async mettreAJourPlat(updatedPlat) {
      try {
        await axios.put(`http://localhost:3000/api/cuisine/plats/${updatedPlat._id}`, updatedPlat);
        this.fetchMenus();
        this.closeEditPlatModal();
      } catch (error) {
        console.error('Erreur lors de la mise à jour du plat:', error);
      }
    },
    openDeleteMenuModal(menuId) {
      this.deleteMenuId = menuId;
      this.showDeleteMenuModal = true;
    },
    closeDeleteMenuModal() {
      this.showDeleteMenuModal = false;
      this.deleteMenuId = null;
    },
    openDeletePlatModal(platId) {
      this.deletePlatId = platId;
      this.showDeletePlatModal = true;
    },
    closeDeletePlatModal() {
      this.showDeletePlatModal = false;
      this.deletePlatId = null;
    },
    async confirmDeleteMenu() {
      try {
        await axios.delete(`http://localhost:3000/api/cuisine/menus/${this.deleteMenuId}`);
        this.fetchMenus();
        this.closeDeleteMenuModal();
      } catch (error) {
        console.error('Erreur lors de la suppression du menu:', error);
      }
    },
    async confirmDeletePlat() {
      try {
        await axios.delete(`http://localhost:3000/api/cuisine/plats/${this.deletePlatId}`);
        this.fetchMenus();
        this.closeDeletePlatModal();
      } catch (error) {
        console.error('Erreur lors de la suppression du plat:', error);
      }
    }
  }
};
</script>

<style scoped>
/* Styles pour un affichage élégant */
.bg-cover {
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
</style>
