<template>
  <div>
    <Login />
  </div>
</template>

<script>
import Login from '../components/Login.vue';

export default {
  components: {
    Login,
  },
    setup(){
      localStorage.removeItem('clientInfo')
    }
};
</script>

<style scoped>
</style>
