<script setup>
import { ref, reactive } from 'vue';

const props = defineProps({
  todo: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['delete-todo']);

// 控制編輯模式的狀態
const isEditing = ref(false);

// 為了不直接修改 prop，我們建立一個可編輯的副本
// 在進入編輯模式時，將 prop 的值同步到此副本
const editableTodo = reactive({
  title: '',
  description: ''
});

const toggleEdit = () => {
  if (isEditing.value) {
    // 儲存變更: 將編輯後的資料更新回原始的 todo 物件
    // Vue 3 的響應式系統會偵測到這個變更並更新畫面
    Object.assign(props.todo, editableTodo);
  } else {
    // 進入編輯模式前，同步一次資料，確保編輯的是最新資料
    editableTodo.title = props.todo.title;
    editableTodo.description = props.todo.description;
  }
  isEditing.value = !isEditing.value;
};

// 切換完成狀態
const toggleStatus = () => {
    props.todo.completed = !props.todo.completed;
}
</script>

<template>
  <div class="todo-item" :class="{ completed: todo.completed }">
    <div v-if="!isEditing" class="view-mode">
      <div class="content" @click="toggleStatus">
        <input type="checkbox" :checked="todo.completed" class="status-checkbox">
        <div class="text-content">
            <h3>{{ todo.title }}</h3>
            <p v-if="todo.description">{{ todo.description }}</p>
        </div>
      </div>
      <div class="actions">
        <button @click.stop="toggleEdit" class="edit-btn">編輯</button>
        <button @click.stop="$emit('delete-todo', todo.id)" class="delete-btn">刪除</button>
      </div>
    </div>
    
    <div v-else class="edit-mode">
      <div class="edit-fields">
        <input type="text" v-model="editableTodo.title" class="edit-input" placeholder="標題" />
        <textarea v-model="editableTodo.description" class="edit-textarea" placeholder="詳細描述"></textarea>
      </div>
      <div class="actions">
        <button @click="toggleEdit" class="save-btn">儲存</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.todo-item {
  background: #fff;
  padding: 1rem;
  border-radius: 8px;
  border-left: 5px solid #007bff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease-in-out;
  flex-wrap: wrap;
}
.todo-item.completed {
  border-left-color: #28a745;
  background-color: #f8f9fa;
}
.todo-item.completed h3 {
  text-decoration: line-through;
  color: #6c757d;
}

.view-mode, .edit-mode {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

@media (max-width: 600px) {
  .view-mode, .edit-mode {
    flex-direction: column;
    align-items: stretch;
  }
  .actions {
    margin-top: 1rem;
  }
}

.content {
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  flex-grow: 1;
}
.status-checkbox {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
}
.text-content {
    flex-grow: 1;
}

h3 { margin: 0 0 0.25rem 0; font-size: 1.1rem; }
p { margin: 0; color: #555; font-size: 0.9rem; }

.actions {
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
}
.edit-btn {
  background-color: #ffc107;
  color: #212529;
}
.delete-btn {
  background-color: #dc3545;
}
.save-btn {
  background-color: #28a745;
}

.edit-fields {
  flex-grow: 1;
}
.edit-input, .edit-textarea {
  margin-bottom: 0.5rem;
}
</style>