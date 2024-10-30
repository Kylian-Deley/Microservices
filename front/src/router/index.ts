import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../views/LoginPage.vue';
import MenuPage from '../views/Client/MenuPage.vue';
import ChefDashboard from '../views/Cuisinier/ChefDashboard.vue'; // Page pour les chefs
import MesCommandes from '../views/Client/MesCommandes.vue';
import MesCommandesCuisinier from "@/views/Cuisinier/MesCommandesCuisinier.vue";
import TousMesPlats from "@/views/Cuisinier/TousMesPlats.vue";
import Livraison from "@/views/Livreur/Livraison.vue";
import CommandeLivrer from "@/views/Livreur/CommandeLivrer.vue";

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
  },
  {
    path: '/mes-commandes-client',
    name: 'MesCommandesClient',
    component: MesCommandes
  },
  {
    path: '/cuisine',
    name: 'ChefDashboard',
    component: ChefDashboard,
  },
  {
    path: '/mes-plats',
    name: 'TousMesPlats',
    component: TousMesPlats
  },
  {
    path: '/mes-commandes-cuisinier',
    name: 'MesCommandesCuisinier',
    component: MesCommandesCuisinier
  },
  {
    path: '/livraison',
    name: 'livraison',
    component: Livraison
  },
  {
    path: '/livrees',
    name: 'livrees',
    component: CommandeLivrer
  },
  {
    path: '/',
    redirect: '/login',
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
});


export default router;
