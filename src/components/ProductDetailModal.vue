<script setup>
import { ref } from 'vue';

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(['close', 'add-to-cart']);
const quantity = ref(1);

const handleAddToCart = () => {
  emit('add-to-cart', { product: props.product, quantity: quantity.value });
};
</script>

<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <button @click="$emit('close')" class="close-button">&times;</button>
      <img :src="product.image" :alt="product.name" class="modal-image"/>
      <div class="modal-details">
        <h2>{{ product.name }}</h2>
        <p class="product-description">{{ product.description }}</p>
        <p class="product-price">NT$ {{ product.price.toLocaleString() }}</p>
        <div class="add-to-cart-section">
          <input type="number" min="1" v-model.number="quantity" class="quantity-input"/>
          <button @click="handleAddToCart">加入購物車</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    padding: 1rem;
}
.modal-content {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    width: 100%;
    max-width: 700px;
    position: relative;
    display: grid;
    gap: 1.5rem;
    grid-template-columns: 1fr; /* 手機上單欄 */
}
/* 電腦上雙欄 */
@media (min-width: 768px) {
  .modal-content {
    grid-template-columns: 1fr 1fr;
  }
}
.close-button {
    position: absolute;
    top: 10px;
    right: 15px;
    background: none;
    border: none;
    font-size: 2.5rem;
    color: #aaa;
    line-height: 1;
    padding: 0;
}
.modal-image {
    width: 100%;
    border-radius: 8px;
    object-fit: cover;
}
.modal-details {
    display: flex;
    flex-direction: column;
}
.product-description {
    color: #666;
    line-height: 1.6;
    flex-grow: 1;
}
.product-price {
    font-size: 1.5rem;
    font-weight: bold;
    color: #e63946;
    margin: 1rem 0;
}
.add-to-cart-section {
    display: flex;
    gap: 1rem;
}
.quantity-input {
    width: 80px;
}
</style>