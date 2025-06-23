<script setup>
import MessageList from '@/components/MessageList.vue';
import { messageApi } from '@/services/messageApi';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const messages = ref([]);
const newMessageContent = ref('');
const error = ref('');
const router = useRouter();

const username = localStorage.getItem('username');

// 載入留言
const loadMessages = async () => {
  try {
    const data = await messageApi.getMessages();
    messages.value = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  } catch (err) { console.error('Failed to load messages:', err); }
};

onMounted(loadMessages);

// 送出新留言
const postMessage = async () => {
  if (!newMessageContent.value.trim()) {
    error.value = '請輸入留言內容。';
    return;
  }
  error.value = '';

  try {
    await messageApi.postMessage({ author: username, content: newMessageContent.value });
    newMessageContent.value = '';
    await loadMessages();
  } catch (err) { error.value = '留言失敗，請稍後再試。'; }
};

const logout = () => {
  localStorage.removeItem('username');
  router.push({ name: 'Home' });
};
</script>

<template>
  <div class="message-page-container">
    <header>
      <h1>留言板</h1>
      <div class="user-info">
        <span>歡迎，{{ username }}</span>
        <button @click="logout" class="logout-btn">登出</button>
      </div>
    </header>
    <div class="message-form">
      <textarea v-model="newMessageContent" placeholder="說點什麼吧..." rows="4"></textarea>
      <p v-if="error" class="error-message">{{ error }}</p>
      <button @click="postMessage">送出留言</button>
    </div>
    <MessageList :messages="messages" />
  </div>
</template>

<style scoped>
  .message-page-container {
    max-width: 800px;
    /* margin: 0 auto; 是讓區塊水平置中的常用技巧 */
    margin: 0 auto;
    padding: 1rem;
    background: #fff;
    border-radius: 8px;
  }

  header {
    display: flex;
    /* justify-content: space-between; 讓 flex 項目沿主軸對齊，兩端對齊，項目之間的間隔相等 */
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ddd;
    padding-bottom: 1rem;
    margin-bottom: 2rem;
  }

  .logout-btn {
    background: none;
    border: 1px solid #ccc;
    color: #333;
  }

  .message-form {
    margin-bottom: 2rem;
  }

  .message-form button {
    display: block;
    margin-top: 0.5rem;
    /* margin-left: auto; 在 flex 或 block 容器中，可以將元素推到最右邊 */
    margin-left: auto;
  }
</style>