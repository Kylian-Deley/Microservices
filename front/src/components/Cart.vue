<template>
  <div>
    <h2>Panier</h2>
    <ul>
      <li v-for="(item, index) in cart" :key="index">
        {{ item.name }} - {{ item.price }}€ - Quantité: 1
        <button @click="removeItem(index)">Retirer</button>
      </li>
    </ul>

    <div v-if="cart.length">
      <p>Total: {{ totalPrice }}€</p>
      <button @click="submitOrder">Passer la commande</button>
    </div>
    <div v-else>
      <p>Votre panier est vide.</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cart: Array
  },
  computed: {
    totalPrice() {
      return this.cart.reduce((sum, item) => sum + item.price, 0);
    }
  },
  methods: {
    removeItem(index) {
      this.$emit('remove-item', index); // Émet un événement pour retirer un article du panier
    },
    submitOrder() {
      this.$emit('submit-order'); // Émet un événement pour passer la commande
    }
  }
};
</script>
