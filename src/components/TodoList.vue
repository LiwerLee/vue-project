<script setup>
import TodoItem from './TodoItem.vue';

defineProps({
  todos: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['delete-todo']);

const handleDelete = (id) => {
  emit('delete-todo', id);
};
</script>

<template>
  <div class="todo-list">
    <div v-if="todos.length === 0" class="empty-state">
      目前沒有待辦事項，快新增一個吧！
    </div>
    <TodoItem 
      v-for="todo in todos" 
      :key="todo.id"
      :todo="todo" 
      @delete-todo="handleDelete"
    />
  </div>
</template>

<style scoped>
.todo-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.empty-state {
  text-align: center;
  color: #666;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 8px;
}
</style>