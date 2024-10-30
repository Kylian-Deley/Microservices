<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
      <h2 class="text-xl font-bold mb-4 text-gray-800">Confirmer la Suppression</h2>
      <p class="text-gray-600 mb-6">Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.</p>
      <div class="flex justify-center space-x-4">
        <button @click="close" class="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">Annuler</button>
        <button @click="confirm" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Supprimer</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    confirm() {
      this.$emit('confirm');
      this.close();
    },
    close() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
/* Styles pour l'apparence de la modal */
</style>
