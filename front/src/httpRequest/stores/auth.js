

import httpModel from '../httpModel';
import { defineStore } from 'pinia';
import router from "../../router"


export const useAuthStore = defineStore('auth', {
  state: () => ({
    userId: JSON.parse(localStorage.getItem('clientInfo'))?.userId || null,
    isAuthenticated: !!JSON.parse(localStorage.getItem('clientInfo'))?.userId,
    roles: JSON.parse(localStorage.getItem('clientInfo'))?.roles || null,
    loading: false,
    error: null,
  }),

  actions: {
    async login(credentials) {
        
      this.loading = true;
      try {
        const response = await httpModel.post('/login', credentials);
        // Récupérer et stocker le userId depuis la réponse
        console.log(response.data.userInfo.id)
        console.log(response.data.userInfo.roles)
        this.userId = response.data.userInfo.id;
        this.roles = response.data.userInfo.roles;
        this.isAuthenticated = true;
        router.push(response.data.redirectUrl)
        const clientInfo = {
            userId: this.userId,
            roles: this.roles,
        };
        localStorage.setItem('clientInfo', JSON.stringify(clientInfo));
      } catch (error) {
        console.log(error)
        this.error = error;
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.userId = null;
      this.roles = null;
      this.isAuthenticated = false;
      localStorage.removeItem('clientInfo');
    },
  },
});
