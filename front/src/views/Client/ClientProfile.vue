<template>
  <Profile
      title="Mon Profil"
      apiEndpoint="http://localhost:3000/api/clients/profil"
      :navbarComponent="NavbarClient"
      backgroundImage="https://img.freepik.com/photos-gratuite/planches-bois-restaurant-flou-fond_1253-56.jpg"
  />
</template>

<script>
import Profile from '../Profil.vue';
import NavbarClient from "@/components/NavBar/NavbarClient.vue";

export default {
  components: { Profile },
  setup() {
    return {
      NavbarClient
    };
  }
};
</script>
