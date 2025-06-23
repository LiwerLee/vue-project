<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const error = ref('');
const router = useRouter();

const submitUsername = () => {
  if (!username.value.trim()) {
    error.value = '使用者名稱為必填項目。';
    return;
  }
  localStorage.setItem('username', username.value.trim());
  router.push({ name: 'MessageBoard' });
};

const clearInput = () => {
  username.value = '';
  error.value = '';
};
</script>

<template>
  <div class="page-container">
    <div class="form-wrapper">
      <h1>進入留言板</h1>
      <p>請先輸入您的名稱：</p>
      <input 
        type="text" 
        v-model="username" 
        placeholder="請輸入名稱"
        @keyup.enter="submitUsername"
      />
      <p v-if="error" class="error-message">{{ error }}</p>
      <div class="buttons">
        <button @click="submitUsername">送出</button>
        <button @click="clearInput" class="clear-btn">清除</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .page-container {
    display: flex;
    /* 主軸 (水平) 置中對齊 */
    justify-content: center;
    /* 交錯軸 (垂直) 從頂部對齊 */
    align-items: flex-start;
    padding-top: 4rem;
  }

  .form-wrapper {
    background: white;
    padding: 2rem 3rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    text-align: center;
    width: 100%;
    max-width: 400px;
  }

  input {
    width: 100%;
    margin: 1rem 0;
  }

  .buttons {
    display: flex;
    justify-content: center;
    /* 設定 flex 項目之間的間距 */
    gap: 1rem;
    margin-top: 1rem;
  }

  .clear-btn {
    background: #6c757d;
  }
</style>