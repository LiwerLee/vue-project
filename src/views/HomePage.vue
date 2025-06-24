<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const navigateTo = (path) => {
  router.push(path);
};
</script>

<template>
  <div class="home-container">
    <h2>Vue 3 專案實作</h2>
    <div class="button-grid">
      <button @click="navigateTo('/todo')">
        <h3>練習 1：待辦事項</h3>
        <p>一個可新增、編輯、刪除的待辦事項列表。</p>
      </button>
      <button @click="navigateTo('/cart')">
        <h3>練習 2：購物車</h3>
        <p>一個模擬商品列表與購物車功能的應用。</p>
      </button>
      <button @click="navigateTo('/messages-login')">
        <h3>練習 3：留言板</h3>
        <p>需要先登入才能使用的留言板，串接模擬 API。</p>
      </button>
      <button @click="navigateTo('/register')">
        <h3>練習 4：會員註冊</h3>
        <p>具有完整前端驗證規則的註冊表單。</p>
      </button>
    </div>
  </div>
</template>

<style scoped>
  .home-container {
    text-align: center;
    background-color: #ffffff;
    padding: 2rem;
    border-radius: 8px;
  }

  .button-grid {
    display: grid;
    /*
      建立一個響應式網格佈局：
      - repeat: 重複設定
      - auto-fit: 自動根據容器寬度決定每行可以容納多少個項目
      - minmax(250px, 1fr): 每個項目最小寬度為 250px，最大則佔滿剩餘空間 (1fr)
    */
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
  }

  .button-grid button {
    background-color: #f8f9fa;
    color: #343a40;
    border: 1px solid #dee2e6;
    padding: 1.5rem;
    text-align: left;
    cursor: pointer;
    /* 讓 transform 和 box-shadow 的變化有 0.2 秒的平滑過渡動畫 */
    transition: transform 0.2s, box-shadow 0.2s;
    height: auto;
  }

  .button-grid button:hover {
    /* 滑鼠懸浮時，按鈕向上移動 5px */
    transform: translateY(-5px);
    /* 同時加上更明顯的陰影，產生立體感 */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
  }

  .button-grid h3 {
    margin-top: 0;
    color: #007bff;
  }
</style>