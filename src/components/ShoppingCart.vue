<script setup>
import { computed } from 'vue';

const props = defineProps({
  cart: {
    type: Array,
    required: true,
  },
});
const emit = defineEmits(['remove-from-cart', 'update-quantity']);

const totalAmount = computed(() => {
  return props.cart.reduce((total, item) => total + item.price * item.quantity, 0);
});

const handleUpdateQuantity = (productId, event) => {
  const quantity = parseInt(event.target.value, 10);
  emit('update-quantity', { productId, quantity });
};
</script>

<template>
  <div class="shopping-cart">
    <h2>購物車</h2>
    <div v-if="cart.length === 0" class="empty-cart">
      您的購物車是空的
    </div>
    <ul v-else class="cart-items">
      <li v-for="item in cart" :key="item.id" class="cart-item">
        <span class="item-name">{{ item.name }}</span>
        <div class="item-controls">
          <input 
            type="number" 
            min="1" 
            :value="item.quantity"
            @change="handleUpdateQuantity(item.id, $event)"
            class="quantity-input"
          />
          <span class="item-total">NT$ {{(item.price * item.quantity).toLocaleString()}}</span>
          <button @click="$emit('remove-from-cart', item.id)" class="remove-btn">✕</button>
        </div>
      </li>
    </ul>
    <div v-if="cart.length > 0" class="cart-total">
      <h3>總計：NT$ {{ totalAmount.toLocaleString() }}</h3>
    </div>
  </div>
</template>

<style scoped>
.shopping-cart {
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 8px;
    /* 讓購物車在桌面版捲動時固定 */
    position: sticky; 
    top: 2rem;
}
.empty-cart {
    text-align: center;
    color: #6c757d;
    padding: 2rem 0;
}
.cart-items {
    list-style: none;
    padding: 0;
    margin: 0;
}
.cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    border-bottom: 1px solid #e9ecef;
    gap: 0.5rem;
}
.item-name {
    flex-grow: 1;
    word-break: break-all;
}
.item-controls {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-shrink: 0;
}
.quantity-input {
    width: 50px;
    text-align: center;
}
.item-total {
    width: 80px;
    text-align: right;
    font-size: 0.9rem;
}
.remove-btn {
    background: #dc3545;
    padding: 0.2rem 0.5rem;
    line-height: 1;
}
.cart-total {
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 2px solid #ddd;
    text-align: right;
    font-size: 1.2rem;
    color: #343a40;
}
</style>