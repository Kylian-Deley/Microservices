<template>
  <div class="bg-cover min-h-screen" style="background-image: url('https://www.tourisme-rennes.com/voy_content/uploads/2023/09/Hotel-Balthazar-restaurant.jpg'); background-attachment: fixed; background-position: center;">
    <!-- Navbar stylisée -->
    <NavBarCuisine />

    <!-- Espacement pour éviter le chevauchement avec la navbar -->
    <div class="pt-28"></div>

    <!-- Section des menus -->
    <div class="max-w-4xl mx-auto p-8 bg-gray-800 bg-opacity-95 shadow-2xl rounded-lg mt-8">
      <h1 class="text-4xl font-bold text-center mb-12 text-white bg-gray-700 bg-opacity-80 rounded-lg py-4">Mes Menus et Plats</h1>

      <!-- Liste des menus -->
      <div v-for="menu in cuisineStore.menus" :key="menu._id" class="mb-8">
        <div class="p-6 bg-gray-700 bg-opacity-90 rounded-lg shadow-md hover:shadow-xl transition-shadow">
          <div class="flex justify-between items-center">
            <h2 class="font-bold text-2xl text-yellow-400">{{ menu.name }}</h2>
            <div>
              <button @click="openEditMenuModal(menu)" class="bg-blue-500 text-white px-4 mr-4 py-2 rounded-lg shadow hover:bg-blue-600 transition">Modifier</button>
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
                  <button @click="openEditPlatModal(plat)" class="bg-blue-500 text-white px-4 py-2 mr-4 rounded-lg shadow hover:bg-blue-600 transition">Modifier</button>
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
import { useCuisineStore } from '../../httpRequest/stores/cuisine.js';
import ModalComponentChef from "@/components/ModalComponentChef.vue";
import ConfirmModalChef from "@/components/ConfirmModalChef.vue";
import NavBarCuisine from "@/components/NavBar/NavbarCuisine.vue";
import { onMounted, ref } from 'vue';

export default {
  components: { NavBarCuisine, ModalComponentChef, ConfirmModalChef },

  setup() {
    const cuisineStore = useCuisineStore();
    const showEditMenuModal = ref(false);
    const showEditPlatModal = ref(false);
    const showDeleteMenuModal = ref(false);
    const showDeletePlatModal = ref(false);
    const editMenu = ref({});
    const editPlat = ref({});
    const deleteMenuId = ref(null);
    const deletePlatId = ref(null);

    onMounted(() => {
      cuisineStore.fetchMenus();
    });

    const openEditMenuModal = (menu) => {
      editMenu.value = { ...menu };
      showEditMenuModal.value = true;
    };

    const closeEditMenuModal = () => {
      showEditMenuModal.value = false;
      editMenu.value = {};
    };

    const openEditPlatModal = (plat) => {
      editPlat.value = { ...plat };
      showEditPlatModal.value = true;
    };

    const closeEditPlatModal = () => {
      showEditPlatModal.value = false;
      editPlat.value = {};
    };

    const mettreAJourMenu = async (updatedMenu) => {
      await cuisineStore.updateMenu(updatedMenu);
      closeEditMenuModal();
    };

    const mettreAJourPlat = async (updatedPlat) => {
      await cuisineStore.updatePlat(updatedPlat);
      closeEditPlatModal();
    };

    const openDeleteMenuModal = (menuId) => {
      deleteMenuId.value = menuId;
      showDeleteMenuModal.value = true;
    };

    const closeDeleteMenuModal = () => {
      showDeleteMenuModal.value = false;
      deleteMenuId.value = null;
    };

    const openDeletePlatModal = (platId) => {
      deletePlatId.value = platId;
      showDeletePlatModal.value = true;
    };

    const closeDeletePlatModal = () => {
      showDeletePlatModal.value = false;
      deletePlatId.value = null;
    };

    const confirmDeleteMenu = async () => {
      await cuisineStore.deleteMenu(deleteMenuId.value);
      closeDeleteMenuModal();
    };

    const confirmDeletePlat = async () => {
      await cuisineStore.deletePlat(deletePlatId.value);
      closeDeletePlatModal();
    };

    return {
      cuisineStore,
      showEditMenuModal,
      showEditPlatModal,
      showDeleteMenuModal,
      showDeletePlatModal,
      editMenu,
      editPlat,
      openEditMenuModal,
      closeEditMenuModal,
      openEditPlatModal,
      closeEditPlatModal,
      mettreAJourMenu,
      mettreAJourPlat,
      openDeleteMenuModal,
      closeDeleteMenuModal,
      openDeletePlatModal,
      closeDeletePlatModal,
      confirmDeleteMenu,
      confirmDeletePlat,
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
