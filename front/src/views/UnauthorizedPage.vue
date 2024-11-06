<template>
  <div class="unauthorized-page">
    <h1>Accès non autorisé</h1>
    <p>Vous n'avez pas l'autorisation d'accéder à cette page.</p>
    <router-link to="/">Retour à la page d'accueil</router-link>
  </div>
</template>

<script>
export default {
  name: 'UnauthorizedPage',
};
</script>

<style scoped>
.unauthorized-page {
  text-align: center;
  margin-top: 50px;
}
.unauthorized-page h1 {
  color: #ff4d4f;
}
.unauthorized-page p {
  margin: 20px 0;
}
</style>
