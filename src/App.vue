<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <header>
      <nav>
        <div class="nav-container">
          <div class="nav-brand">
            <RouterLink to="/">SPACE NEXUS</RouterLink>
          </div>
          <div class="nav-links">
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/communications">Communications</RouterLink>
            <RouterLink to="/about">About</RouterLink>
          </div>
        </div>
      </nav>
    </header>

    <RouterView />
  </div>
</template>

<style>
.app {
  min-height: 100vh;
  background: black;
  color: var(--color-terminal-green);
}

header {
  background: var(--color-terminal-dark);
  border-bottom: 1px solid var(--color-terminal-border);
}

nav {
  height: 4rem;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand a {
  color: var(--color-terminal-green);
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  color: var(--color-terminal-green);
  text-decoration: none;
  transition: opacity 0.3s ease;
}

.nav-links a:hover {
  opacity: 0.8;
}

.nav-links a.router-link-active {
  border-bottom: 2px solid var(--color-terminal-green);
}
</style>
