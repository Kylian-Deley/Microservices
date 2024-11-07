import { defineStore } from 'pinia';
import httpModel from '../httpModel.js';
import { useAuthStore } from './auth';

export const useCommandesStore = defineStore('commandes', {
  state: () => ({
    commandes: [],
    commandesLivrees: [],
    commandesALivrer: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchCommandes() {
      this.loading = true;
      const userId = useAuthStore().userId;
      try {
        const response = await httpModel.get(`/commandes/chef/${userId}`);
        this.commandes = response.data;
      } catch (error) {
        this.error = 'Erreur lors de la récupération des commandes';
        console.error(this.error, error);
      } finally {
        this.loading = false;
      }
    },

    async fetchCommandesALivrer() {
      this.loading = true;
      try {
        const response = await httpModel.get('/commandes/completed');
        this.commandesALivrer = response.data.filter((commande) => commande.deliveryStatus !== 'delivered');
      } catch (error) {
        this.error = 'Erreur lors de la récupération des commandes prêtes à être livrées';
        console.error(this.error, error);
      } finally {
        this.loading = false;
      }
    },

    async updateDeliveryStatus(commandeId, status) {
      try {
        await httpModel.patch(`/commandes/${commandeId}/delivery-status`, 
          { deliveryStatus: status, livreurId: useAuthStore().userId }
        );
        if (status === 'delivered') {
          await this.fetchCommandesALivrer(); // Rafraîchit la liste des commandes si livrée
        }
        console.log('Statut de livraison mis à jour avec succès');
      } catch (error) {
        this.error = 'Erreur lors de la mise à jour du statut de livraison';
        console.error(this.error, error);
      }
    },

    async updateCommandeStatus(commandeId, status) {
      try {
        await httpModel.patch(`/commandes/${commandeId}/status`, { status });

        // Mettre à jour le statut localement dans le store
        const commande = this.commandesLivrees.find((cmd) => cmd._id === commandeId);
        if (commande) commande.status = status;
      } catch (error) {
        this.error = 'Erreur lors de la mise à jour du statut de la commande';
        console.error(this.error, error);
      }
    },

    async fetchCommandesLivrees() {
      this.loading = true;
      const userId = useAuthStore().userId;
      console.log(userId)
      try {
        const response = await httpModel.get(`/commandes/livreur/${userId}/delivered`
        );
        this.commandesLivrees = response.data;
      } catch (error) {
        this.error = 'Erreur lors de la récupération des commandes livrées';
        console.error(this.error, error);
      } finally {
        this.loading = false;
      }
    },
  },
});
