<template>
  <div class="bg-cover min-h-screen" :style="{ backgroundImage: `url('${backgroundImage}')`, backgroundAttachment: 'fixed', backgroundPosition: 'center' }">
    <!-- Navbar stylisée et fixe -->
    <component :is="navbarComponent" />

    <!-- Contenu principal du profil avec style -->
    <div class="max-w-5xl mx-auto pt-28 px-6 pb-12">
      <h1 class="text-4xl font-bold text-center mb-8 text-gray-800 bg-white bg-opacity-70 rounded-lg py-2">{{ title }}</h1>

      <!-- Formulaire de mise à jour du profil stylisé -->
      <div class="bg-white bg-opacity-90 rounded-xl shadow-md p-6">
        <form @submit.prevent="confirmUpdate">
          <div class="mb-4">
            <label for="name" class="block text-gray-700 font-semibold">Nom</label>
            <input
                type="text"
                id="name"
                v-model="userData.name"
                class="w-full border border-gray-300 rounded p-2 mt-1 text-gray-600"
                required
            />
          </div>
          <div class="mb-4">
            <label for="email" class="block font-semibold text-gray-600">Email</label>
            <input
                type="email"
                id="email"
                v-model="userData.email"
                class="w-full border border-gray-300 rounded p-2 mt-1 text-gray-600"
                required
            />
          </div>
          <div class="mb-4 relative">
            <label for="password" class="block font-semibold text-gray-600">Mot de passe</label>
            <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="userData.password"
                class="w-full border border-gray-300 rounded p-2 mt-1 text-gray-600 pr-10"
                placeholder="Mot de passe"
            />
            <button
                style="height: 100px"
                type="button"
                @click="togglePasswordVisibility"
                class="absolute inset-y-0 right-0 px-3 flex items-center text-gray-600 hover:text-gray-800"
            >
              <span v-if="showPassword">👁️</span>
              <span v-else>🙈</span>
            </button>
          </div>
          <button
              type="submit"
              class="bg-gradient-to-r from-gray-600 to-gray-500 hover:from-gray-700 hover:to-gray-600 text-white px-4 py-2 rounded shadow-md"
          >
            Mettre à jour
          </button>
        </form>
      </div>
    </div>

    <!-- Modales -->
    <div v-if="showUpdateConfirmationModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 class="text-xl text-gray-600 font-bold mb-4">Confirmation</h2>
        <p class="mb-4 text-gray-600">Votre profil va être modifié. Voulez-vous continuer ?</p>
        <div class="flex justify-end space-x-4">
          <button @click="cancelUpdate" class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded">
            Annuler
          </button>
          <button @click="updateProfile" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Oui
          </button>
        </div>
      </div>
    </div>

    <div v-if="showConfirmationModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 class="text-xl font-bold text-gray-600 mb-4">Confirmation</h2>
        <p class="mb-4 text-gray-600">Votre profil a été mis à jour avec succès.</p>
        <button @click="closeConfirmationModal" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          OK
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from "@/httpRequest/stores/auth.js";

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    apiEndpoint: {
      type: String,
      required: true
    },
    navbarComponent: {
      type: Object,
      required: true
    },
    backgroundImage: {
      type: String,
      default: 'https://img.freepik.com/photos-gratuite/planches-bois-restaurant-flou-fond_1253-56.jpg'
    }
  },
  setup(props) {
    const userData = ref({
      name: '',
      email: '',
      password: ''
    });
    const showPassword = ref(false);
    const showUpdateConfirmationModal = ref(false);
    const showConfirmationModal = ref(false);

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    const fetchUserData = async () => {
      try {
        const authStore = useAuthStore();
        const response = await axios.get(`${props.apiEndpoint}/${authStore.userId}`, {
          headers: {
            'user-id': authStore.userId
          }
        });
        userData.value = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des informations du profil:', error);
      }
    };

    const confirmUpdate = () => {
      showUpdateConfirmationModal.value = true;
    };

    const updateProfile = async () => {
      try {
        const authStore = useAuthStore();
        await axios.put(`${props.apiEndpoint}/${authStore.userId}`, userData.value, {
          headers: {
            'user-id': authStore.userId
          }
        });
        showUpdateConfirmationModal.value = false;
        showConfirmationModal.value = true;
      } catch (error) {
        console.error('Erreur lors de la mise à jour du profil:', error);
        alert('Erreur lors de la mise à jour du profil');
      }
    };

    const closeConfirmationModal = () => {
      fetchUserData();
      showConfirmationModal.value = false;
    };

    const cancelUpdate = () => {
      showUpdateConfirmationModal.value = false;
    };

    onMounted(fetchUserData);

    return {
      userData,
      showPassword,
      showUpdateConfirmationModal,
      showConfirmationModal,
      togglePasswordVisibility,
      confirmUpdate,
      updateProfile,
      closeConfirmationModal,
      cancelUpdate
    };
  }
};
</script>
