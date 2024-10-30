<template>
  <div>
    <h1>Ajouter un client</h1>
    <form @submit.prevent="addClient">
      <label for="name">Nom :</label>
      <input type="text" v-model="client.name" required />

      <label for="email">Email :</label>
      <input type="email" v-model="client.email" required />

      <label for="phone">Téléphone :</label>
      <input type="text" v-model="client.phone" />

      <label for="address">Adresse :</label>
      <input type="text" v-model="client.address" />

      <button type="submit">Ajouter</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      client: {
        name: '',
        email: '',
        phone: '',
        address: ''
      }
    };
  },
  methods: {
    async addClient() {
      try {
        const response = await fetch('http://localhost:3000/api/clients', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.client)
        });
        const data = await response.json();
        console.log('Client ajouté avec succès', data);
      } catch (error) {
        console.error('Erreur lors de l\'ajout du client', error);
      }
    }
  }
};
</script>
