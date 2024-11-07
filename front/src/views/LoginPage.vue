<template>
  <div>
    <Login />
  </div>
</template>

<script>
import Login from '../components/Login.vue';
import {useAuthStore} from '../httpRequest/stores/auth.js'

export default {
  components: {
    Login,
  },
    setup(){
      const authStore = useAuthStore()
      authStore.logout()
      localStorage.removeItem('clientInfo')
    }
};
</script>

<style scoped>
</style>
