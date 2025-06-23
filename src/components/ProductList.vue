<script setup>
import { ref } from 'vue';

defineProps({
  products: {
    type: Array,
    required: true,
  },
});
const emit = defineEmits(['add-to-cart', 'show-detail']);

// 使用一個物件來追蹤每個商品的加入數量
const quantities = ref({});

const handleAddToCart = (product) => {
  const quantity = quantities.value[product.id] || 1;
  emit('add-to-cart', { product, quantity });
};

const handleShowDetail = (product) => {
  emit('show-detail', product);
}
</script>

<template>
  <div class="product-list-container">
    <h2>商品列表</h2>
    <div class="product-grid">
      <div v-for="product in products" :key="product.id" class="product-card">
        <img :src="product.image" :alt="product.name" @click="handleShowDetail(product)" class="product-image"/>
        <div class="product-info">
          <h3 @click="handleShowDetail(product)" class="product-name">{{ product.name }}</h3>
          <p class="product-price">NT$ {{ product.price.toLocaleString() }}</p>
          <div class="add-to-cart-section">
            <input type="number" min="1" v-model.number="quantities[product.id]" class="quantity-input" placeholder="1"/>
            <button @click="handleAddToCart(product)">加入購物車</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-list-container {
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
}
.product-grid {
    display: grid;
    /* 響應式卡片佈局 */
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1.5rem;
}
.product-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    background: white;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    display: flex;
    flex-direction: column;
}
.product-image {
    width: 100%;
    height: 180px;
    object-fit: cover;
    cursor: pointer;
}
.product-info {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1; /* 讓此區塊填滿剩餘空間 */
}
.product-name {
    margin: 0 0 0.5rem;
    font-size: 1.1rem;
    cursor: pointer;
}
.product-price {
    color: #e63946;
    font-weight: bold;
    margin: 0 0 1rem;
}
.add-to-cart-section {
    display: flex;
    gap: 0.5rem;
    margin-top: auto; /* 將此區塊推到卡片底部 */
}
.quantity-input {
    width: 60px;
}
button {
    flex-grow: 1;
}
</style>