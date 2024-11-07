<template>
  <Profile
      title="Mon Profil Cuisinier"
      apiEndpoint="http://localhost:3000/api/cuisine/profil"
      :navbarComponent="NavBarCuisine"
      backgroundImage="https://www.tourisme-rennes.com/voy_content/uploads/2023/09/Hotel-Balthazar-restaurant.jpg"
  />
</template>

<script>
import Profile from '../Profil.vue';
import NavBarCuisine from "@/components/NavBar/NavbarCuisine.vue";

export default {
  components: { Profile },
  setup() {
    return {
      NavBarCuisine
    };
  }
};
</script>
