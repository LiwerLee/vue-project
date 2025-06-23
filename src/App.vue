<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header class="app-header">
    <nav>
      <RouterLink to="/" class="home-link">
        <h1>Vue 專案實作</h1>
      </RouterLink>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
.app-header {
  background-color: #ffffff;
  padding: 1rem 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}
.home-link {
  text-decoration: none;
  color: #343a40;
}
.home-link h1 {
  margin: 0;
  font-size: 1.5rem;
}
</style>