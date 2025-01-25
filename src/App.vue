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
            <RouterLink to="/">Communications</RouterLink>
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
  text-decoration: none;
  font-size: 1.25rem;
  font-weight: bold;
  transition: color 0.3s ease;
}

.nav-brand a:hover {
  color: rgba(51, 255, 51, 0.8);
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.nav-links a {
  color: var(--color-terminal-green);
  text-decoration: none;
  padding: 0.5rem 0;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: rgba(51, 255, 51, 0.8);
}

.nav-links a.router-link-active {
  border-bottom: 2px solid var(--color-terminal-green);
}
</style>
