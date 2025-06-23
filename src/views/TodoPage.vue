<script setup>
import { ref, watch } from 'vue';
import TodoForm from '../components/TodoForm.vue';
import TodoList from '../components/TodoList.vue';

// 定義待辦事項列表的響應式狀態
const todos = ref([]);

// 從 localStorage 讀取資料
const loadTodos = () => {
  const savedTodos = localStorage.getItem('todos');
  if (savedTodos) {
    todos.value = JSON.parse(savedTodos);
  }
};

// 將資料儲存到 localStorage
const saveTodos = () => {
  localStorage.setItem('todos', JSON.stringify(todos.value));
};

// 初始化時讀取資料
loadTodos();

// 監聽 todos 陣列的變化，並自動儲存
// { deep: true } 確保能監聽到物件內部屬性的變化 (例如: completed 狀態的改變)
watch(todos, saveTodos, { deep: true });

// 新增待辦事項
const addTodo = (todo) => {
  todos.value.unshift({
    id: Date.now(),
    title: todo.title,
    description: todo.description,
    completed: false,
  });
};

// 刪除待辦事項
const deleteTodo = (id) => {
  todos.value = todos.value.filter(todo => todo.id !== id);
};
</script>

<template>
  <div class="todo-app">
    <h1>待辦事項</h1>
    <TodoForm @add-todo="addTodo" />
    <TodoList :todos="todos" @delete-todo="deleteTodo" />
  </div>
</template>

<style scoped>
.todo-app {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

h1 {
  text-align: center;
  color: #333;
}

.subtitle {
  text-align: center;
  color: #666;
  margin-top: -1rem;
  margin-bottom: 2rem;
}
</style>