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
            <RouterLink to="/chat">
              Video Chat
              <span class="new-badge">NEW</span>
            </RouterLink>
            <RouterLink to="/about">About</RouterLink>
          </div>
        </div>
      </nav>
    </header>

    <main class="main-content">
      <RouterView v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>
  </div>
</template>

<style>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--color-terminal-dark);
}

header {
  background: rgba(10, 10, 10, 0.9);
  border-bottom: 1px solid var(--color-terminal-border);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
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

.nav-links {
  display: flex;
  gap: 1rem;
}

.nav-links a {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.new-badge {
  background: var(--color-terminal-green);
  color: var(--color-terminal-dark);
  font-size: 0.7rem;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-weight: bold;
  animation: pulse 2s infinite;
}

.main-content {
  flex: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    height: auto;
    padding: 1rem;
  }

  nav {
    height: auto;
  }

  .nav-links {
    margin-top: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
