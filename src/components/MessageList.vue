<script setup>
defineProps({
  messages: { type: Array, required: true }
});

const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleString('zh-TW', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit'
  });
};
</script>

<template>
  <div class="message-list">
    <div v-for="message in messages" :key="message.id" class="message-item">
      <div class="message-header">
        <strong class="author">{{ message.author }}</strong>
        <span class="timestamp">{{ formatTime(message.timestamp) }}</span>
      </div>
      <p class="content">{{ message.content }}</p>
    </div>
  </div>
</template>

<style scoped>
.message-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.message-item {
  background: #f8f9fa;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.5rem;
}

.author {
  font-size: 1.1rem;
  color: #0056b3;
}

.timestamp {
  font-size: 0.8rem;
  color: #6c757d;
}

.content {
  margin: 0;
  /* 讓文字中的換行符號 (\n) 能被正確顯示 */
  white-space: pre-wrap;
  /* 當遇到過長的英文單字或網址時，強制換行以避免超出邊界 */
  word-wrap: break-word;
}
</style>