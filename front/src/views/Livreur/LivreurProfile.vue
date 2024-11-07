<template>
  <Profile
      title="Mon Profil Livreur"
      apiEndpoint="http://localhost:3000/api/livraison/profil"
      :navbarComponent="NavBarLivreur"
      backgroundImage="https://www.le-coursier.fr/storage/images//aofStJKnS3wiMN7sMQQPvD4ZelWOZTCA3mkpmQL4.jpg"
  />
</template>

<script>
import Profile from '../Profil.vue';
import NavBarLivreur from "@/components/NavBar/NavbarLivreur.vue";

export default {
  components: { Profile },
  setup() {
    return {
      NavBarLivreur
    };
  }
};
</script>
