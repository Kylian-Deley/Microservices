// src/stores/cuisineStore.js
import { defineStore } from 'pinia';
import httpModel from '../httpModel.js';

export const useCuisineStore = defineStore('cuisine', {
  state: () => ({
    menus: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchMenus() {
      this.loading = true;
      try {
        const response = await httpModel.get('/cuisine/menus');
        this.menus = response.data;
      } catch (error) {
        this.error = 'Erreur lors de la récupération des menus';
        console.error(this.error, error);
      } finally {
        this.loading = false;
      }
    },

    async createMenu(name) {
      try {
        await httpModel.post('/cuisine/menus', { name });
        await this.fetchMenus();
      } catch (error) {
        this.error = 'Erreur lors de la création du menu';
        console.error(this.error, error);
      }
    },

    async addPlat(menuId, plat) {
      try {
        await httpModel.post('/cuisine/plats', { ...plat, menuId },);
        await this.fetchMenus();
      } catch (error) {
        this.error = "Erreur lors de l'ajout du plat";
        console.error(this.error, error);
      }
    },

    async updateMenu(menu) {
      try {
        await httpModel.put(`/cuisine/menus/${menu._id}`, menu);
        await this.fetchMenus();
      } catch (error) {
        this.error = 'Erreur lors de la mise à jour du menu';
        console.error(this.error, error);
      }
    },

    async updatePlat(plat) {
      try {
        await httpModel.put(`/cuisine/plats/${plat._id}`, plat);
        await this.fetchMenus();
      } catch (error) {
        this.error = 'Erreur lors de la mise à jour du plat';
        console.error(this.error, error);
      }
    },

    async deleteMenu(menuId) {
      try {
        await httpModel.delete(`/cuisine/menus/${menuId}`);
        await this.fetchMenus();
      } catch (error) {
        this.error = 'Erreur lors de la suppression du menu';
        console.error(this.error, error);
      }
    },

    async deletePlat(platId) {
      const clientInfo = JSON.parse(localStorage.getItem('clientInfo'));
      try {
        await httpModel.delete(`/cuisine/plats/${platId}`, {
          headers: { 'user-id': clientInfo.id },
        });
        await this.fetchMenus();
      } catch (error) {
        this.error = 'Erreur lors de la suppression du plat';
        console.error(this.error, error);
      }
    },
  },
});
