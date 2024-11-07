<template>
    <div class="bg-cover min-h-screen" style="background-image: url('https://www.tourisme-rennes.com/voy_content/uploads/2023/09/Hotel-Balthazar-restaurant.jpg'); background-attachment: fixed; background-position: center;">
        <!-- Navbar stylisée pour le cuisinier -->
        <NavBarCuisine />

        <!-- Espace vide sous la navbar pour éviter le chevauchement -->
        <div class="pt-28"></div>

        <!-- Section d'ajout de menu ou affichage des menus selon l'état -->
        <div class="max-w-5xl mx-auto p-10 bg-gray-800 bg-opacity-95 shadow-2xl rounded-lg mt-8">

            <div v-if="!showForm">
                <div class="flex justify-between items-center mb-12">
                    <h1 class="text-4xl font-extrabold px-6 py-2 text-gray-900 text-center bg-gradient-to-r from-yellow-400 to-yellow-500 bg-opacity-20 rounded-lg py-4">
                        Nos Menus
                    </h1>
                    <button @click="toggleForm" class="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold px-6 py-2 rounded-md shadow-lg transition-all">
                        Ajouter un Menu
                    </button>
                </div>

                <!-- Liste des menus existants -->
                <div v-for="menu in menus" :key="menu._id" class="mb-12">
                    <h2 class="text-3xl font-bold text-white mb-8 text-center bg-gray-600 bg-opacity-80 rounded-lg py-4">
                        {{ menu.name }}
                    </h2>

                    <!-- Bouton Modifier -->
                    <button @click="toggleMenuEdit(menu._id)" class="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold px-6 py-2 rounded-md shadow-lg transition-all mb-4">
                        Ajouter un plat
                    </button>

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
                                <span class="inline-block px-3 py-1 text-sm font-medium text-gray-100 rounded-full" :class="plat.available ? 'bg-green-500' : 'bg-red-500'">
                  {{ plat.available ? 'Disponible' : 'Épuisé' }}
                </span>
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
import axios from 'axios';
import NavBarCuisine from "@/components/NavBar/NavbarCuisine.vue";

export default {
    components: { NavBarCuisine },
    data() {
        return {
            newMenuName: '', // Nom du nouveau menu
            newPlat: { name: '', description: '', price: 0 }, // Détails du plat
            menus: [], // Liste des menus
            showForm: false, // Variable pour gérer l'affichage du formulaire de création de menu
            currentMenuId: null // Identifiant du menu actuellement modifié
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
                    headers: { 'user-id': clientInfo.id, 'role': clientInfo.role }
                });
                this.menus = response.data;
            } catch (error) {
                console.error('Erreur lors de la récupération des menus:', error);
            }
        },
        async creerMenu() {
            const clientInfo = JSON.parse(localStorage.getItem('clientInfo'));
            try {
                await axios.post('http://localhost:3000/api/cuisine/menus', { name: this.newMenuName }, {
                    headers: { 'user-id': clientInfo.id, 'role': clientInfo.role }
                });
                this.newMenuName = '';
                await this.fetchMenus();
                this.showForm = false; // Retour à l'affichage des menus
            } catch (error) {
                console.error('Erreur lors de la création du menu:', error);
            }
        },
        async ajouterPlat(menuId) {
            const clientInfo = JSON.parse(localStorage.getItem('clientInfo'));
            try {
                await axios.post('http://localhost:3000/api/cuisine/plats', {
                    ...this.newPlat,
                    menuId
                }, {
                    headers: { 'user-id': clientInfo.id, 'role': clientInfo.role }
                });
                this.newPlat = { name: '', description: '', price: 0 };
                await this.fetchMenus();
            } catch (error) {
                console.error("Erreur lors de l'ajout du plat :", error);
            }
        },
        toggleForm() {
            this.showForm = !this.showForm; // Change l'état d'affichage du formulaire de création
        },
        toggleMenuEdit(menuId) {
            this.currentMenuId = this.currentMenuId === menuId ? null : menuId; // Permet d'ouvrir ou fermer l'édition du menu
        }
    }
};
</script>

<style scoped>
/* Styles pour le fond et les effets */
.bg-cover {
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.pt-28 {
  padding-top: 7rem;
}

.shadow-md:hover {
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

button:hover {
  transform: scale(1.05);
}
</style>
