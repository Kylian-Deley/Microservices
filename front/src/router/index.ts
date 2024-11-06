import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../views/LoginPage.vue';
import MenuPage from '../views/Client/MenuPage.vue';
import ChefDashboard from '../views/Cuisinier/ChefDashboard.vue'; // Page pour les chefs
import MesCommandes from '../views/Client/MesCommandes.vue';
import MesCommandesCuisinier from "@/views/Cuisinier/MesCommandesCuisinier.vue";
import TousMesPlats from "@/views/Cuisinier/TousMesPlats.vue";
import Livraison from "@/views/Livreur/Livraison.vue";
import CommandeLivrer from "@/views/Livreur/CommandeLivrer.vue";
import UnauthorizedPage from '../views/UnauthorizedPage.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/menu',
    name: 'Menu',
    component: MenuPage,
    meta: { requiresRole: 'client' },
  },
  {
    path: '/mes-commandes-client',
    name: 'MesCommandesClient',
    component: MesCommandes,
    meta: { requiresRole: 'client' },
  },
  {
    path: '/cuisine',
    name: 'ChefDashboard',
    component: ChefDashboard,
    meta: { requiresRole: 'chef' },
  },
  {
    path: '/mes-plats',
    name: 'TousMesPlats',
    component: TousMesPlats,
    meta: { requiresRole: 'chef' },
  },
  {
    path: '/mes-commandes-cuisinier',
    name: 'MesCommandesCuisinier',
    component: MesCommandesCuisinier,
    meta: { requiresRole: 'chef' },
  },
  {
    path: '/livraison',
    name: 'livraison',
    component: Livraison,
    meta: { requiresRole: 'livreur' },
  },
  {
    path: '/livrees',
    name: 'livrees',
    component: CommandeLivrer,
    meta: { requiresRole: 'livreur' }
  },
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/permission_denied',
    name: 'unauthorizedPage',
    component: UnauthorizedPage,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
});

router.beforeEach((to, from, next) => {
  if(to.meta){
    const userRole = JSON.parse(localStorage.getItem('clientInfo')!).role;

    if (to.meta.requiresRole && to.meta.requiresRole !== userRole) {
      return next({ path: '/permission_denied' });
    }

    next();
  }
  
});


export default router;
