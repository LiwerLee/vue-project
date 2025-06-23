<script setup>
import ProductDetailModal from '@/components/ProductDetailModal.vue';
import ProductList from '@/components/ProductList.vue';
import ShoppingCart from '@/components/ShoppingCart.vue';
import { fetchProducts } from '@/services/mockApi';
import { onMounted, ref, watch } from 'vue';

const products = ref([]);
const cart = ref([]);
const isLoading = ref(true);

// 彈出視窗相關狀態
const selectedProduct = ref(null);
const isModalVisible = ref(false);

// 載入商品資料
onMounted(async () => {
  try {
    products.value = await fetchProducts();
  } catch(error) {
    console.error("無法載入商品:", error);
  } finally {
    isLoading.value = false;
  }
});

// 從 localStorage 載入購物車資料
const loadCart = () => {
  const savedCart = localStorage.getItem('shoppingCart');
  if (savedCart) {
    cart.value = JSON.parse(savedCart);
  }
};
loadCart();

// 監聽購物車變化並儲存到 localStorage
watch(cart, (newCart) => {
  localStorage.setItem('shoppingCart', JSON.stringify(newCart));
}, { deep: true });

// 加入購物車邏輯
const addToCart = ({ product, quantity }) => {
  const existingItem = cart.value.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity = Number(existingItem.quantity) + Number(quantity);
  } else {
    cart.value.push({ ...product, quantity: Number(quantity) });
  }
  // 如果是從彈出視窗加入，則關閉視窗
  if (isModalVisible.value) {
    closeProductDetail();
  }
};

// 從購物車移除商品
const removeFromCart = (productId) => {
  cart.value = cart.value.filter(item => item.id !== productId);
};

// 更新購物車商品數量
const updateQuantity = ({ productId, quantity }) => {
  const item = cart.value.find(item => item.id === productId);
  if (item) {
    const newQuantity = Number(quantity);
    if (newQuantity > 0) {
      item.quantity = newQuantity;
    } else {
      // 如果數量為 0 或更少，則移除商品
      removeFromCart(productId);
    }
  }
};

// 顯示商品詳情
const showProductDetail = (product) => {
  selectedProduct.value = product;
  isModalVisible.value = true;
};

// 關閉商品詳情視窗
const closeProductDetail = () => {
  isModalVisible.value = false;
  selectedProduct.value = null;
};
</script>

<template>
  <div class="shopping-page">
    <div v-if="isLoading" class="loading-state">載入中...</div>
    <div v-else class="main-content">
      <ProductList 
        :products="products"
        @add-to-cart="addToCart"
        @show-detail="showProductDetail"
      />
      <ShoppingCart 
        :cart="cart"
        @remove-from-cart="removeFromCart"
        @update-quantity="updateQuantity"
      />
    </div>

    <ProductDetailModal
      v-if="isModalVisible"
      :product="selectedProduct"
      @close="closeProductDetail"
      @add-to-cart="addToCart"
    />
  </div>
</template>

<style scoped>
.shopping-page {
  font-family: sans-serif;
}
.loading-state {
  text-align: center;
  padding: 4rem;
  font-size: 1.5rem;
  color: #6c757d;
}
.main-content {
  display: grid;
  /* 響應式網格佈局 */
  grid-template-columns: 1fr;
  gap: 2rem;
}

/* 當螢幕寬度大於 992px 時，改為 2 欄式佈局 */
@media (min-width: 992px) {
  .main-content {
    grid-template-columns: 2fr 1fr;
  }
}
</style>