<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 class="text-xl font-bold mb-4 text-gray-800">{{ title }}</h2>
      <form @submit.prevent="handleSave">
        <div class="mb-4" v-if="dataType === 'menu'">
          <label class="block text-sm font-medium text-gray-700">Nom du Menu</label>
          <input type="text" v-model="data.name" class="w-full p-2 text-gray-800 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500" required />
        </div>
        <div v-if="dataType === 'plat'">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Nom du Plat</label>
            <input type="text" v-model="data.name" class="w-full p-2 text-gray-800 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500" required />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Description</label>
            <input type="text" v-model="data.description" class="w-full text-gray-800 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Prix (€)</label>
            <input type="number" v-model="data.price" class="w-full p-2 text-gray-800 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500" required />
          </div>
        </div>
        <div class="flex justify-end space-x-4">
          <button type="button" @click="close" class="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">Annuler</button>
          <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Sauvegarder</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    dataType: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: 'Modification'
    }
  },
  methods: {
    handleSave() {
      this.$emit('save', { ...this.data });
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
