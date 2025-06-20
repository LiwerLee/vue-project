<script setup>
import { ref } from 'vue';

const emit = defineEmits(['add-todo']);

const newTodo = ref({
  title: '',
  description: '',
});
const error = ref('');

const handleSubmit = () => {
  // 檢核標題為必填
  if (!newTodo.value.title.trim()) {
    error.value = '標題為必填項目。';
    return;
  }
  
  emit('add-todo', { ...newTodo.value });
  
  // 清空輸入欄位和錯誤訊息
  newTodo.value.title = '';
  newTodo.value.description = '';
  error.value = '';
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="todo-form">
    <div class="form-group">
      <input 
        type="text" 
        v-model="newTodo.title" 
        placeholder="輸入待辦事項標題"
      />
    </div>
    <div class="form-group">
      <textarea 
        v-model="newTodo.description" 
        placeholder="輸入詳細描述 (選填)"
        rows="3"
      ></textarea>
    </div>
    <p v-if="error" class="error-message">{{ error }}</p>
    <button type="submit">新增待辦</button>
  </form>
</template>

<style scoped>
.todo-form {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #dee2e6;
}
.form-group {
  margin-bottom: 1rem;
}
button {
  width: 100%;
}
.error-message {
  margin-top: -0.5rem;
  margin-bottom: 1rem;
}
</style>