<template>
    <div class="bg-cover min-h-screen" style="background-image: url('https://www.tourisme-rennes.com/voy_content/uploads/2023/09/Hotel-Balthazar-restaurant.jpg'); background-attachment: fixed; background-position: center;">
      <NavBarCuisine />
  
      <div class="pt-28"></div>
  
      <div class="max-w-5xl mx-auto p-10 bg-gray-800 bg-opacity-95 shadow-2xl rounded-lg mt-8">
        <div v-if="!showForm">
          <div class="flex justify-between items-center mb-12">
            <h1 class="text-4xl font-extrabold px-6 py-2 text-gray-900 text-center bg-gradient-to-r from-yellow-400 to-yellow-500 bg-opacity-20 rounded-lg py-4">Nos Menus</h1>
            <button @click="toggleForm" class="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold px-6 py-2 rounded-md shadow-lg transition-all">Ajouter un Menu</button>
          </div>
  
          <!-- Liste des menus existants -->
          <div v-for="menu in menuStore.menus" :key="menu._id" class="mb-12">
            <h2 class="text-3xl font-bold text-white mb-8 text-center bg-gray-600 bg-opacity-80 rounded-lg py-4">{{ menu.name }}</h2>
  
            <!-- Bouton Modifier -->
            <button @click="toggleMenuEdit(menu._id)" class="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold px-6 py-2 rounded-md shadow-lg transition-all mb-4">Ajouter un plat</button>
  
            <!-- Formulaire d'ajout de plats visible uniquement pour le menu sélectionné -->
            <div v-if="menu._id === currentMenuId" class="bg-gray-700 bg-opacity-80 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 mb-8">
              <h2 class="text-2xl font-semibold mb-4 text-gray-100">Ajouter un Plat dans {{ menu.name }}</h2>
              <form @submit.prevent="ajouterPlat(menu._id)">
                <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div>
                    <label class="block text-sm font-medium text-gray-200 mb-1">Nom du Plat</label>
                    <input type="text" v-model="newPlat.name" class="text-gray-900 w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-200 mb-1">Description</label>
                    <input type="text" v-model="newPlat.description" class="text-gray-900 w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-200 mb-1">Prix (€)</label>
                    <input type="number" v-model="newPlat.price" class="text-gray-900 w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
                  </div>
                </div>
                <button type="submit" class="w-full mt-8 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold px-6 py-3 rounded-md shadow-lg transition-all">Ajouter le Plat</button>
              </form>
            </div>
  
            <!-- Plats dans chaque menu -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div v-for="plat in menu.plats" :key="plat._id" class="p-6 bg-gray-700 bg-opacity-80 border rounded-lg shadow-lg hover:shadow-2xl transition-all transform hover:scale-105">
                <h3 class="font-bold text-2xl text-yellow-400 mb-2">{{ plat.name }}</h3>
                <p class="text-gray-200 mb-4">{{ plat.description || "Aucune description disponible" }}</p>
                <div class="flex justify-between items-center">
                  <span class="text-lg font-semibold text-yellow-400">{{ plat.price }} €</span>
                  <span class="inline-block px-3 py-1 text-sm font-medium text-gray-100 rounded-full" :class="plat.available ? 'bg-green-500' : 'bg-red-500'">{{ plat.available ? 'Disponible' : 'Épuisé' }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Formulaire de création de menu -->
        <div v-else>
          <form @submit.prevent="creerMenu" class="bg-gray-700 bg-opacity-80 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all transform hover:scale-105">
            <h2 class="text-2xl font-semibold mb-4 text-gray-100">Créer un Nouveau Menu</h2>
            <div class="flex items-center space-x-4">
              <input type="text" v-model="newMenuName" class="flex-1 p-3 border rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500" placeholder="Nom du Menu" required />
              <button type="submit" class="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold px-6 py-2 rounded-md shadow-lg transition-all">Créer Menu</button>
            </div>
          </form>
          <button @click="toggleForm" class="mt-4 text-yellow-400 hover:text-yellow-500 underline">Retour à la liste des menus</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useCuisineStore } from '../../httpRequest/stores/cuisine.js';
  import NavBarCuisine from "@/components/NavBar/NavbarCuisine.vue";
  import { onMounted, ref } from 'vue';
  
  export default {
    components: { NavBarCuisine },
  
    setup() {
      const menuStore = useCuisineStore();
      const newMenuName = ref('');
      const newPlat = ref({ name: '', description: '', price: 0 });
      const showForm = ref(false);
      const currentMenuId = ref(null);
  
      onMounted(() => {
        menuStore.fetchMenus();
      });
  
      const creerMenu = async () => {
        await menuStore.createMenu(newMenuName.value);
        newMenuName.value = '';
        showForm.value = false;
      };
  
      const ajouterPlat = async (menuId) => {
        await menuStore.addPlat(menuId, newPlat.value);
        newPlat.value = { name: '', description: '', price: 0 };
      };
  
      const toggleForm = () => {
        showForm.value = !showForm.value;
      };
  
      const toggleMenuEdit = (menuId) => {
        currentMenuId.value = currentMenuId.value === menuId ? null : menuId;
      };
  
      return {
        menuStore,
        newMenuName,
        newPlat,
        showForm,
        currentMenuId,
        creerMenu,
        ajouterPlat,
        toggleForm,
        toggleMenuEdit,
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
  